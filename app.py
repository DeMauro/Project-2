# import necessary libraries
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template
from models import db


# create instance of Flask app
app = Flask(__name__)

# Connection to SQL Database
db = SQLAlchemy(app)

#Postgres credientials
POSTGRES = {
    'user': 'tj',
    'pw': 'yourpass',
    'db': 'Project2',
    'host': 'localhost',
    'port': '5432',
}

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES

# ...app config...
db.init_app(app)


# create route that renders index.html template
@app.route("/")

def example():
    cursor.execute("select * from mmy")
    data = cursor.fetchall() #data from database.
    return render_template("index.html", value=data)


if __name__ == "__main__":
    app.run(debug=True)




