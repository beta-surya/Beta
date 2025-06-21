from flask import Flask, render_template , jsonify
from datetime import datetime

app = Flask(__name__,
            template_folder='templates',
            static_folder='static')

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/json")
def getjson():
    now = datetime.now()
    date_time = now.strftime("%d %h %y %H %M")
    
    todo = [
        {   
            'id':1,
            "task":" -> 1  i am creaing an todo list manager",
            "status":"started",
            "datetime":date_time

        },
        {
            'id':2,
            "task":" -> 2 how are you",
            "status":"started",
            "datetime":date_time
        },
        {
            'id':3,
            "task":" -> 3 why are you",
            "status":"started",
            "datetime":date_time
        }

    ]

    # return jsonify({"msg": "This is the TODO response"})
    
    return jsonify(todo)

if __name__ == "__main__":
    app.run( # host='0.0.0.0',
            debug=True,
            port=1234,
            extra_files=[
            "templates/",  # watch all template files
            "static/"      # watch all static files (CSS, JS)
        ])