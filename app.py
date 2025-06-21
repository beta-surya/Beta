from flask import Flask, render_template , jsonify

app = Flask(__name__,
            template_folder='templates',
            static_folder='static')

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/todo")
def getTodo():
    return jsonify({"msg": "This is the TODO response"})

if __name__ == "__main__":
    app.run(host='0.0.0.0',
            debug=True,
            port=1234,
            extra_files=[
            "templates/",  # watch all template files
            "static/"      # watch all static files (CSS, JS)
        ])