import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Context } from '..';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Rating from '../components/modals/Rating';
import Pages from '../components/Pages';
import TypeBar from '../components/TypeBar';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';

const Shop = observer (() => {
    const {device} = useContext(Context)
    const [ratingVisble, setRatingVisible] = useState(false)
    const [ratedDeviceId, setRatedDeviceId] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 3).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setSelectedType({})
            device.setSelectedBrand({})
        }).finally(setLoading(false))
    }, [])

    useEffect( () => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        }).finally(setLoading(false))
    }, [device.page, device.selectedType, device.selectedBrand])

    

    if (loading) {
        return <Spinner animation={"grow"}/>
      }
    return (
        <Container>
            <Row className="mt-2"> 
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList showRating={() => setRatingVisible(true)} setRatedDeviceId={(id)=> setRatedDeviceId(id)}/>
                    <Pages/>
                    <Rating show={ratingVisble} ratedDeviceId={ratedDeviceId} onHide={() => setRatingVisible(false)} />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;