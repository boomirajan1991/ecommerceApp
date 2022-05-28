import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSettings,
  updateAsyncSettings,
} from "../features/settings/settingSlice";
import imagePath from "../ecommerce.gif";
const SettingsFrom = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [setting, setSetting] = useState({
    storename: "",
    mobilenumber: "",
    email: "",
    vatnumber: "",
    address: "",
    order_notification_email: "",
    whatsappnumber: "",
  });
  const responseSetting = useSelector(getAllSettings);
  useEffect(() => {
    console.log("SetttingsFrom");
    if (responseSetting.success === true) {
      const {
        storename,
        mobilenumber,
        email,
        vatnumber,
        address,
        order_notification_email,
        whatsappnumber,
      } = responseSetting.getSetting;
      setSetting({
        storename,
        mobilenumber,
        email,
        vatnumber,
        address,
        order_notification_email,
        whatsappnumber,
      });
    } else {
      responseSetting.message === 999 &&
        toast.error("Token Expired", { theme: "colored" })(navigate("/login"));
    }
  }, [dispatch, navigate, responseSetting]);

  return (
    <div style={{}}>
      <Card body>
        <div className="text-left mb-4 common-font-size">
          <h5 className="mb-1">My Settings</h5>
          <hr></hr>
        </div>
        <Row>
          <Col sm={6}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                setting_id: "627bd58b16cc20581d15bded",
                storename: setting.storename,
                mobilenumber: setting.mobilenumber,
                email: setting.email,
                vatnumber: setting.vatnumber,
                address: setting.address,
                order_notification_email: setting.order_notification_email,
                whatsappnumber: setting.whatsappnumber,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.storename) {
                  errors.storename = "enter storename";
                }
                if (!values.mobilenumber) {
                  errors.mobilenumber = "enter mobilenumber";
                }
                if (!values.email) {
                  errors.email = "enter email";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "invalid email address";
                }
                if (!values.address) {
                  errors.address = "enter address";
                }
                if (!values.vatnumber) {
                  errors.vatnumber = "enter vatnumber";
                }
                if (!values.order_notification_email) {
                  errors.order_notification_email = "enter notification email";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    values.order_notification_email
                  )
                ) {
                  errors.order_notification_email =
                    "invalid notification email";
                }
                if (!values.whatsappnumber) {
                  errors.whatsappnumber = "enter whatsappnumber";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(updateAsyncSettings({ values, navigate, toast }));
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
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm={6}>
                      <Form.Group className="mb-3" controlId="formStoreName">
                        <Form.Label>Storename</Form.Label>
                        <Form.Control
                          type="text"
                          name="storename"
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.storename}
                        />
                        <Form.Text className="text-danger">
                          {errors.storename &&
                            touched.storename &&
                            errors.storename}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3" controlId="formMobileNumber">
                        <Form.Label>Mobile No.</Form.Label>
                        <Form.Control
                          type="text"
                          name="mobilenumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mobilenumber}
                        />
                        <Form.Text className="text-danger">
                          {errors.mobilenumber &&
                            touched.mobilenumber &&
                            errors.mobilenumber}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                        />
                        <Form.Text className="text-danger">
                          {errors.address && touched.address && errors.address}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
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
                      <Form.Group className="mb-3" controlId="formVatNumber">
                        <Form.Label>Vat No.</Form.Label>
                        <Form.Control
                          type="text"
                          name="vatnumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.vatnumber}
                        />
                        <Form.Text className="text-danger">
                          {errors.vatnumber &&
                            touched.vatnumber &&
                            errors.vatnumber}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="formOrderNotificationEmail"
                      >
                        <Form.Label>Order Notification Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="order_notification_email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.order_notification_email}
                        />
                        <Form.Text className="text-danger">
                          {errors.order_notification_email &&
                            touched.order_notification_email &&
                            errors.order_notification_email}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="formWhatsAppNumber"
                      >
                        <Form.Label>Whatsapp No.</Form.Label>
                        <Form.Control
                          type="text"
                          name="whatsappnumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.whatsappnumber}
                        />
                        <Form.Text className="text-danger">
                          {errors.whatsappnumber &&
                            touched.whatsappnumber &&
                            errors.whatsappnumber}
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="small_button text-left mb-3"
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Update Setting
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
          <Col sm={6}>
            <img width="100%" src={imagePath} alt="iamge" />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SettingsFrom;
