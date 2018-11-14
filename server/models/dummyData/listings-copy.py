import psycopg2
import time

start_time = time.time()
conn = psycopg2.connect(database="neighborhood", user="kai",
                        password="kainan", host="127.0.0.1", port="5432")

print("Opened database successfully")

cur = conn.cursor()

with open('listings.csv', 'r') as f:
    cur.copy_from(f, 'listings', sep=',', columns=("hostfirstname", "listinglat",
                                                   "listinglong", "neighbid", "neighbdesc", "gettingarounddesc"))

conn.commit()
print("Postgres copied in", time.time() - start_time, "seconds")
