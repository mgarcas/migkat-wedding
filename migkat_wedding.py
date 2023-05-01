import datetime
from flask import Flask, g, render_template, request
import csv

app = Flask(__name__)


# Default language is English
DEFAULT_LANGUAGE = 'en'
last_updated = datetime.datetime.utcnow()

# Functions


def sendForm():
    if request.method == 'POST':
        names = []
        foods = []
        U21 = []
        # Get the guest's name, email, and number of guests from the form submission
        print('calling this', request)
        guests = request.form['guests']

        for i in range(guests):
            names.append(request.form['guest-name-{}'.format(i)])
            foods.append(request.form['guest-meal-{}'.format(i)])
            U21.append("yes" if request.form['u21-{}'.format(i)] else "no")

        print(names, foods)

        name = request.form['name']
        email = request.form['email']

        attending = request.form['attending']
        if attending == 'no':
            return "Pues menuda mierda"

        with open('./rsvp/rsvp.csv', mode='a', newline='') as file_csv:
            writer = csv.writer(file_csv)
            # Escribir los datos en el archivo CSV
            writer.writerow([name, email, guests, attending])

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
    yes, name = sendForm()
    if yes == True:
        return render_template('confirmation.html', name=name, lang=g.lang)
    else:
        return render_template('rsvp.html')


@app.route('/pending')
def pending():
    return render_template('work_in_progress.html')


@app.route('/guests')
def table():
    with open('rsvp/rsvp.csv', 'r') as file:
        reader = csv.reader(file)
        data = list(reader)
    return render_template('guests.html', data=data)


if __name__ == '__main__':
    # app.run(debug=True) # online
    # app.run(host='192.168.1.59',  debug=True) # Binghamton
    app.run(host='192.168.0.7',  debug=True)  # Providence
