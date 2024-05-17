import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

const stripeKey = "pk_test_51PGFs500VgMeJ9Udw2YLb7ndtFK4eUiZv7hBOYGd9XiRMIKIgn0xDBGSDC301RrBVKJWlyhLsL0lGHsZgvXSRuFS00gGa6vz1d"
const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null)
    const navigate = useNavigate()
    const onToken = (token) => {
        setStripeToken(token)
    }
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post("/api/payment",{
                    tokenId:stripeToken.id,
                    amount:2000
                })
                console.log(res.data.data)
                navigate('/success')
            } catch (error) {
                console.log(error)
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken])
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {stripeToken ? (<span>Processing..please wait</span>) : (
            <StripeCheckout
                name='Osama Shop'
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfoS4Cuacvbi0r7Crbso3AdjeXgyu6Nim6cQ&usqp=CAU"
                billingAddress
                shippingAddress
                description='Your total is 100'
                amount={50000}
                token={onToken}
                stripeKey={stripeKey}

            >
                <button style={{
                    border: 'none',
                    width: 120,
                    borderRadius: 5,
                    padding: '20px',
                    backgroundColor: 'black',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}>
                    Pay Now
                </button>
            </StripeCheckout>
            )}
        </div>
    )
}

export default Pay
