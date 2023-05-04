import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  sortPostsAsc,
  sortPostsDesc,
  searchPosts,
  setFilterPostField,
  filterPostsAction,
  clearFilterPosts,
} from "../redux/actions/PostActions";
import { Button, CheckPicker, Input, InputGroup, DateRangePicker } from "rsuite";
import { BiSearch } from "react-icons/bi";
import { BsSun, BsFillMoonFill, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import SearchIcon from '@rsuite/icons/Search';
import "./Searchbar/Searchbar.css";

const styles = {
  width: 350,
  marginBottom: 10
};

const Header = ({ search, setSearch, onChange, toggleTheme }) => {
  const [checkStatus, setCheckStatus] = useState(true)
  const color = [
    "Red",
    "White",
    "Gray",
    "Gold",
    "Blue",
    "Silver",
    "Yellow",
  ].map((item) => ({ label: item, value: item.toLowerCase() }));
  const object = ["Person", "Bicycle", "Vehicle"].map((item) => ({
    label: item,
    value: item.toLowerCase(),
  }));
  const type = ["Truck", "SUV", "Sedan"].map((item) => ({
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
    console.log("searchPosts ", search)
  }, [search, sort, dispatch]);


  const objectStatus = (v) => {
    if (v.includes("vehicle")) {
      setCheckStatus(false)
    } else {
      setCheckStatus(true)
    }
  }

  const dateHandler = (v) => {
    if (v) {
      var startDate = new Date(v[0])
      var EndDate = new Date(v[1])

      var FirstDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate()
      var SecondDate = EndDate.getFullYear() + "-" + (EndDate.getMonth() + 1) + "-" + EndDate.getDate()

      var dateRange = [FirstDate, SecondDate]
      dispatch(setFilterPostField("dateRange", dateRange))
    }
    else {
      dispatch(setFilterPostField("dateRange", null))
    }
  }

  const clearHandler = () => {
    dispatch(clearFilterPosts())
    let clearChecked = document.querySelector(".rs-picker-check .rs-btn-close");
    if (clearChecked) clearChecked.click();
    let clearDateRange = document.querySelector(".rs-picker-daterange .rs-btn-close");
    if (clearDateRange) clearDateRange.click()
    setSearch("")
  }

  return (
    <>
      <header>
        <div className="head-bottom ">
          <div className="bottom-left">
            <InputGroup style={styles}>
              <Input
                value={search}
                placeholder="Filter..."
                size="md"
                id="search-box"
                onChange={onChange}
                className="searchHeader"
              />
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
            </InputGroup>
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
              placeholder="Select Date"
              onChange={(v) => dateHandler(v)}
              format="yyyy-MM-dd"
              style={{ width: 234 }}
            />

            <CheckPicker
              name="objects"
              placeholder="Object Type"
              data={object}
              style={{ width: 234 }}
              onChange={objectStatus}
              onSelect={(v) => dispatch(setFilterPostField("objects", v))}
            />
            {!checkStatus &&
              <>
                <CheckPicker
                  name="colors"
                  placeholder="Color"
                  data={color}
                  style={{ width: 234 }}
                  onChange={(v) => dispatch(setFilterPostField("colors", v))}
                />
                <CheckPicker
                  name="vehicles"
                  placeholder="Vehicle Types"
                  data={type}
                  style={{ width: 234 }}
                  onChange={(v) => dispatch(setFilterPostField("vehicles", v))}
                // disabled={checkStatus}
                />
              </>
            }
            <button type="button" className="sort ml-10">
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
              appearance="default"
              endIcon={<AiOutlineClear />}
              onClick={clearHandler}
            >
              Clear
            </Button>
            <Button
              className="filterBtn blue"
              appearance="primary"
              endIcon={<BiSearch />}
              onClick={(e) => dispatch(filterPostsAction())}
            >
              Search
            </Button>
          </div>
        </div>
      </header>
      <hr className="line" />
    </>
  );
};

export default Header;
