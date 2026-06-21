/**
 * Vet Pep Wellness — order capture + invoice + refill reminders
 * Google Apps Script (free, runs on your Google account).
 *
 * What it does:
 *   • Saves every website order to a Google Sheet (name, email, phone, address, items, totals, rep code, date)
 *   • Emails the customer a simple invoice + payment instructions (and you a copy)
 *   • Calculates a refill-due date; a daily job emails refill reminders and a "who's due" list
 *
 * Setup steps are in CRM-SETUP.md.
 */

const REFILL_DAYS      = 30;                      // days from order until refill is "due"
const REMIND_LEAD_DAYS = 3;                       // remind this many days before due
const OWNER_EMAIL      = "vetpepwellness@gmail.com";
const SHEET_NAME       = "Orders";
// Leave blank if the script is bound to the Sheet (Extensions → Apps Script).
// For a STANDALONE script (script.google.com), paste your Sheet's ID (the long
// part of the sheet link between /d/ and /edit).
const SPREADSHEET_ID   = "1-N34JUbV0oSBVEvEMSc5MEp5kY-3qNuodCNeQVlKhZc";

const HEADERS = [
  "Timestamp", "First Name", "Last Name", "Email", "Phone", "Address",
  "Items", "Subtotal", "Shipping", "Total", "Rep Code",
  "Refill Due", "Reminder Sent", "Paid",
];

function getSS_() {
  return SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID)
                        : SpreadsheetApp.getActiveSpreadsheet();
}

/** Receives orders POSTed from the website. */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    const now = new Date();
    const due = new Date(now.getTime() + REFILL_DAYS * 86400000);
    sheet.appendRow([
      now,
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      data.phone || "",
      data.address || "",
      data.items || "",
      data.subtotal || "",
      data.shipping || "",
      data.total || "",
      data.code || "",
      due,
      "NO", // reminder sent?
      "NO", // paid? (mark YES when payment lands)
    ]);
    sendInvoice_(data);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Health check when you open the web app URL in a browser. */
function doGet() {
  return json_({ ok: true, service: "Vet Pep Wellness order capture" });
}

function getSheet_() {
  const ss = getSS_();
  let s = ss.getSheetByName(SHEET_NAME);
  if (!s) { s = ss.insertSheet(SHEET_NAME); s.appendRow(HEADERS); }
  return s;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}

const isEmail_ = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(v));

/** Emails a simple invoice to the customer + a copy to the owner. */
function sendInvoice_(data) {
  const name = `${data.firstName || ""} ${data.lastName || ""}`.trim();
  const body =
    `Thanks for your order with Vet Pep Wellness — Peps and More!\n\n` +
    `ORDER\n${data.items || ""}\n\n` +
    `Subtotal: ${data.subtotal || ""}\n` +
    `Shipping: ${data.shipping || ""}\n` +
    `Total: ${data.total || ""}\n` +
    (data.code ? `Referral / Salesperson code: ${data.code}\n` : "") +
    `\nShip to:\n${name}\n${data.address || ""}\n\n` +
    `HOW TO PAY\n` +
    `• Cash App: https://cash.app/$vetpepwellness\n` +
    `• Venmo: https://www.venmo.com/u/vetpepwellness\n` +
    `• Bitcoin (Cash App): https://cash.app/launch/bitcoin/$vetpepwellness/KtneJ3fp2a\n` +
    `• Cash — local pickup or delivery around Lubbock & West Texas\n` +
    `Please add your name in the payment note so we can match it to your order. ` +
    `We'll confirm once payment is received.\n\n` +
    `————————————\n` +
    `Research use only. Products are not dietary supplements, drugs, or medications and are ` +
    `not for human or veterinary consumption. Nothing here is medical advice. Must be 21+.\n` +
    `— Vet Pep Wellness`;

  MailApp.sendEmail(OWNER_EMAIL, `New order — ${name || "customer"} (${data.total || ""})`, body);
  if (isEmail_(data.email)) {
    MailApp.sendEmail(String(data.email), "Your Vet Pep Wellness order & invoice", body);
  }
}

/**
 * Run once a day via a time-driven trigger (see CRM-SETUP.md).
 * Emails customers whose refill is near and sends you a daily "who's due" list.
 */
function dailyReminders() {
  const s = getSheet_();
  const rows = s.getDataRange().getValues();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const cutoff = new Date(today.getTime() + REMIND_LEAD_DAYS * 86400000);
  const due = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const name = `${r[1] || ""} ${r[2] || ""}`.trim();
    const email = String(r[3] || ""), phone = String(r[4] || ""), items = r[6];
    const refillDue = r[11] ? new Date(r[11]) : null;
    const sent = String(r[12] || "").toUpperCase() === "YES";
    if (!refillDue || sent) continue;
    if (refillDue <= cutoff) {
      due.push({ name: name, email: email, phone: phone, items: items });
      if (isEmail_(email)) {
        MailApp.sendEmail(
          email,
          "Time to restock — Vet Pep Wellness",
          `Hi ${r[1] || "there"},\n\n` +
          `It's about time for your refill of:\n${items}\n\n` +
          `Just reply to this email to reorder and we'll get it out to you.\n\n` +
          `— Vet Pep Wellness · Peps and More`
        );
      }
      s.getRange(i + 1, 13).setValue("YES"); // Reminder Sent
    }
  }

  if (due.length) {
    const list = due.map((d) => `• ${d.name} (${d.email || d.phone}) — ${d.items}`).join("\n");
    MailApp.sendEmail(
      OWNER_EMAIL,
      `Refills due: ${due.length} customer(s)`,
      `These customers are due for a refill:\n\n${list}\n\n` +
      `Customers with an email were reminded automatically. Text the rest from this list.`
    );
  }
}
