import { Padding, Search, ShoppingCartOutlined } from '@mui/icons-material'
import React, { memo } from 'react'
import styled from 'styled-components'
import Badge from '@mui/material/Badge';
import { mobile } from '../responsive'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userRedux';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px' })}
`
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`
const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`
const Center = styled.div`
  flex: 1;
`
const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  ${mobile({ fontSize: "24px" })}
`
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: '10px' })}
`

const Navbar = () => {

  const quantity = useSelector(state => state.cart.quantity)
  const dispatch = useDispatch()
  const logoutHnadler = () => {
    dispatch(logout())
  }
  console.log(quantity)
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='search' />
            <Search style={{ color: 'grey', fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center><Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}><Logo>SHOP.</Logo></Link></Center>
        <Right>
          <Link to={'/cart'} style={{ color: 'inherit', textDecoration: 'none' }}>
            <MenuItem>
              <Badge color="primary" badgeContent={quantity}>
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
          <Link to={'/login'} style={{ color: 'inherit', textDecoration: 'none', fontWeight: '600' }} onClick={logoutHnadler}><MenuItem>LOGOUT</MenuItem></Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default memo(Navbar)
