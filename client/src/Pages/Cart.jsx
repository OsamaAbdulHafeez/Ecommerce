import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Annoucement from '../components/Annoucement'
import Footer from '../components/Footer'
import { Add, Remove } from '@mui/icons-material'
import { mobile } from '../responsive'
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react'
import { userRequest } from '../requestMethod'
import { useNavigate } from 'react-router-dom'

const KEY = import.meta.env.VITE_STRIPE
console.log(KEY)
const Container = styled.div``
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`
const TopButton = styled.button`
    font-weight: 300;
    padding: 10px;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`
const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`
const ProductDetails = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
    height: 200px;
    margin: 10px 0;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    box-shadow: 2px 4px 13px -4px rgba(0,0,0,0.97);
`
const ProductSize = styled.span``
const PriceDetails = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
 `
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && '500'};
    font-size: ${props => props.type === "total" && '24px'};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
    width: 100%;
    background-color: black;
    color: white;
    padding: 10px;
    font-weight: 600;
`
const Cart = () => {
    // const KEY = process.env.REACT_APP_STRIPE;
    // console.log(KEY)
    const cart = useSelector(state => state.cart)
    const [stripeToken, setStripeToken] = useState('')
    const navigate = useNavigate()
    const onToken = (token) => {
        setStripeToken(token)
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post('/payment', {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100
                })
                navigate('/Success', { state: { data: res.data.data }})
            } catch (error) {
                console.log(error)
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken, cart.total, navigate])
    return (
        <Container>
            <Navbar />
            <Annoucement />
            <Wrapper>
                <Title>YOUR BAGS</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bags(2)</TopText>
                        <TopText>Your Widhlist (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.product.map((item) => (
                            <>
                                <Product>
                                    <ProductDetails>
                                        <Image src={item.img} />
                                        <Details>
                                            <ProductName><b>Product: </b>{item.title}</ProductName>
                                            <ProductId><b>ID: </b>{item._id}</ProductId>
                                            <ProductColor color={item.color} />
                                            <ProductSize><b>Size:</b> {item.size}</ProductSize>
                                        </Details>
                                    </ProductDetails>
                                    <PriceDetails>
                                        <ProductAmountContainer>
                                            <Remove />
                                            <ProductAmount>{item.quantity}</ProductAmount>
                                            <Add />
                                        </ProductAmountContainer>
                                        <ProductPrice>Rs: {item.price * item.quantity}</ProductPrice>
                                    </PriceDetails>
                                </Product>
                                <Hr />
                            </>
                        ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>Rs:{cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>Rs:200</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>Rs:200</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>Rs:{cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name='Osama Shop'
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfoS4Cuacvbi0r7Crbso3AdjeXgyu6Nim6cQ&usqp=CAU"
                            billingAddress
                            shippingAddress
                            description={`Your total is ${cart.total}`}
                            amount={cart.total}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>

                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
