import styled from "styled-components"
import { popularProducts } from '../data'
import Product from "./Product"
import { Link } from "react-router-dom"
import { mobile } from "../responsive"
import { useEffect, useState } from "react"
import axios from "axios"
import { publicRequest } from "../requestMethod"
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ${mobile({ justifyContent: 'center' })}
`

const Products = ({ cat, sort, filters }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(cat ? `/product?category=${cat}` : `/product`)
        setProducts(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProduct()
  }, [cat])

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item=>
        Object.entries(filters).every(([key,value])=>
        item[key].includes(value)
      ))
    )
  }, [products, cat, filters])

  useEffect(()=>{
    if(sort === "Newest"){
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>a.createdAt - b.createdAt)     
      )
    }else if(sort === "asc"){
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>a.price - b.price)     
      )
    }else{
      setFilteredProducts(prev=>
        [...prev].sort((a,b)=>b.price - a.price)   
      )
    }
  },[sort])
  return (
    <Container>
      {cat ? filteredProducts.map((item,index) => (
        <Product item={item} key={index}/>
      )) : products.map((item,index) => (
        <Product item={item} key={index}/>
      ))}
    </Container>
  )
}

export default Products
