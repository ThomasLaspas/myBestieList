from app import app,db
from flask import request,jsonify
from models import Friends


@app.route("/friends",methods=['GET'])
def getfriends():
    friends=Friends.query.all()
    result = [friend.to_json() for friend in friends]
    return jsonify(result),200

@app.route("/createfriend",methods=['POST'])
def add_friend():
    try: 
        data = request.json
        required_fields = ["name","role","description","gender"]
        for field in required_fields:
         if field not in data or not data.get(field):
          return jsonify({"error":f'Missing required field: {field}'}), 400

        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")

    # Fetch avatar image based on gender
        if gender == "male":
         img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
         img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
          img_url = None

        new_friend = Friends(name=name, role=role, description=description, gender= gender, img_url=img_url)

        db.session.add(new_friend) 
        db.session.commit()
        return jsonify(new_friend.to_json()), 201
    
    except Exception as e:
     db.session.rollback()
     return jsonify({"error":str(e)}), 500
    


@app.route('/deletefriend/<int:id>',methods=['DELETE'])
def deletefriend(id):
 try:
    friend = Friends.query.get(id)
    if friend is None:
      return jsonify({"error":"Friend not found"}), 404
    
    db.session.delete(friend)
    db.session.commit()
    return jsonify({"msg":"Friend deleted"}), 200
 except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500
 

@app.route('/update/friends/<int:id>',methods=['PUT'])
def updatefriends(id):
 try:
   
    Friend=Friends.query.get(id)
    if Friend is None:
      return jsonify({"error":"Friend not found"}), 404
    data = request.json
   
    Friend.name = data.get("name",Friend.name)
    Friend.role = data.get("role",Friend.role)
    Friend.description = data.get("description",Friend.description)
    Friend.gender = data.get("gender",Friend.gender)

    db.session.commit()
    return jsonify({"msg":"Friend updated"}), 200
 except Exception as e:
    db.session.rollback()
    return jsonify({"error":str(e)}),500
        

  