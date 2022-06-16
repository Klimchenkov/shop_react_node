import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ratingStar from '../assets/ratingStar.png'
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({device, showRating, setRatedDeviceId}) => {
    const navigate = useNavigate()

    return (
        <Col md={3} className={'mt-3'} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{device.brand.name}</div>
                    <div 
                        className="d-flex align-items-center" 
                        onClick= {(event) => {
                                event.stopPropagation()
                                showRating()
                                setRatedDeviceId(device.id) 
                            }}
                    >
                        <div>{(Math.round(device.rating * 100) / 100).toFixed(1)}</div>
                        
                        <Image width={12} height={12} src={ratingStar}/>
                    </div>
                </div> 
                <div>{device.name}</div>
            </Card>    
        </Col>
    );
};

export default DeviceItem;