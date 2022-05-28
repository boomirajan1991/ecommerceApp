import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import DialogCategory from "./DialogCategory";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncCategory,
  fetchAsyncParentCategory,
  filterAsyncCategoryStatus,
  getAllCategories,
  getCategoryStatus,
  getswitchCategoryStatus,
  switchAsyncCategoryStatus,
} from "../../features/categories/categorySlice";
import CategoryTable from "./CategoryTable";
const Category = () => {
  const dispatch = useDispatch();
  const [geteditcategory, setGetEditCategory] = useState({});
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const responseCategories = useSelector(getAllCategories);
  const getcategory = responseCategories.getAllCategory;
  const toggleCategoryStatus = useSelector(getCategoryStatus);
  const responseSwitchCategoryStatus = useSelector(getswitchCategoryStatus);

  useEffect(() => {
    const categoryStatusToggle =
      toggleCategoryStatus === "" ? true : toggleCategoryStatus;
    dispatch(fetchAsyncCategory({ categoryStatus: categoryStatusToggle }));
    dispatch(fetchAsyncParentCategory());
  }, [
    dispatch,
    toggleCategoryStatus,
    responseSwitchCategoryStatus,
    show,
    edit,
  ]);

  const editCategory = (data) => {
    setGetEditCategory(data);
    setEdit(true);
    handleShow();
  };

  const addCategoryForm = () => {
    setEdit(false);
    handleShow();
  };

  const resetDialogForm = () => {
    setEdit(false);
  };

  const switchStatus = (currentStatus) => {
    return dispatch(
      switchAsyncCategoryStatus({
        category_id: currentStatus._id,
        categoryStatus: !currentStatus.categoryStatus,
      })
    );
  };

  return (
    <div>
      <Card body>
        <div className="text-left mb-4 common-font-size">
          <Row>
            <Col sm={12}>
              <Row>
                <Col sm={6}>
                  <div className="text-start">
                    <h5>Category List</h5>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="text-end">
                    <Button
                      className="text-end"
                      size="sm"
                      variant="success"
                      onClick={() => addCategoryForm()}
                    >
                      Add Category
                    </Button>
                  </div>
                </Col>
              </Row>
              <hr></hr>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="common-font-size">
                    Category
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <DialogCategory
                    categoryStatus={toggleCategoryStatus}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    edit={edit}
                    switchStatus={switchStatus}
                    resetDialogForm={resetDialogForm}
                    geteditcategory={geteditcategory}
                  ></DialogCategory>
                </Modal.Body>
              </Modal>
              <BootstrapSwitchButton
                onlabel="Deactive"
                offlabel="Active"
                width={120}
                onstyle="success"
                offstyle="danger"
                checked={toggleCategoryStatus}
                onChange={() =>
                  dispatch(filterAsyncCategoryStatus(!toggleCategoryStatus))
                }
              />
              {Object.keys(responseCategories).length > 0
                ? Object.keys(getcategory).length > 0 && (
                    <CategoryTable
                      editCategory={editCategory}
                      switchStatus={switchStatus}
                      categoryStatus={toggleCategoryStatus}
                      getcategory={getcategory}
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

export default Category;
