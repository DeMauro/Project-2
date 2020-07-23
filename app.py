# import necessary libraries
import MySQLdb
from flask import Flask, render_template

# create instance of Flask app
app = Flask(__name__)

# Connection to SQL Database
conn = MySQLdb.connect("localhost","postgres","Family34","Project2")
cursor = conn.cursor()
 

# create route that renders index.html template
@app.route("/")
def example():
    cursor.execute("select * from mmy")
    data = cursor.fetchall() #data from database.
    return render_template("index.html", value=data)


if __name__ == "__main__":
    app.run(debug=True)




