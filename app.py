from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = 'data.json'

def load_data():
   if os.path.exists(DATA_FILE):
       with open(DATA_FILE) as f:
           return json.load(f)
   return {}

def save_data(data):
   with open(DATA_FILE, 'w') as f:
       json.dump(data, f)

# Routes
@app.route('/load', methods=['GET'])
def load():
   return jsonify(load_data())

@app.route('/save', methods=['POST'])
def save():
   data = request.get_json()
   if not data:
         return jsonify({'error': 'No data provided'}), 400

   save_data(data)
   return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True)