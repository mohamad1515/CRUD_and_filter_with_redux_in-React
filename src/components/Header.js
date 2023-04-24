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
import { Button, CheckPicker, Input, DateRangePicker } from "rsuite";
import { BiSearch } from "react-icons/bi";
import { BsSun, BsFillMoonFill, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { MdOutlineClear } from "react-icons/md";
import "./Searchbar/Searchbar.css";

const Header = ({ search, setSearch, onChange, toggleTheme }) => {
  // const { filterPostsInputModel } = useSelector((state) => state.PostReducers);
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
            className="searchHeader"
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
          // value={filterPostsInputModel.objectTypes}
          />
          {!checkStatus &&
            <>
              <CheckPicker
                name="colors"
                placeholder="Color"
                data={color}
                style={{ width: 234 }}
                onChange={(v) => dispatch(setFilterPostField("colors", v))}
              // value={filterPostsInputModel.colors}
              />
              <CheckPicker
                name="vehicles"
                placeholder="Vehicle Types"
                data={type}
                style={{ width: 234 }}
                onChange={(v) => dispatch(setFilterPostField("vehicles", v))}
                // value={filterPostsInputModel.vehicleTypes}
                disabled={checkStatus}
              />
            </>
          }
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
            appearance="default"
            endIcon={<MdOutlineClear className="red" />}
            onClick={(e) => dispatch(clearFilterPosts())}
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
  );
};

export default Header;
