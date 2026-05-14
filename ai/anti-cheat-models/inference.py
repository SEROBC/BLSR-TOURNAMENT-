import joblib
import numpy as np

model = joblib.load('fraud_model.pkl')


def score(features):

    prediction = model.predict_proba([features])[0][1]

    return float(prediction)
