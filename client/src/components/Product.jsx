import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
    cursor: pointer;
`
const Container = styled.div`
    flex: 1;
    margin: 5px;
    height:350px;
    min-width: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info}{
        opacity: 1;
    }
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
`
const Image = styled.img`
    height: 75%;
    z-index: 2;
`

const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
    margin: 10px;
    transition: all 0.5s ease;


    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`
const Product = ({ item }) => {
    return (
        <Container>
            <Circle />
            <Image src={item.img} />
            <Info>
                <Link to={'/cart'} style={{ color: 'inherit', textDecoration: 'none' }}><Icon><ShoppingCartOutlined /></Icon></Link>
                <Link to={`/product/${item._id}`} style={{ color: 'inherit', textDecoration: 'none' }}><Icon><SearchOutlined /></Icon></Link>
                <Icon><FavoriteBorderOutlined /></Icon>
            </Info>
        </Container>
    )
}

export default Product
