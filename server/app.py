from typing import List
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import shortuuid

app = Flask(__name__)
CORS(app)

DATA_FILE = 'data.json'

# # class Action:
# #    def __init__()
# class Item:
#     def __init__(self, action, triggers: List[str]):
#       self.action = action
#       self.triggers = triggers

# class ActionToTriggers:
#    def __init__(self, actionId, triggers: List[str]):
#       self.actionId = actionId
#       self.triggers = triggers

class Database:
   def __init__(self, actions: List[any]):
      self.actions = actions
      # self.triggers = triggers
      # self.actionsToTrigger = actionsToTrigger

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

# @app.route('/save_trigger', methods=['POST'])
# def save_trigger():
#    data: Database = request.get_json()
#    if not data:
#       return jsonify({'error': 'No data provided'}), 400
   
#    all_data = load_data()
#    all_data['triggers'].append(data)

#    save_data(all_data)
#    return jsonify(data), 200

# @app.route('/save_action', methods=['POST'])
# def save_action():
#    # return {}, 200
#    data: Item = request.get_json()
#    print()
#    print()
#    print('save action received:', data)
#    if not data:
#       return jsonify({'error': 'No data provided'}), 400
#    data['action']['id'] = shortuuid.uuid()
   
#    all_data: Database = load_data()
#    print('all data here:', all_data)
#    all_data['actions'].append(data['action'])

#    all_data['actionsToTriggers'].append({
#       'actionId': data['action']['id'],
#       'triggers': data['triggers']
#    })

#    # breakpoint()
#    save_data(all_data)
#    return jsonify(all_data), 200

if __name__ == '__main__':
    app.run(debug=True)