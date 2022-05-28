import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Accordion } from "react-bootstrap";
import { ApiUrl } from "../Constants/api";
import imagePath from "../image.png";
import Form from "react-bootstrap/Form";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAsyncBrand,
  fetchAsyncBrand,
  filterAsyncBrandStatus,
  getAllBrands,
  getBrandStatus,
  getswitchBrandStatus,
  switchAsyncBrandStatus,
  updateAsyncBrand,
} from "../features/settings/settingSlice";
import BrandTable from "./BrandTable";
const Brand = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValue = {
    brand: "",
    brandStatus: true,
    brandImage: "",
  };
  const [enableinitialize, setEnableInitialize] = useState(false);
  const [brandbyid, setBrandById] = useState(initialValue);
  const getStatus = useSelector(getBrandStatus);
  const responseswitchBrandStatus = useSelector(getswitchBrandStatus);

  useEffect(() => {
    const brandStatusToggle = { brandStatus: getStatus };
    dispatch(fetchAsyncBrand(brandStatusToggle));
  }, [dispatch, getStatus, responseswitchBrandStatus]);

  const responseBrands = useSelector(getAllBrands);
  const getbrand = responseBrands.getAllBrand;
  const goToTop = () => {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editBrand = (getbyid) => {
    setBrandById({
      brand_id: getbyid._id,
      brand: getbyid.brand,
      brandStatus: getbyid.brandStatus,
      brandImage: getbyid.brandImage,
    });
    setEnableInitialize(true);
    goToTop();
    return;
  };

  const switchStatus = (currentStatus) => {
    return dispatch(
      switchAsyncBrandStatus({
        brand_id: currentStatus._id,
        brandStatus: !currentStatus.brandStatus,
      })
    );
  };

  const formUpdateBrand = (formData) => {
    if (enableinitialize === false) {
      dispatch(addAsyncBrand({ formData, navigate, toast }));
    } else {
      dispatch(updateAsyncBrand({ formData, navigate, toast }));
    }
    setBrandById(initialValue);
    setEnableInitialize(false);
    switchStatus(getStatus);
    return;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: brandbyid,
    validationSchema: Yup.object({
      brand: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("enter brand name"),
      brandImage: Yup.mixed().required("please upload image"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formUpdateBrand(formData);
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
                {enableinitialize ? "Update Brand" : "Add Brand"}
              </h5>
              <hr></hr>
              <Form className="nav-font-size" onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    id="brand"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.brand}
                    placeholder="enter brand name"
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.brand && formik.errors.brand ? (
                      <div>{formik.errors.brand}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                {enableinitialize ? (
                  <Accordion defaultActiveKey="0" className="mb-2">
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>View Image</Accordion.Header>
                      <Accordion.Body>
                        <div
                          className="viewbrandImage"
                          style={{
                            backgroundSize: "cover",
                            width: "250px",
                            height: "250px",
                            backgroundImage: `url(${
                              formik.values.brandImage.length === 0
                                ? imagePath
                                : `${ApiUrl}/uploads/brand/${formik.values.brandImage}`
                            })`,
                          }}
                        ></div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ) : null}
                <Form.Group className="mb-3">
                  <Form.Label>Brand Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="brandImage"
                    id="brandImage"
                    onChange={(e) =>
                      formik.setFieldValue(
                        "brandImage",
                        e.currentTarget.files[0]
                      )
                    }
                    placeholder="Upload BrandImage"
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.brandImage && formik.errors.brandImage ? (
                      <div>{formik.errors.brandImage}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mt-3 mb-3">
                  <Form.Label>Brand Status</Form.Label>
                  <br></br>
                  <BootstrapSwitchButton
                    onlabel="Enable"
                    offlabel="Disable"
                    onstyle="success"
                    offstyle="danger"
                    name="brandStatus"
                    id="brandStatus"
                    checked={formik.values.brandStatus}
                    onChange={(checked) => {
                      formik.setFieldValue("brandStatus", checked);
                    }}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.brandStatus && formik.errors.brandStatus ? (
                      <div>{formik.errors.brandStatus}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Button
                  size="sm"
                  variant="success"
                  type="submit"
                  className="m-l-3"
                >
                  {enableinitialize ? "Update Brand" : "Add Brand"}
                </Button>
              </Form>
            </Col>
            <Col sm={8}>
              <h5 className="mb-3">Brand List</h5>
              <hr></hr>
              <BootstrapSwitchButton
                onlabel="Deactive"
                offlabel="Active"
                width={120}
                onstyle="success"
                offstyle="danger"
                checked={getStatus}
                onChange={() => dispatch(filterAsyncBrandStatus(!getStatus))}
              />
              {Object.keys(responseBrands).length > 0
                ? Object.keys(getbrand).length > 0 && (
                    <BrandTable
                      editBrand={editBrand}
                      switchStatus={switchStatus}
                      getbrand={getbrand}
                    />
                  )
                : null}
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default Brand;
