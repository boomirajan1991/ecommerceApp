import React, { useMemo, useState, useEffect } from "react";
import { ApiUrl } from "../../Constants/api";
import imagePath from "../../image.png";
import Moment from "react-moment";
import { useTable, usePagination } from "react-table";
import Table from "react-bootstrap/Table";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import * as Icon from "react-bootstrap-icons";
import { Button, Form, Row, Col } from "react-bootstrap";

const ProductTable = (props) => {
  console.log(props.getproduct);
  const switchStatus = props.switchStatus;
  const editProduct = props.editProduct;
  const uploadDialog = props.uploadDialog;
  const initialPage = { pageIndex: 0, pageSize: 10 };
  const [paging, setPaging] = useState(initialPage);
  const data = useMemo(() => props.getproduct, [props.getproduct]);
  const columns = useMemo(
    () => [
      {
        Header: "Sl No.",
        accessor: "id",
        Cell: (row) => row.row.index + 1,
      },
      {
        Header: "ProductImage",
        accessor: "productImage",
        Cell: (row) => (
          <div>
            <img
              className="zoomImage"
              alt={row.value}
              height={25}
              src={
                row.value.length === 0
                  ? imagePath
                  : `${ApiUrl}uploads/product/${row.value}`
              }
              width={25}
            />
          </div>
        ),
      },
      {
        Header: "ProductName",
        accessor: "productName",
        Cell: (row) => (
          <span>
            {row.value} <br></br>
            <sub>
              CategoryStatus :{" "}
              {row.row.original.categoryStatus ? (
                <Icon.CheckCircleFill className="zoomImageIcon" color="green" />
              ) : (
                <Icon.XCircleFill className="zoomImageIcon" color="red" />
              )}{" "}
              <br></br>
              BrandStatus :{" "}
              {row.row.original.brandStatus ? (
                <Icon.CheckCircleFill className="zoomImageIcon" color="green" />
              ) : (
                <Icon.XCircleFill className="zoomImageIcon" color="red" />
              )}
            </sub>
          </span>
        ),
      },
      {
        Header: "Category & Brand",
        accessor: "categoryId",
        Cell: (row) => (
          <span>
            {row.row.original.categoryName} & {row.row.original.brand} <br></br>
            <sub>
              {" "}
              Category : {row.row.original.category} <br></br>
              Path : {row.row.original.path}{" "}
            </sub>
            <br></br>
          </span>
        ),
      },
      {
        Header: "Price & StockQuantity",
        accessor: "productPrice",
        Cell: (row) => (
          <span>
            {" "}
            Price : {row.value} & SKU : {row.row.original.stockQuantity}{" "}
            <br></br>
            <sub>
              DiscountType : {row.row.original.discountType} <br></br>
              {row.row.original.discountType === "NO DISCOUNT"
                ? null
                : `Discount : ${row.row.original.discount}`}{" "}
              {row.row.original.discountType === "DISCOUNT BY PRICE"
                ? `Discount Price : ${row.value - row.row.original.discount}`
                : null}{" "}
              {row.row.original.discountType === "DISCOUNT BY PERCENTAGE"
                ? `Discount Price : ${
                    row.value - row.value * (row.row.original.discount / 100)
                  }`
                : null}{" "}
            </sub>
          </span>
        ),
      },
      {
        Header: "Date",
        accessor: "created_at",
        Cell: (row) => (
          <span>
            C : <Moment format="YYYY/MM/DD hh:mm:ss a">{row.value}</Moment>
            <br></br>U :{" "}
            <Moment format="YYYY/MM/DD hh:mm:ss a">
              {row.row.original.updated_at}
            </Moment>
          </span>
        ),
      },
      {
        Header: "ProductStatus",
        accessor: "productStatus",
        Cell: (row) => (
          <BootstrapSwitchButton
            onlabel="Active"
            offlabel="Deactive"
            onstyle="success"
            offstyle="danger"
            checked={row.value}
            onChange={() => switchStatus(row.row.original)}
          />
        ),
      },
      {
        Header: "Action",
        accessor: "_id",
        Cell: (row) => (
          <Button
            variant="success"
            onClick={() => editProduct(row.row.original)}
          >
            <Icon.Pencil color="white" />
          </Button>
        ),
      },
      {
        Header: "Upload",
        accessor: "updated_at",
        Cell: (row) => (
          <Button
            variant="success"
            onClick={() => uploadDialog(row.row.original)}
          >
            <Icon.Upload color="white" />
          </Button>
        ),
      },
    ],
    [editProduct, switchStatus, uploadDialog]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: paging,
    },
    usePagination
  );
  useEffect(() => {
    setPaging({
      pageIndex,
      pageSize,
      pageCount,
      canNextPage,
      canPreviousPage,
    });
  }, [canNextPage, canPreviousPage, pageCount, pageIndex, pageSize]);

  return (
    <div>
      <div className="table-row text-end">
        <span className="nav-font-size">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <Button
          style={{ lineHeight: 1 }}
          variant="success"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <Icon.CaretLeftFill color="white" />
        </Button>{" "}
        <Button
          style={{ lineHeight: 1 }}
          variant="success"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <Icon.CaretLeft color="white" />
        </Button>{" "}
        <Button
          style={{ lineHeight: 1 }}
          variant="success"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <Icon.CaretRight color="white" />
        </Button>{" "}
        <Button
          style={{ lineHeight: 1 }}
          variant="success"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <Icon.CaretRightFill color="white" />
        </Button>{" "}
      </div>
      <div className="table-responsive">
        <Table
          {...getTableProps()}
          striped
          bordered
          hover
          className="nav-font-size mt-3"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="text-center">
        <Row>
          <Col sm={1}>
            <span className="nav-font-size text-start">
              <span className="nav-font-size text-start">Go to page </span>
              <Form.Control
                type="number"
                size="sm"
                className="text-center"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
              />
            </span>{" "}
          </Col>
          <Col sm={5}></Col>
          <Col sm={4}></Col>
          <Col sm={2}>
            <span className="nav-font-size text-start">Filter</span>
            <Form.Select
              value={pageSize}
              size="sm"
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductTable;
