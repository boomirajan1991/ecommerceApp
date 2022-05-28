import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ApiUrl } from "../../Constants/api";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { Button, Row, Col, Accordion } from "react-bootstrap";
import "./Product.css";
import imagePath from "../../image.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../features/categories/categorySlice";
import {
  addAsyncProduct,
  getAllBrands,
  updateAsyncProduct,
} from "../../features/settings/settingSlice";
import _ from "lodash";

const DialogProduct = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = props.handleClose;
  const switchStatus = props.switchStatus;
  const toggleProductStatus = props.productStatus;
  const resetDialogForm = props.resetDialogForm;
  const getEditProduct = props.geteditproduct;
  const Edit = props.edit;
  const initialValue = {
    productName: "",
    categoryId: "",
    brandId: "",
    productPrice: 0,
    discountType: "NO DISCOUNT",
    discount: 0,
    stockQuantity: 0,
    sorted: 0,
    productStatus: true,
    productImage: "",
    productDescription: "",
  };
  const [enablediscount, SetEnableDiscount] = useState(false);
  const responseCategory = useSelector(getAllCategories);
  const getAllCategory = responseCategory.getAllCategory;
  const responseBrand = useSelector(getAllBrands);
  const getAllBrand = responseBrand.getAllBrand;

  useEffect(() => {
    console.log(3);
    Edit
      ? getEditProduct.discountType === "NO DISCOUNT"
        ? SetEnableDiscount(false)
        : SetEnableDiscount(true)
      : SetEnableDiscount(false);
  }, [Edit, dispatch, getEditProduct.discountType, handleClose]);

  const addEditProduct = (formData) => {
    if (!Edit) {
      dispatch(addAsyncProduct({ formData, navigate, toast }));
    } else {
      dispatch(updateAsyncProduct({ formData, navigate, toast }));
    }
    return;
  };

  const onChangeSelect = (e) => {
    formik.setFieldValue("discountType", e.target.value);
    e.target.value !== "NO DISCOUNT"
      ? SetEnableDiscount(true)
      : SetEnableDiscount(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: Edit ? getEditProduct : initialValue,
    validationSchema: Yup.object().shape({
      productName: Yup.string()
        .max(30, "must be 30 characters or less")
        .required("enter product name"),
      categoryId: Yup.string().required("please select category"),
      brandId: Yup.string().required("please select brand"),
      productPrice: Yup.number()
        .positive("enter price greater than zero")
        .required("enter price"),
      stockQuantity: Yup.number()
        .positive("enter stock quantity greater than zero")
        .required("enter stock quantity"),
      productImage: Yup.mixed().required("please upload image"),
      discountType: Yup.string().required("please select discount type"),
      discount: Yup.number().when("discountType", {
        is: (discountType) => discountType !== "NO DISCOUNT",
        then: Yup.number()
          .positive("enter discount greater than zero")
          .required("enter discount"),
      }),
      productDescription: Yup.string().required("enter product description"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!_.isEmpty(values)) {
        const formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        addEditProduct(formData);
        resetDialogForm();
        resetForm();
        switchStatus(toggleProductStatus);
        handleClose();
      }
    },
  });

  return (
    <div>
      <Row>
        <Form
          className="nav-font-size"
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
        >
          <Row>
            <Col sm={6}>
              <Form.Group className="mt-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  id="productName"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productName}
                  placeholder="enter product name"
                />
                <Form.Text className="text-danger">
                  {formik.touched.productName && formik.errors.productName ? (
                    <div>{formik.errors.productName}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mt-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="categoryId"
                  id="categoryId"
                  value={formik.values.categoryId}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Category</option>
                  {!_.isEmpty(responseCategory) &&
                  !_.isEmpty(getAllCategory) ? (
                    _.map(getAllCategory, (category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))
                  ) : (
                    <option value="">No Category</option>
                  )}
                </Form.Select>
                <Form.Text className="text-danger">
                  {formik.touched.categoryId && formik.errors.categoryId ? (
                    <div>{formik.errors.categoryId}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mt-3">
                <Form.Label>Brand</Form.Label>
                <Form.Select
                  name="brandId"
                  id="brandId"
                  value={formik.values.brandId}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Brand</option>
                  {!_.isEmpty(responseBrand) && !_.isEmpty(getAllBrand) ? (
                    _.map(getAllBrand, (brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.brand}
                      </option>
                    ))
                  ) : (
                    <option value="">No Brand</option>
                  )}
                </Form.Select>
                <Form.Text className="text-danger">
                  {formik.touched.brandId && formik.errors.brandId ? (
                    <div>{formik.errors.brandId}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mt-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productPrice}
                  placeholder="enter price"
                />
                <Form.Text className="text-danger">
                  {formik.touched.productPrice && formik.errors.productPrice ? (
                    <div>{formik.errors.productPrice}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mt-3">
                <Form.Label>Stock Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="stockQuantity"
                  id="stockQuantity"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.stockQuantity}
                  placeholder="enter stock quantity"
                />
                <Form.Text className="text-danger">
                  {formik.touched.stockQuantity &&
                  formik.errors.stockQuantity ? (
                    <div>{formik.errors.stockQuantity}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mt-3">
                <Form.Label>Sort Value</Form.Label>
                <Form.Control
                  type="number"
                  name="sorted"
                  id="sorted"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sorted}
                  placeholder="enter sorted value"
                />
                <Form.Text className="text-danger">
                  {formik.touched.sorted && formik.errors.sorted ? (
                    <div>{formik.errors.sorted}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mt-3">
                <Form.Label>Discount Type</Form.Label>
                <Form.Select
                  name="discountType"
                  id="discountType"
                  value={formik.values.discountType}
                  onBlur={formik.handleBlur}
                  onChange={(e) => onChangeSelect(e)}
                >
                  <option value="NO DISCOUNT">NO DISCOUNT</option>
                  <option value="DISCOUNT BY PRICE">DISCOUNT BY PRICE</option>
                  <option value="DISCOUNT BY PERCENTAGE">
                    DISCOUNT BY PERCENTAGE
                  </option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {formik.touched.discountType && formik.errors.discountType ? (
                    <div>{formik.errors.discountType}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col sm={6}>
              {enablediscount ? (
                <Form.Group className="mt-3">
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount"
                    id="discount"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.discount}
                    placeholder="enter discount"
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.discount && formik.errors.discount ? (
                      <div>{formik.errors.discount}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>
              ) : null}
            </Col>
            <Col sm={4}>
              <Form.Group className="mt-3">
                <Form.Label>Product Status</Form.Label>
                <br></br>
                <BootstrapSwitchButton
                  style={{ width: "100%" }}
                  onlabel="Enable"
                  offlabel="Disable"
                  onstyle="success"
                  offstyle="danger"
                  name="productStatus"
                  id="productStatus"
                  checked={formik.values.productStatus}
                  onChange={(checked) => {
                    formik.setFieldValue("productStatus", checked);
                  }}
                />
                <Form.Text className="text-danger">
                  {formik.touched.productStatus &&
                  formik.errors.productStatus ? (
                    <div>{formik.errors.productStatus}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
            </Col>
            {Edit ? (
              <Accordion defaultActiveKey="0" className="mt-3">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>View Image</Accordion.Header>
                  <Accordion.Body>
                    <div
                      className="viewproductImage"
                      style={{
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        height: "200px",
                        backgroundImage: `url(${
                          formik.values.productImage.length === 0
                            ? imagePath
                            : `${ApiUrl}/uploads/product/${formik.values.productImage}`
                        })`,
                      }}
                    ></div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ) : null}
            <Form.Group className="mt-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                name="productImage"
                id="productImage"
                onChange={(e) =>
                  formik.setFieldValue("productImage", e.currentTarget.files[0])
                }
                placeholder="Upload productImage"
              />
              <Form.Text className="text-danger">
                {formik.touched.productImage && formik.errors.productImage ? (
                  <div>{formik.errors.productImage}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                name="productDescription"
                id="productDescription"
                autoComplete="off"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productDescription}
                placeholder="enter product description"
                rows={3}
              />
              <Form.Text className="text-danger">
                {formik.touched.productDescription &&
                formik.errors.productDescription ? (
                  <div>{formik.errors.productDescription}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mt-3">
              <Button
                size="sm"
                variant="success"
                type="submit"
                className="m-l-3"
              >
                {" "}
                {Edit ? "Update Product" : "Add Product"}
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Row>
    </div>
  );
};
export default DialogProduct;
