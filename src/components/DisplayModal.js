import { Panel, Modal, DatePicker, Input, Button, Row, Col } from 'rsuite';
import { setModal } from 'src/redux/actions/PostActions';
import { updatePost, deletePost } from "../services/FilterService"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FiTrash2, FiSave } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DisplayModal = () => {
    const [post, setPost] = useState("")
    const [changeStatus, setChangeStatus] = useState(false)
    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    const dispatch = useDispatch()
    const { modal, posts } = useSelector((state) => state.PostReducers)

    const handleClose = () => {
        dispatch(setModal({ open: false, id: 0 }))
        setName("")
        setDate("")
        setDescription("")
    }

    const dateHandler = (v) => {
        if (v) {
            var date = new Date(v)
            var createDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
            setDate(createDate)
        }
    }

    const handleSave = () => {
        const updateProduct = {
            ...post,
            title: name,
            detected: date,
            description,
        }
        updatePost(updateProduct, post._id)
        toast.warning("Item Updated!");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    const handleDelete = (id) => {
        deletePost(id)
        toast.error("Item Deleted!");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    useEffect(() => {
        const findItem = posts.filter((item) => item._id === modal.id)[0]
        setPost(findItem)
        setName(findItem?.title)
        setDate(findItem?.detected)
        setDescription(findItem?.description)
    }, [modal.id])


    return (
        <>
            <Modal keyboard={false} open={modal.open} onOpen={() => setChangeStatus(false)} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>{changeStatus ? "Edit Card" : post?.title}</Modal.Title>
                </Modal.Header>
                {changeStatus ?
                    (<Modal.Body className="overflow-none">
                        <Row>
                            <Col lg={12}>
                                <img src={post?.image} alt={post?.title} className="w-full" />
                            </Col>
                            <Col lg={12}>
                                <Panel>
                                    <Input
                                        defaultValue={post?.title}
                                        placeholder="Name"
                                        size="md"
                                        id="edit-name"
                                        onChange={setName}
                                    />
                                    <p style={{ lineHeight: 3, paddingLeft: 5 }} >
                                        <small>{post?.object}</small>
                                    </p>
                                    <DatePicker
                                        placeholder={post?.detected}
                                        onChange={dateHandler}
                                    />
                                    <p style={{ lineHeight: 3, paddingLeft: 5 }}>
                                        <small>{post?.color}</small>
                                    </p>
                                    <p style={{ lineHeight: 1, paddingLeft: 5 }}>
                                        <small>{post?.vehicle}</small>
                                    </p>
                                </Panel>
                            </Col>
                        </Row>
                        <Row className="p-10">
                            <Input
                                as="textarea" rows={5}
                                defaultValue={post?.description}
                                placeholder="description"
                                size="lg"
                                id="edit-Date"
                                onChange={setDescription}
                            />

                        </Row>
                    </Modal.Body>) :
                    (<Modal.Body className="overflow-none">
                        <Row>
                            <Col lg={12}>
                                <img src={post?.image} alt={post?.title} className="w-full" />
                            </Col>
                            <Col lg={12}>
                                <Panel header={post?.title} className="head">
                                    <p>
                                        <small>{post?.object}</small>
                                    </p>
                                    <p>
                                        <small>{post?.detected}</small>
                                    </p>
                                    <p>
                                        <small>{post?.color}</small>
                                    </p>
                                    <p>
                                        <small>{post?.vehicle}</small>
                                    </p>
                                </Panel>
                            </Col>
                        </Row>
                        <Row className="p-10">
                            {post?.description}
                        </Row>
                    </Modal.Body>)}

                {changeStatus ? (
                    <Modal.Footer>
                        <div className="btnStepTwo">
                            <div className="leftBtn">
                                <Button onClick={() => setChangeStatus(false)} appearance="subtle" className="cancel">
                                    <span>Cancel</span>
                                </Button>
                                <Button onClick={handleSave} appearance="subtle" className="save">
                                    <span>Save</span>
                                    <FiSave className="saveIcon" />
                                </Button>
                                <Button onClick={() => handleDelete(post?._id)} appearance="subtle" className="remove">
                                    <span>Delete</span>
                                    <FiTrash2 className="removeIcon" />
                                </Button>
                            </div>
                            <div className="rightBtn">
                                <Button onClick={handleClose} appearance="subtle" className="close">
                                    Close
                                </Button>
                            </div>
                        </div>
                    </Modal.Footer>
                ) : (
                    <Modal.Footer >
                        <div className="btnStepOne">
                            <Button
                                className="edit"
                                onClick={() => setChangeStatus(true)} appearance="subtle">
                                <span>Edit</span>
                                <CiEdit className="editIcon" />
                            </Button>
                            <Button
                                className="close"
                                onClick={handleClose} appearance="subtle" >
                                Close
                            </Button>
                        </div>

                    </Modal.Footer>
                )}

            </Modal >
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </>
    )
}

export default DisplayModal