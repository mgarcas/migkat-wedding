from flask import Flask, g, redirect, render_template, request
import csv

app = Flask(__name__)


# Default language is English
DEFAULT_LANGUAGE = 'en'


@app.before_request
def set_language():
    lang = request.cookies.get('lang') or DEFAULT_LANGUAGE
    g.lang = lang
    g.path = '' if g.lang == 'en' else 'es'


@app.route('/es')
@app.route('/')
def main():
    if g.lang == 'en':
        return render_template('main.html')
    elif g.lang == 'es':
        return render_template('es/main_es.html')


# @app.route('/es')
# def main_es():
#     print('en español ahora')
#     idioma = 'es'
#     print(idioma)
#     return render_template('es/main_es.html')

@app.route('/es/about')
@app.route('/about')
def about():
    if g.lang == 'en':
        return render_template('about.html')
    elif g.lang == 'es':
        return render_template('es/work_in_progress_es.html')


@app.route('/rehearsal')
def rehearsal():
    return render_template('rehearsal.html')


@app.route('/ceremony')
def ceremony():
    return render_template('ceremony.html')


@app.route('/reception')
def reception():
    return render_template('reception.html')


@app.route('/rsvp', methods=['GET', 'POST'])
def rsvp():
    if request.method == 'POST':
        # Get the guest's name, email, and number of guests from the form submission
        name = request.form['name']
        email = request.form['email']
        guests = request.form['guests']
        attending = request.form['attending']

        with open('./rsvp/rsvp.csv', mode='a', newline='') as file_csv:
            writer = csv.writer(file_csv)
            # Escribir los datos en el archivo CSV
            writer.writerow([name, email, guests, attending])

        # TODO: Add code to store the guest's RSVP information in a database or send an email notification

        # Display a confirmation message to the guest
        return render_template('confirmation.html', name=name)
    else:
        return render_template('rsvp.html')


@app.route('/pending')
def pending():
    return render_template('work_in_progress.html')


if __name__ == '__main__':
    app.run(debug=True)
    # app.run(host='192.168.1.59',  debug=True)
