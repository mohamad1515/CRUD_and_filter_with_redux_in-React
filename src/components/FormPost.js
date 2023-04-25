import React, { useState } from 'react';
import { Form, Input, ButtonToolbar, Button, SelectPicker, Panel, DatePicker } from 'rsuite';

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
    const [objectType, setObjectType] = useState("")

    const objectHandler = (v) => {
        setObjectType(v)
    }

    const SendData = () => {
        console.log("Data ")
    }

    return (
        <Panel>
            <Form layout="horizontal">
                <Form.Group controlId="title">
                    <Form.ControlLabel>Title</Form.ControlLabel>
                    <Form.Control name="title" />
                </Form.Group>
                {/* <Form.Group controlId="image">
                    <Form.ControlLabel>Image</Form.ControlLabel>
                    <Form.Control name="image" />
                </Form.Group> */}
                <Form.Group controlId="description">
                    <Form.ControlLabel>Description</Form.ControlLabel>
                    <Form.Control name="description" rows={5} accepter={Textarea} />
                </Form.Group>
                <Form.Group controlId="detected">
                    <Form.ControlLabel>Detected</Form.ControlLabel>
                    <Form.Control name="detected" accepter={NewDate} />
                </Form.Group>
                <Form.Group controlId="object">
                    <Form.ControlLabel>Object Type</Form.ControlLabel>
                    <Form.Control name="object" accepter={NewObjectType} onChange={objectHandler} />
                </Form.Group>
                {objectType === "vehicle" ? (
                    <>
                        <Form.Group controlId="color">
                            <Form.ControlLabel>Color</Form.ControlLabel>
                            <Form.Control name="color" accepter={NewColor} />
                        </Form.Group>
                        <Form.Group controlId="vehicle">
                            <Form.ControlLabel>Vehicle Type</Form.ControlLabel>
                            <Form.Control name="vehicle" accepter={NewVehicleType} />
                        </Form.Group>
                    </>
                ) : null}
                {objectType === "bicycle" ? (
                    <>
                        <Form.Group controlId="color">
                            <Form.ControlLabel>Color</Form.ControlLabel>
                            <Form.Control name="color" />
                        </Form.Group>

                    </>
                ) : null}
                <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={SendData}>Submit</Button>
                        <Button appearance="default">Cancel</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </Panel>
    )
}
export default FormPost