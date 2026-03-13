import joblib
import numpy as np

model = joblib.load("aqi_model.pkl")

mq2 = 230
mq7 = 100
temp = 31
humidity = 55

input_data = np.array([[mq2,mq7,temp,humidity]])

prediction = model.predict(input_data)

print("Air Quality:",prediction[0])
