import React, { useState } from 'react';
import Uploader from './Uploader/Uploader';
import { Form, Input, ButtonToolbar, Button, SelectPicker, Panel, DatePicker, Grid, Row, Col } from 'rsuite';
import "../App.css"
import ED from '../assets/ed.jpg'
import { createPost } from 'src/services/FilterService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    const [object, setObject] = useState("")
    const [color, setColor] = useState("")
    const [vehicle, setVehicle] = useState("")
    const [img, setImg] = useState("")

    console.log("img ", img)

    const dateHandler = (v) => {
        if (v) {
            var date = new Date(v)
            var createDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
            setDetected(createDate)
        }
    }

    const SendData = () => {
        const createProduct = {
            title,
            detected,
            description,
            object,
            color,
            vehicle
        }
        createPost(createProduct)
        toast.success("Item Created!");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
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
                                    onChange={setTitle}
                                    className='min-w-430' />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.ControlLabel>Description</Form.ControlLabel>
                                <Form.Control name="description" rows={5} accepter={Textarea}
                                    onChange={(v) => setDescription(v)}
                                    className='min-w-430' />
                            </Form.Group>
                            <Uploader img={img} setImg={setImg} />
                            <Form.Group controlId="detected">
                                <Form.ControlLabel>Detected</Form.ControlLabel>
                                <Form.Control name="detected" accepter={NewDate}
                                    onChange={dateHandler}
                                    className='min-w-430 ml-0' />
                            </Form.Group>
                            <Form.Group controlId="object">
                                <Form.ControlLabel>Object Type</Form.ControlLabel>
                                <Form.Control name="object" accepter={NewObjectType}
                                    onChange={setObject}
                                    className='min-w-430 ml-0' />
                            </Form.Group>
                            {object === "vehicle" ? (
                                <>
                                    <Form.Group controlId="color">
                                        <Form.ControlLabel>Color</Form.ControlLabel>
                                        <Form.Control name="color"
                                            accepter={NewColor}
                                            onChange={setColor}
                                            className='min-w-430 ml-0' />
                                    </Form.Group>
                                    <Form.Group controlId="vehicle">
                                        <Form.ControlLabel>Vehicle Type</Form.ControlLabel>
                                        <Form.Control name="vehicle"
                                            accepter={NewVehicleType}
                                            onChange={setVehicle}
                                            className='min-w-430 ml-0'
                                        />
                                    </Form.Group>
                                </>
                            ) : null}
                            {object === "bicycle" ? (
                                <>
                                    <Form.Group controlId="color">
                                        <Form.ControlLabel>Color</Form.ControlLabel>
                                        <Form.Control name="color"
                                            accepter={NewColor}
                                            onChange={setColor}
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
                        <img src={ED} alt="ed" width="120%" />
                    </Col>
                </Row>
            </Panel>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Grid>
    )
}
export default FormPost