import React, { useState } from 'react';
import { Form, Input, ButtonToolbar, Button, SelectPicker, Panel, DatePicker, Grid, Row, Col } from 'rsuite';
import "../App.css"
import ED from '../assets/ed.jpg'
import { createPost } from 'src/services/FilterService';


const color = [
    "Red",
    "White",
    "Gray",
    "Gold",
    "Blue",
    "Silver",
    "Yellow",
].map((item) => ({ label: item, value: item.toLowerCase() }));

const object = ["Person", "Bicycle", "Vehicle"].map((item) => ({
    label: item,
    value: item.toLowerCase(),
}));

const type = ["Truck", "SUV", "Sedan"].map((item) => ({
    label: item,
    value: item.toLowerCase(),
}));

const Textarea = React.forwardRef((props, ref) =>
    <Input {...props} as="textarea" ref={ref} />);

const NewColor = React.forwardRef((props, ref) =>
    <SelectPicker {...props} data={color} ref={ref} />);

const NewObjectType = React.forwardRef((props, ref) =>
    <SelectPicker {...props} data={object} ref={ref} searchable={false} />);

const NewVehicleType = React.forwardRef((props, ref) =>
    <SelectPicker {...props} data={type} ref={ref} searchable={false} />);

const NewDate = React.forwardRef((props, ref) =>
    <DatePicker {...props} ref={ref} />);

const FormPost = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [detected, setDetected] = useState("")
    const [objectType, setObjectType] = useState("")
    const [color, setColor] = useState("")
    const [vehicleType, setVehicleType] = useState("")

    const objectHandler = (v) => {
        setObjectType(v)
    }

    const SendData = () => {
        const createProduct = {
            title,
            detected,
            description,
            objectType,
            color,
            vehicleType
        }
        createPost(createProduct)
    }

    return (
        <Grid className='createPost'>
            <Panel>
                <Row>
                    <Col lg={12}>
                        <Form layout="horizontal">
                            <Form.Group controlId="title">
                                <Form.ControlLabel>Title</Form.ControlLabel>
                                <Form.Control name="title"
                                    onChange={(v) => setTitle(v)}
                                    className='min-w-430' />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.ControlLabel>Description</Form.ControlLabel>
                                <Form.Control name="description" rows={5} accepter={Textarea}
                                    onChange={(v) => setDescription(v)}
                                    className='min-w-430' />
                            </Form.Group>
                            <Form.Group controlId="detected">
                                <Form.ControlLabel>Detected</Form.ControlLabel>
                                <Form.Control name="detected" accepter={NewDate}
                                    onChange={(v) => setDetected(v)}
                                    className='min-w-430 ml-0' />
                            </Form.Group>
                            <Form.Group controlId="object">
                                <Form.ControlLabel>Object Type</Form.ControlLabel>
                                <Form.Control name="object" accepter={NewObjectType}
                                    onChange={objectHandler}
                                    className='min-w-430 ml-0' />
                            </Form.Group>
                            {objectType === "vehicle" ? (
                                <>
                                    <Form.Group controlId="color">
                                        <Form.ControlLabel>Color</Form.ControlLabel>
                                        <Form.Control name="color"
                                            accepter={NewColor}
                                            onChange={(v) => setColor(v)}
                                            className='min-w-430 ml-0' />
                                    </Form.Group>
                                    <Form.Group controlId="vehicle">
                                        <Form.ControlLabel>Vehicle Type</Form.ControlLabel>
                                        <Form.Control name="vehicle"
                                            accepter={NewVehicleType}
                                            onChange={(v) => setVehicleType(v)}
                                            className='min-w-430 ml-0'
                                        />
                                    </Form.Group>
                                </>
                            ) : null}
                            {objectType === "bicycle" ? (
                                <>
                                    <Form.Group controlId="color">
                                        <Form.ControlLabel>Color</Form.ControlLabel>
                                        <Form.Control name="color"
                                            accepter={NewColor}
                                            onChange={(v) => setColor(v)}
                                            className='min-w-430 ml-0' />
                                    </Form.Group>

                                </>
                            ) : null}
                            <Form.Group>
                                <ButtonToolbar>
                                    <Button appearance="primary" onClick={SendData}>Add</Button>
                                    <Button appearance="default">Cancel</Button>
                                </ButtonToolbar>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col lg={12} style={{ padding: 0 }}>
                        <img src={ED} alt="ed" width="100%" />
                    </Col>
                </Row>
            </Panel>
        </Grid>
    )
}
export default FormPost