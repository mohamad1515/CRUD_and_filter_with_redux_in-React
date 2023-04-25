import React, { useEffect } from "react";
import { Sidenav, Nav } from "rsuite";
import Search from "@rsuite/icons/legacy/Search";
import Plus from "@rsuite/icons/legacy/Plus";
import { FiSettings } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setPage } from "../redux/actions/PostActions"

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("search");
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(setPage(activeKey))

  }, [activeKey])

  return (
    <div className="sidebar">
      <Sidenav expanded={expanded}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item
              eventKey="dashboard"
              className="dashboardIcon"
              icon={<FiSettings />}
            >
              <p>Dashboard</p>
            </Nav.Item>
            <hr />
            <Nav.Item eventKey="search" icon={<Search />}>
              Search
            </Nav.Item>
            <Nav.Item eventKey="add" icon={<Plus />}>
              Add Post
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle expanded={expanded}
          className="toggleBtn"
          onToggle={(expanded) => setExpanded(expanded)}
        />
      </Sidenav>
    </div>
  );
};

export default Sidebar;
