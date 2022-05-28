import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  updateAsyncProfile,
} from "../features/settings/settingSlice";
import imagePath from "../ecommerce.gif";

const ProfileForm = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = props.user;
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    phonenumber: "",
    address: {
      doornumber: "",
      line1: "",
      line2: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      landmark: "",
    },
  });
  const responseProfile = useSelector(getProfile);

  useEffect(() => {
    console.log("ProfileForm");
    user
      ? responseProfile.success === true && setProfile(responseProfile.getUser)
      : navigate("/login");
  }, [navigate, responseProfile, user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: profile,
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(30, "Must be 15 characters or less")
        .required("enter user name"),
      phonenumber: Yup.number().required("enter phone number"),
      address: Yup.object().shape({
        doornumber: Yup.string().required("enter door number"),
        line1: Yup.string().required("enter address line1"),
        line2: Yup.string().required("enter address line2"),
        country: Yup.string().required("enter country"),
        state: Yup.string().required("enter state"),
        city: Yup.string().required("enter city"),
        pincode: Yup.string().required("enter pincode"),
        landmark: Yup.string().required("enter landmark"),
      }),
    }),
    onSubmit: (values) => {
      dispatch(updateAsyncProfile({ values, navigate, toast }));
    },
  });

  return (
    <div>
      <Card body>
        <div className="text-left mb-4 common-font-size">
          <h5 className="mb-1">My Profile</h5>
          <hr></hr>
          <Row>
            <Col sm={6}>
              <Form className="nav-font-size" onSubmit={formik.handleSubmit}>
                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                      />
                      <Form.Text className="text-danger">
                        {formik.touched.username && formik.errors.username ? (
                          <div>{formik.errors.username}</div>
                        ) : null}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="phonenumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phonenumber}
                      />
                      <Form.Text className="text-danger">
                        {formik.touched.phonenumber &&
                        formik.errors.phonenumber ? (
                          <div>{formik.errors.phonenumber}</div>
                        ) : null}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Door No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.doornumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.doornumber}
                      />
                      <Form.Text className="text-danger">
                        {formik.touched.address &&
                        formik.errors.address &&
                        formik.touched.address.doornumber &&
                        formik.errors.address.doornumber ? (
                          <div>{formik.errors.address.doornumber}</div>
                        ) : null}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Line 1</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.line1"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.line1}
                      />
                      <Form.Text className="text-danger">
                        {formik.touched.address &&
                        formik.errors.address &&
                        formik.touched.address.line1 &&
                        formik.errors.address.line1 ? (
                          <div>{formik.errors.address.line1}</div>
                        ) : null}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Line 2</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.line2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.line2}
                      />
                      <Form.Text className="text-danger">
                        {formik.touched.address &&
                        formik.errors.address &&
                        formik.touched.address.line2 &&
                        formik.errors.address.line2 ? (
                          <div>{formik.errors.address.line2}</div>
                        ) : null}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.country"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.country}
                      />
                      <Form.Text className="text-danger">
                        {formik.touched.address &&
                        formik.errors.address &&
                        formik.touched.address.country &&
                        formik.errors.address.country ? (
                          <div>{formik.errors.address.country}</div>
                        ) : null}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.state"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.state}
                      />
                      <Form.Text className="text-danger">
                        {formik.touched.address &&
                        formik.errors.address &&
                        formik.touched.address.state &&
                        formik.errors.address.state ? (
                          <div>{formik.errors.address.state}</div>
                        ) : null}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.city}
                      />
                      <Form.Text className="text-danger">
                        {formik.touched.address &&
                        formik.errors.address &&
                        formik.touched.address.city &&
                        formik.errors.address.city ? (
                          <div>{formik.errors.address.city}</div>
                        ) : null}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.pincode"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.pincode}
                      />
                      <Form.Text className="text-danger">
                        {formik.touched.address &&
                        formik.errors.address &&
                        formik.touched.address.pincode &&
                        formik.errors.address.pincode ? (
                          <div>{formik.errors.address.pincode}</div>
                        ) : null}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Landmark</Form.Label>
                      <Form.Control
                        type="text"
                        name="address.landmark"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address.landmark}
                      />
                      <Form.Text className="text-danger">
                        {formik.touched.address &&
                        formik.errors.address &&
                        formik.touched.address.landmark &&
                        formik.errors.address.landmark ? (
                          <div>{formik.errors.address.landmark}</div>
                        ) : null}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  className="small_button text-left"
                  variant="success"
                  type="submit"
                >
                  Update Profile
                </Button>
              </Form>
            </Col>
            <Col sm={6}>
              <img width="100%" src={imagePath} alt="iamge" />
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default ProfileForm;
