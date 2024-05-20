import React, { useRef } from 'react'
import { login } from '../../redux/apiCalls'
import { useDispatch, useSelector } from "react-redux"
const Login = () => {
    const username = useRef()
    const password = useRef()
    const dispatch = useDispatch()
    const loginHandler = (e) => {
        e.preventDefault()
        const obj = {
            username: username.current.value,
            password: password.current.value
        }
        console.log(obj)
        
        login(dispatch, obj)
    }
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
        }}>
            <form action="" onSubmit={loginHandler}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px'
                }}
            >
                <input type="text" placeholder='username' ref={username} style={{ padding: '10px', height: '30px' }} />
                <input type="password" placeholder='password' ref={password} style={{ padding: '10px', height: '30px' }} />
                <button type='submit' style={{ padding: '10px', width: '100px', margin: 'auto' }}>Login</button>
            </form>
        </div>
    )
}

export default Login
