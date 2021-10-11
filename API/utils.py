import json
import pymongo
from datetime import datetime

# Online Mongodb setup
SECRET = json.load(open('secret.json', 'r'))
client = pymongo.MongoClient(SECRET['mongodb'])
collection = SECRET['collection']
cluster = SECRET['cluster']

db = client[collection][cluster]

def getVideo(username):
    """
    If user is coming for the fist time, get registerd and get empty list, 
    If old user then fetch the video and filter all that are older then 1 day and return the list and save the same data in database
    """
    document = db.find_one({'uname': username})

    if document== None:
        #  videos : [{}, {}]
        #  {} => {'sent':'email1', 'video':'url', 'date':date}
        db.insert_one({'uname':username, 'videos':[]})
        return []

    else:
        video_list = []
        if len(document['videos']) > 0:
            for obj in document['videos']:
                if (datetime.now() - obj['date']).days == 0:
                     video_list.append(obj)

            db.find_one_and_update({'uname':username}, {"$set": {"videos": video_list}})
        return video_list


def userStatus(share_email):
    """
    Check if the user exists in the database
    """
    document = db.find_one({'uname': share_email})

    if document == None:
        return False
    return True

def addVideo(username, share_email, url):
    document = db.find_one({'uname': share_email})
    video_list = document['videos']

    obj = {'sent':username, 'video':url, 'date':datetime.now()}
    video_list.append(obj)
    
    db.find_one_and_update({'uname': share_email}, {"$set": {"videos": video_list}})

def sendEmail(share_email, url):
    """
    Will send the email along with our extension discription for upcoming users.
    """
    pass