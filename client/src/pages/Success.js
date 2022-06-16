import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';



const Success = () => {
    const navigate = useNavigate()
    const toShop = () => {
        navigate(SHOP_ROUTE)
    }

    useEffect(() => {
            setTimeout(toShop,10000)
        }, []
    )
    

    return (
        <Container>
            <h1 style={{ marginTop:"130px", textAlign:'center'}}>БЛАГОДАРИМ ВАС ЗА ЗАКАЗ! ВСКОРЕ МЫ С ВАМИ СВЯЖЕМСЯ!</h1>
        </Container>
    );
};

export default Success;