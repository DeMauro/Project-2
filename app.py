# import necessary libraries
import MySQLdb
from flask import Flask, render_template
import pandas as pd 

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

@app.route("/scrape")
def scrape():
    # Run the scrape function
    mars_data = scrape_mars.scrape_all()

    # Update the Mongo database using update and upsert=True
    mongo.db.collection.update({}, mars_data, upsert=True)

    # Redirect back to home page
    return redirect("/", code=302)



if __name__ == "__main__":
    app.run(debug=True)




