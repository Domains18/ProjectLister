import mysql.connector as mysql
from datetime import date
import random
import datetime


class voting_system:
    def __int__(self):
        self.db = mysql.connect(host='127.168.0.100', port=8800,
                                user='root', passwd='root', database='voting_system')

    def sign_up(self):
        while True:
            Identifier = input("Enter your ID number: ")
            if len(Identifier) != 8:
                print("Invalid ID number")
            elif Identifier.isnumeric():
                break
            else:
                print('Invalide identifier, can only contain numbers')

        query = "SELECT FirstName FROM voter_table WHERE Identifier = {}".format(
            Identifier)
        cursor = self.db.cursor()
        cursor.execute(query)
        for i in cursor:
            if i == None:
                print("You are not registered")
                return
        while True:
            Fname = input("Enter your first name: ").upper()
            Mname = input("Enter your middle name: ").upper()
            Lname = input("Enter your last name: ").upper()
            if Fname.isalpha() and Mname.isalpha() and Lname.isalpha():
                break
            else:
                print('Invalid name, can only contain letters')

        while True:
            Sex = input('Input your gender (M/F): ').upper()
            if Sex == 'Female' or Sex == "Male":
                break
            else:
                print("Please input relevant gender")

        while True:
            Birthday = input("Enter your birthday (YYYY-MM-DD): ")
            format = "%Y-%m-%d"
            isValidDate = True
            try:
                datetime.datetime.strptime(Birthday, format)
            except ValueError:
                isValidDate = False
                print("Invalid date format")
                Age = date.today().year - int(Birthday[0:4])
                if Age < 18:
                    print("You are not eligible to vote")
                    quit()
                while True:
                    Phone = input("Enter your phone number: ")
                    if len(Phone) != 10:
                        print("Invalid phone number")
                    elif Phone.isnumeric():
                        Phone = int(Phone)
                        break
                    else:
                        print('Invalid phone number, can only contain numbers')
                while True:
                    Email = input("Enter your email: ")
                    if ('@' and '.') in Email and (Email.index("@") < Email.index("." and (Email.index(".") < len(Email)))):
                        break
                    else:
                        print("Invalid email")
                print("Enter a permanent address")
                while True:
                    locality = input("Enter your locality: ").upper()
                    city = input("Enter your city: ").upper()
                    state = input("Enter your state: ").upper()
                    zipCode = input("Enter your zip code: ")
                    DistrictId = self.districtId(locality, city, state)
                    if DistrictId == None:
                        print("Invalid address")
                        continue
                    break
                while True:
                    Password = input("Enter your password: ")
                    if len(Password) < 8:
                        print("Password must be at least 8 characters")
                    elif Password.isalnum():
                        break
                    else:
                        print("Password must be alphanumeric")
                    ConfirmPassword = input("Confirm your password: ")
                    if Password != ConfirmPassword:
                        print("Passwords do not match")
                        continue
                    break
                query = "insert into voter_table values('{}','{}','{}','{}','{}','{}',{},{},'{}',{})".format(
                    Identifier, Fname.upper(), Mname.upper(), Lname.upper(), Sex.upper(), Birthday, Age, Phone, Email.lower(), DistrictId)
                cursor = self.db.cursor()
                cursor.execute(query)
                self.db.commit()
                VoterId = self.user_table(Fname, Lname, Identifier, Password)
                print("Your voter ID is: ", VoterId)
                break

            def districtId(self, locality, city, state):
                query = "SELECT DistrictId FROM district_table WHERE Locality = '{}' AND City = '{}' AND State = '{}'".format(
                    locality.upper(), city.upper(), state.upper())
                cursor = self.db.cursor()
                cursor.execute(query)
                for i in cursor:
                    return i[0]
            def user_table(self, Fname, Lname, Identifier, Password):
                vid=Fname[:2].upper()+Lname[:0].upper()+str(random.randint(1000,9999))
                query = "insert into user_table values('{}','{}','{}','{}')".format(vid, Identifier, Password, 0)
                cursor = self.db.cursor()
                cursor.execute(query)
                self.db.commit()
                return vid
            
            def login(self):
                while True:
                    Identifier = input("Enter your ID number: ")
                    VoterId = input("Enter your voter ID: ")
                    Password = input("Enter your password: ")
                    query = "SELECT Identifier FROM user_table WHERE VoterId = '{}' AND Identifier = '{}'".format(VoterId, Identifier)
                    cursor = self.db.cursor()
                    cursor.execute(query)
                    for j in cursor:
                        if Password == j[0]:
                            print("Login successful")
                            break
                        else:
                            print("Invalid password")
                            continue
            def after_login(self, Identifier):
                while True:
                    query="select PartyLeader from party_table where LeaderAadhaar='{}'".format(Identifier)
                    cursor=self.db.cursor()
                    cursor.execute(query)

