import * as actions from '../constants/PostConstants';
// import axios from 'axios';
import { filterPosts } from "../../services/FilterService";

// export const fetchPosts = () => async (dispatch) => {
// 	dispatch({ type: actions.FETCH_POST_REQUEST });
// 	try {
// 		const data = await axios.get("/api/products");
// 		dispatch({ type: actions.FETCH_POST_SUCCESS, payload: data.data });
// 	} catch (error) {
// 		dispatch({ type: actions.FETCH_POST_FAILED, payload: error.message });
// 		console.log(error.message);
// 	}
// }

// export const fetchPostDetail = (id) => async (dispatch) => {
// 	dispatch({ type: actions.FETCH_POST_DETAIL_REQUEST });
// 	try {
// 		const data = await axios.get(`/api/products/${id}`);
// 		dispatch({ type: actions.FETCH_POST_DETAIL_SUCCESS, payload: data });
// 	} catch (error) {
// 		dispatch({ type: actions.FETCH_POST_DETAIL_FAILED, payload: error.message });
// 		console.log(error.message);
// 	}
// }

export const setFilterPostField = (name, value) => (dispatch) => {
	dispatch({ type: actions.SET_FILTER_POST_FIELD, payload: { name, value } });
}

export const filterPostsAction = () => async (dispatch, getState) => {
	dispatch({ type: actions.FETCH_POST_REQUEST });
	const { PostReducers } = getState();
	const result = await filterPosts(PostReducers.filterPostsInputModel)
	if (result.ok && result.data && result.data.records) {
		dispatch({ type: actions.FETCH_POST_SUCCESS, payload: { posts: result.data.records, result: result.data.totalRecords } });
	} else {
		dispatch({ type: actions.FETCH_POST_FAILED, payload: result.message });
	}
}

export const clearFilterPosts = () => async (dispatch) => {
	await dispatch({ type: actions.CLEAR_FILTER_POST_FIELDS });
	dispatch(filterPostsAction())
}

export const sortPostsAsc = () => (dispatch, getState) => {
	const { PostReducers } = getState();
	dispatch({ type: actions.SORT_POSTS_ASC, payload: PostReducers.posts });
}

export const sortPostsDesc = () => (dispatch, getState) => {
	const { PostReducers } = getState();
	dispatch({ type: actions.SORT_POSTS_DESC, payload: PostReducers.posts });
}

export const searchPosts = (query) => (dispatch, getState) => {
	const { PostReducers } = getState();
	const searchRes = PostReducers.posts?.filter((post) =>
		post.title.toLowerCase().includes(query.toLowerCase())
	);
	dispatch({ type: actions.SEARCH_POSTS, payload: searchRes });
	console.log("searchRes ", searchRes)
}

export const changeTheme = (theme) => (dispatch) => {
	dispatch({ type: actions.LOCAL_THEME, payload: theme });
}

export const setPage = (side) => (dispatch) => {
	dispatch({ type: actions.SET_PAGE, payload: side });
}

export const setModal = (modal) => (dispatch) => {
	dispatch({ type: actions.SET_MODAL, payload: modal })
}

export const setImageCard = (img) => (dispatch) => {
	dispatch({ type: actions.SET_IMAGE, payload: img })
}
