# Order Tracking + Refill Reminders — Setup (free)

This turns on the customer/order database and automatic refill reminders using
your Google account. ~10 minutes, one time.

## What you get
- Every website order auto-saved to a **Google Sheet** (name, contact, items, total, rep code, date, refill-due date).
- A daily job that **emails customers a refill reminder** ~30 days after their order.
- A daily **"who's due" email to you** (vetpepwellness@gmail.com) so you can text anyone who didn't leave an email.

## Steps
1. Go to **https://sheets.google.com** (signed in as vetpepwellness@gmail.com) and create a blank spreadsheet. Name it e.g. **"Vet Pep Orders."**
2. In that sheet: **Extensions → Apps Script**.
3. Delete any starter code, then paste in the contents of **`backend/Code.gs`** from this repo. Click **Save**.
4. Click **Deploy → New deployment → (gear) Web app**.
   - **Description:** order capture
   - **Execute as:** Me
   - **Who has access:** **Anyone**
   - Click **Deploy**, grant the permissions it asks for, and **copy the Web app URL.**
5. In this repo, open **`script.js`**, find `const ORDER_ENDPOINT = "";` and paste your URL between the quotes. (Or send me the URL and I'll do it.) Once pushed, every order is saved automatically.
6. Turn on the daily reminder:
   - Back in Apps Script, click the **clock icon (Triggers) → Add Trigger.**
   - Function: **dailyReminders** · Event source: **Time-driven** · type: **Day timer** · pick a time (e.g. 8–9am).
   - **Save.**

That's it. Orders flow into the sheet; reminders go out daily.

## Notes / options
- **Refill timing:** change `REFILL_DAYS` at the top of `Code.gs` (default 30).
- **Text (SMS) reminders:** email reminders are free. Automatic texts need a paid
  service (e.g. Twilio) — tell me if you want that and I'll wire it in.
- **Privacy:** customer info lives in your own Google Sheet, under your account.
