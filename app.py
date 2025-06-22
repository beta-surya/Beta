from flask import Flask, render_template , jsonify ,request
from modules import todo

app = Flask(__name__,
            template_folder='templates',
            static_folder='static')

@app.route("/")
def home():
    return render_template("home.html")

@app.route('/gettodo')
def sendTodo():
    data = todo.get_data()
    if data == "createdNewFile" or data == "error":
       return jsonify(500) 
    else:
        return jsonify(data)

@app.route('/addtodo' ,methods = ["POST"])
def addTodo():
    
    newData = request.get_json()
    # adding TODO on database
    todo.add_data(newData)
    return 200
    # 200 - ok <-response
    # 500 - error -> internal server error

@app.route('/updatetodo' ,methods = ["POST"])
def updateTodo():
    
    newData = request.get_json()
    # updating TODO on database
    todo.update_data(newData)
    return 200

if __name__ == "__main__":
    app.run( # host='0.0.0.0',
            debug=True,
            port=1234,
            extra_files=[
            "templates/",  
            "static/"      
        ])