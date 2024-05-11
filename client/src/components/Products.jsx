import styled from "styled-components"
import {popularProducts} from '../data'
import Product from "./Product"
import { Link } from "react-router-dom"
import { mobile } from "../responsive"
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ${mobile({justifyContent:'center'})}
`

const Products = () => {
  return (
    <Container>
      {popularProducts.map(item=>(
        <Link to={'/product'} style={{ color: 'inherit', textDecoration: 'none' }}><Product item={item} key={item.id}/></Link>
      ))}
    </Container>
  )
}

export default Products
