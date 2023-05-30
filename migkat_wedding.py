from models.user import User
import datetime
import json
import os
from flask import Flask, g, jsonify, redirect, render_template, request, session
from flask_login import LoginManager, current_user, login_required, login_user, logout_user
import pandas as pd
import get_data_guests
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')
# app.config['LOGIN_DISABLED'] = True


# Login
bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = "strong"
login_manager.login_view = 'login'  # type: ignore


path_users = os.path.join(app.root_path, 'models', 'users.json')


@login_manager.user_loader
def load_user(username):
    with open(path_users, 'r') as f:
        users = json.load(f)
    for u in users:
        if u['username'] == username:
            usr = User(u['num'], username, u['password'])
            return usr
    return None


# @login_manager.unauthorized_handler
# def unauthorized():
#     # Redirect the user to the login page when unauthorized
#     print('######## unautorized ########')
#     return redirect('/login')


@app.route('/register', methods=['GET', 'POST'])
@login_required
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        with open(path_users, 'r') as file:
            users = json.load(file)

        # Store the user in the JSON file
        users.append({'num': users[-1]['num']+1, 'username': username, 'password': hashed_password})
        with open(path_users, 'w') as file:
            json.dump(users, file, indent=2)
        return jsonify({'message': 'User registered successfully'})
    else:
        return render_template('login/register.html', lang=g.lang)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = load_user(username)

        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            return redirect('/admin')
        else:
            return render_template('login/login.html', error='Invalid username or password')
    return render_template('login/login.html', lang=g.lang)


@app.route('/admin')
@login_required
def admin():
    return render_template('login/admin.html', lang=g.lang)


@app.route('/guests')
@login_required
def table():
    path = os.path.join(app.root_path, 'data', 'guests.json')
    with open(path, 'r') as file:
        data = json.load(file)
    return render_template('login/guests.html', data=data, lang=g.lang)


@app.route('/table')
@login_required
def pandas_table():
    path = os.path.join(app.root_path, 'data', 'guests.json')
    df = pd.read_json(path)
    return render_template('login/pandas_table.html', data=df.to_html())

# Logout user


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/')


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

        return True, name
    else:
        return False, "False"


# Routes

@app.before_request
def set_language():
    lang = request.cookies.get('lang') or DEFAULT_LANGUAGE
    g.lang = lang
    g.path = '' if g.lang == 'en' else 'es'
    # print('settin language!!!', lang, 'PATH', request.path, 'ENDPOINT', request.endpoint, 'URL', request.script_root)
    if request.path.startswith('/es'):
        g.lang = 'es'
    else:
        g.lang = 'en'


@app.route('/es')
@app.route('/')
def main():
    # print("##############", g.lang, request.cookies.get('lang'))
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
        return render_template('es/about_es.html', lang=g.lang)


@app.route('/es/rehearsal')
@app.route('/rehearsal')
def rehearsal():
    if g.lang == 'en':
        return render_template('rehearsal.html', lang=g.lang)
    elif g.lang == 'es':
        return render_template('es/rehearsal_es.html', lang=g.lang)


@app.route('/es/ceremony')
@app.route('/ceremony')
def ceremony():
    if g.lang == 'en':
        return render_template('ceremony.html', lang=g.lang)
    elif g.lang == 'es':
        return render_template('es/ceremony_es.html', lang=g.lang)


@app.route('/es/reception')
@app.route('/reception')
def reception():
    if g.lang == 'en':
        return render_template('reception.html', lang=g.lang)
    elif g.lang == 'es':
        return render_template('es/reception_es.html', lang=g.lang)


@app.route('/es/accomodation')
@app.route('/accomodation')
def accomodation():
    if g.lang == 'en':
        return render_template('accomodation.html', lang=g.lang)
    elif g.lang == 'es':
        return render_template('es/accomodation_es.html', lang=g.lang)


@app.route('/es/rsvp', methods=['GET', 'POST'])
@app.route('/rsvp', methods=['GET', 'POST'])
def rsvp():
    if g.lang == 'en':
        if request.method == 'POST':

            attending, name = getForm()

            if attending:
                return render_template('confirmation.html', name=name, lang=g.lang)
            else:
                return redirect('/under_construction')
        else:
            # return render_template('rsvp.html', lang=g.lang)
            return redirect('/under_construction')
    elif g.lang == 'es':
        return redirect('/es/under_construction')


@app.route('/es/under_construction')
@app.route('/under_construction')
def under_construction():
    if g.lang == 'en':
        return render_template('work_in_progress.html', lang=g.lang)
    elif g.lang == 'es':
        return render_template('es/work_in_progress_es.html', lang=g.lang)


@app.route('/test')
def test():
    return app.static_folder


if __name__ == '__main__':
    # app.run(debug=False) # online
    # app.run(debug=True) # online
    app.run(host='192.168.1.201',  debug=True) # Madrid
    # app.run(host='192.168.1.60',  debug=True) # Binghamton
    # app.run(host='192.168.0.7',  debug=True)  # Providence
