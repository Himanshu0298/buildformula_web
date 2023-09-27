import './TopNav.css';

import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import logo from 'assets/images/nav-logo.png';
import userImage from 'assets/images/user-profile.png';
import PropTypes from 'prop-types';
import { useState } from 'react';

import newproject from '../../../../src/assets/images/create-new-project.png';
import developerimg from '../../../../src/assets/images/developer.png';
import home from '../../../../src/assets/images/Home_Icon_01.png';
const TopNav = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const [state, setState] = useState({
    right: false,
  });
  const [element, setElement] = useState(null);
  const isOpen = Boolean(element);
  const handleToggle = event => {
    setElement(event.currentTarget);
  };
  const closeToggle = () => {
    setElement(null);
  };
  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <Box role="presentation" onKeyDown={toggleDrawer(anchor, false)}>
      <List
        sx={{
          display: 'flex',
          gap: '1rem',
          paddingLeft: '14px',
          alignItems: 'center',
          paddingTop: '1rem',
        }}
      >
        <h5 style={{ paddingRight: '9rem' }}>Notifications</h5>
        <button
          style={{
            backgroundColor: 'rgba(72, 114, 244, 0.1)',
            border: '1px solid transparent',
            color: ' #4872f4',
            borderRadius: '12px',
          }}
        >
          Clear All
        </button>
        <FilterListIcon
          aria-controls={isOpen ? 'basic-menu' : undefined}
          aria-expanded={isOpen ? 'true' : undefined}
          aria-haspopup="true"
          id="basic-button"
          sx={{ cursor: 'pointer' }}
          onClick={handleToggle}
        />
        <Menu
          anchorEl={element}
          id="basic-menu"
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          open={isOpen}
          onClose={closeToggle}
        >
          <div style={{ display: 'flex', alignItems: 'center', padding: '6px' }}>
            <NotificationsActiveIcon />
            <MenuItem>Read </MenuItem>
          </div>
          <Divider />
          <div style={{ display: 'flex', gap: '1px', alignItems: 'center', padding: '6px' }}>
            <NotificationsOffIcon />
            <MenuItem>Unread </MenuItem>
          </div>
        </Menu>
        <CloseIcon
          sx={{ marginRight: '15px', cursor: 'pointer' }}
          onClick={toggleDrawer('right', false)}
        />
      </List>
      <List>
        <ul className="notification-list p-0">
          <li className="notification-list-itm new-notification">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
          <li className="notification-list-itm">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
          <li className="notification-list-itm">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
          <li className="notification-list-itm">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
          <li className="notification-list-itm">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
          <li className="notification-list-itm">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
          <li className="notification-list-itm">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
          <li className="notification-list-itm">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
          <li className="notification-list-itm">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
          <li className="notification-list-itm">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
          <li className="notification-list-itm">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
          <li className="notification-list-itm">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
          <li className="notification-list-itm">
            <div className="noti-itm">
              <div className="media">
                <div className="notific-icon align-self-center">
                  <svg
                    fill="none"
                    height="26"
                    viewBox="0 0 24 26"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 24.6572V22.6572C17 21.5964 16.5786 20.5789 15.8284 19.8288C15.0783 19.0787 14.0609 18.6572 13 18.6572H5C3.93913 18.6572 2.92172 19.0787 2.17157 19.8288C1.42143 20.5789 1 21.5964 1 22.6572V24.6572"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M9 14.6572C11.2091 14.6572 13 12.8664 13 10.6572C13 8.44809 11.2091 6.65723 9 6.65723C6.79086 6.65723 5 8.44809 5 10.6572C5 12.8664 6.79086 14.6572 9 14.6572Z"
                      stroke="#041D36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                    />
                    /{'>'}
                    <path
                      d="M18.7598 11.7969C18.7702 11.1771 18.8405 10.6875 18.9707 10.3281C19.1009 9.96875 19.3665 9.57031 19.7676 9.13281L20.791 8.07812C21.2285 7.58333 21.4473 7.05208 21.4473 6.48438C21.4473 5.9375 21.304 5.51042 21.0176 5.20312C20.7311 4.89062 20.3145 4.73438 19.7676 4.73438C19.2363 4.73438 18.8092 4.875 18.4863 5.15625C18.1634 5.4375 18.002 5.8151 18.002 6.28906H16.5566C16.5671 5.44531 16.8665 4.76562 17.4551 4.25C18.0488 3.72917 18.8197 3.46875 19.7676 3.46875C20.752 3.46875 21.5176 3.73438 22.0645 4.26562C22.6165 4.79167 22.8926 5.51562 22.8926 6.4375C22.8926 7.34896 22.4707 8.2474 21.627 9.13281L20.7754 9.97656C20.3952 10.3984 20.2051 11.0052 20.2051 11.7969H18.7598ZM18.6973 14.2734C18.6973 14.0391 18.7676 13.8438 18.9082 13.6875C19.054 13.526 19.2676 13.4453 19.5488 13.4453C19.8301 13.4453 20.0436 13.526 20.1895 13.6875C20.3353 13.8438 20.4082 14.0391 20.4082 14.2734C20.4082 14.5078 20.3353 14.7031 20.1895 14.8594C20.0436 15.0104 19.8301 15.0859 19.5488 15.0859C19.2676 15.0859 19.054 15.0104 18.9082 14.8594C18.7676 14.7031 18.6973 14.5078 18.6973 14.2734Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>
                </div>
                <div className="media-body new-noti-body">
                  <h5>
                    <strong>Nilesh joshi</strong> just updated booking status for
                    <strong> Mohit pala</strong>
                    <HighlightOffIcon sx={{ marginLeft: '15px' }} />
                  </h5>
                  <p>21 May 2020, 08:00 PM</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </List>
    </Box>
  );

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '82%',
    bgcolor: 'background.paper',
    p: 0,
    borderRadius: '6px',
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        aria-labelledby={`simple-tab-${index}`}
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        role="tabpanel"
        {...other}
        style={{ backgroundColor: '#f6f7fb' }}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(event);
  };


  return (
    <div className="main-navbar">
      <div className="site-logo mr-5">
        <img className="img-responsive" src={logo} />
      </div>
      {/* <div className="input-group sm-search">
        <div className="input-group-prepend">
          <span className="input-group-text" id="addon-wrapping">
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="#041D36"
                fillOpacity="0.6"
              />
            </svg>
          </span>
        </div>
        <input className="form-control" type="text" />
      </div> */}
      <div className="navbar">
        <button
          className="nav-btn menu-btn allsites-btn"
          data-target="#exampleModal"
          data-toggle="modal"
          type="button"
          onClick={handleOpen}
        >
          <span>Dharti Saket Icon</span>
          <svg
            fill="none"
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 4H4V0H0V4ZM6 16H10V12H6V16ZM0 16H4V12H0V16ZM0 10H4V6H0V10ZM6 10H10V6H6V10ZM12 0V4H16V0H12ZM6 4H10V0H6V4ZM12 10H16V6H12V10ZM12 16H16V12H12V16Z"
              fill="#041D36"
            />
          </svg>
        </button>
        <Modal
          aria-describedby="modal-modal-description"
          aria-labelledby="modal-modal-title"
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <div className="modal-header border-bottom-0 p-0">
              <Box sx={{ width: '100%' }}>
                <Box sx={{ width: '100%' }}>
                  <Tabs
                    aria-label="basic tabs example"
                    sx={{
                      boxShadow: '0px 4px 10px rgba(4, 29, 54, 0.1)',
                      width: '100%',
                      height: '40px',
                      paddingLeft: '18px',
                    }}
                    value={value}
                    onChange={handleChange}
                  >
                    <Tab
                      label="Developer"
                      {...a11yProps(0)}
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        fontFamily: 'nunitosemibold',
                        textTransform: 'none',
                      }}
                    />
                    <Tab
                      label="Customer"
                      {...a11yProps(1)}
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        fontFamily: 'nunitosemibold',
                        paddingLeft: '50px',
                        textTransform: 'none',
                      }}
                    />
                    <button className="close mr-2" type="button" onClick={handleClose}>
                      <svg
                        fill="none"
                        height="28"
                        viewBox="0 0 28 28"
                        width="28"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.0003 0.666687C6.62699 0.666687 0.666992 6.62669 0.666992 14C0.666992 21.3734 6.62699 27.3334 14.0003 27.3334C21.3737 27.3334 27.3337 21.3734 27.3337 14C27.3337 6.62669 21.3737 0.666687 14.0003 0.666687ZM20.667 18.7867L18.787 20.6667L14.0003 15.88L9.21366 20.6667L7.33366 18.7867L12.1203 14L7.33366 9.21335L9.21366 7.33335L14.0003 12.12L18.787 7.33335L20.667 9.21335L15.8803 14L20.667 18.7867Z"
                          fill="#FF5D5D"
                        />
                      </svg>
                    </button>
                  </Tabs>
                  <CustomTabPanel index={0} value={value}>
                    <div className="modal-body select-site-modal-body p-0">
                      <div className="ss-mdl-cont-wraper">
                        <div
                          aria-labelledby="mod-Developer-tab"
                          className="tab-pane fade show active"
                          id="mod-Developer"
                          role="tabpanel"
                        >
                          <div className="board-row">
                            <div
                              className="single-board"
                              style={{ height: '180px', background: '#4872F4', width: '230px' }}
                            >
                              <div className="board-img" style={{ height: '113px' }}>
                                <img className="img-fluid img-center" src={home} width="100%" />
                              </div>
                              <h6 style={{ color: 'white', paddingTop: '10px' }}>
                                General Dashboard
                              </h6>
                            </div>
                            <div className="single-board hoverEffect ">
                              <div className="board-img">
                                <img className="img-fluid img-center" src={developerimg} />
                              </div>
                              <h6 style={{ paddingTop: '10px' }}>Drp Builds</h6>
                              <p>A-101</p>
                            </div>
                            <div className="single-board hoverEffect ">
                              <div className="board-img">
                                <img className="img-fluid img-center" src={developerimg} />
                              </div>
                              <h6 style={{ paddingTop: '10px' }}>Dream Project</h6>
                              <p>A-101</p>
                            </div>
                            <div className="single-board hoverEffect ">
                              <div className="board-img">
                                <img className="img-fluid img-center" src={developerimg} />
                              </div>
                              <h6 style={{ paddingTop: '10px' }}>Mihir Project</h6>
                              <p>A-101</p>
                            </div>
                            <div className="single-board hoverEffect ">
                              <div className="board-img">
                                <img className="img-fluid img-center" src={developerimg} />
                              </div>
                              <h6 style={{ paddingTop: '10px' }}>Sandip Test</h6>
                              <p>A-101</p>
                            </div>
                            <div className="single-board hoverEffect ">
                              <div className="board-img">
                                <img className="img-fluid img-center" src={developerimg} />
                              </div>
                              <h6 style={{ paddingTop: '10px' }}>Siya Ram</h6>
                              <p>A-101</p>
                            </div>
                          </div>
                        </div>
                        <div className="create-site-box">
                          <div className="create-site">
                            <img className="img-responsive" src={newproject} />
                            <p>Create a new project to add into the list</p>
                            <a className="btn btn-lightblue-primary" href="#">
                              Create New Project
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CustomTabPanel>
                  <CustomTabPanel index={1} value={value}>
                    <div className="modal-body select-site-modal-body p-0">
                      <div className="ss-mdl-cont-wraper">
                        <div className="tab-content" id="myTabContent">
                          <div className="board-row">
                            <div
                              className="single-board hoverEffect "
                              style={{ height: '180px', background: '#4872F4', width: '230px' }}
                            >
                              <div className="board-img">
                                <img className="img-fluid img-center" src={home} width="100%" />
                              </div>
                              <h6 style={{ color: 'white', paddingTop: '10px' }}>
                                General Dashboard
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="create-site-box">
                          <div className="create-site">
                            <img className="img-responsive" src={newproject} />
                            <p>Create a new project to add into the list</p>
                            <a className="btn btn-lightblue-primary" href="#">
                              Create New Project
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CustomTabPanel>
                </Box>
              </Box>
            </div>
          </Box>
        </Modal>
        <div className="nav-colapse-weap">
          <button
            className="nav-btn notification-btn nv-col-bt"
            onClick={toggleDrawer('right', true)}
          >
            <svg
              fill="none"
              height="20"
              viewBox="0 0 16 20"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.89 20 8 20ZM14 14V9C14 5.93 12.36 3.36 9.5 2.68V2C9.5 1.17 8.83 0.5 8 0.5C7.17 0.5 6.5 1.17 6.5 2V2.68C3.63 3.36 2 5.92 2 9V14L0 16V17H16V16L14 14Z"
                fill="#041D36"
              />
            </svg>
            <span>3</span>
          </button>
          <Drawer anchor={'right'} open={state['right']}>
            {list('right')}
          </Drawer>
        </div>

        <div className="nav-colapse-weaper">
          <button
            aria-controls="submenu-colapse"
            aria-expanded="false"
            className="user-profile nv-col-bt"
            data-target="#submenu-colapse"
            data-toggle="collapse"
            type="button"
          >
            <div className="profile-wrapper">
              <div
                className="user-profile-image"
                style={{ backgroundImage: `url(${userImage})` }}
              ></div>
              <div className="user-info">
                <h5>James Parker</h5>
                <p>Admin</p>
              </div>
            </div>
          </button>
          <div className="collapse main-submenu up-submenu" id="submenu-colapse">
            <ul className="up-op-list">
              <li>
                <a href="">
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99967 1.33331C4.31967 1.33331 1.33301 4.31998 1.33301 7.99998C1.33301 11.68 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.68 14.6663 7.99998C14.6663 4.31998 11.6797 1.33331 7.99967 1.33331ZM8.66634 12.6666H7.33301V11.3333H8.66634V12.6666ZM10.0463 7.49998L9.44634 8.11331C8.96634 8.59998 8.66634 8.99998 8.66634 9.99998H7.33301V9.66665C7.33301 8.93331 7.63301 8.26665 8.11301 7.77998L8.93967 6.93998C9.18634 6.69998 9.33301 6.36665 9.33301 5.99998C9.33301 5.26665 8.73301 4.66665 7.99967 4.66665C7.26634 4.66665 6.66634 5.26665 6.66634 5.99998H5.33301C5.33301 4.52665 6.52634 3.33331 7.99967 3.33331C9.47301 3.33331 10.6663 4.52665 10.6663 5.99998C10.6663 6.58665 10.4263 7.11998 10.0463 7.49998Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>{' '}
                  Help
                </a>
              </li>
              <li>
                <a href="">
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0003 5.33335H11.3337V4.00002C11.3337 2.16002 9.84032 0.666687 8.00033 0.666687C6.16033 0.666687 4.66699 2.16002 4.66699 4.00002V5.33335H4.00033C3.26699 5.33335 2.66699 5.93335 2.66699 6.66669V13.3334C2.66699 14.0667 3.26699 14.6667 4.00033 14.6667H12.0003C12.7337 14.6667 13.3337 14.0667 13.3337 13.3334V6.66669C13.3337 5.93335 12.7337 5.33335 12.0003 5.33335ZM8.00033 11.3334C7.26699 11.3334 6.66699 10.7334 6.66699 10C6.66699 9.26669 7.26699 8.66669 8.00033 8.66669C8.73366 8.66669 9.33366 9.26669 9.33366 10C9.33366 10.7334 8.73366 11.3334 8.00033 11.3334ZM10.067 5.33335H5.93366V4.00002C5.93366 2.86002 6.86033 1.93335 8.00033 1.93335C9.14033 1.93335 10.067 2.86002 10.067 4.00002V5.33335Z"
                      fill="#041D36"
                      fillOpacity="0.6"
                    />
                  </svg>{' '}
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
