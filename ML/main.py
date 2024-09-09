import pickle 
import numpy  as np
from flask import Flask, request, jsonify
import json

app = Flask(__name__)
model = pickle.load(open('./models/model_v1.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = json.loads(request.data)
    int_features = [int(x) for x in data.values()]
    final_features = [np.array(int_features)]

    print(final_features)

    prediction = model.predict(final_features)

    output = round(prediction[0], 2)

    return jsonify({'appraisal': output})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)