from flask import Flask, render_template , jsonify ,request
from modules import todo

app = Flask(__name__,
            template_folder='templates',
            static_folder='static')


@app.route("/needHeader")
def sendHeader():
    return render_template("header.html")

# ***********************
#       search
# ***********************
@app.route("/")
@app.route("/Search")
@app.route("/search")
def home():
    return render_template("home.html")

# **********************
#           todo
# ***********************
@app.route("/")
@app.route("/Todo")
@app.route("/todo")
def Todo():
    data = todo.get_data()
    print(data)
    if data == "createdNewFile" or data == "error":
        return render_template("todo.html")    
    else:
        return render_template("todo.html" , todoJson = todo.get_data())    

@app.route('/addtodo' ,methods = ["POST"])
def addTodo():
    
    newData = request.get_json()
    # adding TODO on database
    todo.add_data(newData)
    return jsonify(200)

@app.route('/updatetodo' ,methods = ["POST"])
def updateTodo():
    
    newData = request.get_json()
    # updating TODO on database
    todo.update_data(newData)
    return jsonify(200)

@app.route('/deletetodo' ,methods = ["POST"])
def deleteTodo():
    newData = request.get_json()
    # updating TODO on database
    todo.delete_data(newData)
    return jsonify(200)



if __name__ == "__main__":
    app.run( host='0.0.0.0',
            debug=True,
            port=1234,
            extra_files=[
            "templates/",  
            "static/"      
        ])