/**
 * Vet Pep Wellness — order capture + invoice + refill reminders
 * Google Apps Script (free, runs on your Google account).
 *
 * This version is SELF-ADAPTING: it manages its own columns by header name and
 * accepts whatever fields the website sends. You should never need to edit or
 * re-deploy this again when the site changes — paste once, deploy once, done.
 *
 * Setup steps are in CRM-SETUP.md.
 */

const REFILL_DAYS      = 30;                      // days from order until refill is "due"
const REMIND_LEAD_DAYS = 3;                       // remind this many days before due
const OWNER_EMAIL      = "vetpepwellness@gmail.com";
const SHEET_NAME       = "Orders";
// Blank if the script is bound to the Sheet. For a STANDALONE script paste the
// Sheet ID (the long part of the sheet link between /d/ and /edit).
const SPREADSHEET_ID   = "1-N34JUbV0oSBVEvEMSc5MEp5kY-3qNuodCNeQVlKhZc";

function getSS_() {
  return SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID)
                        : SpreadsheetApp.getActiveSpreadsheet();
}
function getSheet_() {
  const ss = getSS_();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}
const isEmail_ = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(v));

/** Receives orders POSTed from the website. */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const d = JSON.parse(e.postData.contents);
    const values = {
      "Timestamp": new Date(),
      "First Name": d.firstName || "",
      "Last Name": d.lastName || "",
      "Email": d.email || "",
      "Phone": d.phone || "",
      "Address": d.address || "",
      "Items": d.items || "",
      "Subtotal": d.subtotal || "",
      "Shipping": d.shipping || "",
      "Total": d.total || "",
      "Rep Code": d.code || "",
      "Refill Due": new Date(Date.now() + REFILL_DAYS * 86400000),
      "Reminder Sent": "NO",
      "Paid": "NO",
    };
    writeRow_(getSheet_(), values);
    sendInvoice_(d);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return json_({ ok: true, service: "Vet Pep Wellness order capture" }); }

/** Appends a row, auto-creating/aligning header columns by name. */
function writeRow_(sheet, values) {
  let headers = sheet.getLastRow() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
  headers = headers.filter((h) => h !== "");
  if (!headers.length) {
    headers = Object.keys(values);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  } else {
    const missing = Object.keys(values).filter((h) => headers.indexOf(h) === -1);
    if (missing.length) {
      sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
      headers = headers.concat(missing);
    }
  }
  const row = headers.map((h) => (h in values ? values[h] : ""));
  sheet.appendRow(row);
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/** Emails a simple invoice to the customer (+ owner copy). */
function sendInvoice_(d) {
  const name = `${d.firstName || ""} ${d.lastName || ""}`.trim() || (d.name || "customer");
  const body =
    `Thanks for your order with Vet Pep Wellness — Peps and More!\n\n` +
    `ORDER\n${d.items || ""}\n\n` +
    `Subtotal: ${d.subtotal || ""}\nShipping: ${d.shipping || ""}\nTotal: ${d.total || ""}\n` +
    (d.code ? `Referral / Salesperson code: ${d.code}\n` : "") +
    `\nShip to:\n${name}\n${d.address || ""}\n\n` +
    `HOW TO PAY\n` +
    `• Cash App: https://cash.app/$vetpepwellness\n` +
    `• Venmo: https://www.venmo.com/u/vetpepwellness\n` +
    `• Bitcoin (Cash App): https://cash.app/launch/bitcoin/$vetpepwellness/KtneJ3fp2a\n` +
    `• Cash — local pickup or delivery around Lubbock & West Texas\n` +
    `Add your name in the payment note so we can match it to your order. We'll confirm once payment is received.\n\n` +
    `————————————\n` +
    `Research use only. Products are not dietary supplements, drugs, or medications and are not for ` +
    `human or veterinary consumption. Nothing here is medical advice. Must be 21+.\n— Vet Pep Wellness`;

  const email = d.email || d.contact;
  MailApp.sendEmail(OWNER_EMAIL, `New order — ${name} (${d.total || ""})`, body);
  if (isEmail_(email)) MailApp.sendEmail(String(email), "Your Vet Pep Wellness order & invoice", body);
}

/** Daily trigger: refill reminders + a "who's due" summary. Reads columns by name. */
function dailyReminders() {
  const s = getSheet_();
  const data = s.getDataRange().getValues();
  if (data.length < 2) return;
  const H = data[0], idx = (n) => H.indexOf(n);
  const iF = idx("First Name"), iL = idx("Last Name"), iEmail = idx("Email"),
        iPhone = idx("Phone"), iItems = idx("Items"), iDue = idx("Refill Due"), iSent = idx("Reminder Sent");
  if (iDue < 0 || iSent < 0) return;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const cutoff = new Date(today.getTime() + REMIND_LEAD_DAYS * 86400000);
  const due = [];

  for (let i = 1; i < data.length; i++) {
    const r = data[i];
    const refillDue = r[iDue] ? new Date(r[iDue]) : null;
    if (!refillDue || String(r[iSent]).toUpperCase() === "YES") continue;
    if (refillDue <= cutoff) {
      const name = `${iF >= 0 ? r[iF] : ""} ${iL >= 0 ? r[iL] : ""}`.trim();
      const email = iEmail >= 0 ? String(r[iEmail]) : "";
      const items = iItems >= 0 ? r[iItems] : "";
      due.push({ name, contact: email || (iPhone >= 0 ? r[iPhone] : ""), items });
      if (isEmail_(email)) {
        MailApp.sendEmail(email, "Time to restock — Vet Pep Wellness",
          `Hi ${(iF >= 0 && r[iF]) || "there"},\n\nIt's about time for your refill of:\n${items}\n\n` +
          `Just reply to reorder and we'll get it out to you.\n\n— Vet Pep Wellness · Peps and More`);
      }
      s.getRange(i + 1, iSent + 1).setValue("YES");
    }
  }

  if (due.length) {
    const list = due.map((x) => `• ${x.name} (${x.contact}) — ${x.items}`).join("\n");
    MailApp.sendEmail(OWNER_EMAIL, `Refills due: ${due.length} customer(s)`,
      `These customers are due for a refill:\n\n${list}\n\nEmail customers were reminded automatically. Text the rest.`);
  }
}
