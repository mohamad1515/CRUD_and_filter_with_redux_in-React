import React from "react";
import "./Searchbar.css";
import { FiSearch } from "react-icons/fi";

const Searchbar = ({ search, setSearch }) => {
  return (
    <div>
      <input id="search-box" type="text" className="search-box" />
      <label htmlFor="search-box">
        <FiSearch className="search-icon" />
      </label>
    </div>
  );
};

export default Searchbar;
