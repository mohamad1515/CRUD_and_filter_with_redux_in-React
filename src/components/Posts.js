import { useState, useEffect } from "react";
import Header from "./Header";
import PostCard from "./PostCard";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { filterPostsAction } from "../redux/actions/PostActions";
import { Pagination } from 'rsuite';
import useDarkMode from "../hooks/dark-mode";

const Posts = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { posts, loading, searchResults } = useSelector((state) => state.PostReducers);
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, toggleTheme] = useDarkMode();

  const handleChangeSearch = (v, e) => {
    if (v && v.length > 0) {
      setCurrentPage(1);
    }
    setSearch(v);
    console.log("theme", theme)
  };

  useEffect(() => {
    dispatch(filterPostsAction());
  }, []);

  console.log("searchResults222", searchResults)

  const postPerPage = 10;
  const totalPosts = posts?.length;

  return (
    <div className="col">
      <Header
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
            {posts && posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          {totalPosts >= postPerPage && (
            <Pagination
              className='page'
              prev
              last
              next
              first
              size="xs"
              total={totalPosts} limit={10} activePage={currentPage} onChangePage={setCurrentPage} />
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
