import { useFormik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import { addCustomer } from 'redux/sales';
import { useAppDispatch } from 'redux/store';
import * as Yup from 'yup';

const AddCustomerModal = ({ show, handleClose }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required Field'),
      lastName: Yup.string().required('Required Field'),
      email: Yup.string().email('Invalid email address'),
      phone: Yup.string().required('Required Field'),
    }),
    onSubmit: values => {
      const { firstName, lastName, email, phone } = values;
      dispatch(
        addCustomer({
          project_id: 18,
          first_name: firstName,
          last_name: lastName,
          email,
          phone: parseInt(phone, 10),
          inquiry_for: 2,
          priority: 'medium',
          occupation: 0,
          budget_from: 0,
          budget_to: 0,
        }),
      );
    },
  });

  return (
    <Modal
      centered
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      show={show}
      size="lg"
      onHide={handleClose}
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title>
          <b>Add Customer</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="shwan-form">
            <div className="booking-form-col-6 border-0" id="showfirstbox">
              <div className="form-group">
                <div className="form-row newuser">
                  <div className="form-group col form-col-gap">
                    <label className="mandate-star mr-3">First Name</label>
                    <input
                      className="form-control"
                      name="firstName"
                      type="text"
                      value={formik.values.firstName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="form-group col">
                    <label className="mandate-star mr-3">Last Name</label>
                    <input
                      className="form-control"
                      name="lastName"
                      type="text"
                      value={formik.values.lastName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="form-row newuser">
                  <div className="form-group col form-col-gap">
                    <label>Email</label>
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="form-group col">
                    <label className="mandate-star mr-3">Phone</label>
                    <input
                      className="form-control"
                      maxLength={10}
                      name="phone"
                      type="text"
                      value={formik.values.phone}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-row justify-content-end mr-5 mb-3 ">
            <button
              className="Btn btn-lightblue-primary lbps-btn py-2 px-4 mr-4"
              onClick={handleClose}
            >
              Close
            </button>
            <button className="Btn btn-lightblue-primary  py-2 px-4" type="submit">
              Add
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCustomerModal;
