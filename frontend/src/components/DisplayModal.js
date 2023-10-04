import { Panel, Modal, DatePicker, Input, Button, Row, Col } from 'rsuite';
import { setModal } from 'src/redux/actions/PostActions';
import { updatePost, deletePost } from "../services/FilterService"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FiTrash2, FiSave } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemindIcon from '@rsuite/icons/legacy/Remind';

const DisplayModal = () => {
    const [post, setPost] = useState("")
    const [relativeItem, setRelativeItem] = useState("")
    const [alert, setAlert] = useState(false)
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

    const handleExit = () => {
        setAlert(false)
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
        try {
            const findItem = posts?.filter((item) => item._id === modal.id)[0]
            const findRelative = posts?.filter((item) => findItem.relative.includes(item._id))
            setRelativeItem(findRelative)
            setPost(findItem)
            setName(findItem?.title)
            setDate(findItem?.detected)
            setDescription(findItem?.description)
        } catch (error) {
        }

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
                                <Panel className='edit'>
                                    <Input
                                        defaultValue={post?.title}
                                        value={name}
                                        placeholder="title"
                                        size="md"
                                        onChange={setName}
                                    />
                                    <DatePicker
                                        style={{ width: "100%", marginLeft: 0 }}
                                        placeholder={post?.detected}
                                        onChange={dateHandler}
                                    />
                                    {post?.object ? <Input disabled value={post?.object} className='readOnly' /> : null}
                                    {post?.color ? <Input disabled value={post?.color} className='readOnly' /> : null}
                                    {post?.vehicle ? <Input disabled value={post?.vehicle} className='readOnly' /> : null}
                                    {relativeItem?.length > 0 ? <Input disabled value={relativeItem?.map((item) => item.title)} className='readOnly' /> : null}
                                </Panel>
                            </Col>
                        </Row>
                        <Row className="p-10 pl-5">
                            <Input
                                as="textarea" rows={7}
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
                                <Panel header={post?.title} className="head read">
                                    {post?.detected ? <Input readOnly value={post?.detected} /> : null}
                                    {post?.object ? <Input readOnly value={post?.object} /> : null}
                                    {post?.color ? <Input readOnly value={post?.color} /> : null}
                                    {post?.vehicle ? <Input readOnly value={post?.vehicle} /> : null}
                                    {relativeItem?.length > 0 ? <Input readOnly value={relativeItem?.map((item) => item.title)} /> : null}
                                </Panel>
                            </Col>
                        </Row>
                        <Row className="p-10 pl-5 areaRead">
                            <Input
                                readOnly
                                as="textarea" rows={7}
                                value={post?.description}
                                size="lg"
                            />
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
                                <Button onClick={() => setAlert(true)} appearance="subtle" className="remove">
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

            <Modal size="xs" keyboard={false} open={alert} onClose={handleExit}>
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalAlertBody'>
                    <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
                    <p>Are You Sure ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleDelete(post?._id)} appearance="primary">
                        Yes
                    </Button>
                    <Button onClick={handleExit} appearance="subtle">
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
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