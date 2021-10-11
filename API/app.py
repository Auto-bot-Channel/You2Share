from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from datetime import datetime
from utils import getVideo, addVideo, sendEmail, userStatus
import pymongo
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api', methods=['GET', 'POST'])
@cross_origin()
def api():
    if request.method == 'GET':
        return "GET API working"

    elif request.method == 'POST':
        x = request.data
        content = json.loads(x.decode('utf-8'))

        if content == None:
            return jsonify({"notif" : "Not successful"})

        print('post requst with data: ', content)

        if 'username' in content:
            # register the email id in user if already registerd send video list
            document = getVideo(content['username'])
            l = []
            for obj in document:
                l.append(obj['video'])

            return jsonify({"videos" :l})

        elif 'video_url' in content:
            #  If user is registered add the url in list 
            print('status',userStatus(content['share_email']))
            if userStatus(content['share_email']):
                print('adding video')   
                addVideo(username="", share_email=content['share_email'], url=content['video_url'])
            # if not registerd user send email
            else:
                sendEmail(content['share_email'], content['video_url'])
    
        return jsonify({"notif" : "success"})

if __name__ == '__main__':
	app.run(debug=True,port=5001)