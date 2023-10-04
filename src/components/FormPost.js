import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Uploader from './Uploader/Uploader';
import { Form, Input, ButtonToolbar, Button, SelectPicker, CheckPicker, Panel, DatePicker, Grid, Row, Col, Tooltip, Whisper } from 'rsuite';
import DefaultImg from '../assets/img.png'
import { createPost } from 'src/services/FilterService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"

const tooltip = (
    <Tooltip className='tooltipCustom'>
        Please fill in the required field !
    </Tooltip>
);
const regTitlePattern = /^[a-zA-Z\s]+$/;

const Textarea = React.forwardRef((props, ref) => {
    return (<Input {...props} as="textarea" ref={ref} />);
})

const NewDate = React.forwardRef((props, ref) => {
    return (<DatePicker {...props} ref={ref} />);
})

const NewVehicleType = React.forwardRef((props, ref) => {
    const type = ["Truck", "SUV", "Sedan"].map((item) => ({
        label: item,
        value: item.toLowerCase(),
    }));
    return (<SelectPicker {...props} data={type} ref={ref} searchable={false} />);
})

const NewRelative = React.forwardRef((props, ref) => {
    const { posts } = useSelector((state) => state.PostReducers)
    const personList = posts.filter((item) => item.object === "person")
    const relation = personList.map((item) => ({ label: item.title, value: item._id }));

    return (<CheckPicker {...props} data={relation} ref={ref} />);
})

const NewEstate = React.forwardRef((props, ref) => {
    const { posts } = useSelector((state) => state.PostReducers)
    const getAllCar = posts.filter((item) => item.object === "vehicle")
    const estate = getAllCar.map((item) => ({ label: item.title, value: item._id }));

    return (<SelectPicker {...props} data={estate} ref={ref} />);
})

const NewObjectType = React.forwardRef((props, ref) => {
    const objective = ["Person", "Vehicle"].map((item) => ({
        label: item,
        value: item.toLowerCase(),
    }));
    return (<SelectPicker {...props} data={objective} ref={ref} searchable={false} />);
})

const NewColor = React.forwardRef((props, ref) => {
    const { colors } = useSelector((state) => state.PostReducers)
    const pallet = colors.map((item) => ({ label: item.charAt(0).toUpperCase() + item.slice(1), value: item }));
    return (<SelectPicker {...props} data={pallet} ref={ref} />);
})

const FormPost = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(DefaultImg)
    const [detected, setDetected] = useState("")
    const [object, setObject] = useState("")
    const [color, setColor] = useState("")
    const [vehicle, setVehicle] = useState("")
    const [relative, setRelative] = useState([])
    const [estate, setEstate] = useState("")
    const { img } = useSelector((state) => state.PostReducers)
    const [titleErr, setTitleErr] = useState(false);

    const setObjecthandler = (e) => {
        if (e === "person") {
            setObject("person")
            setRelative([])
        } if (e === "vehicle") {
            setObject("vehicle")
            setEstate("")
        }
    }

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
            if (estate.length !== 0) {
                var pushed = relative.push(estate)
            }
            const createProduct = {
                title,
                image: img,
                detected,
                description,
                object,
                color,
                vehicle,
                relative,
                pushed
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
                setRelative([])
                setEstate("")
                let closeBtn = document.querySelector(".date-control-form span.rs-picker-toggle-clean.rs-btn-close");
                if (closeBtn) closeBtn.click();
            }, 1000);
        }
    }

    return (
        <div className='addPost'>
            <Grid className='createPost'>
                <Panel>
                    <Row>
                        <Col xs={12}>
                            <Form onSubmit={SendData}>
                                <Form.Group controlId="title">
                                    <Form.ControlLabel>Title<span className='required'>*<Form.HelpText className='popover' tooltip>Title is required</Form.HelpText></span></Form.ControlLabel>
                                    <Form.Control name="title"
                                        onChange={(v) => validateTitle(v)}
                                        value={title}
                                        className={titleErr ? 'min-w-415 errInput' : 'min-w-415'} />
                                </Form.Group>
                                {titleErr && <p className='errStyle'>Your Title is invalid</p>}
                                <Form.Group controlId="description">
                                    <Form.ControlLabel>Description</Form.ControlLabel>
                                    <Form.Control name="description" rows={5} accepter={Textarea}
                                        onChange={setDescription}
                                        value={description}
                                        className='min-w-415' />
                                </Form.Group>
                                <Uploader image={image} setImage={setImage} />
                            </Form>
                        </Col>
                        <Col xs={12}>
                            <Form onSubmit={SendData}>
                                <Form.Group >
                                    <Form.ControlLabel>Detected
                                        <span className='required'>*<Form.HelpText className='popover' tooltip>Detected is required</Form.HelpText></span></Form.ControlLabel>
                                    <Form.Control name="detected" accepter={NewDate}
                                        className="date-control-form min-w-415 ml-0 "
                                        onChange={dateHandler}
                                    />
                                </Form.Group>
                                <Form.Group controlId="object">
                                    <Form.ControlLabel>Object Type</Form.ControlLabel>
                                    <Form.Control name="object" accepter={NewObjectType}
                                        onChange={setObjecthandler}
                                        value={object}
                                        className='min-w-415 ml-0 ' />
                                </Form.Group>
                                <Form.Group controlId="color">
                                    <Form.ControlLabel>Color</Form.ControlLabel>
                                    <Form.Control name="color"
                                        accepter={NewColor}
                                        onChange={setColor}
                                        value={color}
                                        disabled={object !== "vehicle" && object !== "bicycle"}
                                        className='min-w-415 ml-0 ' />
                                </Form.Group>
                                <Form.Group controlId="vehicle">
                                    <Form.ControlLabel>Vehicle Type</Form.ControlLabel>
                                    <Form.Control name="vehicle"
                                        accepter={NewVehicleType}
                                        onChange={setVehicle}
                                        value={vehicle}
                                        disabled={object !== "vehicle"}
                                        className='min-w-415 ml-0 '
                                    />
                                </Form.Group>
                                <Form.Group controlId="relative">
                                    <Form.ControlLabel>Relative</Form.ControlLabel>
                                    <Form.Control name="relative"
                                        accepter={NewRelative}
                                        onChange={setRelative}
                                        value={relative}
                                        disabled={object !== "vehicle" && object !== "bicycle"}
                                        className='min-w-415 ml-0'
                                    />
                                </Form.Group>
                                <Form.Group controlId="estate">
                                    <Form.ControlLabel>Estate</Form.ControlLabel>
                                    <Form.Control name="estate"
                                        accepter={NewEstate}
                                        onChange={setEstate}
                                        value={estate}
                                        disabled={object !== "person"}
                                        className='min-w-415 ml-0'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <ButtonToolbar>
                                        {!titleErr && title !== '' && detected !== '' ?
                                            <Button appearance="primary" type='submit' className='addBtn'>Add Post</Button>
                                            :
                                            <Whisper followCursor placement="bottom" controlId="control-id-hover"
                                                trigger="hover" speaker={tooltip}>
                                                <Button appearance="default" className='pointer addBtn'>Add Post</Button>
                                            </Whisper>
                                        }

                                        {/* <Button appearance="default" onClick={validate}>validate</Button> */}
                                    </ButtonToolbar>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Panel>
            </Grid>
            {/* <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            /> */}
        </div>
    )
}
export default FormPost