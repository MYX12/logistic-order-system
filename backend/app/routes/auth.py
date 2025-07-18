from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from app.models import User
from app import db
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_bp = Blueprint('auth',__name__)

@auth_bp.route('/api/register', methods = ['POST'])

def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role','customer')

    if not email or not password:
        return  jsonify({'error': 'Email and password are required'}),400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({'error':'Email Already registered'}),400

    hashed_pwd = generate_password_hash(password)
    user = User(email=email, password_hash=hashed_pwd, role=role)

    db.session.add(user)
    db.session.commit()

    return jsonify({'message':'User registered successfully'}),201


@auth_bp.route('/api/login',methods=['POST'])

def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}),400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash,password):
        return jsonify({'error': 'Invalid email or password'}),401

    access_token = create_access_token(identity = str(user.id))
    return jsonify({'token': access_token, 'message':'Login successful'})


@auth_bp.route('/api/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}),404

        
    return jsonify({
        'id': user.id,
        'email': user.email,
        'created_at': user.created_at
    }),200

    #add testing for action

    #addtestingv3

  
    #addtestingv3
  
    #addtestingv3
    #addtestingv3
      
