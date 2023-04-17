import React from 'react';
import './PostCard.css'
import { FaUserAlt, FaCarAlt } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";


const PostCard = ({ post }) => {
	return (
		<div className="cart" key={post._id}>
			<div className="front">
				<div className="top-pic">
					<img src={post?.image} alt={post?.title} />
				</div>
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
				<div className="info-box">
					<div className="info">
						<p className='title'>{post?.title}</p>
						<p className='date'>{post?.detected}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;


