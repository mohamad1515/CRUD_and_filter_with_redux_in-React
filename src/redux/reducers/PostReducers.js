import * as actions from '../constants/PostConstants';

import { FilterPostsInputModel } from '../../models'
let filterPostsInputModel = new FilterPostsInputModel()
let filterPostsInputModelStr = JSON.stringify(filterPostsInputModel)
const initialState = {
	filterPostsInputModel: JSON.parse(filterPostsInputModelStr),
	posts: [],
	searchResults: [],
	page: 1,
	theme: window.localStorage.getItem('theme')
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
				posts: action.payload,
				searchResults: action.payload.data,
			};
		case actions.FETCH_POST_FAILED:
			return {
				...state,
				post: [],
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
		case actions.LOCAL_THEME:
			return {
				...state,
				theme: action.payload,
			};
		case actions.SET_FILTER_POST_FIELD:
			return {
				...state,
				filterPostsInputModel: {
					...state.filterPostsInputModel,
					[action.payload.name]: action.payload.value
				}
			}
		case actions.CLEAR_FILTER_POST_FIELDS:
			return {
				...state,
				filterPostsInputModel: JSON.parse(filterPostsInputModelStr)
			}
		default:
			return state;
	}
};
