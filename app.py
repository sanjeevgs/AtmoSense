import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)
CORS(app)   # enable CORS so browser can access API

DATASET_FILE = "dataset.csv"

def load_dataset():
    df = pd.read_csv(DATASET_FILE)
    print("Dataset Loaded Successfully")
    print(df.head())
    return df

def train_model():
    df = load_dataset()

    X = df[['mq2','mq7','temp','humidity']]
    y = df['air_quality']

    model = RandomForestClassifier(n_estimators=100)
    model.fit(X,y)

    print("Model trained successfully")
    return model

model = train_model()

@app.route("/predict/<mq2>/<mq7>/<temp>/<humidity>")
def predict(mq2,mq7,temp,humidity):

    values = [[float(mq2), float(mq7), float(temp), float(humidity)]]

    result = model.predict(values)[0]

    return jsonify({
        "mq2": mq2,
        "mq7": mq7,
        "temp": temp,
        "humidity": humidity,
        "prediction": result
    })

if __name__ == "__main__":
    app.run(debug=True)
