import React from 'react'
import {Menu, Button, Dropdown, Row, Col} from "antd";
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

function DefaultLayout(props) {
  function logout(){
    localStorage.removeItem('user');
    window.location.href="/login";
  }
  const user = JSON.parse(localStorage.getItem('user'))
  const menu = (<Menu>
    <Menu.Item>item 1</Menu.Item>
    <Menu.Item>item 2</Menu.Item>
    <Menu.SubMenu title="sub menu">
      <Menu.Item>item 3</Menu.Item>
    </Menu.SubMenu>
  </Menu>
  );

  return (
    <div>
        <div className='header br1'>
          <Row gutter={16} justify="center">
            <Col lg={20} sm={24} xs={24}>
              <div className='d-flex justify-content-between'>
                  <h1><Link to="/">RentOnTheGo</Link></h1>
                  <div className='d-flex'>
                  <Dropdown overlay={menu} placement="bottom-center">
                    <Button>{user?.username}</Button>
                  </Dropdown>
                   <button className="btn1" onClick={logout} style={{padding: "0", height: "35px"}}>Logout</button>
                  </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='content'>
            {props.children}
        </div>
    </div>
  )
}

export default DefaultLayout