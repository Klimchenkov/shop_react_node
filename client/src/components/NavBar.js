import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Button, Container, Image } from 'react-bootstrap';
import {observer} from "mobx-react-lite";
import Vectorbasket from '../assets/Vectorbasket.png'
import { checkBasket } from '../http/basketAPI';



const NavBar = observer(() => {
    const {user, device} = useContext(Context)
    const navigate = useNavigate()
    
    useEffect(() => {
        checkBasket().then(data => device.setCountBasket(data))
     }, [device.CountBasket])

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.clear()
        navigate(SHOP_ROUTE)
    }
    
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
            <NavLink style={{color:"white"}} to={SHOP_ROUTE}>КупиДевайс</NavLink>
            {user.isAuth ?
                <Nav className="ms-auto d-flex" style={{color:"white", padding:"30"}}>
                    <Button 
                        variant={"outline-light"} 
                        onClick={()=>navigate(ADMIN_ROUTE)}
                    >
                        Админ панель
                    </Button>
                    <Image 
                        width={50} height={50}
                        style={{cursor:'pointer'}} 
                        src={Vectorbasket}
                        onClick={()=>navigate(BASKET_ROUTE)}
                    />
                    <div>{device.countBasket}</div>
                    <Button 
                        variant={"outline-light"} 
                        onClick={()=> logOut()} 
                        className="ms-2"
                    >
                        Выйти
                    </Button>
                </Nav>
                :
                <Nav className="ms-auto" style={{color:"white"}}>
                    <Button variant={"outline-light"} onClick={()=>navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
            }
       
        </Container>
        </Navbar>
    );
});

export default NavBar;