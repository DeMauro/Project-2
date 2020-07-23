# import necessary libraries
from flask import Flask, render_template, jsonify, json
import psycopg2


# create instance of Flask app
app = Flask(__name__)


#Postgres credientials
connection = psycopg2.connect(user="tj",
                                  password="yourpass",
                                  host="127.0.0.1",
                                  port="5432",
                                  database="Project2")

cursor = connection.cursor()


# create route that renders index.html template
@app.route("/")
def example():
    postgreSQL_select_Query = "select * from mmy"
    cursor.execute(postgreSQL_select_Query)
    records = cursor.fetchall() 
    car_data=[]
    car_dics={}

    for record in records:
        car_dics["Make"]= record[0]
        car_dics["Model"]= record[1]
        car_dics["Year"]= record[2]
    
        car_data.append(car_dics.copy())

    return jsonify(car_data)

    postgreSQL_select_Query = "select * from cars"
    cursor.execute(postgreSQL_select_Query)
    records = cursor.fetchall() 
    car_data=[]
    car_dics={}

    for record in records:
        car_dics["Make"]= record[0]
        car_dics["Model"]= record[1]
        car_dics["Year"]= record[2]
    
        car_data.append(car_dics.copy())

if __name__ == "__main__":
    app.run(debug=True)




