import { FaUserAlt, FaCarAlt } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { Panel } from 'rsuite';
import { useDispatch } from "react-redux";
import { setModal } from "src/redux/actions/PostActions";

const PostCard = ({ post }) => {
	const dispatch = useDispatch()
	const handleOpen = () => {
		dispatch(setModal({ open: true, id: post._id }))
	}
	return (
		<Panel key={post._id} shaded bordered bodyFill onClick={handleOpen} className="post">
			<div className="imgBox">
				<img src={post?.image} alt={post?.title} width="100%" height="100%" />
			</div>
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
	);
};

export default PostCard;