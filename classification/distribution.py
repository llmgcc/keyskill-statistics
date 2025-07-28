import pandas as pd
import psycopg2 as pg
import os
from dotenv import load_dotenv

load_dotenv(os.path.dirname(os.path.abspath(__file__ + "/../")) + "/backend/.env.example")

conn = pg.connect(
    f"dbname='{os.getenv('DATABASE')}' "
    f"user='{os.getenv('USER')}' "
    f"host='{os.getenv('HOST')}' "
    f"port='5432' "
    f"password='{os.getenv('PASSWORD')}'"
)

df = pd.read_sql("""
    SELECT d.name, COUNT(ksd.name) as skill_count
    FROM Domain d
    JOIN KeySkillDomain ksd ON d.id = ksd.domain_id
    GROUP BY d.name
    ORDER BY skill_count DESC
""", conn)

df.to_csv('domain_skills_count.txt', sep=':', header=False, index=False)
conn.close()
