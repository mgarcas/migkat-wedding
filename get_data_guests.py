import os
import datetime
import json



# columns = ['Name', 'Email','Family/Group','Attending','Meal','U21','Allergies','Allergies Comment','Message','Timestamp']
columns = ['Name','Family/Group','Attending','U21','Entrée','Allergies','Allergies Comment','Welcome dinner','Bus','Hotel','Other hotel','Message','Timestamp']

def getData(rsvp):

    data_json=[]
    guests = int(rsvp['guests'])
    timestamp = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')

    for i in range(guests):
        row=[]
        row.append(rsvp['guest-name-{}'.format(i)])
        # row.append(rsvp['email'])
        row.append(rsvp['surname'])
        row.append(rsvp['attending'])
        row.append(rsvp['guest-meal-{}'.format(i)])
        row.append("yes" if ('guest-u21-{}'.format(i) in list(rsvp.keys())) else "no")
        row.append("yes" if ('guest-allergies-{}'.format(i) in list(rsvp.keys())) else "no")
        row.append(rsvp['guest-comment-{}'.format(i)] if ('guest-comment-{}'.format(i) in list(rsvp.keys())) else '')
        row.append(rsvp['welcome-{}'.format(i)])
        row.append(rsvp['bus-{}'.format(i)])
        row.append(rsvp['hotel-{}'.format(i)])
        # row.append(rsvp.get('other-hotel-{}'.format(i), ''))
        row.append(rsvp['other-hotel-{}'.format(i)] if ('other-hotel-{}'.format(i) in list(rsvp.keys())) else '')
        row.append(rsvp['message'])
        row.append(timestamp)

        data_json.append(dict(zip(columns, row)))
    
    return data_json


def dumpToJson(data, path):
    new_data_json = getData(data)
    
    try:
        with open(path, 'r') as file:
            file_json = json.load(file)
    except FileNotFoundError:
        file_json = []

    for item in new_data_json:
        file_json.append(item)
    
    with open(path, 'w') as outfile:
        json.dump(file_json, outfile, indent=2)




if __name__ == '__main__':
    print('calling',__name__)