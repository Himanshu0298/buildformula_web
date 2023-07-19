const BookingForm = () => {
  return (
    <>
      <div className="header-bar">
        <div className="page-header">
          <button className="header-back-btn">
            <svg
              fill="none"
              height="12"
              viewBox="0 0 18 12"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z"
                fill="#041D36"
              ></path>
            </svg>
          </button>
          <h2 className="mx-4">Booking Form</h2>
        </div>
        <div className="booking-form-header new-booking-header ml-auto">
          <h5>
            Project type:<span>Apartment</span>
          </h5>
          <h5>
            Tower:<span>A</span>
          </h5>
          <h5>
            Floor:<span>12th Floor</span>
          </h5>
          <h5 style={{ marginRight: '38px' }}>
            Unit number:<span>1204</span>
          </h5>
          <div className="booking-timer">
            <p>
              Time Left: <span>27 : 29</span>
            </p>
          </div>
        </div>
      </div>

      <hr />

      <section className="booking-form-sec pt-0">
        <div className="booking-form-row">
          <div className="booking-form-row-header">
            <h4>Customer Details</h4>
          </div>

          <div className="booking-form-box shwan-form">
            <div className="booking-form-col-6">
              <div className="d-flex align-items-center justify-content-between">
                <h5>CUSTOMER DETAILS</h5>
                <button>Add Customer</button>
              </div>

              <div className="input-group has-search input-group sm-search modal-search p-0 mb-5 mt-5">
                <div className="input-group-prepend input-group-text">
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
                    ></path>
                  </svg>
                </div>
                <input
                  className="form-control ui-autocomplete-input"
                  id="visitors_details"
                  name="visitors_details"
                  type="text"
                />
                <div className="input-group-append">
                  <button className="btn btn-lightblue-primary lbps-btn btn-search-append">
                    Search
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col form-col-gap">
                  <label>First Name</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group col">
                  <label>Last Name</label>
                  <input className="form-control" type="text" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <label>Email</label>
                  <input className="form-control" type="text" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col form-col-gap">
                  <label>Phone</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group col form-col-gap">
                  <label>Through broker?</label>
                  <div className="rd-grp form-check-inline">
                    <label className="rd-container check-yes mx-4">
                      yes
                      <input className="filem-check" name="radio" type="radio" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="rd-container check-no mx-5">
                      no
                      <input className="filem-check" name="radio" type="radio" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex mt-5">
                <div>
                  <button className="btn btn-lightblue-primary m-0">Next</button>
                </div>
                <div>
                  <button className="table-edit-btn edit-btn-area save-btn print-icon-btn">
                    <svg
                      fill="#4872F4"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" />
                      <circle cx="18" cy="11.5" r="1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="booking-form-col-6">
              <h5>BROKER DETAILS</h5>

              <div className="input-group has-search input-group sm-search modal-search p-0 mb-5 mt-5">
                <div className="input-group-prepend input-group-text">
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
                    ></path>
                  </svg>
                </div>
                <input className="form-control" type="text" />
                <div className="input-group-append">
                  <button className="btn btn-lightblue-primary lbps-btn btn-search-append">
                    Search
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col form-col-gap">
                  <label>First Name</label>
                  <h6>Jatin</h6>
                </div>
                <div className="form-group col">
                  <label htmlFor="inputPassword4">Last Name</label>
                  <h6>Pandya</h6>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <label>Email</label>
                  <h6>jatinp@gmail.com</h6>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col form-col-gap">
                  <label>Phone</label>
                  <h6>+91 8460159550</h6>
                </div>
                <div className="form-group col"></div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <label>Remarks (optional)</label>
                  <textarea className="form-control" rows={4}></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-form-row">
          <div className="booking-form-row-header">
            <h4>Booking Rate</h4>
          </div>

          <div className="booking-form-box shwan-form container-fluid">
            <div className="w-100 align-items-end">
              <div className="booking-form-col-12 col-8">
                <h5>BASIC AMOUNT</h5>

                <div className="form-row">
                  <div className="form-group col-3">
                    <label>Super Build-up Area</label>
                    <div className="form-row">
                      <div className="col-12">
                        <input className="form-control" placeholder="Amount" type="text" />
                      </div>
                    </div>
                  </div>

                  <div className="form-group col-3">
                    <label>Build-up Area</label>
                    <div className="form-row">
                      <div className="col-12">
                        <input className="form-control" placeholder="Amount" type="text" />
                      </div>
                    </div>
                  </div>

                  <div className="form-group col-5">
                    <label>Carpet Area</label>
                    <div className="form-row">
                      <div className="col-7">
                        <input className="form-control" placeholder="Amount" type="text" />
                      </div>
                      <div className="col-4">
                        <div className="new-custom-select">
                          <select className="form-control">
                            <option value="0">Unit</option>
                            <option value="1">Var</option>
                            <option value="2">Sqm^2</option>
                            <option value="3">Sqft</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-3">
                    <label>Super Build-up Rate</label>
                    <div className="form-row">
                      <div className="col-12">
                        <input className="form-control" placeholder="Amount" type="text" />
                      </div>
                      <div className="col-4"></div>
                    </div>
                  </div>

                  <div className="form-group col-3">
                    <label>Build-up Rate</label>
                    <div className="form-row">
                      <div className="col-12">
                        <input className="form-control" placeholder="Amount" type="text" />
                      </div>
                      <div className="col-4"></div>
                    </div>
                  </div>

                  <div className="form-group col-3">
                    <label>Rate for Carpet</label>
                    <div className="form-row">
                      <div className="col-12">
                        <input className="form-control" placeholder="Amount" type="text" />
                      </div>
                      <div className="col-4"></div>
                    </div>
                  </div>
                </div>

                <h6>Total Basic Amount</h6>

                <div className="form-row">
                  <div className="form-group col-3">
                    <label>As Super Buildup</label>
                    <div className="form-row">
                      <div className="col-12">
                        <input
                          className="form-control form-control-view"
                          placeholder="Amount"
                          type="text"
                        />
                      </div>
                      <div className="col-4"></div>
                    </div>
                  </div>

                  <div className="form-group col-3">
                    <label>As Buildup</label>
                    <div className="form-row">
                      <div className="col-12">
                        <input
                          className="form-control form-control-view"
                          placeholder="Amount"
                          type="text"
                        />
                      </div>
                      <div className="col-4"></div>
                    </div>
                  </div>

                  <div className="form-group col-3">
                    <label>As Carpet</label>
                    <div className="form-row">
                      <div className="col-12">
                        <input
                          className="form-control form-control-view"
                          placeholder="Amount"
                          type="text"
                        />
                      </div>
                      <div className="col-4"></div>
                    </div>
                  </div>
                </div>

                <h5>OTHER CHARGES</h5>

                <div className="form-row mb-4">
                  <div className="col-4">
                    <div className="new-custom-select">
                      <select className="form-control">
                        <option value="0">Select Charge</option>
                        <option value="1">A</option>
                        <option value="2">B</option>
                        <option value="3">C</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-row align-items-start">
                  <div className="col col-md-8">
                    <div className="form-group row align-item-center">
                      <div className="col-6">
                        <label className="">Electric Charge</label>
                      </div>
                      <div className="col-6">
                        <input className="form-control" placeholder="Amount" type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="col col-md-2">
                    <button className="clos-icon-btn">
                      <svg
                        fill="none"
                        height="12"
                        viewBox="0 0 12 12"
                        width="12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z"
                          fill="#FF5D5D"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="form-row align-items-start">
                  <div className="col col-md-8">
                    <div className="form-group row align-item-center">
                      <div className="col-6">
                        <label className="">Government Taxes</label>
                      </div>
                      <div className="col-6">
                        <input className="form-control" placeholder="Amount" type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="col col-md-2">
                    <button className="clos-icon-btn">
                      <svg
                        fill="none"
                        height="12"
                        viewBox="0 0 12 12"
                        width="12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z"
                          fill="#FF5D5D"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col col-md-8">
                    <div className="form-group row">
                      <div className="col-6">
                        <input className="form-control" placeholder="Charge Name" type="text" />
                      </div>
                      <div className="col-6">
                        <input className="form-control" placeholder="Amount" type="text" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <button className="btn add-blue-btn">
                      <svg
                        fill="none"
                        height="12"
                        viewBox="0 0 12 12"
                        width="12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.25 6.75H6.75V11.25H5.25V6.75H0.75V5.25H5.25V0.75H6.75V5.25H11.25V6.75Z"
                          fill="#4872F4"
                        />
                      </svg>
                      Create New
                    </button>
                  </div>
                </div>

                <div className="bmsec">
                  <div className="form-row">
                    <div className="col col-8 form-col-gap">
                      <div className="form-group row align-item-center">
                        <div className="col-6">
                          <label className="">Discount amount</label>
                        </div>
                        <div className="col-6">
                          <input className="form-control" placeholder="Amount" type="text" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group col form-col-gap"></div>
                    <div className="form-group col"></div>
                  </div>

                  <div className="form-row align-items-center">
                    <div className="col col-8 form-col-gap">
                      <div className="form-group row align-item-center mb-0 discount-wrapper">
                        <div className="col-6">
                          <label className="">Documentation charges</label>
                        </div>
                        <div className="col-6">
                          <div className="input-group">
                            <input
                              className="form-control"
                              maxLength={5}
                              placeholder="00000"
                              size={5}
                              type="text"
                            />
                            <span className="dot-span">.</span>
                            <input
                              className="form-control"
                              maxLength={4}
                              placeholder="0000"
                              size={4}
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="book-side-notes">
                        <p>
                          <span>Note: </span> Documentation charges will be collected first to
                          confirm your booking
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="btn btn-lightblue-primary">Next</button>
              </div>

              <div className="col-4">
                <div className="book-sidebar">
                  <div className="book-sidebar-header">
                    <h5>Booking Rate</h5>
                  </div>
                  <div className="book-sidebar-body">
                    <div className="bdbr-row">
                      <h6>Basic amount</h6>
                      <p>₹ 1500000</p>
                    </div>
                    <div className="bdbr-row">
                      <h6>Total other charges</h6>
                      <p>₹ 80000</p>
                    </div>
                    <hr />
                    <div className="bdbr-row">
                      <h6>Total amount</h6>
                      <p>₹ 25000</p>
                    </div>
                    <div className="bdbr-row">
                      <h6>Discount</h6>
                      <p>₹ 25000</p>
                    </div>
                  </div>
                  <div className="book-sidebar-footer">
                    <h5>Property Final amount</h5>
                    <p>₹ 15,00,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-form-row">
          <div className="booking-form-row-header">
            <h4>Payment schedule</h4>
          </div>

          <div className="booking-form-box shwan-form">
            <div className="booking-form-col-12">
              <div className="form-row">
                <div className="col-4">
                  <label>Do you wish to take a loan?</label>
                  <div className="form-row">
                    <div className="col-6">
                      <div className="rd-grp form-check-inline">
                        <label className="rd-container check-yes">
                          Yes
                          <input checked={true} name="radio" type="radio" />
                          <span className="checkmark"></span>
                        </label>
                        <label className="rd-container check-no">
                          No
                          <input name="radio" type="radio" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col-4">
                  <div className="new-custom-select">
                    <select className="form-control">
                      <option value="0">Choose a bank</option>
                      <option value="1">Var</option>
                      <option value="2">Sqm^2</option>
                      <option value="3">Sqft</option>
                    </select>
                  </div>
                </div>

                <div className="col-4">
                  <label>Loan Amount</label>
                  <input className="form-control" type="text" />
                </div>

                <div className="col-4">
                  <label>Remarks</label>
                  <input className="form-control" type="text" />
                </div>
              </div>

              <div className="divider-line"></div>

              <div className="form-row">
                <div className="form-group col-4">
                  <h5 className="mb-2">Payment Method</h5>
                  <div className="new-custom-select">
                    <select className="form-control">
                      <option value="0">Select payment method</option>
                      <option value="1">Full payment</option>
                      <option value="2">Custom payment</option>
                      <option value="3">Downpayment & installment</option>
                    </select>
                  </div>
                </div>
              </div>

              <h5>FULL PAYMENT</h5>

              <div className="form-row">
                <div className="form-group col-3 form-col-gap">
                  <label className="text-orange">Documentation charges</label>
                  <input className="form-control orange-form-control" type="text" />
                </div>

                <div className="form-group col-2 form-col-gap">
                  <label className="text-orange" htmlFor="bfrom">
                    Start date
                  </label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input  orange-form-control"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>

                <div className="form-group col-2 form-col-gap">
                  <label className="text-orange" htmlFor="bfrom">
                    End date
                  </label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input  orange-form-control"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-3 form-col-gap">
                  <label>Property Final Amount</label>
                  <input className="form-control" type="text" />
                </div>

                <div className="form-group col-2 form-col-gap">
                  <label htmlFor="bfrom">Start Date</label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>

                <div className="form-group col-2">
                  <label htmlFor="bfrom">End Date</label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="form-row">

            <div className="form-group col form-col-gap">
              <label>Total other charges</label>
              <input type="text" className="form-control" />
            </div>

            <div className="form-group col form-col-gap">
              <label htmlFor="bfrom">Date</label>
              <div className="date-form-control">
                <input type="text" className="form-control" id="bfrom" />
                <span><svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 0V2H2C0.9 2 0 2.9 0 4V18C0 19.1 0.9 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2H15V0H13V2H5V0H3ZM2 7H16V18H2V7Z"
                      fill="#041D36" fill-opacity="0.3"></path>
                  </svg></span>
              </div>
            </div>

            <div className="form-group col">
            </div>

          </div> */}

              <div className="form-row">
                <div className="form-group col-5 form-col-gap">
                  <label>Terms and conditions</label>
                  <textarea className="form-control" rows={4}></textarea>
                </div>
              </div>

              <h5>CUSTOM PAYMENT</h5>

              <div className="form-row">
                <div className="form-group col-3 form-col-gap">
                  <label className="text-orange">Documentation charges</label>
                  <input className="form-control orange-form-control" type="text" />
                </div>

                <div className="form-group col-2 form-col-gap">
                  <label className="text-orange" htmlFor="bfrom">
                    Start date
                  </label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input  orange-form-control"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>

                <div className="form-group col-2 form-col-gap">
                  <label className="text-orange" htmlFor="bfrom">
                    End date
                  </label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input  orange-form-control"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-3 form-col-gap">
                  <label>Property Final Amount</label>
                  <input className="form-control" type="text" />
                </div>

                <div className="form-group col form-col-gap"></div>

                <div className="form-group col"></div>
              </div>

              <div className="form-row">
                <div className="form-group col-1">
                  <div className="pers-control">
                    <label>%</label>
                    <input
                      className="form-control"
                      max="20"
                      min="1"
                      placeholder="%"
                      type="number"
                      value="1"
                    />
                  </div>
                </div>

                <div className="form-group col-2">
                  <label>Amount</label>
                  <input className="form-control" type="text" />
                </div>

                <div className="form-group col-2">
                  <label>Date</label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>

                <div className="form-group col-4">
                  <label>Remarks</label>
                  <input className="form-control" type="text" />
                </div>

                <div className="form-group col-2 align-self-center mb-0">
                  <button className="add-sf-btn btn-light-red">
                    <svg
                      fill="none"
                      height="12"
                      viewBox="0 0 12 12"
                      width="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z"
                        fill="#FF5D5D"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-1">
                  <div className="pers-control">
                    <label>%</label>
                    <input
                      className="form-control"
                      max="20"
                      min="1"
                      placeholder="%"
                      type="number"
                      value="1"
                    />
                  </div>
                </div>

                <div className="form-group col-2">
                  <label>Amount</label>
                  <input className="form-control" type="text" />
                </div>

                <div className="form-group col-2">
                  <label>Date</label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>

                <div className="form-group col-4">
                  <label>Remarks</label>
                  <input className="form-control" type="text" />
                </div>

                <div className="form-group col-2 align-self-center mb-0">
                  <button className="add-sf-btn btn-light-red">
                    <svg
                      fill="none"
                      height="12"
                      viewBox="0 0 12 12"
                      width="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z"
                        fill="#FF5D5D"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="form-group col-1">
                  <button className="btn add-blue-btn sml-btn">
                    <svg
                      fill="none"
                      height="12"
                      viewBox="0 0 12 12"
                      width="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.25 6.75H6.75V11.25H5.25V6.75H0.75V5.25H5.25V0.75H6.75V5.25H11.25V6.75Z"
                        fill="#4872F4"
                      ></path>
                    </svg>
                    Add
                  </button>
                </div>
              </div>

              {/* <div className="form-row">

            <div className="form-group col form-col-gap">
              <label>Total other charges</label>
              <input type="text" className="form-control" />
            </div>

            <div className="form-group col form-col-gap">
              <label htmlFor="bfrom">Date</label>
              <div className="date-form-control">
                <input type="text" className="form-control" id="bfrom" />
                <span><svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 0V2H2C0.9 2 0 2.9 0 4V18C0 19.1 0.9 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2H15V0H13V2H5V0H3ZM2 7H16V18H2V7Z"
                      fill="#041D36" fill-opacity="0.3"></path>
                  </svg></span>
              </div>
            </div>

            <div className="form-group col">
            </div>

          </div>*/}

              <div className="form-row">
                <div className="form-group col-5 form-col-gap">
                  <label>Terms and conditions</label>
                  <textarea className="form-control" rows={4}></textarea>
                </div>
              </div>

              <h5>DOWNPAYMENT AND INSTALLMENT</h5>

              <div className="form-row">
                <div className="form-group col-3 form-col-gap">
                  <label className="text-orange">Documentation charges</label>
                  <input className="form-control orange-form-control" type="text" />
                </div>

                <div className="form-group col-2 form-col-gap">
                  <label className="text-orange" htmlFor="bfrom">
                    Start date
                  </label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input  orange-form-control"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>

                <div className="form-group col-2 form-col-gap">
                  <label className="text-orange" htmlFor="bfrom">
                    End date
                  </label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input  orange-form-control"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-3 form-col-gap">
                  <label>Property Final Amount</label>
                  <input className="form-control" type="text" />
                </div>

                <div className="form-group col form-col-gap"></div>

                <div className="form-group col"></div>
              </div>

              <h5>DOWNPAYMENT</h5>

              <div className="form-row">
                <div className="form-group col-1">
                  <div className="pers-control">
                    <label>%</label>
                    <input
                      className="form-control"
                      max="20"
                      min="1"
                      placeholder="%"
                      type="number"
                      value="1"
                    />
                  </div>
                </div>

                <div className="form-group col-2">
                  <label>Amount</label>
                  <input className="form-control" type="text" />
                </div>

                <div className="form-group col-2">
                  <label>Start Date</label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>

                <div className="form-group col-2">
                  <label>End Date</label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <h5>INSTALLMENT</h5>

              <div className="form-row">
                <div className="form-group col-1 form-col-gap">
                  <label>No. of Installment</label>
                  <input className="form-control" type="text" />
                </div>

                <div className="form-group col-2 form-col-gap">
                  <label>Start Date</label>
                  <div className="input-group date" data-date-format="mm-dd-yyyy" id="datepicker">
                    <input
                      className="form-control datetimepicker-input"
                      data-target="#datetimepicker-input"
                      data-toggle="datetimepicker"
                      id=""
                      type="text"
                    />
                  </div>
                </div>

                <div className="form-group col-2">
                  <label>Interval Days</label>
                  <input className="form-control" type="text" />
                </div>
              </div>

              <div className="form-row">
                <div className="ml-fg col-1 form-col-gap">
                  <label>Sr. Installment</label>
                </div>
                <div className="ml-fg col-2 form-col-gap">
                  <label>Installment Date</label>
                </div>
                <div className="ml-fg col-2">
                  <label>Amount</label>
                </div>
              </div>

              <div className="form-row">
                <div className="ml-fg col-1 form-col-gap">
                  <input className="form-control" placeholder="1" type="text" />
                </div>
                <div className="ml-fg col-2 form-col-gap">
                  <input className="form-control" placeholder="10-05-2020" type="text" />
                </div>
                <div className="ml-fg col-2">
                  <input className="form-control" placeholder="Rs. 180000" type="text" />
                </div>
                <div className="ml-fg col-1 form-col-gap align-self-center mb-3">
                  <button className="add-sf-btn btn-light-red">
                    <svg
                      fill="none"
                      height="12"
                      viewBox="0 0 12 12"
                      width="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z"
                        fill="#FF5D5D"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="ml-fg col-1 form-col-gap">
                  <input className="form-control" placeholder="1" type="text" />
                </div>
                <div className="ml-fg col-2 form-col-gap">
                  <input className="form-control" placeholder="10-05-2020" type="text" />
                </div>
                <div className="ml-fg col-2">
                  <input className="form-control" placeholder="Rs. 180000" type="text" />
                </div>
                <div className="ml-fg col-1 form-col-gap align-self-center mb-3">
                  <button className="add-sf-btn btn-light-red">
                    <svg
                      fill="none"
                      height="12"
                      viewBox="0 0 12 12"
                      width="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z"
                        fill="#FF5D5D"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="ml-fg col-1 form-col-gap">
                  <input className="form-control" placeholder="1" type="text" />
                </div>
                <div className="ml-fg col-2 form-col-gap">
                  <input className="form-control" placeholder="10-05-2020" type="text" />
                </div>
                <div className="ml-fg col-2">
                  <input className="form-control" placeholder="Rs. 180000" type="text" />
                </div>
                <div className="ml-fg col-1 form-col-gap align-self-center mb-3">
                  <button className="add-sf-btn btn-light-red">
                    <svg
                      fill="none"
                      height="12"
                      viewBox="0 0 12 12"
                      width="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z"
                        fill="#FF5D5D"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* <div className="form-row">

            <div className="form-group col form-col-gap">
              <label>Total other charges</label>
              <input type="text" className="form-control" />
            </div>

            <div className="form-group col form-col-gap">
              <label htmlFor="bfrom">Date</label>
              <div className="date-form-control">
                <input type="text" className="form-control" id="bfrom">
                <span><svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 0V2H2C0.9 2 0 2.9 0 4V18C0 19.1 0.9 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2H15V0H13V2H5V0H3ZM2 7H16V18H2V7Z"
                      fill="#041D36" fill-opacity="0.3"></path>
                  </svg></span>
              </div>
            </div>

            <div className="form-group col">
            </div>

          </div>*/}

              <label className="mt-4">Terms and conditions</label>
              <div className="form-row mb-4">
                <div className="col-3">
                  <div className="new-custom-select">
                    <select className="form-control">
                      <option value="0">Select T&C</option>
                      <option value="1">A</option>
                      <option value="2">B</option>
                      <option value="3">C</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-5 form-col-gap">
                  <textarea className="form-control" rows={4}></textarea>
                </div>
              </div>

              <div className="bookingform-footer">
                <button className="btn btn-lightblue-primary" type="button">
                  Save
                </button>
                <button
                  className="btn btn-lightblue-primary lbps-btn"
                  data-dismiss="modal"
                  type="button"
                >
                  Cancel
                </button>
                <button className="btn btn-lightblue-primary" type="button">
                  Save & Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingForm;
