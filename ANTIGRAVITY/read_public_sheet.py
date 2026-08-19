import io
import urllib.request
import pandas as pd

# The Google Sheet URL provided
SHEET_ID = "1z-6GqeczVfQZLmsmBtCvuv1fMH9FRiGCa9FKX1Klwu4"
CSV_EXPORT_URL = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv"

def fetch_sheet_csv(url: str = CSV_EXPORT_URL) -> str:
    """Fetch raw CSV content from a publicly accessible Google Sheet."""
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0"}
    )
    with urllib.request.urlopen(req) as response:
        return response.read().decode("utf-8")

def main():
    print(f"[*] Fetching data from Google Sheet ID: {SHEET_ID}...")
    csv_data = fetch_sheet_csv()
    
    # Load into Pandas DataFrame
    df = pd.read_csv(io.StringIO(csv_data), header=None)
    
    print(f"[+] Successfully connected! Loaded {len(df)} rows and {len(df.columns)} columns.")
    print("\n--- First 25 Rows Preview ---")
    print(df.head(25).to_string())

if __name__ == "__main__":
    main()
