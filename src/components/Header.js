import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  sortPostsAsc,
  sortPostsDesc,
  searchPosts,
} from "../redux/actions/PostActions";
// import Searchbar from "./Searchbar/Searchbar";
import { Button } from 'rsuite';
import { CheckPicker } from "rsuite";
import { Input } from 'rsuite';
import { DateRangePicker } from 'rsuite';
import { BsSun } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { BsFillMoonFill, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import './Searchbar/Searchbar.css'

const Header = ({ search, setSearch, onChange, theme, toggleTheme }) => {
  const color = [
    "Red",
    "Green",
    "Gray",
    "Gold",
    "Blue",
    "Silver",
    "Yellow",
  ].map((item) => ({ label: item, value: item }));
  const object = ["Person", "Bike", "Vehicle"].map((item) => ({
    label: item,
    value: item,
  }));
  const type = ["Truk", "Hatchback", "Sedan"].map((item) => ({
    label: item,
    value: item,
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

  return (
    <header>
      <div className="head-left ">
        <DateRangePicker appearance="default" placeholder="Date" style={{ width: 234 }} />
        <CheckPicker
          placeholder="ObjectType"
          data={object}
          style={{ width: 234 }}
        />
        <CheckPicker placeholder="Color" data={color} style={{ width: 234 }} />
        <CheckPicker placeholder="Type" data={type} style={{ width: 234 }} />
      </div>
      {/* <Searchbar  /> */}
      <div className="head-right ">
        {/* <div>
          <input id="search-box" type="text"
            className="search-box" value={search}
            onChange={onChange}
          />
          <label htmlFor="search-box">
            <FiSearch className="search-icon" />
          </label>
        </div> */}
        <Input placeholder="Search..." size="md" value={search}
          onChange={onChange} />
        <Button className="filterBtn" appearance="primary" endIcon={<FiFilter />}>
          Filter
        </Button>
        <button type="button" className="theme">
          {sort === "ASC" ? (
            <BsSortDown onClick={() => setSort("DESC")} />
          ) : (
            <BsSortDownAlt onClick={() => setSort("ASC")} />
          )}
        </button>
        <button type="button" onClick={toggleTheme} className="theme">
          {window.localStorage.getItem("theme") === "dark" ? (
            <BsSun />
          ) : (
            <BsFillMoonFill />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
