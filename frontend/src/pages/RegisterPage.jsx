import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState('customer');
    const [message,setMessage] = useState('');
    const navigate = useNavigate();
    const handleRegister = async() => {
        try{
            const res = await axios.post('/api/register',{
                email,
                password,
                role
            });
            setMessage(res.data.message);
        }catch(err){
            setMessage(err.response?.data?.error || 'Registration failed!');
        }
    };
return(
    <div>
        <h2>Register</h2>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            /><br/>
        <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            /><br/>
        <select value={role} onchange={e=> setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
        </select><br/>
        <button onClick={handleRegister}>Register</button><br/>
        <p>{message}</p><br/>
        <button onClick={()=> navigate('/login')}>Already have an account? Login</button>
    </div>
)
};

export default RegisterPage;