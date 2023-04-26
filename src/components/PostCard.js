import { useState } from "react";
import { FaUserAlt, FaCarAlt } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { Panel, Modal, Input, Button, Row, Col } from 'rsuite';
import { updatePost, deletePost } from "../services/FilterService"
import { FiTrash2, FiSave } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import DisplayModal from "./DisplayModal";
import { useDispatch } from "react-redux";
import { setModal } from "src/redux/actions/PostActions";


const PostCard = ({ post }) => {
	const dispatch = useDispatch()
	const [open, setOpen] = useState(0);


	const handleOpen = () => {
		dispatch(setModal({ open: true, id: post._id }))
	}
	const handleClose = () => setOpen(0);
	const handleEdit = () => setOpen(2);
	const handleCancel = () => setOpen(1);



	return (
		<>
			<Panel key={post._id} shaded bordered bodyFill onClick={handleOpen} className="post">
				<img src={post?.image} alt={post?.title} />
				<div className="avatar">
					{(() => {
						switch (post?.object) {
							case 'person':
								return <FaUserAlt />
							case 'bicycle':
								return <MdDirectionsBike className='bike' />
							case 'vehicle':
								return <FaCarAlt className='car' />
							default:
								return null
						}
					})()}
				</div>
				<Panel header={post?.title}>
					<p>
						<small>
							{post?.detected}
						</small>
					</p>
				</Panel>
			</Panel>

			{/* {open === 1 ? (
				<Modal keyboard={false} open={open} onClose={handleClose}>
					<Modal.Header>
						<Modal.Title>{post?.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body className="overflow-none">
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
					</Modal.Body>
					<Modal.Footer >
						<div className="btnStepOne">

							<Button
								className="edit"
								onClick={handleEdit} appearance="subtle">
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
				</Modal >
			) : open === 2 ? (
				<Modal keyboard={false} open={open} onClose={handleClose}>
					<Modal.Header>
						<Modal.Title>Edit Card</Modal.Title>
					</Modal.Header>
					<Modal.Body className="overflow-none">
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
										onChange={(v) => setName(v)}
									/>
									<p style={{ lineHeight: 3, paddingLeft: 5 }} >
										<small>{post?.object}</small>
									</p>
									<Input
										defaultValue={post?.detected}
										placeholder="Date"
										size="md"
										id="edit-Date"
										onChange={(v) => setDate(v)}
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
								onChange={(v) => setDescription(v)}
							/>

						</Row>
					</Modal.Body>
					<Modal.Footer>
						<div className="btnStepTwo">
							<div className="leftBtn">
								<Button onClick={handleCancel} appearance="subtle" className="cancel">
									<span>Cancel</span>
								</Button>
								<Button onClick={handleSave} appearance="subtle" className="save">
									<span>Save</span>
									<FiSave className="saveIcon" />
								</Button>
								<Button onClick={handleDelete(post._id)} appearance="subtle" className="remove">
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
				</Modal >
			) : null} */}
		</>
	);
};

export default PostCard;