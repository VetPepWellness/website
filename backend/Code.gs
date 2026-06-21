/**
 * Vet Pep Wellness — order capture + refill reminders
 * Google Apps Script (free, runs on your Google account).
 *
 * What it does:
 *   • Saves every website order to a Google Sheet (customer, contact, items, total, rep code, date)
 *   • Calculates a refill-due date for each order
 *   • Once a day, emails customers a refill reminder (if their contact is an email),
 *     and emails YOU a "who's due" list so you can text the rest.
 *
 * Setup steps are in CRM-SETUP.md.
 */

const REFILL_DAYS      = 30;                      // days from order until refill is "due"
const REMIND_LEAD_DAYS = 3;                       // remind this many days before due
const OWNER_EMAIL      = "vetpepwellness@gmail.com";
const SHEET_NAME       = "Orders";
// Leave blank if you created the script from inside the Sheet (Extensions → Apps Script).
// If you made a STANDALONE script (script.google.com), paste your Sheet's ID here —
// it's the long part of the sheet's link between /d/ and /edit.
const SPREADSHEET_ID   = "1-N34JUbV0oSBVEvEMSc5MEp5kY-3qNuodCNeQVlKhZc";

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
      data.name || "",
      data.contact || "",
      data.address || "",
      data.items || "",
      data.subtotal || "",
      data.shipping || "",
      data.total || "",
      data.code || "",
      data.notes || "",
      due,
      "NO", // reminder sent?
      "NO", // paid? (mark YES when payment lands)
    ]);
    sendInvoice_(data); // email the customer (if email on file) + owner
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
  if (!s) {
    s = ss.insertSheet(SHEET_NAME);
    s.appendRow([
      "Timestamp", "Name", "Contact", "Address", "Items",
      "Subtotal", "Shipping", "Total", "Rep Code", "Notes",
      "Refill Due", "Reminder Sent", "Paid",
    ]);
  }
  return s;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Emails a simple invoice to the customer (if their contact is an email) and a copy to the owner. */
function sendInvoice_(data) {
  const isEmail = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(v));
  const body =
    `Thanks for your order with Vet Pep Wellness — Peps and More!\n\n` +
    `ORDER\n${data.items || ""}\n\n` +
    `Subtotal: ${data.subtotal || ""}\n` +
    `Shipping: ${data.shipping || ""}\n` +
    `Total: ${data.total || ""}\n` +
    (data.code ? `Referral / Salesperson code: ${data.code}\n` : "") +
    `\nShip to:\n${data.name || ""}\n${data.address || ""}\n\n` +
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

  // Copy to owner (always)
  MailApp.sendEmail(OWNER_EMAIL, `New order — ${data.name || "customer"} (${data.total || ""})`, body);
  // Invoice to customer (only if they gave an email)
  if (isEmail(data.contact)) {
    MailApp.sendEmail(String(data.contact), "Your Vet Pep Wellness order & invoice", body);
  }
}

/**
 * Run this once a day with a time-driven trigger (see CRM-SETUP.md).
 * Emails customers whose refill is near and sends you a daily summary.
 */
function dailyReminders() {
  const s = getSheet_();
  const rows = s.getDataRange().getValues();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const cutoff = new Date(today.getTime() + REMIND_LEAD_DAYS * 86400000);
  const isEmail = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(v));
  const due = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const name = r[1], contact = String(r[2] || ""), items = r[4];
    const refillDue = r[10] ? new Date(r[10]) : null;
    const sent = String(r[11] || "").toUpperCase() === "YES";
    if (!refillDue || sent) continue;
    if (refillDue <= cutoff) {
      due.push({ name: name, contact: contact, items: items });
      if (isEmail(contact)) {
        MailApp.sendEmail(
          contact,
          "Time to restock — Vet Pep Wellness",
          `Hi ${name || "there"},\n\n` +
          `It's about time for your refill of:\n${items}\n\n` +
          `Just reply to this email to reorder and we'll get it out to you.\n\n` +
          `— Vet Pep Wellness · Peps and More`
        );
      }
      s.getRange(i + 1, 12).setValue("YES");
    }
  }

  if (due.length) {
    const list = due.map((d) => `• ${d.name} (${d.contact}) — ${d.items}`).join("\n");
    MailApp.sendEmail(
      OWNER_EMAIL,
      `Refills due: ${due.length} customer(s)`,
      `These customers are due for a refill:\n\n${list}\n\n` +
      `Customers with an email on file were reminded automatically. ` +
      `Text the rest from this list.`
    );
  }
}
