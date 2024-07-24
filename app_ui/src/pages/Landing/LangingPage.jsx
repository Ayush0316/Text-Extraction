import styles from './LandingPage.module.css'

import LoginForm from './Forms/LoginForm/LoginForm'
import SignupForm from './Forms/SignupForm/SignupFrom'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const LandingPage = () => {
    let navigate = useNavigate();
    return (
        <div className={styles.Container}>
            <div className={styles.Image}>
                <h1>The Data Machine</h1>
                <img src="/dataMachine.png" />
            </div>
            <div className={styles.Form}>
                <h2>Use Tool to extract the data in a unique way.</h2>
                <Button variant="contained" onClick={() => navigate('/editor')}>Go Ahead</Button>
            </div>
        </div>
    )
}

export default LandingPage;

