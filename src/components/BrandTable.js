import React, { useMemo, useState, useEffect } from "react";
import { ApiUrl } from "../Constants/api";
import imagePath from "../image.png";
import Moment from "react-moment";
import { useTable, usePagination } from "react-table";
import Table from "react-bootstrap/Table";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import * as Icon from "react-bootstrap-icons";
import { Button, Form, Row, Col } from "react-bootstrap";

const BrandTable = (props) => {
  const switchStatus = props.switchStatus;
  const editBrand = props.editBrand;
  const initialPage = { pageIndex: 0, pageSize: 10 };
  const [paging, setPaging] = useState(initialPage);
  const data = useMemo(() => props.getbrand, [props.getbrand]);
  const columns = useMemo(
    () => [
      {
        Header: "Sl No.",
        accessor: "id",
        Cell: (row) => row.row.index + 1,
      },
      {
        Header: "BrandImage",
        accessor: "brandImage",
        Cell: (row) => (
          <div>
            <img
              className="zoomImage"
              alt={row.value}
              height={25}
              src={
                row.value.length === 0
                  ? imagePath
                  : `${ApiUrl}uploads/brand/${row.value}`
              }
              width={25}
            />
          </div>
        ),
      },
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Date",
        accessor: "created_at",
        Cell: (row) => (
          <span>
            C : <Moment format="YYYY/MM/DD hh:mm:ss a">{row.value}</Moment><br></br>
            U : <Moment format="YYYY/MM/DD hh:mm:ss a">{row.row.original.updated_at}</Moment>
          </span>
        ),
      },
      {
        Header: "BrandStatus",
        accessor: "brandStatus",
        Cell: (row) => (
          <BootstrapSwitchButton
            className="tableSwitchbutton"
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
          <Button variant="success" onClick={() => editBrand(row.row.original)}>
            <Icon.PencilSquare color="white" />
          </Button>
        ),
      },
    ],
    [editBrand, switchStatus]
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
      {/* 
            
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2
                    )}
                </code>
            </pre> 
        */}

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
          <Col sm={3}>
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
          <Col sm={3}></Col>
          <Col sm={3}></Col>
          <Col sm={3}>
            <span className="nav-font-size text-start">Filter</span>
            <Form.Select
              value={pageSize}
              size="sm"
              className="form-control"
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

export default BrandTable;
