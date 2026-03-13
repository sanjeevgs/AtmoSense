import os
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)

# Allow your GitHub Pages frontend
CORS(app, origins=["https://sanjeevgs.github.io"])

DATASET_FILE = "dataset.csv"

# -------------------------
# Load Dataset
# -------------------------
def load_dataset():
    try:
        df = pd.read_csv(DATASET_FILE)
        print("Dataset loaded successfully")
        return df
    except Exception as e:
        print("Error loading dataset:", e)
        return None


# -------------------------
# Train Random Forest Model
# -------------------------
def train_model():
    df = load_dataset()

    if df is None:
        print("Dataset not found")
        return None

    X = df[['mq2', 'mq7', 'temp', 'humidity']]
    y = df['air_quality']

    model = RandomForestClassifier(n_estimators=100)
    model.fit(X, y)

    print("Model trained successfully")

    return model


# Train model when server starts
model = train_model()


# -------------------------
# Home Route
# -------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "AtmoSense ML API running",
        "status": "active"
    })


# -------------------------
# Prediction Route
# -------------------------
@app.route("/predict/<mq2>/<mq7>/<temp>/<humidity>")
def predict(mq2, mq7, temp, humidity):

    try:
        values = [[float(mq2), float(mq7), float(temp), float(humidity)]]

        result = model.predict(values)[0]

        return jsonify({
            "mq2": float(mq2),
            "mq7": float(mq7),
            "temp": float(temp),
            "humidity": float(humidity),
            "prediction": result
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        })


# -------------------------
# Start Server (Render compatible)
# -------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)