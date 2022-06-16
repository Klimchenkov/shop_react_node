import { observer } from 'mobx-react-lite';
import React, { startTransition, useContext, useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { Context } from '../..';
import '../../assets/stars.css'
import { addRate } from '../../http/deviceAPI';


const Rating = ({ show, onHide, ratedDeviceId}) => {
    const {device} = useContext(Context)
    const [ratedDevice, setRatedDevice] = useState('')
    

    const click = async(i) => {
        try {
            let data;
            const deviceId = ratedDeviceId
            data = await addRate(i, deviceId)
            alert(data)
            window.location.reload()
            
        } catch(e) {
            alert(e.response.data.message)
        }
    }
    

    useEffect( () => {
        device.devices.map(device => device.id === ratedDeviceId ? setRatedDevice(device) : '')
    }, [ratedDeviceId])

    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "https://kit.fontawesome.com/5ea815c1d0.js";
        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);
    
    if(!ratedDevice){
        return <div></div>
    }

    const rates = []
    for (var i = 10; i > 0; i--){rates.push(i)}
 
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Поставьте Вашу оценку девайсу {ratedDevice.brand.name} {ratedDevice.name}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background: "#353b48", padding: "4em"}}>
            <div className="star-wrapper">
                {rates.map(i =>
                    <a 
                        href="#" 
                        className={`fas fa-star s${i}`} 
                        key={i}
                        onClick={()=> {
                            click(i)
                            onHide()
                        }}
                    />
                )}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
        </Modal>
    );
};

export default Rating;