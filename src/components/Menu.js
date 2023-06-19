import React, { Fragment, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {PathContext} from '../App';


async function logout(path) {
  sessionStorage.removeItem('username');

  await axios.get(`${path}users/user/logout`);
}


export default function Menu() {

  const navigate = useNavigate();
  const path = useContext(PathContext);

  useEffect(() => {
    if(!sessionStorage.getItem('username')){
      navigate('/')
    }
  }, []);

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <h2>
            <Link to="/home" style={{ color: 'white', textDecoration: 'none', fontSize: '30px' }}>Home</Link>
          </h2>
          <h2 style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }}>
            Hello {sessionStorage.getItem('username')}
          </h2>
          <h2>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '15px' }} onClick={() => logout(path)}>Logout</Link>
          </h2>
        </div>
      </nav>
    </Fragment>
  );

}