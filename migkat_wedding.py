import datetime
import json
import os
from flask import Flask, g, redirect, render_template, request
import pandas as pd
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
        return render_template('main.html', last_updated=last_updated, lang=g.lang)
    elif g.lang == 'es':
        return render_template('es/main_es.html', last_updated=last_updated, lang=g.lang)


@app.route('/es/about')
@app.route('/about')
def about():
    if g.lang == 'en':
        return render_template('about.html', lang=g.lang)
    elif g.lang == 'es':
        return render_template('es/work_in_progress_es.html', lang=g.lang)


@app.route('/es/rehearsal')
@app.route('/rehearsal')
def rehearsal():
    if g.lang == 'en':
        return render_template('rehearsal.html', lang=g.lang)
    elif g.lang == 'es':
        return redirect('/es/under_construction')


@app.route('/ceremony')
@app.route('/es/ceremony')
def ceremony():
    if g.lang == 'en':
        return render_template('ceremony.html', lang=g.lang)
    elif g.lang == 'es':
        return render_template('es/work_in_progress_es.html', lang=g.lang)


@app.route('/reception')
def reception():
    if g.lang == 'en':
        return render_template('reception.html', lang=g.lang)
    elif g.lang == 'es':
        return render_template('es/work_in_progress_es.html', lang=g.lang)


@app.route('/rsvp', methods=['GET', 'POST'])
def rsvp():
    if request.method == 'POST':

        attending, name = getForm()

        if attending:
            return render_template('confirmation.html', name=name, lang=g.lang)
        else:
            return redirect('/under_construction')
    else:
        return render_template('rsvp.html', lang=g.lang)


@app.route('/es/under_construction')
@app.route('/under_construction')
def under_construction():
    if g.lang == 'en':
        return render_template('work_in_progress.html', lang=g.lang)
    elif g.lang == 'es':
        return render_template('es/work_in_progress_es.html', lang=g.lang)


@app.route('/guests')
def table():
    path = os.path.join(app.root_path, 'data', 'guests.json')
    with open(path, 'r') as file:
        data = json.load(file)
    return render_template('guests.html', data=data, lang=g.lang)


@app.route('/table')
def pandas_table():
    path = os.path.join(app.root_path, 'data', 'guests.json')
    df = pd.read_json(path)
    return render_template('pandas_table.html', data=df.to_html())


@app.route('/test')
def test():
    return app.static_folder


if __name__ == '__main__':
    app.run(debug=True) # online
    # app.run(host='192.168.1.59',  debug=True) # Binghamton
    # app.run(host='192.168.0.7',  debug=True)  # Providence
