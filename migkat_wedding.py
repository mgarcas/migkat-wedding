from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/rsvp', methods=['GET', 'POST'])
def rsvp():
    if request.method == 'POST':
        # Get the guest's name, email, and number of guests from the form submission
        name = request.form['name']
        email = request.form['email']
        guests = request.form['guests']

        # TODO: Add code to store the guest's RSVP information in a database or send an email notification

        # Display a confirmation message to the guest
        return render_template('rsvp.html', message='Thank you for your RSVP, {}!'.format(name))
    else:
        return render_template('rsvp.html')


if __name__ == '__main__':
    app.run(debug=True)