import * as React from 'react'

const SideNav = () => {
  return (
    <nav className="new-main-menu">
      <ul>
        <li className="nav-item">
          <a>
            <span className="nav-side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 5V7H15V5H19ZM9 5V11H5V5H9ZM19 13V19H15V13H19ZM9 17V19H5V17H9ZM21 3H13V9H21V3ZM11 3H3V13H11V3ZM21 11H13V21H21V11ZM11 15H3V21H11V15Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="nav-text">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a>
            <span className="nav-side-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="nav-text">Project Structure</span>
          </a>
        </li>
        <li className="has-subnav nav-item ">
          <a
            className="nav-togle-link"
            data-toggle="collapse"
            href="#design-module"
            role="button"
            aria-expanded="false"
            aria-controls="customer-nav-menu"
          >
            <span className="nav-side-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20.97 7.26999C21.36 6.87999 21.36 6.24999 20.97 5.85999L18.14 3.02999C17.75 2.63999 17.12 2.63999 16.73 3.02999L12.24 7.51999L8.35 3.62999C7.57 2.84999 6.3 2.84999 5.52 3.62999L3.62 5.52999C2.84 6.30999 2.84 7.57999 3.62 8.35999L7.51 12.25L3 16.76V21H7.24L11.76 16.48L15.65 20.37C16.6 21.32 17.88 20.97 18.48 20.37L20.38 18.47C21.16 17.69 21.16 16.42 20.38 15.64L16.49 11.75L20.97 7.26999ZM5.04 6.93999L6.93 5.03999L8.2 6.30999L7.02 7.49999L8.43 8.90999L9.62 7.71999L10.82 8.91999L8.92 10.82L5.04 6.93999ZM16.27 14.38L15.08 15.57L16.49 16.98L17.68 15.79L18.95 17.06L17.05 18.96L13.16 15.07L15.06 13.17L16.27 14.38ZM6.41 19H5V17.59L14.61 7.97999L15.91 9.27999L16.02 9.38999L6.41 19ZM16.02 6.55999L17.43 5.14999L18.84 6.55999L17.43 7.96999L16.02 6.55999Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="nav-text">Design Module</span>
            <span className="nmnu-toggle-icon"></span>
          </a>
          <div className="collapse inner-nav" id="design-module">
            <ul>
              <li>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M18.85 10.39L19.91 9.33C20.69 8.55 20.69 7.28 19.91 6.5L18.5 5.09C17.72 4.31 16.45 4.31 15.67 5.09L14.61 6.15L18.85 10.39ZM14.61 11.81L7.41 19H6V17.59L13.19 10.4L14.61 11.81ZM13.19 7.56L4 16.76V21H8.24L17.43 11.81L13.19 7.56ZM19 17.5C19 19.69 16.46 21 14 21C13.45 21 13 20.55 13 20C13 19.45 13.45 19 14 19C15.54 19 17 18.27 17 17.5C17 17.03 16.52 16.63 15.77 16.3L17.25 14.82C18.32 15.45 19 16.29 19 17.5ZM4.58 13.35C3.61 12.79 3 12.06 3 11C3 9.2 4.89 8.37 6.56 7.64C7.59 7.18 9 6.56 9 6C9 5.59 8.22 5 7 5C5.74 5 5.2 5.61 5.17 5.64C4.82 6.05 4.19 6.1 3.77 5.76C3.36 5.42 3.28 4.81 3.62 4.38C3.73 4.24 4.76 3 7 3C9.24 3 11 4.32 11 6C11 7.87 9.07 8.72 7.36 9.47C6.42 9.88 5 10.5 5 11C5 11.31 5.43 11.6 6.07 11.86L4.58 13.35Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Rough Drawing</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13L15.5 6.5L18 9V20ZM8.82 13.05L7.4 14.46L10.94 18L16.6 12.34L15.19 10.93L10.95 15.17L8.82 13.05Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Final Drawing</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M14.4904 12.4761H10.6658V10.5638H17.7412V12.3805V14.8664V15.9182H11.2395V17.8305H19.6535V17.7349V15.9182V14.8664V12.3805V8.65153H17.7412H10.6658H8.75352V10.5638V12.4761V14.3884H14.4904V12.4761ZM20.9921 5.59188H7.31931V3.77521V3.58398V1.57609C3.11229 1.0024 1.20001 3.58398 1.20001 5.87872V17.7349C1.20001 17.8305 1.20001 17.9261 1.20001 18.0217C1.20001 20.4121 3.11229 22.3243 5.40703 22.42H5.50265C5.59826 22.42 5.59826 22.42 5.69387 22.42C5.78949 22.42 5.78949 22.42 5.8851 22.42H21.0877H23V5.59188H20.9921ZM3.11229 5.87872C3.11229 4.63574 4.06843 3.6796 5.31142 3.58398H5.40703V5.59188V7.50416V13.6235C4.5465 13.6235 3.78159 13.9103 3.11229 14.3884V5.87872ZM5.59826 20.5077C4.25966 20.5077 3.11229 19.3603 3.11229 18.0217C3.11229 16.6831 4.25966 15.5357 5.59826 15.5357C6.93686 15.5357 8.08423 16.6831 8.08423 18.0217C8.08423 19.3603 6.93686 20.5077 5.59826 20.5077ZM20.9921 20.5077H9.2316C9.70967 19.8384 9.99651 18.8822 9.99651 18.0217C9.99651 16.205 8.84914 14.5796 7.2237 13.9103V7.50416H20.8965V20.5077H20.9921Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Working Drawing</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M1 9H3V7H1V9ZM1 13H3V11H1V13ZM1 5H3V3C1.9 3 1 3.9 1 5ZM9 21H11V19H9V21ZM1 17H3V15H1V17ZM3 21V19H1C1 20.1 1.9 21 3 21ZM21 3H13V9H23V5C23 3.9 22.1 3 21 3ZM21 17H23V15H21V17ZM9 5H11V3H9V5ZM5 21H7V19H5V21ZM5 5H7V3H5V5ZM21 21C22.1 21 23 20.1 23 19H21V21ZM21 13H23V11H21V13ZM13 21H15V19H13V21ZM17 21H19V19H17V21Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Area Sheet</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M13 3H6V21H10V15H13C16.31 15 19 12.31 19 9C19 5.69 16.31 3 13 3ZM13.2 11H10V7H13.2C14.3 7 15.2 7.9 15.2 9C15.2 10.1 14.3 11 13.2 11Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Parking</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="has-subnav nav-item ">
          <a
            className="nav-togle-link"
            data-toggle="collapse"
            href="#sales-nav-menu"
            role="button"
            aria-expanded="false"
            aria-controls="sales-nav-menu"
          >
            <span className="nav-side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="nav-text">Sales</span>
            <span className="nmnu-toggle-icon"></span>
          </a>
          <div className="collapse inner-nav" id="sales-nav-menu">
            <ul>
              <li>
                <a className="active" href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18 12H14V13.5H18V12Z" fill="black" />
                      <path d="M18 15H14V16.5H18V15Z" fill="black" />
                      <path
                        d="M20 7H15V4C15 2.9 14.1 2 13 2H11C9.9 2 9 2.9 9 4V7H4C2.9 7 2 7.9 2 9V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V9C22 7.9 21.1 7 20 7ZM11 4H13V9H11V4ZM20 20H4V9H9C9 10.1 9.9 11 11 11H13C14.1 11 15 10.1 15 9H20V20Z"
                        fill="black"
                      />
                      <path
                        d="M9 15C9.82843 15 10.5 14.3284 10.5 13.5C10.5 12.6716 9.82843 12 9 12C8.17157 12 7.5 12.6716 7.5 13.5C7.5 14.3284 8.17157 15 9 15Z"
                        fill="black"
                      />
                      <path
                        d="M11.08 16.18C10.44 15.9 9.74 15.75 9 15.75C8.26 15.75 7.56 15.9 6.92 16.18C6.36 16.42 6 16.96 6 17.57V18H12V17.57C12 16.96 11.64 16.42 11.08 16.18Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Visitors</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Sales Pipeline</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM10 9H18V11H10V9ZM10 12H14V14H10V12ZM10 6H18V8H10V6Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Booking Chart</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 5H23V19H21V5ZM17 5H19V19H17V5ZM14 5H2C1.45 5 1 5.45 1 6V18C1 18.55 1.45 19 2 19H14C14.55 19 15 18.55 15 18V6C15 5.45 14.55 5 14 5ZM13 17H3V7H13V17Z"
                        fill="black"
                      />
                      <path
                        d="M7.99999 11.89C9.07694 11.89 9.94999 11.0169 9.94999 9.93999C9.94999 8.86303 9.07694 7.98999 7.99999 7.98999C6.92303 7.98999 6.04999 8.86303 6.04999 9.93999C6.04999 11.0169 6.92303 11.89 7.99999 11.89Z"
                        fill="black"
                      />
                      <path
                        d="M11.89 15.35C11.89 14.05 9.29998 13.4 7.99999 13.4C6.69999 13.4 4.10999 14.05 4.10999 15.35V16H11.89V15.35Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Broker List</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="has-subnav nav-item">
          <a
            className="nav-togle-link"
            data-toggle="collapse"
            href="#customer-nav-menu"
            role="button"
            aria-expanded="false"
            aria-controls="customer-nav-menu"
          >
            <span className="nav-side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.67 13.13C18.04 14.06 19 15.32 19 17V20H23V17C23 14.82 19.43 13.53 16.67 13.13Z"
                  fill="black"
                />
                <path
                  d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C14.53 4 14.09 4.1 13.67 4.24C14.5 5.27 15 6.58 15 8C15 9.42 14.5 10.73 13.67 11.76C14.09 11.9 14.53 12 15 12Z"
                  fill="black"
                />
                <path
                  d="M9 12C11.21 12 13 10.21 13 8C13 5.79 11.21 4 9 4C6.79 4 5 5.79 5 8C5 10.21 6.79 12 9 12ZM9 6C10.1 6 11 6.9 11 8C11 9.1 10.1 10 9 10C7.9 10 7 9.1 7 8C7 6.9 7.9 6 9 6Z"
                  fill="black"
                />
                <path
                  d="M9 13C6.33 13 1 14.34 1 17V20H17V17C17 14.34 11.67 13 9 13ZM15 18H3V17.01C3.2 16.29 6.3 15 9 15C11.7 15 14.8 16.29 15 17V18Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="nav-text">Customer section</span>
            <span className="nmnu-toggle-icon"></span>
          </a>
          <div className="collapse inner-nav" id="customer-nav-menu">
            <ul>
              <li>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 5H2C1.45 5 1 5.45 1 6V18C1 18.55 1.45 19 2 19H14C14.55 19 15 18.55 15 18V6C15 5.45 14.55 5 14 5ZM13 17H3V7H13V17Z"
                        fill="black"
                      />
                      <path
                        d="M8 11.89C9.07696 11.89 9.95 11.017 9.95 9.94C9.95 8.86304 9.07696 7.99 8 7.99C6.92304 7.99 6.05 8.86304 6.05 9.94C6.05 11.017 6.92304 11.89 8 11.89Z"
                        fill="black"
                      />
                      <path
                        d="M11.89 15.35C11.89 14.05 9.3 13.4 8 13.4C6.7 13.4 4.11 14.05 4.11 15.35V16H11.89V15.35Z"
                        fill="black"
                      />
                      <path d="M17 13H23V11H17V13Z" fill="black" />
                      <path d="M17 7H23V9H17V7Z" fill="black" />
                      <path d="M23 17H17V15H23V17Z" fill="black" />
                    </svg>
                  </span>
                  <span className="nav-text">Customer details</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="has-subnav nav-item">
          <a
            className="nav-togle-link"
            data-toggle="collapse"
            href="#pm-nav-menu"
            role="button"
            aria-expanded="false"
            aria-controls="pm-nav-menu"
          >
            <span className="nav-side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 2H9C7.897 2 7 2.897 7 4V10H5C3.897 10 3 10.897 3 12V21C3 21.552 3.447 22 4 22H20C20.553 22 21 21.552 21 21V4C21 2.897 20.103 2 19 2ZM5 12H11V20H5V12ZM19 20H13V12C13 10.897 12.103 10 11 10H9V4H19V20Z"
                  fill="black"
                />
                <path
                  d="M11 6H13V8H11V6ZM15 6H17V8H15V6ZM15 10.031H17V12H15V10.031ZM15 14H17V16H15V14ZM7 14.001H9V16.001H7V14.001Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="nav-text">Project</span>
            <span className="nmnu-toggle-icon"></span>
          </a>
          <div className="collapse inner-nav" id="pm-nav-menu">
            <ul>
              <li>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 12H22L12 3L2 12H5V20H7V18H17V20H19V12ZM7.21 10H16.79L17 10.19V12H7V10.19L7.21 10ZM14.57 8H9.43L12 5.69L14.57 8ZM7 16V14H17V16H7Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Work Master</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="17"
                      viewBox="0 0 22 17"
                      fill="none"
                    >
                      <path
                        d="M8 7L10 7L10 10L8 10L8 12.5L6 12.5L6 10L-3.0598e-07 10L0 17L6 17L6 14.5L8 14.5L8 17L14 17L14 14.5L16 14.5L16 17L22 17L22 10L16 10L16 12.5L14 12.5L14 10L12 10L12 7L14 7L14 -6.11959e-07L8 -3.49691e-07L8 7ZM2 15L2 12L4 12L4 15L2 15ZM20 12L20 15L18 15L18 12L20 12ZM12 12L12 15L10 15L10 12L12 12ZM12 2L12 5L10 5L10 2L12 2Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Work Breakdown Structure</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                    >
                      <path d="M9 3H5V7H9V3Z" fill="black" />
                      <path d="M15 3H11V7H15V3Z" fill="black" />
                      <path d="M9 9H5V13H9V9Z" fill="black" />
                      <path d="M15 9H11V13H15V9Z" fill="black" />
                      <path
                        d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H2V2H18V14Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Work Ordering</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="10"
                      viewBox="0 0 18 10"
                      fill="none"
                    >
                      <path
                        d="M0 2H14V0H0V2ZM0 6H14V4H0V6ZM0 10H14V8H0V10ZM16 10H18V8H16V10ZM16 0V2H18V0H16ZM16 6H18V4H16V6Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Planning</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                    >
                      <path
                        d="M16.5 1.5L15 0L13.5 1.5L12 0L10.5 1.5L9 0L7.5 1.5L6 0L4.5 1.5L3 0V14H0V17C0 18.66 1.34 20 3 20H15C16.66 20 18 18.66 18 17V0L16.5 1.5ZM12 18H3C2.45 18 2 17.55 2 17V16H12V18ZM16 17C16 17.55 15.55 18 15 18C14.45 18 14 17.55 14 17V14H5V3H16V17Z"
                        fill="black"
                      />
                      <path d="M12 5H6V7H12V5Z" fill="black" />
                      <path d="M15 5H13V7H15V5Z" fill="black" />
                      <path d="M12 8H6V10H12V8Z" fill="black" />
                      <path d="M15 8H13V10H15V8Z" fill="black" />
                    </svg>
                  </span>
                  <span className="nav-text">Costing</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15.1 19.37L16.1 21.11C15.14 21.55 14.09 21.84 13 21.95V19.93C13.74 19.84 14.44 19.65 15.1 19.37ZM4.06999 13H2.04999C2.15999 14.1 2.44999 15.14 2.88999 16.1L4.62999 15.1C4.34999 14.44 4.15999 13.74 4.06999 13ZM15.1 4.63L16.1 2.89C15.14 2.45 14.1 2.16 13 2.05V4.07C13.74 4.16 14.44 4.35 15.1 4.63ZM19.93 11H21.95C21.84 9.9 21.55 8.86 21.11 7.9L19.37 8.9C19.65 9.56 19.84 10.26 19.93 11ZM8.89999 19.37L7.89999 21.11C8.85999 21.55 9.90999 21.84 11 21.95V19.93C10.26 19.84 9.55999 19.65 8.89999 19.37ZM11 4.07V2.05C9.89999 2.16 8.85999 2.45 7.89999 2.89L8.89999 4.63C9.55999 4.35 10.26 4.16 11 4.07ZM18.36 7.17L20.1 6.16C19.47 5.29 18.7 4.52 17.83 3.89L16.82 5.63C17.41 6.08 17.92 6.59 18.36 7.17ZM4.62999 8.9L2.88999 7.9C2.44999 8.86 2.15999 9.9 2.04999 11H4.06999C4.15999 10.26 4.34999 9.56 4.62999 8.9ZM19.93 13C19.84 13.74 19.65 14.44 19.37 15.1L21.11 16.1C21.55 15.14 21.84 14.09 21.95 13H19.93ZM16.83 18.36L17.84 20.1C18.71 19.47 19.48 18.7 20.11 17.83L18.37 16.82C17.92 17.41 17.41 17.92 16.83 18.36ZM7.16999 5.64L6.16999 3.89C5.28999 4.53 4.52999 5.29 3.89999 6.17L5.63999 7.18C6.07999 6.59 6.58999 6.08 7.16999 5.64ZM5.63999 16.83L3.89999 17.83C4.52999 18.7 5.29999 19.47 6.16999 20.1L7.17999 18.36C6.58999 17.92 6.07999 17.41 5.63999 16.83ZM13 7H11V12.41L15.29 16.7L16.7 15.29L13 11.59V7Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Scheduling</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                    >
                      <path
                        d="M9 4H0V6H9V4ZM9 12H0V14H9V12ZM14.34 8L10.8 4.46L12.21 3.05L14.33 5.17L18.57 0.93L20 2.34L14.34 8ZM14.34 16L10.8 12.46L12.21 11.05L14.33 13.17L18.57 8.93L20 10.34L14.34 16Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Execution</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <path
                        d="M11.5 8C11.5 6.35 10.15 5 8.49999 5C6.84999 5 5.49999 6.35 5.49999 8C5.49999 9.65 6.84999 11 8.49999 11C10.15 11 11.5 9.65 11.5 8ZM8.49999 9C7.94999 9 7.49999 8.55 7.49999 8C7.49999 7.45 7.94999 7 8.49999 7C9.04999 7 9.49999 7.45 9.49999 8C9.49999 8.55 9.04999 9 8.49999 9ZM15 11C16.11 11 17 10.11 17 9C17 7.89 16.11 7 15 7C13.89 7 12.99 7.89 13 9C13 10.11 13.89 11 15 11ZM10.99 0.0100021C5.46999 0.0100021 0.98999 4.49 0.98999 10.01C0.98999 15.53 5.46999 20.01 10.99 20.01C16.51 20.01 20.99 15.53 20.99 10.01C20.99 4.49 16.51 0.0100021 10.99 0.0100021ZM4.83999 15.12C5.51999 14.58 7.10999 14.01 8.49999 14.01C8.56999 14.01 8.64999 14.02 8.72999 14.02C8.96999 13.38 9.39999 12.73 10.03 12.16C9.46999 12.06 8.93999 12 8.49999 12C7.19999 12 5.10999 12.45 3.76999 13.43C3.26999 12.39 2.98999 11.23 2.98999 10C2.98999 5.59 6.57999 2 10.99 2C15.4 2 18.99 5.59 18.99 10C18.99 11.2 18.72 12.34 18.24 13.37C17.24 12.78 15.88 12.5 15 12.5C13.48 12.5 10.5 13.31 10.5 15.2V17.98C8.22999 17.85 6.20999 16.77 4.83999 15.12Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">RACI</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="has-subnav nav-item">
          <a
            className="nav-togle-link"
            data-toggle="collapse"
            href="#cm-nav-menu"
            role="button"
            aria-expanded="false"
            aria-controls="cm-nav-menu"
          >
            <span className="nav-side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 15C6.33 15 1 16.34 1 19V21H17V19C17 16.34 11.67 15 9 15ZM3 19C3.22 18.28 6.31 17 9 17C11.7 17 14.8 18.29 15 19H3Z"
                  fill="black"
                />
                <path
                  d="M4.74 9H5C5 11.21 6.79 13 9 13C11.21 13 13 11.21 13 9H13.26C13.53 9 13.75 8.78 13.75 8.51V8.49C13.75 8.22 13.53 8 13.26 8H13C13 6.52 12.19 5.25 11 4.55V5.5C11 5.78 10.78 6 10.5 6C10.22 6 10 5.78 10 5.5V4.14C9.68 4.06 9.35 4 9 4C8.65 4 8.32 4.06 8 4.14V5.5C8 5.78 7.78 6 7.5 6C7.22 6 7 5.78 7 5.5V4.55C5.81 5.25 5 6.52 5 8H4.74C4.47 8 4.25 8.22 4.25 8.49V8.52C4.25 8.78 4.47 9 4.74 9ZM11 9C11 10.1 10.1 11 9 11C7.9 11 7 10.1 7 9H11Z"
                  fill="black"
                />
                <path
                  d="M21.98 6.23L22.91 5.4L22.16 4.1L20.97 4.49C20.83 4.38 20.67 4.29 20.5 4.22L20.25 3H18.75L18.5 4.22C18.33 4.29 18.17 4.38 18.02 4.49L16.84 4.1L16.09 5.4L17.02 6.23C17 6.4 17 6.58 17.02 6.75L16.09 7.6L16.84 8.9L18.04 8.52C18.17 8.62 18.32 8.7 18.47 8.77L18.75 10H20.25L20.52 8.78C20.68 8.71 20.82 8.63 20.96 8.53L22.15 8.91L22.9 7.61L21.97 6.76C22 6.57 21.99 6.4 21.98 6.23ZM19.5 7.75C18.81 7.75 18.25 7.19 18.25 6.5C18.25 5.81 18.81 5.25 19.5 5.25C20.19 5.25 20.75 5.81 20.75 6.5C20.75 7.19 20.19 7.75 19.5 7.75Z"
                  fill="black"
                />
                <path
                  d="M19.4 10.79L18.55 11.07C18.45 10.99 18.34 10.93 18.22 10.88L18.04 10H16.97L16.79 10.87C16.67 10.92 16.55 10.99 16.45 11.06L15.61 10.78L15.07 11.71L15.73 12.3C15.72 12.43 15.72 12.55 15.73 12.67L15.07 13.28L15.61 14.21L16.47 13.94C16.57 14.01 16.67 14.07 16.78 14.12L16.96 15H18.03L18.22 14.13C18.33 14.08 18.44 14.02 18.54 13.95L19.39 14.22L19.93 13.29L19.27 12.68C19.28 12.55 19.28 12.43 19.27 12.31L19.93 11.72L19.4 10.79ZM17.5 13.39C17.01 13.39 16.61 12.99 16.61 12.5C16.61 12.01 17.01 11.61 17.5 11.61C17.99 11.61 18.39 12.01 18.39 12.5C18.39 12.99 17.99 13.39 17.5 13.39Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="nav-text">Contractor</span>
            <span className="nmnu-toggle-icon"></span>
          </a>
          <div className="collapse inner-nav" id="cm-nav-menu">
            <ul>
              <li>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 15H14V17H7V15ZM7 11H17V13H7V11ZM7 7H17V9H7V7ZM19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C4.86 3 4.73 3.01 4.6 3.04C4.21 3.12 3.86 3.32 3.59 3.59C3.41 3.77 3.26 3.99 3.16 4.23C3.06 4.46 3 4.72 3 5V19C3 19.27 3.06 19.54 3.16 19.78C3.26 20.02 3.41 20.23 3.59 20.42C3.86 20.69 4.21 20.89 4.6 20.97C4.73 20.99 4.86 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 2.75C12.41 2.75 12.75 3.09 12.75 3.5C12.75 3.91 12.41 4.25 12 4.25C11.59 4.25 11.25 3.91 11.25 3.5C11.25 3.09 11.59 2.75 12 2.75ZM19 19H5V5H19V19Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Proposal</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM6 20V4H13V8H18V20H6ZM11 19H13V18H14C14.55 18 15 17.55 15 17V14C15 13.45 14.55 13 14 13H11V12H15V10H13V9H11V10H10C9.45 10 9 10.45 9 11V14C9 14.55 9.45 15 10 15H13V16H9V18H11V19Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Quotation</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6H12L10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V6H9.17L11.17 8H20V18ZM18 12H6V10H18V12ZM14 16H6V14H14V16Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Work orders</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H20V18ZM4 0H20V2H4V0ZM4 22H20V24H4V22ZM12 12C13.38 12 14.5 10.88 14.5 9.5C14.5 8.12 13.38 7 12 7C10.62 7 9.5 8.12 9.5 9.5C9.5 10.88 10.62 12 12 12ZM12 8.5C12.55 8.5 13 8.95 13 9.5C13 10.05 12.55 10.5 12 10.5C11.45 10.5 11 10.05 11 9.5C11 8.95 11.45 8.5 12 8.5ZM17 15.99C17 13.9 13.69 13 12 13C10.31 13 7 13.9 7 15.99V17H17V15.99ZM8.81 15.5C9.42 14.98 10.84 14.5 12 14.5C13.17 14.5 14.59 14.98 15.2 15.5H8.81Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Contactor List</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="has-subnav nav-item">
          <a
            className="nav-togle-link"
            data-toggle="collapse"
            href="#mm-nav-menu"
            role="button"
            aria-expanded="false"
            aria-controls="mm-nav-menu"
          >
            <span className="nav-side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5999 8.79986H19.5865L16.4694 3.6053C16.0547 2.88818 15.2874 2.39978 14.3999 2.39978C13.5117 2.39978 12.7451 2.88818 12.3304 3.60458L9.21326 8.79986H7.74998L6.79046 5.59994H2.3999V7.19978H5.59982L7.99982 15.2002V21.6003H9.5999L12.5625 17.155L16.8217 18.9816C16.8155 19.0534 16.7999 19.1252 16.7999 19.2003C16.7999 20.5253 17.8749 21.6003 19.1999 21.6003C20.5249 21.6003 21.5999 20.5253 21.5999 19.2003C21.5999 17.8752 20.5249 16.8003 19.1999 16.8003C18.5272 16.8003 17.9209 17.0784 17.4849 17.5253L15.3779 16.6222L21.5999 10.3999V8.79986ZM19.1999 18.4004C19.6413 18.4004 19.9998 18.758 19.9998 19.2003C19.9998 19.6409 19.6413 20.0002 19.1999 20.0002C18.7585 20.0002 18.4 19.6409 18.4 19.2003C18.4 18.758 18.7585 18.4004 19.1999 18.4004ZM13.7022 4.42754C13.8625 4.15178 14.1186 3.99986 14.3999 3.99986C14.6812 3.99986 14.9373 4.15178 15.0844 4.40642L17.7203 8.79986H11.0788L13.7022 4.42754ZM9.5999 18.7157V15.8861L11.067 16.5142L9.5999 18.7157ZM13.7946 15.9425L9.31718 14.0237L8.2307 10.3999H19.3377L13.7946 15.9425Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="nav-text">Material</span>
            <span className="nmnu-toggle-icon"></span>
          </a>
          <div className="collapse inner-nav" id="mm-nav-menu">
            <ul>
              <li>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.66 4.51994L19.49 7.34994L16.66 10.1799L13.83 7.34994L16.66 4.51994V4.51994ZM9 4.99994V8.99994H5V4.99994H9ZM19 14.9999V18.9999H15V14.9999H19ZM9 14.9999V18.9999H5V14.9999H9ZM16.66 1.68994L11 7.33994L16.66 12.9999L22.32 7.33994L16.66 1.68994ZM11 2.99994H3V10.9999H11V2.99994ZM21 12.9999H13V20.9999H21V12.9999ZM11 12.9999H3V20.9999H11V12.9999Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Material master</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4.58 16.59L4 17.17V4H20V16ZM6 12H8V14H6V12ZM6 9H8V11H6V9ZM6 6H8V8H6V6ZM10 12H15V14H10V12ZM10 9H18V11H10V9ZM10 6H18V8H10V6Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Material Request</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 18H9V16H3V18ZM3 6V8H21V6H3ZM3 13H15V11H3V13Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Material Order</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.3999 2.40002V21.6H21.5999V2.40002H2.3999ZM3.99998 3.99986H11.2V6.79994H3.99998V3.99986ZM15.5999 8.40002V11.2001H8.3999V8.40002H15.5999ZM3.99998 8.40002H6.79982V11.2001H3.99998V8.40002ZM3.99998 12.7999H11.2V15.6H3.99998V12.7999ZM6.79982 19.9999H3.99998V17.2001H6.79982V19.9999V19.9999ZM15.5999 19.9999H8.3999V17.2001H15.5999V19.9999ZM19.9998 19.9999H17.2V17.2001H19.9998V19.9999ZM19.9998 15.6H12.7998V12.7999H19.9998V15.6ZM19.9998 11.2001H17.2V8.40002H19.9998V11.2001ZM19.9998 6.79994H12.7998V3.99986H19.9998V6.79994Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Material Utility</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3H4C3.447 3 3 3.447 3 4V10C3 10.553 3.447 11 4 11H10C10.553 11 11 10.553 11 10V4C11 3.447 10.553 3 10 3ZM9 9H5V5H9V9ZM20 13H14C13.447 13 13 13.447 13 14V20C13 20.553 13.447 21 14 21H20C20.553 21 21 20.553 21 20V14C21 13.447 20.553 13 20 13ZM19 19H15V15H19V19ZM17 3C14.794 3 13 4.794 13 7C13 9.206 14.794 11 17 11C19.206 11 21 9.206 21 7C21 4.794 19.206 3 17 3ZM17 9C15.897 9 15 8.103 15 7C15 5.897 15.897 5 17 5C18.103 5 19 5.897 19 7C19 8.103 18.103 9 17 9ZM7 13C4.794 13 3 14.794 3 17C3 19.206 4.794 21 7 21C9.206 21 11 19.206 11 17C11 14.794 9.206 13 7 13ZM7 19C5.897 19 5 18.103 5 17C5 15.897 5.897 15 7 15C8.103 15 9 15.897 9 17C9 18.103 8.103 19 7 19Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Material Inventory</span>
                </a>
                <a href="">
                  <span className="nav-side-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 7H17V9H11V7ZM11 11H17V13H11V11ZM11 15H17V17H11V15ZM7 7H9V9H7V7ZM7 11H9V13H7V11ZM7 15H9V17H7V15ZM20.1 3H3.9C3.4 3 3 3.4 3 3.9V20.1C3 20.5 3.4 21 3.9 21H20.1C20.5 21 21 20.5 21 20.1V3.9C21 3.4 20.5 3 20.1 3V3ZM19 19H5V5H19V19Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span className="nav-text">Suppliers List</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a>
            <span className="nav-side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 16H16V18H8V16ZM8 12H16V14H8V12ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="nav-text">Files</span>
          </a>
        </li>
        <li className="nav-item">
          <a>
            <span className="nav-side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 18V17.35C4 17.01 4.16 16.69 4.41 16.54C6.1 15.53 8.03 15 10 15C10.03 15 10.05 15 10.08 15.01C10.18 14.31 10.38 13.64 10.67 13.03C10.45 13.01 10.23 13 10 13C7.58 13 5.32 13.67 3.39 14.82C2.51 15.34 2 16.32 2 17.35V20H11.26C10.84 19.4 10.51 18.72 10.29 18H4Z"
                  fill="black"
                />
                <path
                  d="M10 12C12.21 12 14 10.21 14 8C14 5.79 12.21 4 10 4C7.79 4 6 5.79 6 8C6 10.21 7.79 12 10 12ZM10 6C11.1 6 12 6.9 12 8C12 9.1 11.1 10 10 10C8.9 10 8 9.1 8 8C8 6.9 8.9 6 10 6Z"
                  fill="black"
                />
                <path
                  d="M20.75 16C20.75 15.78 20.72 15.58 20.69 15.37L21.83 14.36L20.83 12.63L19.38 13.12C19.06 12.85 18.7 12.64 18.3 12.49L18 11H16L15.7 12.49C15.3 12.64 14.94 12.85 14.62 13.12L13.17 12.63L12.17 14.36L13.31 15.37C13.28 15.58 13.25 15.78 13.25 16C13.25 16.22 13.28 16.42 13.31 16.63L12.17 17.64L13.17 19.37L14.62 18.88C14.94 19.15 15.3 19.36 15.7 19.51L16 21H18L18.3 19.51C18.7 19.36 19.06 19.15 19.38 18.88L20.83 19.37L21.83 17.64L20.69 16.63C20.72 16.42 20.75 16.22 20.75 16ZM17 18C15.9 18 15 17.1 15 16C15 14.9 15.9 14 17 14C18.1 14 19 14.9 19 16C19 17.1 18.1 18 17 18Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="nav-text">Members and Roles</span>
          </a>
        </li>
      </ul>
      <ul className="logout">
        <li className="nav-item">
          <a>
            <span className="nav-side-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.4298 12.98C19.4698 12.66 19.4998 12.34 19.4998 12C19.4998 11.66 19.4698 11.34 19.4298 11.02L21.5398 9.37C21.7298 9.22 21.7798 8.95 21.6598 8.73L19.6598 5.27C19.5698 5.11 19.3998 5.02 19.2198 5.02C19.1598 5.02 19.0998 5.03 19.0498 5.05L16.5598 6.05C16.0398 5.65 15.4798 5.32 14.8698 5.07L14.4898 2.42C14.4598 2.18 14.2498 2 13.9998 2H9.99984C9.74984 2 9.53984 2.18 9.50984 2.42L9.12984 5.07C8.51984 5.32 7.95984 5.66 7.43984 6.05L4.94984 5.05C4.88984 5.03 4.82984 5.02 4.76984 5.02C4.59984 5.02 4.42984 5.11 4.33984 5.27L2.33984 8.73C2.20984 8.95 2.26984 9.22 2.45984 9.37L4.56984 11.02C4.52984 11.34 4.49984 11.67 4.49984 12C4.49984 12.33 4.52984 12.66 4.56984 12.98L2.45984 14.63C2.26984 14.78 2.21984 15.05 2.33984 15.27L4.33984 18.73C4.42984 18.89 4.59984 18.98 4.77984 18.98C4.83984 18.98 4.89984 18.97 4.94984 18.95L7.43984 17.95C7.95984 18.35 8.51984 18.68 9.12984 18.93L9.50984 21.58C9.53984 21.82 9.74984 22 9.99984 22H13.9998C14.2498 22 14.4598 21.82 14.4898 21.58L14.8698 18.93C15.4798 18.68 16.0398 18.34 16.5598 17.95L19.0498 18.95C19.1098 18.97 19.1698 18.98 19.2298 18.98C19.3998 18.98 19.5698 18.89 19.6598 18.73L21.6598 15.27C21.7798 15.05 21.7298 14.78 21.5398 14.63L19.4298 12.98V12.98ZM17.4498 11.27C17.4898 11.58 17.4998 11.79 17.4998 12C17.4998 12.21 17.4798 12.43 17.4498 12.73L17.3098 13.86L18.1998 14.56L19.2798 15.4L18.5798 16.61L17.3098 16.1L16.2698 15.68L15.3698 16.36C14.9398 16.68 14.5298 16.92 14.1198 17.09L13.0598 17.52L12.8998 18.65L12.6998 20H11.2998L11.1098 18.65L10.9498 17.52L9.88984 17.09C9.45984 16.91 9.05984 16.68 8.65984 16.38L7.74984 15.68L6.68984 16.11L5.41984 16.62L4.71984 15.41L5.79984 14.57L6.68984 13.87L6.54984 12.74C6.51984 12.43 6.49984 12.2 6.49984 12C6.49984 11.8 6.51984 11.57 6.54984 11.27L6.68984 10.14L5.79984 9.44L4.71984 8.6L5.41984 7.39L6.68984 7.9L7.72984 8.32L8.62984 7.64C9.05984 7.32 9.46984 7.08 9.87984 6.91L10.9398 6.48L11.0998 5.35L11.2998 4H12.6898L12.8798 5.35L13.0398 6.48L14.0998 6.91C14.5298 7.09 14.9298 7.32 15.3298 7.62L16.2398 8.32L17.2998 7.89L18.5698 7.38L19.2698 8.59L18.1998 9.44L17.3098 10.14L17.4498 11.27ZM11.9998 8C9.78984 8 7.99984 9.79 7.99984 12C7.99984 14.21 9.78984 16 11.9998 16C14.2098 16 15.9998 14.21 15.9998 12C15.9998 9.79 14.2098 8 11.9998 8ZM11.9998 14C10.8998 14 9.99984 13.1 9.99984 12C9.99984 10.9 10.8998 10 11.9998 10C13.0998 10 13.9998 10.9 13.9998 12C13.9998 13.1 13.0998 14 11.9998 14Z"
                  fill="black"
                />
              </svg>
            </span>
            <span className="nav-text">Settings</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default SideNav