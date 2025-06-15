import React, {useState, useEffect} from "react";
import axios from 'axios';

function OrderPage(){
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');
    const [orders, setOrders] = useState([]);

    const token = localStorage.getItem('token');

    const handleCreateOrder = async()=>{
        try{
            const res = await axios.post('/api/orders',{
                item,
                quantity,
            },{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });

        setMessage(res.data.message);
        setItem('');
        setQuantity('');
        fetchOrders();
        
        }catch(err){
            setMessage(err.response?.data?.error || 'Order Creation Failed!');
        }
    };

    const fetchOrders = async ()=>{
        try{
            const res = await axios.get('http://backend:5000/api/orders',{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            setOrders(res.data.orders);
        }catch(err){
            setMessage('Failed to fetch orders');
        }
    };

    useEffect(()=>{
        fetchOrders();
    },[]);


    return (
        <div>
            <h2>Order Page</h2>
            <input
                type="text"
                placeholder="=Item"
                value={item}
                onChange={(e)=>setItem(e.target.value)}/><br/>
            
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e)=>setQuantity(e.target.value)}/><br/>

            <button onClick={handleCreateOrder}>Create Oder</button>

            <p>{message}</p>


            <h3>Your Orders:</h3>
            <ul>
                {orders.map(order =>{
                    <li key={order.id}>
                        {order.item} x {order.quantity}(Created at: {new Date(order.created_at).toLocaleString()})
                    </li>
                })}
            </ul>
        </div>
    );
}

export default OrderPage;