import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () =>{
        try{
            const res = await axios.post('/api/login',{
                email,
                password
            });
            localStorage.setItem('token',res.data.token);
            setMessage(res.data.message || 'Login Success!');
            navigate('/orders');

        }catch(err){
            setMessage(err.response?.data?.error || 'Login failed!')
        }
    };
    return (
        <div>
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/><br/>
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/><br/>
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>

            <button onClick={()=>navigate('/register')}>Don't have an account? Register</button>
        </div>

    )
}

export default LoginPage;