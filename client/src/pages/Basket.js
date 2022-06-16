import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Image, Row, Spinner, Table } from 'react-bootstrap';
import { Context } from '..';
import { addToBasket, checkBasket, deleteBasket, getBasket } from '../http/basketAPI';
import greenCheck from '../assets/greenCheck.png';
import greenPlus from '../assets/greenPlus.png';
import redminus from '../assets/redminus.png';
import { useNavigate } from 'react-router-dom';
import { SUCCESS_ROUTE } from '../utils/consts';

const Basket = observer (() => {
    const {device} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [totalCount, setTotalCount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        getBasket()
        .then(data =>{ 
            device.setBasket(data[0])
            device.setTotalSum(data[1])
                        })
        .finally(setLoading(false))
        
    }, [device.countBasket])

    const clickAdd = async(deviceId) => {
        try {
            let data;
            data = await addToBasket(deviceId)
            const check = await checkBasket()
            device.setCountBasket(check)
            alert(data)
        } catch(e) {
            alert(e.response.data.message)
        }
    }

    const clickDelete = async(deviceId, option) => {
        try {
            console.log(deviceId, option)
            let data;
            data = await deleteBasket(deviceId)
            const check = await checkBasket()
            device.setCountBasket(check)
            console.log(data)
            if(!option){
                alert(data)
            }
            

        } catch(e) {
            alert(e.response.data.message)
        }
    }
     
    
    
  
    if (loading) {
        return <Spinner animation={"grow"}/>
        
        }
       
    if(!device.basket[0]) {
        return <div></div>
 
    }
    

    return (
        
        <Container>
            {(device.countBasket===0)
            ?
            <h1 style={{ marginTop:"130px", textAlign:'center'}}>ВАША КОРЗИНА ПУСТА</h1>
            :
            <div>
                <h1 style={{ marginTop:"130px", marginBottom:"50px", textAlign:'center'}}>В ВАШЕЙ КОРЗИНЕ {device.countBasket} ДЕВАЙСОВ НА СУММУ {device.totalSum} руб.</h1>
                <Table striped bordered hover className='align-middle'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Тип девайса</th>
                            <th>Бренд</th>
                            <th>Модель</th>
                            <th>Изображение</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th>Сумма</th>
                            <th>+</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {device.basket.map((device,number) =>
                                <tr key={number}>
                                    <td>{number+1}</td> 
                                    <td>{device["basket_devices.device.type.typename"]}</td>
                                    <td>{device["basket_devices.device.brand.brandname"]}</td>
                                    <td>{device.name}</td>
                                    <td><Image width={100} height={100}  src={process.env.REACT_APP_API_URL + device.img} /></td>
                                    <td>{device.count}</td>
                                    <td>{device.price}</td>
                                    <td>{device.price * device.count }</td>
                                    <td>
                                        <Button 
                                            variant="success"
                                            onClick={() => {
                                                clickAdd(device["basket_devices.deviceId"])
                                            }} 
                                        >
                                        +
                                        </Button>
                                    </td>
                                    <td>
                                        <Button 
                                            variant="danger"
                                            onClick={() => {
                                                clickDelete(device["basket_devices.deviceId"])
                                            }} 
                                        >
                                        -
                                        </Button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </Table>
                <Button
                    variant="danger"
                    onClick={() => {
                        clickDelete()
                    }}
                >
                    Очистить корзину
                </Button>
                <Button
                    variant="success"
                    className="float-end"
                    onClick={()=>{
                        navigate(SUCCESS_ROUTE)
                        clickDelete(undefined,"Success")
                    }}
                >
                    Оформить заказ
                </Button>
                
            </div>
            
            
            }
        </Container>
        

    );
});

export default Basket;