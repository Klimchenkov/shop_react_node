import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import deviceStar from '../assets/deviceStar.png'
import { fetchOneDevice } from '../http/deviceAPI';
import Rating from '../components/modals/Rating';
import { addToBasket, checkBasket } from '../http/basketAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const DevicePage = observer(() => {
    const {device} = useContext(Context) 
    const [oneDevice, setDevice] = useState({info: []}) 
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [ratingVisble, setRatingVisible] = useState(false)
    
    useEffect( () => {
        fetchOneDevice(id).then(data => setDevice(data)).
        finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
      }

    const click = async(deviceId) => {
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
    
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src ={process.env.REACT_APP_API_URL + oneDevice.img}/>
                </Col>
                <Col md={4}>
                    <div 
                        className='d-flex flex-column align-items-center'
                        style={{cursor:'pointer'}} 
                        onClick={() => setRatingVisible(true)}
                    >
                        <h2> {oneDevice.type.name} {oneDevice.brand.name} {oneDevice.name} </h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${deviceStar}) no-repeat center center`, width:240, height:240, backgroundSize: 'cover', fontSize:64}}
                        >
                            {(Math.round(oneDevice.rating * 100) / 100).toFixed(1)}
                        </div>
                    </div>
                </Col> 
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize:32, border: '5px solid lightgrey'}}
                    >
                        <h3>От: {oneDevice.price}</h3>
                        <Button
                            onClick={() => {
                                click(oneDevice.id)
                            }} 
                            variant={'outline-dark'}
                        >
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {oneDevice.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
            <Rating show={ratingVisble} ratedDeviceId={oneDevice.id} onHide={() => setRatingVisible(false)} />      
        </Container>
    );
});

export default DevicePage;