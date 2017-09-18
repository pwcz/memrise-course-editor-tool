#!flask/bin/python
import json
from flask import Flask, Response
from flask_cors import CORS
import memrise_translate as mt


app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False

@app.route('/memrise_tool/api/v1.0/translate/<string:word>', methods=['GET'])
def get_task(word):
    json_response = json.dumps(({'description': mt.Description.get(word),
                    'example': mt.Examples.get(word),
                    'audio': mt.Audio.get(word),
                    'translate': mt.Translate.get(word)}),ensure_ascii=False)
    return  Response(json_response,content_type="application/json; charset=utf-8" )


if __name__ == '__main__':
    app.run(debug=True)