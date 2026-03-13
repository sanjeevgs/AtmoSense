import pandas as pd
import random

rows = []

for i in range(5000):

    # Simulate temperature and humidity
    temp = random.randint(24, 42)
    humidity = random.randint(30, 75)

    # Random pollution pattern type
    pollution_type = random.choice(["low","medium","high"])

    if pollution_type == "low":
        mq2 = random.randint(100,190)
        mq7 = random.randint(20,65)
        air_quality = "Safe"

    elif pollution_type == "medium":
        mq2 = random.randint(200,290)
        mq7 = random.randint(70,140)
        air_quality = "Moderate"

    else:
        mq2 = random.randint(300,450)
        mq7 = random.randint(150,260)
        air_quality = "Harmful"

    rows.append([mq2,mq7,temp,humidity,air_quality])

df = pd.DataFrame(rows, columns=[
    "mq2",
    "mq7",
    "temp",
    "humidity",
    "air_quality"
])

df.to_csv("dataset.csv",index=False)

print("Dataset generated successfully")
print("Total rows:",len(df))
