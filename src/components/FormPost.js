import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Uploader from './Uploader/Uploader';
import { Form, Input, ButtonToolbar, Button, SelectPicker, Panel, DatePicker, Grid, Row, Col, Tooltip, Whisper } from 'rsuite';
import IL from '../assets/ad.jpg'
import ID from '../assets/sd.jpg'
import DefaultImg from '../assets/img.jpg'
import { createPost } from 'src/services/FilterService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"

const tooltip = (
    <Tooltip className='tooltipCustom'>
        Please fill in the required field !
    </Tooltip>
);
const regTitlePattern = /^[a-zA-Z\s]+$/;

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
    const [image, setImage] = useState(DefaultImg)
    const [detected, setDetected] = useState(new Date())
    const [object, setObject] = useState("")
    const [color, setColor] = useState("")
    const [vehicle, setVehicle] = useState("")
    const { img, theme } = useSelector((state) => state.PostReducers)
    const [titleErr, setTitleErr] = useState(false);

    const validateTitle = (value) => {
        if (!regTitlePattern.test(value)) {
            setTitleErr(true);
        } else {
            setTitleErr(false);
        }
        setTitle(value)
    }

    const dateHandler = (v) => {
        if (v) {
            var date = new Date(v)
            var createDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
            setDetected(createDate)
        }
    }

    const SendData = (s, e) => {
        e.preventDefault()
        if (!titleErr && title !== '' && detected !== '') {
            const createProduct = {
                title,
                image: img,
                detected,
                description,
                object,
                color,
                vehicle
            }
            createPost(createProduct)
            toast.success("Item Created!");
            setTimeout(() => {
                setTitle("")
                setImage(DefaultImg)
                setDetected("")
                setDescription("")
                setObject("")
                setColor("")
                setVehicle("")
                let closeBtn = document.querySelector(".date-control-form span.rs-picker-toggle-clean.rs-btn-close");
                if (closeBtn) closeBtn.click();
            }, 1000);
        }
    }

    return (
        <Grid className='createPost'>
            <Panel>
                <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col lg={12}>
                        <Form layout="horizontal" onSubmit={SendData}>
                            <Form.Group controlId="title">
                                <Form.ControlLabel>Title<span className='required'>*<Form.HelpText className='popover' tooltip>Title is required</Form.HelpText></span></Form.ControlLabel>
                                <Form.Control name="title"
                                    onChange={(v) => validateTitle(v)}
                                    value={title}
                                    className={titleErr ? 'min-w-430 errInput' : 'min-w-430'} />
                            </Form.Group>
                            {titleErr && <p className='errStyle'>Your Title is invalid</p>}
                            <Form.Group controlId="description">
                                <Form.ControlLabel>Description</Form.ControlLabel>
                                <Form.Control name="description" rows={5} accepter={Textarea}
                                    onChange={setDescription}
                                    value={description}
                                    className='min-w-430' />
                            </Form.Group>
                            <Uploader image={image} setImage={setImage} />
                            <Form.Group controlId="detected">
                                <Form.ControlLabel>Detected<span className='required'>*<Form.HelpText className='popover' tooltip>Detected is required</Form.HelpText></span></Form.ControlLabel>
                                <Form.Control name="detected" accepter={NewDate}
                                    className="date-control-form min-w-430 ml-0 "
                                    onChange={dateHandler}
                                />
                            </Form.Group>
                            <Form.Group controlId="object">
                                <Form.ControlLabel>Object Type</Form.ControlLabel>
                                <Form.Control name="object" accepter={NewObjectType}
                                    onChange={setObject}
                                    value={object}
                                    className='min-w-430 ml-0 ' />
                            </Form.Group>
                            <Form.Group controlId="color">
                                <Form.ControlLabel>Color</Form.ControlLabel>
                                <Form.Control name="color"
                                    accepter={NewColor}
                                    onChange={setColor}
                                    value={color}
                                    disabled={object !== "vehicle" && object !== "bicycle"}
                                    className='min-w-430 ml-0 ' />
                            </Form.Group>
                            <Form.Group controlId="vehicle">
                                <Form.ControlLabel>Vehicle Type</Form.ControlLabel>
                                <Form.Control name="vehicle"
                                    accepter={NewVehicleType}
                                    onChange={setVehicle}
                                    value={vehicle}
                                    disabled={object !== "vehicle"}
                                    className='min-w-430 ml-0 '
                                />
                            </Form.Group>
                            <Form.Group>
                                <ButtonToolbar>
                                    {!titleErr && title !== '' && detected !== '' ?
                                        <Button appearance="primary" type='submit'>Add Post</Button>
                                        :
                                        <Whisper followCursor placement="bottom" controlId="control-id-hover"
                                            trigger="hover" speaker={tooltip}>
                                            <Button appearance="default" className='pointer'>Add Post</Button>
                                        </Whisper>
                                    }

                                    {/* <Button appearance="default" onClick={validate}>validate</Button> */}
                                </ButtonToolbar>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col lg={12} style={{ padding: 0, maxHeight: 910, overflow: 'hidden' }}>
                        <img src={theme === "light" ? IL : ID} alt="ed" width="100%" />
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