import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import { Button, Row, Col, Accordion } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import * as Icon from "react-bootstrap-icons";
import {
  deleteAsyncMutipleImage,
  uploadAsyncMutipleImage,
} from "../../features/settings/settingSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiUrl } from "../../Constants/api";
import imagePath from "../../image.png";
import _ from "lodash";
import { LazyLoadImage } from "react-lazy-load-image-component";

const DialogImage = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [loadimage, setlLoadImage] = useState([]);
  const maxNumber = 30;
  const switchStatus = props.switchStatus;
  const toggleProductStatus = props.productStatus;
  const geteditproductimage = props.geteditproductimage;
  const resetDialogImage = props.resetDialogImage;
  const handleCloseId = props.handleCloseId;

  useEffect(() => {
    console.log("dialogImage");
    setlLoadImage(geteditproductimage.productMultipleImage);
  }, [geteditproductimage.productMultipleImage, setlLoadImage]);

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const uploadImages = () => {
    if (!_.isEmpty(images)) {
      const formData = new FormData();
      formData.append("product_id", geteditproductimage._id);
      _.forEach(images, (image) => {
        formData.append("productMutipleImage", image.file);
      });
      dispatch(uploadAsyncMutipleImage({ formData, navigate, toast }));
      resetDialogImage();
      switchStatus(toggleProductStatus);
      handleCloseId();
    }
  };

  const removeImage = (id) => {
    const formDataImage = {
      product_id: geteditproductimage._id,
      productMultipleImage_id: id,
    };
    dispatch(deleteAsyncMutipleImage({ formDataImage, navigate, toast }));
    const newList = loadimage.filter((item) => item._id !== id);
    switchStatus(toggleProductStatus);
    setlLoadImage(newList);
  };

  return (
    <div>
      <div className="imageViewList">
        {!_.isEmpty(loadimage) && (
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>View All Images</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <List loadimage={loadimage} onRemove={removeImage} />
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
      <div className="DialogImage mt-3">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div className="upload__image-wrapper">
              <Button
                className="text-end mt-1 mb-3"
                size="sm"
                variant="success"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click Or Drop Here
              </Button>
              &nbsp;
              <Button
                className="text-end mt-1 mb-3"
                size="sm"
                variant="success"
                onClick={onImageRemoveAll}
              >
                Remove All Images
              </Button>
              &nbsp;
              <Button
                className="text-end mt-1 mb-3"
                size="sm"
                variant="success"
                onClick={() => uploadImages()}
              >
                Upload Images
              </Button>
              <div className="image-item">
                <Row>
                  {imageList.map((image, index) => (
                    <Col sm={2} key={index} className="mb-2">
                      <Card>
                        <LazyLoadImage
                          variant="top"
                          className="viewImageCol img-responsive"
                          src={image["data_url"]}
                        />
                        <Card.Body className="cardPosition">
                          <div className="text-end buttonEdit">
                            <Button
                              className="btnEdit"
                              size="sm"
                              variant="success"
                              onClick={() => onImageUpdate(index)}
                            >
                              <Icon.PencilFill color="white" />
                            </Button>
                          </div>
                          <div className="text-start buttonDelete">
                            <Button
                              className="btnDelete"
                              size="sm"
                              variant="danger"
                              onClick={() => onImageRemove(index)}
                            >
                              <Icon.Trash color="white" />
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
};

const List = ({ loadimage, onRemove }) =>
  !_.isEmpty(loadimage) &&
  _.map(loadimage, (load, index) => {
    return (
      <Col sm={2} key={index} className="mb-2">
        <Card>
          <LazyLoadImage
            variant="top"
            height={50}
            className="viewImageCol img-responsive"
            src={
              _.isEmpty(load.filename)
                ? imagePath
                : `${ApiUrl}uploads/product/${load.filename}`
            }
          />
          <Card.Body className="cardPositionList">
            <Button
              className="text-end buttonDanger"
              size="sm"
              variant="danger"
              onClick={() => onRemove(load._id)}
            >
              <Icon.Trash color="white" />
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  });

export default DialogImage;
