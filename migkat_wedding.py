from flask import Flask, render_template, request
import csv

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

@app.route('/about')
def about():
    return render_template('about.html')

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
            writer.writerow([name, email, guests,attending])


        # TODO: Add code to store the guest's RSVP information in a database or send an email notification

        # Display a confirmation message to the guest
        return render_template('confirmation.html', name=name)
    else:
        return render_template('rsvp.html')


if __name__ == '__main__':
    app.run(debug=True)
    # app.run(host='192.168.1.59',  debug=True)