import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortPostsAsc,
  sortPostsDesc,
  searchPosts,
  setFilterPostField,
  filterPostsAction,
  clearFilterPosts,
} from "../redux/actions/PostActions";
import { Button } from "rsuite";
import { CheckPicker } from "rsuite";
import { Input } from "rsuite";
import { DateRangePicker } from "rsuite";
import { BsSun } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { BsFillMoonFill, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { MdOutlineClear } from "react-icons/md";
import "./Searchbar/Searchbar.css";

const Header = ({ search, setSearch, onChange, toggleTheme }) => {
  const { filterPostsInputModel } = useSelector((state) => state.PostReducers);

  const color = [
    "Red",
    "Green",
    "Gray",
    "Gold",
    "Blue",
    "Silver",
    "Yellow",
  ].map((item) => ({ label: item, value: item.toLowerCase() }));
  const object = ["Person", "Bike", "Vehicle"].map((item) => ({
    label: item,
    value: item.toLowerCase(),
  }));
  const type = ["Truk", "Hatchback", "Sedan"].map((item) => ({
    label: item,
    value: item.toLowerCase(),
  }));

  const dispatch = useDispatch();
  const [sort, setSort] = useState("ASC");

  useEffect(() => {
    dispatch(searchPosts(search));
    if (sort === "DESC") {
      dispatch(sortPostsDesc());
    }
    if (sort === "ASC") {
      dispatch(sortPostsAsc());
    }
  }, [search, sort, dispatch]);

  const searchHandler = async (e) => {
    dispatch(filterPostsAction());
  };

  return (
    <header>
      <div className="head-bottom ">
        <div className="bottom-left">
          <Input
            placeholder="Filter..."
            size="md"
            id="search-box"
            value={search}
            onChange={onChange}
          />
        </div>
        <div className="bottom-right">
          <button type="button" onClick={toggleTheme} className="theme">
            {window.localStorage.getItem("theme") === "dark" ? (
              <BsSun />
            ) : (
              <BsFillMoonFill />
            )}
          </button>
        </div>
      </div>
      <div className="head-top">
        <div className="top-left">
          <DateRangePicker
            appearance="default"
            placeholder="Date"
            style={{ width: 234 }}
          />
          <CheckPicker
            placeholder="ObjectType"
            data={object}
            style={{ width: 234 }}
          />
          <CheckPicker
            name="colors"
            placeholder="Color"
            data={color}
            style={{ width: 234 }}
            onChange={(v) => dispatch(setFilterPostField("colors", v))}
            value={filterPostsInputModel.colors}
          />
          <CheckPicker placeholder="Type" data={type} style={{ width: 234 }} />
          <button type="button" className="theme ml-10">
            {sort === "ASC" ? (
              <BsSortDown onClick={() => setSort("DESC")} />
            ) : (
              <BsSortDownAlt onClick={() => setSort("ASC")} />
            )}
          </button>
        </div>
        <div className="top-right">
          <Button
            className="filterBtn"
            appearance="red"
            endIcon={<MdOutlineClear className="red" />}
            onClick={(e) => dispatch(clearFilterPosts())}
          >
            Clear
          </Button>
          <Button
            className="filterBtn"
            appearance="primary"
            endIcon={<BiSearch />}
            onClick={searchHandler}
          >
            Search
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
