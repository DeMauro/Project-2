import psycopg2
from flask import jsonify

connection = psycopg2.connect(user="tj",
                                  password="yourpass",
                                  host="127.0.0.1",
                                  port="5432",
                                  database="Project2")

cursor = connection.cursor()

postgreSQL_select_Query = "select * from mmy"
cursor.execute(postgreSQL_select_Query)
records = cursor.fetchall() 

car_data= []
car_dics={}

for record in records:
    car_dics["Make"]= record[0]
    car_dics["Model"]= record[1]
    car_dics["Year"]= record[2]
    car_data.append(car_dics.copy())

print(car_data)
