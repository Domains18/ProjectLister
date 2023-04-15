import mysql.connector as mysql
from datetime import date
import random
import datetime

class voting_system:
    def __int__(self):
        self.db= mysql.connect(host='127.168.0.100', port=8800, user='root', passwd='root', database='voting_system')
        

    def sign_up(self):
        while True:
            Identifier = input("Enter your ID number: ")
            if len(Identifier) != 8:
                print("Invalid ID number")
            elif Identifier.isnumeric():
                break
