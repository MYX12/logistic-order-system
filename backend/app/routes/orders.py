from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Order, User, db

orders_bp = Blueprint('orders', __name__)

#create orders
@orders_bp.route('/api/orders',methods=['POST'])
@jwt_required()
def create_order():
    data = request.get_json()
    item = data.get('item')
    quantity = data.get('quantity')

    if not item or not quantity:
        return jsonify({'error': 'Item and quantity are required'}), 400
    user_id = int(get_jwt_identity())
    new_order = Order(item=item,quantity=quantity,user_id=user_id)

    db.session.add(new_order)
    db.session.commit()

    return jsonify({'message': 'Order Created successfully'}),201


#get orders from user
@orders_bp.route('/api/orders',methods=['GET'])
@jwt_required()
def get_orders():
    user_id=int(get_jwt_identity())
    orders = Order.query.filter_by(user_id=user_id).all()

    result = []
    for o in orders:
        result.append({
            'id':o.id,
            'item':o.item,
            'quantity':o.quantity,
            'created_at':o.created_at
        })

    return jsonify(result),200
