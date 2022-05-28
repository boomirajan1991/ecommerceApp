import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import DialogProduct from "./DialogProduct";
import DialogImage from "./DialogImage";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncCategory } from "../../features/categories/categorySlice";
import {
  fetchAsyncBrand,
  fetchAsyncProduct,
  filterAsyncProductStatus,
  getAllProducts,
  getProductStatus,
  getSwitchProductStatus,
  switchAsyncProductStatus,
} from "../../features/settings/settingSlice";
import ProductTable from "./ProductTable";
import _ from "lodash";
const Product = () => {
  const dispatch = useDispatch();
  const [geteditproduct, setGetEditProduct] = useState({});
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [geteditproductimage, setGetEditProductImage] = useState([]);
  const [showid, setShowId] = useState(false);
  const [editid, setEditId] = useState(false);
  const handleCloseId = () => setShowId(false);
  const handleShowId = () => setShowId(true);

  const responseProducts = useSelector(getAllProducts);
  const getproduct = responseProducts.getAllProduct;
  const toggleProductStatus = useSelector(getProductStatus);
  const responseSwitchProductStatus = useSelector(getSwitchProductStatus);

  useEffect(() => {
    const productStatusToggle =
      toggleProductStatus === "" ? true : toggleProductStatus;
    dispatch(fetchAsyncProduct({ productStatus: productStatusToggle }));
    dispatch(fetchAsyncCategory({ categoryStatus: true }));
    dispatch(fetchAsyncBrand({ brandStatus: true }));
  }, [dispatch, toggleProductStatus, responseSwitchProductStatus, show, edit]);

  const editProduct = (data) => {
    setGetEditProduct(data);
    setEdit(true);
    handleShow();
  };

  const uploadDialog = (data) => {
    setGetEditProductImage(data);
    setEditId(true);
    handleShowId();
  };

  const addProductForm = () => {
    setEdit(false);
    handleShow();
  };

  const resetDialogForm = () => {
    setEdit(false);
  };

  const resetDialogImage = () => {
    setEditId(false);
  };

  const switchStatus = (currentStatus) => {
    return dispatch(
      switchAsyncProductStatus({
        product_id: currentStatus._id,
        productStatus: !currentStatus.productStatus,
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
                    <h5>Product List</h5>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="text-end">
                    <Button
                      className="text-end"
                      size="sm"
                      variant="success"
                      onClick={() => addProductForm()}
                    >
                      Add Product
                    </Button>
                  </div>
                </Col>
              </Row>
              <hr></hr>
              <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="common-font-size">
                    Product
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <DialogProduct
                    productStatus={toggleProductStatus}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    edit={edit}
                    switchStatus={switchStatus}
                    resetDialogForm={resetDialogForm}
                    geteditproduct={geteditproduct}
                  ></DialogProduct>
                </Modal.Body>
              </Modal>
              <Modal show={showid} size="lg" onHide={handleCloseId}>
                <Modal.Header closeButton>
                  <Modal.Title className="common-font-size">
                    Upload Image
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <DialogImage
                    switchStatus={switchStatus}
                    productStatus={toggleProductStatus}
                    handleCloseId={handleCloseId}
                    handleShowId={handleShowId}
                    editid={editid}
                    resetDialogImage={resetDialogImage}
                    geteditproductimage={geteditproductimage}
                  ></DialogImage>
                </Modal.Body>
              </Modal>
              <BootstrapSwitchButton
                onlabel="Deactive"
                offlabel="Active"
                width={120}
                onstyle="success"
                offstyle="danger"
                checked={toggleProductStatus}
                onChange={() =>
                  dispatch(filterAsyncProductStatus(!toggleProductStatus))
                }
              />
              {!_.isEmpty(responseProducts) ? (
                !_.isEmpty(getproduct) ? (
                  <ProductTable
                    uploadDialog={uploadDialog}
                    editProduct={editProduct}
                    switchStatus={switchStatus}
                    productStatus={toggleProductStatus}
                    getproduct={getproduct}
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

export default Product;
