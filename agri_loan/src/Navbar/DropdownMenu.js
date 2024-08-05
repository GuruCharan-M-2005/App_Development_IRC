import React, { useEffect, useState } from "react";
import './DropdownMenu.css';
import Lottie from 'react-lottie';
import { TbLogout, TbLogin2 } from "react-icons/tb";
import hellobot from './hellobot.json';
import { useNavigate } from 'react-router-dom';
import { Send, Activity, Info, LogOut } from 'react-feather';
import axios from 'axios';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: hellobot,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const DropdownMenu = ({ isLoggedIn, handleLogin, handleLogout }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(  () => {
    if (isLoggedIn) {
    
       axios.get('http://localhost:8080/user/loggedin')
        .then(response => {
          // const users = response.data.find(users => users.islogin === 1);
          // if (users) {
            setUsername(response.data.username);
          // }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [isLoggedIn]);

  const handleMyApplications = () => {
    navigate('/my-applications');
  };

  return (
    <div className="dropdown-menu">
      {isLoggedIn ? (
        <>
          <div className="dropdown-title">
            <div className="hellobot"><Lottie options={defaultOptions} height={50} width={50} /></div>
            <p>{username}</p>
          </div>
          <div className="drop-option">
            <div className="line"></div>
            <div><button className="drop-buttons" onClick={handleMyApplications}><Send className="dropdown-icon" /> My Applications</button></div>
            <div><button className="drop-buttons"><Activity className="dropdown-icon" /> Loan Tracker</button></div>
            <div><button className="drop-buttons"><Info className="dropdown-icon" /> Help</button></div>
            <div className="line"></div>
          </div>
          <div className="logout-function">
            <button onClick={handleLogout} className="logout-buttton"><LogOut className="dropdown-icon" />Logout</button>
          </div>
        </>
      ) : (
        <button onClick={handleLogin}><TbLogin2 /> Login</button>
      )}
    </div>
  );
};

export default DropdownMenu;
