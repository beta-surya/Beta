import json

def get_data():
    try:   
        with open("data/todo.json",'r') as file:
            data = json.load(file)
        return data
    except FileNotFoundError as f:
        print(f)
        with open("data/todo.json","w") as file:
            json.dump([], file, indent=4)
        return "createdNewFile"
    except Exception as e:
        print(e)
        return "error"
    
def add_data(newdata):
    with open("data/todo.json",'r') as file:
        data = json.load(file)
    
    data.append(newdata)

    with open("data/todo.json",'w') as file:
        data = json.dump(data, file, indent=4)
    
    return

def update_data(updateddata):
    with open("data/todo.json",'r') as file:
        datas = json.load(file)

    jsonData = []

    for data in datas:
        if data['id'] != int(updateddata['id']):
            jsonData.append(data)
            continue
        jsonData.append(updateddata)
    
    with open("data/todo.json",'w') as file:
        data = json.dump(jsonData, file, indent=4)

def delete_data(deleteddata):
    with open("data/todo.json",'r') as file:
        datas = json.load(file)

    jsonData = []

    for data in datas:
        if data['id'] != int(deleteddata['id']):
            jsonData.append(data)
            continue
    
    with open("data/todo.json",'w') as file:
        data = json.dump(jsonData, file, indent=4)

