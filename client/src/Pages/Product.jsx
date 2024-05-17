import styled from "styled-components"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import NewsLetter from "../components/NewsLetter"
import Annoucement from "../components/Annoucement"
import { Add, Remove } from "@mui/icons-material"
import { mobile } from "../responsive"
import { useLocation, useNavigate } from "react-router-dom"
import { memo, useEffect, useMemo, useState } from "react"
import axios from "axios"
import { publicRequest } from "../requestMethod"
import loader from '../assets/ZKZg.gif'
import { addProduct } from "../redux/cartRedux"
import { useDispatch } from "react-redux"

const Container = styled.div``
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: 'column' })}
`
const ImgContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    width: 80%;
    height: 80vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0;
`
const Price = styled.span`
    font-size: 40px;
    font-weight: 100;
`
const FilterContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
    ${mobile({ width: "100%" })}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    cursor: pointer;
    margin: 0px 5px;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option``
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between ;
    ${mobile({ width: "100%" })}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 5px;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`
const Product = memo(() => {
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState()
    const [size, setSize] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`/product/find/${id}`)
                console.log("API Hit Hui")
                setProduct(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [id])

    const handleQuantity = (type) => {
        if (type === "inc") {
            setQuantity(quantity + 1)
        } else {
            quantity > 1 && setQuantity(quantity - 1)
        }
    }

    const addCartHandler = () => {
        dispatch(addProduct({ ...product, quantity, color, size }))
        navigate('/cart')

    }
    return (
        <Container>
            <Navbar />
            <Annoucement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>
                        {product.desc}
                    </Desc>
                    <Price>Rs:{product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((color) => (
                                <FilterColor key={color} color={color} style={{ border: '1px solid #000' }}
                                    onClick={() => setColor(color)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((size) => (
                                    <FilterSizeOption>{size}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                        <Button onClick={addCartHandler}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <NewsLetter />
            <Footer />
        </Container>
    )
})

export default Product
