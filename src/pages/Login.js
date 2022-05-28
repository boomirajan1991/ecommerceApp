import React from "react";
import { Formik } from "formik";
import { Card, Form, Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../Constants/api";
import { toast } from "react-toastify";
import imagePath from "../ecommerce.gif";

const Login = () => {
  let navigate = useNavigate();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return (
    <div>
      <Card body>
        <Container>
          <Row>
            <Col sm={5} style={{marginTop:'100px'}}>
              <div className="text-left mb-4">
                <h4>Ecommerce signin</h4>
              </div>
              <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "enter email";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  if (!values.password) {
                    errors.password = "enter password";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  axios
                    .post(ApiUrl + "users/signin", values)
                    .then(function (response) {
                      if (response.data.success === true) {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem(
                          "user",
                          JSON.stringify(response.data.user)
                        );
                        toast.success("SignIn Successfully", {
                          theme: "colored",
                        });
                        setTimeout(() => {
                          navigate("/product");
                        }, 2000);
                      } else {
                        toast.error("SignIn Failed", { theme: "colored" });
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
                    <Form.Group className="mb-3" controlId="formBasicEmail">
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

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <Form.Text className="text-danger">
                        {errors.password && touched.password && errors.password}
                      </Form.Text>
                    </Form.Group>
                    <Button
                      className="small_button"
                      variant="success"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      SignIn
                    </Button>
                  </Form>
                )}
              </Formik>
              <div className="mt-3">
                <Link to="/register">
                  <span>Don't have an account ? Sign Up</span>
                </Link>
              </div>
            </Col>
            <Col sm={7}>
              <img width="100%" src={imagePath} alt="iamge" />
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

export default Login;
