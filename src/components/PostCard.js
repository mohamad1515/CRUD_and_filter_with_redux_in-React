import { useState } from "react";
import { FaUserAlt, FaCarAlt } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { Panel, Modal, Button, Row, Col } from 'rsuite';

const PostCard = ({ post }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<Panel key={post._id} shaded bordered bodyFill onClick={handleOpen}>
				<img src={post?.image} alt={post?.title} />
				<div className="avatar">
					{(() => {
						switch (post?.object_type) {
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
							<Panel header={post?.title}>
								<p>
									<small>{post?.object_type}</small>
								</p>
								<p>
									<small>{post?.detected}</small>
								</p>
								<p>
									<small>{post?.color}</small>
								</p>
								<p>
									<small>{post?.vehicle_type}</small>
								</p>
							</Panel>
						</Col>
					</Row>
					<Row className="p-10">
						{post?.description}
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose} appearance="subtle">
						Cancel
					</Button>
				</Modal.Footer>
			</Modal >
		</>

	);
};

export default PostCard;