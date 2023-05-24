from flask_login import UserMixin


class User (UserMixin):
    def __init__(self, num, user_id, password):
        self.num = num
        self.username = user_id
        self.password = password
        print('######## init ########')

    def is_authenticated(self):
        print('######## authenticator ########')
        # Check if the user is authenticated
        # Return True if authenticated, False otherwise
        return True

    def is_active(self):
        # Check if the user is active
        # Return True if active, False otherwise
        print('######## is_active ########')
        return True

    def is_anonymous(self):
        # Check if the user is anonymous
        # Return False since we have real users
        print('######## is_anonymous ########')
        return False

    def get_id(self):
        # Return the user's ID as a string
        print('######## get_id ########')
        return str(self.username)
