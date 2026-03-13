import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Predefined dataset
data = {
    "mq2":[120,140,150,180,200,210,220,250,260,280,300,320,350,380,400,420],
    "mq7":[30,35,40,60,70,80,90,110,120,140,150,160,180,200,220,250],
    "temp":[27,28,29,30,31,30,32,33,34,35,36,37,38,39,40,41],
    "humidity":[65,63,60,58,55,54,52,50,49,47,46,45,43,42,40,38],
    "air_quality":[
        "Safe","Safe","Safe","Safe",
        "Moderate","Moderate","Moderate",
        "Moderate","Moderate","Moderate",
        "Harmful","Harmful","Harmful",
        "Harmful","Harmful","Harmful"
    ]
}

df = pd.DataFrame(data)

X = df[["mq2","mq7","temp","humidity"]]
y = df["air_quality"]

model = RandomForestClassifier(n_estimators=100)
model.fit(X,y)

joblib.dump(model,"aqi_model.pkl")

print("Model trained and saved as aqi_model.pkl")
