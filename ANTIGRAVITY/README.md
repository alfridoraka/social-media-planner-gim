# Google Sheets Python Integration

This project provides a ready-to-use Python setup to connect to, read, and write data in Google Sheets using `gspread` and `google-auth`.

---

## 🛠️ Step 1: Install Dependencies

Make sure Python is installed on your system. Then install the required packages:

```bash
pip install -r requirements.txt
```

---

## 🔑 Step 2: Set Up Google Cloud Credentials (Service Account)

To allow Python to access your Google Sheets securely:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Enable APIs:
   - Search for **Google Sheets API** and click **Enable**.
   - Search for **Google Drive API** and click **Enable**.
4. Create a Service Account:
   - Navigate to **APIs & Services > Credentials**.
   - Click **Create Credentials** -> **Service Account**.
   - Fill in a name (e.g. `sheets-bot`) and click **Done**.
5. Generate JSON Key:
   - Click on the created Service Account.
   - Go to the **Keys** tab -> **Add Key** -> **Create new key**.
   - Choose **JSON** and click **Create**.
   - Save the downloaded file as `credentials.json` in this project folder (`c:\Users\Alfrido Raka\Downloads\ANTIGRAVITY\credentials.json`).

---

## 📄 Step 3: Share Your Google Sheet

1. Open your Google Sheet in your web browser.
2. Click the green **Share** button in the top-right corner.
3. Copy the **`client_email`** address from your `credentials.json` (e.g., `sheets-bot@your-project-id.iam.gserviceaccount.com`).
4. Paste it into the share box and give it **Editor** permissions.
5. Click **Send** / **Share**.

---

## 🚀 Step 4: Run the Script

1. In `example_usage.py`, update `SPREADSHEET_NAME_OR_URL` with your sheet title or paste the full Google Sheets URL.
2. Run the script:

```bash
python example_usage.py
```

---

## 📂 Project Structure

- `sheets_service.py` : Reusable helper wrapper for reading, appending, updating, and exporting to Pandas DataFrame.
- `example_usage.py` : Demonstration script showing how to use the service.
- `requirements.txt` : Python dependencies (`gspread`, `google-auth`, `pandas`).
- `credentials.json.example` : Example structure of the Google Service Account key.
