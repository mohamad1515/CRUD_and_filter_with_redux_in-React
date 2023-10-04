import React, { useEffect } from "react";
import { Sidenav, Nav } from "rsuite";
import { BiSearch } from "react-icons/bi";
import { RiPlayListAddFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setPage } from "../redux/actions/PostActions"
import Logo from '../assets/logo2.png'

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("search");
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPage(activeKey))
  }, [activeKey])

  return (
    <div style={{ width: expanded ? 260 : 50 }} className="sidebar">
      <Sidenav expanded={expanded}>
        <Sidenav.Header className="dashboardIcon">
          <img src={Logo} alt="toonix" />
          <p className="project">My Project</p>
        </Sidenav.Header>
        <hr />
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="search" icon={<BiSearch />} >
              Search
            </Nav.Item>
            <Nav.Item eventKey="add" icon={<RiPlayListAddFill />}>
              AddPost
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
