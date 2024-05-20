import styled from "styled-components"
import { mobile } from '../responsive'
import { useRef } from "react"
import { login } from "../redux/apiCalls"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5),
    rgba(255,255,255,0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled{
        color: teal;
        cursor: not-allowed;
    }
`
const Links = styled.a`
    margin: 5px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`
const Error = styled.span`
    color: red;
`
const Login = () => {
    const username = useRef()
    const password = useRef()
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector((state) => state.user)
    const loginHandler = (e) => {
        e.preventDefault()
        const obj = {
            username: username.current.value,
            password: password.current.value
        }
        login(dispatch, obj)
    }
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form onSubmit={loginHandler}>
                    <Input placeholder="user name" type="text" ref={username} />
                    <Input placeholder="password" type="text" ref={password} />

                    <Button type="submit" disabled={isFetching}>LOGIN</Button>
                    {error && <Error>Some thing went wrong...</Error>}
                    <Links>DO NOT YOU REMEMBER THE PASSWORD?</Links>
                    <Link to='/register' style={{color:'inherit'}}><Links>CREATE A NEW ACCOUNT</Links></Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
