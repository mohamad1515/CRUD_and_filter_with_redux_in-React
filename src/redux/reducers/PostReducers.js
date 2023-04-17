import * as actions from '../constants/PostConstants';

const initialState = {
	posts: [],
	searchResults: [],
	page: 1,
};

export const PostReducers = (state = initialState, action) => {
	switch (action.type) {
		case actions.FETCH_POST_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actions.FETCH_POST_SUCCESS:
			return {
				...state,
				loading: false,
				posts: action.payload.data,
				searchResults: action.payload.data,
			};
		case actions.FETCH_POST_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case action.FETCH_POST_DETAIL_REQUEST:
			return {
				loading: true,
				...state
			};
		case action.FETCH_POST_DETAIL_SUCCESS:
			return {
				loading: false,
				product: action.payload
			};
		case action.FETCH_POST_DETAIL_FAILED:
			return {
				...state,
				loading: false,
				product: action.payload
			};
		case actions.SORT_POSTS_ASC:
			const sortAsc = action.payload.sort((a, b) => (a.title < b.title ? 1 : a.title > b.title ? -1 : 0));
			return {
				...state,
				posts: sortAsc,
			};
		case actions.SORT_POSTS_DESC:
			const sortDesc = action.payload.sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));
			return {
				...state,
				posts: sortDesc,
			};
		case actions.SEARCH_POSTS:
			return {
				...state,
				posts: action.payload,
				page: 1
			};
		default:
			return state;
	}
};
