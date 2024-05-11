import styled from "styled-components"
import { mobile } from "../responsive"
import { Link } from "react-router-dom"

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height:120vh;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height:100%;
    object-fit: cover;
    ${mobile({ height: '40vh' })}
`
const Info = styled.div`
    position: absolute;
    width: 100%;
    height:100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: grey;
    cursor: pointer;
    font-weight: 600;
`
const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Image src={item.image} />
            <Info>
                <Title>{item.title}</Title>
                <Link to={'/productList'} style={{ color: 'inherit', textDecoration: 'none' }}><Button>SHOP NOW</Button></Link>
            </Info>
        </Container>
    )
}

export default CategoryItem
