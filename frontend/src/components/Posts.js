import { useState, useEffect } from "react";
import Header from "./Header";
import PostCard from "./PostCard";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { filterPostsAction } from "../redux/actions/PostActions";
import { Pagination } from 'rsuite';
import useDarkMode from "../hooks/dark-mode";
import FormPost from "./FormPost"
import DisplayModal from "./DisplayModal";
import Not from '../assets/not.png'

const Posts = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { posts, loading, searchResults, side, colors } = useSelector((state) => state.PostReducers);
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, toggleTheme] = useDarkMode();

  const handleChangeSearch = (v, e) => {
    if (v && v.length > 0) {
      setCurrentPage(1);
    } else if (v?.length === 0) {
      dispatch(filterPostsAction());
    }
    setSearch(v);
  };

  useEffect(() => {
    dispatch(filterPostsAction());
  }, []);


  const postPerPage = 10;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const filterPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="col">
        {(() => {
          switch (side) {
            case 'search':
              return (
                <>
                  <Header
                    colors={colors}
                    search={search}
                    setSearch={setSearch}
                    onChange={handleChangeSearch}
                    toggleTheme={toggleTheme}
                  />
                  {loading ? (
                    <Loading />
                  ) : (
                    <div className="home">
                      <div className="posts">
                        {filterPosts.length === 0 ?
                          <div className="not">
                            <img src={Not} alt="notFound" width="100%" />
                            <p>Not Found</p>
                          </div> :
                          filterPosts?.map((post) => (
                            <PostCard key={post._id} post={post} />
                          ))}
                      </div>
                      {searchResults >= postPerPage && (
                        <Pagination
                          className='page'
                          prev
                          last
                          next
                          first
                          size="xs"
                          total={searchResults} limit={10} activePage={currentPage} onChangePage={setCurrentPage} />
                      )}
                    </div>
                  )}
                </>
              )
            case 'add':
              return (
                <FormPost />
              )
            default:
              return null
          }
        })()}
      </div>
      <DisplayModal />
    </>
  );
};

export default Posts;


