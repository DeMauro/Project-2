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
def test():
    postgreSQL_select_Query = "SELECT cl.Make, cl.Model, cl.Year, cl.craigslist_price, cl.lat, cl.lng, c.mpg FROM craigs_list cl JOIN cars c on cl.make = c.make AND cl.model = c.model AND cl.year = c.year"
    cursor.execute(postgreSQL_select_Query)
    records= cursor.fetchall()
    car_data=[]
    car_dics={}
    
    for record in records:
        car_dics["Make"]= record[0]
        car_dics["Model"]= record[1]
        car_dics["Year"]= record[2]
        car_dics["craigslist_price"]= record[3]
        car_dics["lat"]= record[4]
        car_dics["lng"]= record[5]
        car_dics["mpg"]= record[6]

    print(car_dics)

if __name__ == "__main__":
    app.run(debug=True)





