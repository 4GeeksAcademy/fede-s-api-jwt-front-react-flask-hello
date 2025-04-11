"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from datetime import timedelta
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

bcrypt = Bcrypt()


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        return jsonify({"msg": "Please send your info to register through the form"}), 200
    else:
        try:

            email = request.json.get('email')
            password = request.json.get('password')

            if not email or not password:
                return jsonify({"msg": "Please, fill up all the inputs."}), 400

            user = User.query.filter_by(email=email).first()

            if user:
                return jsonify({"msg": "Email already in use, please try with a different one."}), 400

            password_hash = bcrypt.generate_password_hash(
                password).decode("utf-8")

            new_user = User(email=email, password=password_hash)

            db.session.add(new_user)
            db.session.commit()

            return jsonify({
                "msg": "User succesfully created!",
                "user": new_user.serialize()
            }), 201
        except:
            return jsonify({"msg": "There was an error in your request, check if the Databse is running."}), 500


@api.route('/login', methods=["POST", "GET"])
def login():
    try:
        if request.method == "GET":
            return jsonify({"msg": "Please acces to the login view through your browser."}), 200

        password = request.json.get('password')
        email = request.json.get('email')

        if not password or not email:
            return jsonify({"msg": "Please, fill up all the inputs."}), 400

        login_user = User.query.filter_by(email=email).first()

        if not login_user:
            return jsonify({"msg": "Invalid email"}), 404

        pass_db = login_user.password
        true_or_false = bcrypt.check_password_hash(pass_db, password)

        if true_or_false:
            expires = timedelta(days=1)

            user_id = login_user.id
            access_token = create_access_token(
                identity=str(user_id), expires_delta=expires)

            return jsonify({
                "msg": "Login successful",
                "access_token": access_token
            }), 200

        else:
            return jsonify({"msg": "Invalid user or password."}), 401

    except Exception as e:
        return jsonify({"msg": "There was an error in your request, check if the Databse is running.", "error": str(e)}), 500


@api.route('/private', methods=["GET"])
@jwt_required()
def home():

    current_user_id = get_jwt_identity()

    if current_user_id:
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                "id": user.id,
                "email": user.email
            }
            user_list.append(user_dict)

        return jsonify({"users": user_list}), 200

    else:
        return jsonify({"Error": "You need to login."}), 401
