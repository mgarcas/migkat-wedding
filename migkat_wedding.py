import datetime
import json
import os
from flask import Flask, g, redirect, render_template, request
import get_data_guests

app = Flask(__name__)


# Default language is English
DEFAULT_LANGUAGE = 'en'
last_updated = datetime.datetime.utcnow()

# Functions


def getForm():
    if request.method == 'POST':

        name = request.form['name']

        if request.form['attending'] == 'no':
            return False, name

        path_json = os.path.join(app.root_path, 'data', 'guests.json')
        get_data_guests.dumpToJson(request.form, path_json)

        

        # TODO: Add code to store the guest's RSVP information in a database or send an email notification

        # Display a confirmation message to the guest
        return True, name
    else:
        return False, "False"


# Routes

@app.before_request
def set_language():
    lang = request.cookies.get('lang') or DEFAULT_LANGUAGE
    g.lang = lang
    g.path = '' if g.lang == 'en' else 'es'
    print('settin language!!!', lang, 'PATH', request.path,
          'ENDPOINT', request.endpoint, 'URL', request.script_root)
    if request.path.startswith('/es'):
        g.lang = 'es'
    else:
        g.lang = 'en'


@app.route('/es')
@app.route('/')
def main():
    print("##############", g.lang, request.cookies.get('lang'))
    if g.lang == 'en':
        return render_template('main.html', last_updated=last_updated)
    elif g.lang == 'es':
        return render_template('es/main_es.html', last_updated=last_updated)


@app.route('/es/about')
@app.route('/about')
def about():
    if g.lang == 'en':
        return render_template('about.html')
    elif g.lang == 'es':
        return render_template('es/work_in_progress_es.html')


@app.route('/es/rehearsal')
@app.route('/rehearsal')
def rehearsal():
    if g.lang == 'en':
        return render_template('rehearsal.html')
    elif g.lang == 'es':
        return render_template('es/work_in_progress_es.html')


@app.route('/ceremony')
@app.route('/es/ceremony')
def ceremony():
    if g.lang == 'en':
        return render_template('ceremony.html')
    elif g.lang == 'es':
        return render_template('es/work_in_progress_es.html')


@app.route('/reception')
def reception():
    return render_template('reception.html')


@app.route('/rsvp', methods=['GET', 'POST'])
def rsvp():
    if request.method == 'POST':

        attending,name = getForm()
    
        if attending:
            return render_template('confirmation.html', name=name, lang=g.lang)
        else:
            return redirect('/under_construction')
    else:
        return render_template('rsvp.html')


@app.route('/under_construction')
def under_construction():
    return render_template('work_in_progress.html')


@app.route('/guests')
def table():
    path = os.path.join(app.root_path, 'data', 'guests.json')
    with open(path, 'r') as file:
        data = json.load(file)
    return render_template('guests.html', data=data)

@app.route('/test')
def test():
    # return os.path.join(app.app_context)
    return app.static_folder


if __name__ == '__main__':
    # app.run(debug=True) # online
    # app.run(host='192.168.1.59',  debug=True) # Binghamton
    app.run(host='192.168.0.7',  debug=True)  # Providence
