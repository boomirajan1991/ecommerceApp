import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ApiUrl } from "../../Constants/api";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { Button, Row, Col, Accordion } from "react-bootstrap";
import "./Category.css";
import imagePath from "../../image.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAsyncCategory,
  fetchParentCategory,
  updateAsyncCategory,
} from "../../features/categories/categorySlice";

const DialogCategory = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = props.handleClose;
  const switchStatus = props.switchStatus;
  const toggleCategoryStatus = props.categoryStatus;
  const resetDialogForm = props.resetDialogForm;
  const getEditCategory = props.geteditcategory;
  const Edit = props.edit;
  const initialValue = {
    categoryName: "",
    isParent: true,
    categoryId: "",
    categoryText: "",
    categoryStatus: true,
    categoryImage: "",
  };
  const [enableParent, SetEnableParent] = useState(false);
  const [field, SetField] = useState(false);
  const responseParentCategory = useSelector(fetchParentCategory);
  const getParentCategory = responseParentCategory.getParentCategory;

  useEffect(() => {
    console.log(3);
    Edit
      ? getEditCategory.isParent
        ? SetEnableParent(false)
        : SetEnableParent(true)
      : SetEnableParent(false);
  }, [Edit, dispatch, getEditCategory.isParent, handleClose]);

  const addEditCategory = async (formData) => {
    if (!Edit) {
      dispatch(addAsyncCategory({formData, navigate, toast}));
    } else {
      dispatch(updateAsyncCategory({formData, navigate, toast}));
    }
    return;
  };

  const onChangeSelect = (e) => {
    formik.setFieldValue("categoryId", e.target.value);
    const index = e.nativeEvent.target.selectedIndex;
    formik.setFieldValue("categoryText", e.nativeEvent.target[index].text);
    Edit ? SetField(true) : SetField(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: Edit ? getEditCategory : initialValue,
    validationSchema: Yup.object().shape({
      categoryName: Yup.string()
        .max(30, "must be 30 characters or less")
        .required("enter category name"),
      categoryId: Yup.string().when("isParent", {
        is: false,
        then: Yup.string().required("please select category"),
        otherwise: Yup.string(),
      }),
      categoryImage: Yup.mixed().required("please upload image"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!Edit) {
        if (values.categoryId === "" && values.isParent) {
          values.categoryId = "000000000000000000000000";
          values.path = "/";
          values.category = `/${values.categoryName}`;
        } else {
          values.path = `/${values.categoryText}`;
          values.category = `/${values.categoryText}/${values.categoryName}`;
        }
      } else {
        if (values.isParent) {
          values.categoryId = "000000000000000000000000";
          values.path = "/";
          values.category = `/${values.categoryName}`;
        } else {
          if (field) {
            values.path = `/${values.categoryText}`;
            values.category = `/${values.categoryText}/${values.categoryName}`;
          } else {
            values.category = `${values.path}/${values.categoryName}`;
          }
        }
        values.category_id = values._id;
      }

      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      addEditCategory(formData);
      resetDialogForm();
      resetForm();
      switchStatus(toggleCategoryStatus);
      handleClose();
    },
  });

  if (Edit) {
    (() => {
      return formik.values.categoryId === "000000000000000000000000"
        ? formik.setFieldValue("categoryId", "")
        : formik.values.categoryId;
    })();
  }

  return (
    <div>
      <Row>
        <Form className="nav-font-size" onSubmit={formik.handleSubmit}>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                id="categoryName"
                autoComplete="off"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.categoryName}
                placeholder="enter category name"
              />
              <Form.Text className="text-danger">
                {formik.touched.categoryName && formik.errors.categoryName ? (
                  <div>{formik.errors.categoryName}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Brand Status</Form.Label>
                <br></br>
                <BootstrapSwitchButton
                  style={{ width: "100%" }}
                  onlabel="Enable"
                  offlabel="Disable"
                  onstyle="success"
                  offstyle="danger"
                  name="categoryStatus"
                  id="categoryStatus"
                  checked={formik.values.categoryStatus}
                  onChange={(checked) => {
                    formik.setFieldValue("categoryStatus", checked);
                  }}
                />
                <Form.Text className="text-danger">
                  {formik.touched.categoryStatus &&
                  formik.errors.categoryStatus ? (
                    <div>{formik.errors.categoryStatus}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>IsParent Category</Form.Label>
                <br></br>
                <BootstrapSwitchButton
                  style={{ width: "100%" }}
                  onlabel="YES"
                  offlabel="NO"
                  onstyle="success"
                  offstyle="danger"
                  name="isParent"
                  id="isParent"
                  checked={formik.values.isParent}
                  onChange={(checked) => {
                    console.log("checked", checked);
                    formik.setFieldValue("isParent", checked);
                    SetEnableParent(!checked);
                  }}
                />
                <Form.Text className="text-danger">
                  {formik.touched.isParent && formik.errors.isParent ? (
                    <div>{formik.errors.isParent}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
            </Col>
            {enableParent ? (
              <Form.Group className="mt-3">
                <Form.Label>Select Parent Category</Form.Label>
                <Form.Select
                  name="categoryId"
                  id="categoryId"
                  value={formik.values.categoryId}
                  onBlur={formik.handleBlur}
                  onChange={(e) => onChangeSelect(e)}
                >
                  <option value="">Select Category</option>
                  {Object.keys(responseParentCategory).length > 0 &&
                  Object.keys(getParentCategory).length > 0 ? (
                    getParentCategory.map((parentcategory) => (
                      <option
                        key={parentcategory._id}
                        value={parentcategory._id}
                        disabled={formik.values._id === parentcategory._id}
                      >
                        {parentcategory.categoryName}
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
            ) : null}

            {Edit ? (
              <Accordion defaultActiveKey="0" className="mt-3">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>View Image</Accordion.Header>
                  <Accordion.Body>
                    <div
                      className="viewcategoryImage"
                      style={{
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        height: "200px",
                        backgroundImage: `url(${
                          formik.values.categoryImage.length === 0
                            ? imagePath
                            : `${ApiUrl}/uploads/category/${formik.values.categoryImage}`
                        })`,
                      }}
                    ></div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ) : null}

            <Form.Group className="mt-3 mb-3">
              <Form.Label>Category Image</Form.Label>
              <Form.Control
                type="file"
                name="categoryImage"
                id="categoryImage"
                onChange={(e) =>
                  formik.setFieldValue(
                    "categoryImage",
                    e.currentTarget.files[0]
                  )
                }
                placeholder="Upload categoryImage"
              />
              <Form.Text className="text-danger">
                {formik.touched.categoryImage && formik.errors.categoryImage ? (
                  <div>{formik.errors.categoryImage}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Button
                size="sm"
                variant="success"
                type="submit"
                className="m-l-3"
              >
                {" "}
                {Edit ? "Update Category" : "Add Category"}
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Row>
    </div>
  );
};
export default DialogCategory;
