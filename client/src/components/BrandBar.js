import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Context } from '..';

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className="d-flex">
            {device.brands.map(brand =>
                    <Card
                        style={{cursor:'pointer'}}
                        key={brand.id}
                        className="p-3 col-md-auto"
                        onClick={() => {
                            if (brand.id === device.selectedBrand.id) device.setSelectedBrand({}); 
                            else device.setSelectedBrand(brand)}}
                        border={brand.id === device.selectedBrand.id ? "danger" : "light"}
                    >
                        {brand.name}
                    </Card>
            )}
        </Row>
    );
});

export default BrandBar;