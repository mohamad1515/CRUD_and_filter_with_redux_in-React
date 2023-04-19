import { Pagination } from 'rsuite';

const Paginate = ({ currentPage, setCurrentPage, totalPosts }) => {

	return (
		<>
			<Pagination
				className='page'
				prev
				last
				next
				first
				total={totalPosts} limit={10} activePage={currentPage} onChangePage={setCurrentPage} />
		</>

	);
};

export default Paginate;
