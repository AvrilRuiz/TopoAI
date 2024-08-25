from typing import Literal
import sqlite3
import pandas as pd


class SQLClient:
    def __init__(self, path: str):
        self.path = path
        self.conn = sqlite3.connect(self.path)
        self.cursor = self.conn.cursor()

    def execute(self, query) -> None:
        self.cursor.execute(query)
        self.conn.commit()

    def read(self, query) -> pd.DataFrame:
        return pd.read_sql_query(query, self.conn)

    def write(
        self,
        df: pd.DataFrame,
        table_name: str,
        mode: Literal["fail", "replace", "append"] = "fail",
    ) -> None:
        df.to_sql(
            table_name,
            self.conn,
            if_exists=mode,
            index=False,
        )

    def close(self):
        self.conn.close()
