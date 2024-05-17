import styled from "styled-components"
import Navbar from "../components/Navbar"
import Annoucement from "../components/Annoucement"
import Products from "../components/Products"
import NewsLetter from "../components/NewsLetter"
import Footer from "../components/Footer"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"
import { useState } from "react"

const Container = styled.div``
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Title = styled.h1`
    margin: 20px;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({ margin: "0px 20px", display: 'flex', flexDirection: 'column' })}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px" })}
`
const Option = styled.option`
    margin-bottom: 10px;
`

const ProductList = () => {
    const location = useLocation()
    const cat = location.pathname.split('/')[2]
    const [filter, setFilter] = useState({})
    const [sort,setSort] = useState("Newest")
    const handleFilters = (e) => {
        const values = e.target.value;
        setFilter({
            ...filter,
            [e.target.name]: values
        })
    }
    return (
        <Container>
            <Navbar />
            <Annoucement />
            <Title>{cat.slice(0,1).toUpperCase()+cat.slice(1).toLowerCase()}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled>
                            Color
                        </Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled >
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e)=>setSort(e.target.value)}>
                        <Option value="Newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filter} sort={sort}/>
            <NewsLetter />
            <Footer />
        </Container>
    )
}

export default ProductList
