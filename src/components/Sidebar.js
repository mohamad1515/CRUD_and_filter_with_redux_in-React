import React from "react";
import { Sidenav, Nav } from "rsuite";
import Search from "@rsuite/icons/legacy/Search";
import { FiSettings } from "react-icons/fi";

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("1");
  return (
    <div className="sidebar">
      <Sidenav expanded={expanded}>
        <Sidenav.Body>
          <Nav activeKey={activeKey}>
            <Nav.Item
              eventKey="1"
              className="dashboardIcon"
              icon={<FiSettings />}
            >
              <p>Dashboard</p>
            </Nav.Item>
            <hr />
            <Nav.Item eventKey="2" icon={<Search />}>
              Search
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle
          className="toggleBtn"
          expanded={expanded}
          onToggle={(expanded) => setExpanded(expanded)}
        />
      </Sidenav>
    </div>
  );
};

export default Sidebar;
