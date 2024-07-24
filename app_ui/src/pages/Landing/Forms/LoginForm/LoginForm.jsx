import styles from './LoginForm.module.css'

import InputBox from '../../../../components/InputBox/InputBox'
import Button from '../../../../components/Button/Button'

import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from '../../../../baseAxios'

const LoginForm = () => {
    let navigate = useNavigate();
    const [email, changeEmail] = useState("");
    const [password, changePassword] = useState("");

    const login = async () => {
        try{
            const res = await axios.post('/api/users/login', {email, password});
            console.log(res);
            navigate('/dashboard');
        }catch(err){
            console.log(err);
        }
    }

    return (
    <div className={styles.Container}>
        <InputBox type="email" placeholder="Enter your email" onChange={changeEmail}></InputBox>
        <InputBox type="password" placeholder="Enter your password" onChange={changePassword}></InputBox>
        <Button text="Log in" onClick={login}></Button>
        <p style={{fontSize:"0.8em", display:"inline"}}>Don't have an account?</p>
        <button className={styles.signup} style={{border:"none", display:"inline"}} onClick={() => navigate("/signup")}>Sign up</button>
    </div>
    )
}

export default LoginForm;