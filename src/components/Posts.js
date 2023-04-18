import React, { useState, useEffect } from "react";
import Header from "./Header";
import PostCard from "./PostCard";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { filterPostsAction } from "../redux/actions/PostActions";
import Paginate from "./Paginate";
import useDarkMode from "../hooks/dark-mode";

const Posts = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.PostReducers);
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, toggleTheme] = useDarkMode();

  const handleChangeSearch = (e) => {
    if (e.target.value.length > 0) {
      setCurrentPage(1);
    }
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(filterPostsAction());
  }, []);

  // const postPerPage = 10;
  // const totalPosts = posts.length;

  // const indexOfLastPost = currentPage * postPerPage;
  // const indexOfFirstPost = indexOfLastPost - postPerPage;
  // const filterPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // {`col ${theme === "dark" ? "dark" : "light"}`}


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
          {/* {totalPosts > postPerPage && (
            <Paginate
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPosts={totalPosts}
              postPerPage={postPerPage}
            />
          )} */}
        </div>
      )}
    </div>
  );
};

export default Posts;
