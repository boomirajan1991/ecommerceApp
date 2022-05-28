import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { ApiUrl } from "../../Constants/api";
import Form from "react-bootstrap/Form";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAsyncCoupon,
  fetchAsyncCoupon,
  filterAsyncCouponStatus,
  getAllCoupon,
  getCouponStatus,
  getswitchCouponStatus,
  switchAsyncCouponStatus,
  updateAsyncCoupon,
} from "../../features/settings/settingSlice";
import CouponTable from "./CouponTable";
const Coupon = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValue = {
    couponCode: "",
    couponType: true,
    isTypevalue: "",
    times: "",
    couponStatus: true,
  };

  const [enableinitialize, setEnableInitialize] = useState(false);
  const [couponbyid, setCouponById] = useState(initialValue);
  const getCouponStatusToggle = useSelector(getCouponStatus);
  const responseswitchCouponStatus = useSelector(getswitchCouponStatus);

  useEffect(() => {
    console.log("coupon");
    const couponStatusToggle = { couponStatus: getCouponStatusToggle };
    dispatch(fetchAsyncCoupon(couponStatusToggle));
  }, [dispatch, getCouponStatusToggle, responseswitchCouponStatus]);

  const responseCoupon = useSelector(getAllCoupon);
  const getcoupon = responseCoupon.getAllCoupon;
  const editCoupon = (getbyid) => {
    setCouponById({
      coupon_id: getbyid._id,
      couponCode: getbyid.couponCode,
      couponType: getbyid.couponType,
      isTypevalue: getbyid.isTypevalue,
      times: getbyid.times,
      couponStatus: getbyid.couponStatus,
    });
    setEnableInitialize(true);
    return;
  };

  const switchStatus = (currentStatus) => {
    return dispatch(
      switchAsyncCouponStatus({
        coupon_id: currentStatus._id,
        couponStatus: !currentStatus.couponStatus,
      })
    );
  };

  const formUpdateCoupon = (formData) => {
    if (enableinitialize === false) {
      dispatch(addAsyncCoupon({ formData, navigate, toast }));
    } else {
      dispatch(updateAsyncCoupon({ formData, navigate, toast }));
    }
    setCouponById(initialValue);
    setEnableInitialize(false);
    switchStatus(getCouponStatusToggle);
    return;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: couponbyid,
    validationSchema: Yup.object({
      couponCode: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("enter coupon code")
        .test({
          message: () => "Coupon Code already exists",
          test: async (values) => {
            if (values) {
              try {
                const resultCouponCode = await fetch(
                  ApiUrl + "coupon/getCouponCode",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ couponCode: values }),
                  }
                );
                const result = await resultCouponCode.json();
                if (!result.success) {
                  return true;
                } else {
                  return false;
                }
              } catch (error) {
                console.log(error);
              }
            }
          },
        }),
      isTypevalue: Yup.number().required("please enter value"),
      times: Yup.number().required("please enter how many times"),
    }),
    onSubmit: (values, { resetForm }) => {
      formUpdateCoupon(values);
      resetForm();
    },
  });

  return (
    <div>
      <Card body>
        <div className="text-left mb-4 common-font-size">
          <Row>
            <Col sm={4}>
              <h5 className="mb-1">
                {enableinitialize ? "Update Coupon" : "Add Coupon"}
              </h5>
              <hr></hr>
              <Form className="nav-font-size" onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Coupon Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="couponCode"
                    id="couponCode"
                    onChange={(e) => {
                      formik.setFieldValue(
                        "couponCode",
                        e.target.value.toUpperCase()
                      );
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.couponCode}
                    autoComplete="off"
                    placeholder="enter coupon Code"
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.couponCode && formik.errors.couponCode ? (
                      <div>{formik.errors.couponCode}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mt-3 mb-3">
                  <Form.Label>Coupon Type</Form.Label>
                  <br></br>
                  <BootstrapSwitchButton
                    onlabel="Price"
                    offlabel="Percentage"
                    onstyle="success"
                    offstyle="warning"
                    name="couponType"
                    id="couponType"
                    checked={formik.values.couponType}
                    onChange={(checked) => {
                      formik.setFieldValue("couponType", checked);
                    }}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.couponStatus &&
                    formik.errors.couponStatus ? (
                      <div>{formik.errors.couponStatus}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Discount ({" "}
                    {formik.values.couponType ? "Price" : "Percentage"} ) From
                    Total
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="isTypevalue"
                    id="isTypevalue"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.isTypevalue}
                    placeholder="enter value"
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.isTypevalue && formik.errors.isTypevalue ? (
                      <div>{formik.errors.isTypevalue}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>How Many Times</Form.Label>
                  <Form.Control
                    type="text"
                    name="times"
                    id="times"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.times}
                    placeholder="enter how many times"
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.times && formik.errors.times ? (
                      <div>{formik.errors.times}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mt-3 mb-3">
                  <Form.Label>Coupon Status</Form.Label>
                  <br></br>
                  <BootstrapSwitchButton
                    onlabel="Enable"
                    offlabel="Disable"
                    onstyle="success"
                    offstyle="danger"
                    name="couponStatus"
                    id="couponStatus"
                    checked={formik.values.couponStatus}
                    onChange={(checked) => {
                      formik.setFieldValue("couponStatus", checked);
                    }}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.couponStatus &&
                    formik.errors.couponStatus ? (
                      <div>{formik.errors.couponStatus}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Button
                  size="sm"
                  variant="success"
                  type="submit"
                  className="m-l-3"
                >
                  {enableinitialize ? "Update Coupon" : "Add Coupon"}
                </Button>
              </Form>
            </Col>
            <Col sm={8}>
              <h5 className="mb-3">Coupon List</h5>
              <hr></hr>
              <BootstrapSwitchButton
                onlabel="Deactive"
                offlabel="Active"
                width={120}
                onstyle="success"
                offstyle="danger"
                checked={getCouponStatusToggle}
                onChange={() =>
                  dispatch(filterAsyncCouponStatus(!getCouponStatusToggle))
                }
              />

              {Object.keys(responseCoupon).length > 0 ? (
                Object.keys(getcoupon).length > 0 ? (
                  <CouponTable
                    editCoupon={editCoupon}
                    switchStatus={switchStatus}
                    getcoupon={getcoupon}
                  />
                ) : (
                  <div className="text-center">No Data Found</div>
                )
              ) : (
                <div className="text-center">No Data Found</div>
              )}
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default Coupon;
