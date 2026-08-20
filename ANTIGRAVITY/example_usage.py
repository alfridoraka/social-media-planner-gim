import sys
from datetime import datetime
from sheets_service import GoogleSheetsService


def main():
    # Google Sheet URL provided
    SPREADSHEET_NAME_OR_URL = "https://docs.google.com/spreadsheets/d/1z-6GqeczVfQZLmsmBtCvuv1fMH9FRiGCa9FKX1Klwu4/edit?usp=sharing"
    CREDENTIALS_FILE = "credentials.json"

    print("=" * 60)
    print(" Google Sheets Python Integration")
    print("=" * 60)

    try:
        # 2. Initialize Service
        print(f"[*] Authenticating using '{CREDENTIALS_FILE}'...")
        sheets_service = GoogleSheetsService(credentials_path=CREDENTIALS_FILE)
        print("[+] Authentication successful!")

        # 3. Open Spreadsheet
        # Note: If passing a URL, use: sheets_service.open_spreadsheet_by_url(SPREADSHEET_NAME_OR_URL)
        # If passing an ID, use: sheets_service.open_spreadsheet_by_key(SPREADSHEET_ID)
        print(f"[*] Opening spreadsheet: '{SPREADSHEET_NAME_OR_URL}'...")
        if SPREADSHEET_NAME_OR_URL.startswith("http"):
            spreadsheet = sheets_service.open_spreadsheet_by_url(SPREADSHEET_NAME_OR_URL)
        else:
            spreadsheet = sheets_service.open_spreadsheet_by_title(SPREADSHEET_NAME_OR_URL)
        print(f"[+] Connected to: {spreadsheet.title}")

        # 4. Select worksheet / tab (default is the first sheet)
        worksheet = sheets_service.get_worksheet(spreadsheet, index=0)
        print(f"[+] Active Worksheet: '{worksheet.title}'")

        # 5. Read all existing data
        print("\n--- Current Data (Records) ---")
        records = sheets_service.read_all_records(worksheet)
        if records:
            for idx, row in enumerate(records, 1):
                print(f"Row {idx}: {row}")
        else:
            print("(Sheet currently has no records or only headers)")

        # 6. Read as Pandas DataFrame
        print("\n--- DataFrame View ---")
        df = sheets_service.read_as_dataframe(worksheet)
        print(df.head())

        # 7. Append a new row
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        new_row = ["User_001", "Sample Item", 99.99, timestamp]
        print(f"\n[*] Appending sample row: {new_row}")
        sheets_service.append_row(worksheet, new_row)
        print("[+] Row appended successfully!")

        # 8. Update a single cell (e.g. Row 1, Column 1)
        # Note: Be cautious about overwriting existing headers
        # sheets_service.update_cell(worksheet, row=2, col=2, value="Updated Value")

    except FileNotFoundError as fnf_err:
        print(f"\n[!] Configuration Error: {fnf_err}")
        print("[*] Please follow the setup instructions in README.md to generate credentials.json.")
        sys.exit(1)
    except Exception as e:
        print(f"\n[!] Error during execution: {e}")
        print("\nCommon Troubleshooting Tips:")
        print("1. Did you share the Google Sheet with your service account email address?")
        print("2. Is Google Sheets API & Google Drive API enabled in Google Cloud Console?")
        print("3. Is the spreadsheet name or URL correct?")
        sys.exit(1)


if __name__ == "__main__":
    main()
