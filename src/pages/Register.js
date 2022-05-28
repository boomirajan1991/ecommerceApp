import React from "react";
import { Formik } from "formik";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../Constants/api";
import { toast } from "react-toastify";
import imagePath from "../ecommerce.gif";

const Register = () => {
  let navigate = useNavigate();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return (
    <div>
      <Card body>
        <Container>
          <Row>
            <Col sm={6}>
              <div className="text-left mb-4">
                <h4>Ecommerce signup</h4>
              </div>
              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  email: "",
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
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.firstname) {
                    errors.firstname = "enter firstname";
                  }
                  if (!values.lastname) {
                    errors.lastname = "enter lastname";
                  }
                  if (!values.email) {
                    errors.email = "enter email";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "invalid email address";
                  }
                  if (!values.password) {
                    errors.password = "enter password";
                  }
                  if (!values.phonenumber) {
                    errors.phonenumber = "enter phonenumber";
                  }
                  if (!values.address.doornumber) {
                    errors.doornumber = "enter doornumber";
                  }
                  if (!values.address.line1) {
                    errors.line1 = "enter line1";
                  }
                  if (!values.address.line2) {
                    errors.line2 = "enter line2";
                  }
                  if (!values.address.country) {
                    errors.country = "enter country";
                  }
                  if (!values.address.state) {
                    errors.state = "enter state";
                  }
                  if (!values.address.city) {
                    errors.city = "enter city";
                  }
                  if (!values.address.pincode) {
                    errors.pincode = "enter pincode";
                  }
                  if (!values.address.landmark) {
                    errors.landmark = "enter landmark";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  axios
                    .post(ApiUrl + "users/signup", values)
                    .then(function (response) {
                      console.log(response.data);
                      if (response.data.success === true) {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem(
                          "user",
                          JSON.stringify(response.data.user)
                        );
                        toast.success("SignUp Successfully", {
                          theme: "colored",
                        });
                        setTimeout(() => {
                          navigate("/product");
                        }, 2000);
                      } else {
                        if (response.data.message === 902) {
                          toast.error("Email already registered", {
                            theme: "colored",
                          });
                        } else {
                          toast.error("SignUp Failed", { theme: "colored" });
                        }
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                      toast.error("Something went wrong", { theme: "colored" });
                    });
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit} autoComplete="off">
                    <Row>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formFirstName">
                          <Form.Label>Firstname</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstname"
                            autoComplete="off"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstname}
                          />
                          <Form.Text className="text-danger">
                            {errors.firstname &&
                              touched.firstname &&
                              errors.firstname}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formLastName">
                          <Form.Label>Lastname</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastname}
                          />
                          <Form.Text className="text-danger">
                            {errors.lastname &&
                              touched.lastname &&
                              errors.lastname}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group className="mb-3" controlId="formEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <Form.Text className="text-danger">
                            {errors.email && touched.email && errors.email}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <Form.Text className="text-danger">
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group
                          className="mb-3"
                          controlId="formPhoneNumber"
                        >
                          <Form.Label>Phone No.</Form.Label>
                          <Form.Control
                            type="text"
                            name="phonenumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phonenumber}
                          />
                          <Form.Text className="text-danger">
                            {errors.phonenumber &&
                              touched.phonenumber &&
                              errors.phonenumber}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formDoorNumber">
                          <Form.Label>Door No.</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.doornumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address.doornumber}
                          />
                          <Form.Text className="text-danger">
                            {errors.doornumber}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formLine1">
                          <Form.Label>Line 1</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.line1"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address.line1}
                          />
                          <Form.Text className="text-danger">
                            {errors.line1}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formLine2">
                          <Form.Label>Line 2</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.line2"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address.line2}
                          />
                          <Form.Text className="text-danger">
                            {errors.line2}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formCountry">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.country"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address.country}
                          />
                          <Form.Text className="text-danger">
                            {errors.country}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formState">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.state"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address.state}
                          />
                          <Form.Text className="text-danger">
                            {errors.state}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formCity">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address.city}
                          />
                          <Form.Text className="text-danger">
                            {errors.city}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formPincode">
                          <Form.Label>Pincode</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.pincode"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address.pincode}
                          />
                          <Form.Text className="text-danger">
                            {errors.pincode}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formLandmark">
                          <Form.Label>Landmark</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.landmark"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address.landmark}
                          />
                          <Form.Text className="text-danger">
                            {errors.landmark}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      className="small_button text-left"
                      variant="success"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      SignUp
                    </Button>
                    <div className="mt-3">
                      <Link to="/login">
                        <span>Back to SignIn</span>
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
            <Col sm={6}>
              <img width="100%" src={imagePath} alt="iamge" />
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

export default Register;
