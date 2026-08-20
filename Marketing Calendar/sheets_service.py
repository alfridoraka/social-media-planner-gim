import os
from typing import Any, Dict, List, Optional
import gspread
from google.oauth2.service_account import Credentials
import pandas as pd


class GoogleSheetsService:
    """A helper class to connect to and interact with Google Sheets."""

    # Default OAuth Scopes for Google Drive and Google Sheets APIs
    SCOPES = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive"
    ]

    def __init__(self, credentials_path: str = "credentials.json"):
        """
        Initialize the Google Sheets service client.

        :param credentials_path: Path to the Service Account JSON credentials file.
        """
        if not os.path.exists(credentials_path):
            raise FileNotFoundError(
                f"Credentials file '{credentials_path}' not found! "
                "Please place your Google Service Account JSON key in the project directory."
            )

        self.creds = Credentials.from_service_account_file(
            credentials_path,
            scopes=self.SCOPES
        )
        self.client = gspread.authorize(self.creds)

    def open_spreadsheet_by_title(self, title: str) -> gspread.Spreadsheet:
        """Open a Google Spreadsheet by its exact document title."""
        return self.client.open(title)

    def open_spreadsheet_by_key(self, spreadsheet_id: str) -> gspread.Spreadsheet:
        """Open a Google Spreadsheet by its spreadsheet ID / key (from URL)."""
        return self.client.open_by_key(spreadsheet_id)

    def open_spreadsheet_by_url(self, url: str) -> gspread.Spreadsheet:
        """Open a Google Spreadsheet by its full URL."""
        return self.client.open_by_url(url)

    def get_worksheet(
        self,
        spreadsheet: gspread.Spreadsheet,
        worksheet_name: Optional[str] = None,
        index: int = 0
    ) -> gspread.Worksheet:
        """
        Get a specific worksheet / tab by name or index.
        Defaults to the first tab (index 0).
        """
        if worksheet_name:
            return spreadsheet.worksheet(worksheet_name)
        return spreadsheet.get_worksheet(index)

    def read_all_records(self, worksheet: gspread.Worksheet) -> List[Dict[str, Any]]:
        """
        Fetch all rows as a list of dictionaries, where dictionary keys are the column headers (Row 1).
        """
        return worksheet.get_all_records()

    def read_all_values(self, worksheet: gspread.Worksheet) -> List[List[Any]]:
        """
        Fetch all cells as a 2D matrix (list of lists).
        """
        return worksheet.get_all_values()

    def read_as_dataframe(self, worksheet: gspread.Worksheet) -> pd.DataFrame:
        """
        Load worksheet records into a pandas DataFrame.
        """
        records = worksheet.get_all_records()
        return pd.DataFrame(records)

    def append_row(self, worksheet: gspread.Worksheet, row_values: List[Any]) -> Dict[str, Any]:
        """
        Append a single row to the end of the sheet.
        """
        return worksheet.append_row(row_values)

    def append_rows(self, worksheet: gspread.Worksheet, rows_values: List[List[Any]]) -> Dict[str, Any]:
        """
        Append multiple rows to the end of the sheet.
        """
        return worksheet.append_rows(rows_values)

    def update_cell(self, worksheet: gspread.Worksheet, row: int, col: int, value: Any) -> Dict[str, Any]:
        """
        Update a single cell by row and column index (1-indexed).
        """
        return worksheet.update_cell(row, col, value)

    def update_range(self, worksheet: gspread.Worksheet, cell_range: str, values: List[List[Any]]) -> Dict[str, Any]:
        """
        Update a specific range of cells (e.g. 'A1:C2').
        """
        return worksheet.update(cell_range, values)

    def clear_sheet(self, worksheet: gspread.Worksheet) -> Dict[str, Any]:
        """
        Clear all content from the worksheet.
        """
        return worksheet.clear()
