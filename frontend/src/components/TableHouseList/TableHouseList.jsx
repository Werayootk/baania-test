import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "antd";
import { Modal } from "antd";

import baaniaServices from "../../services/baaniaServices";
import "./TableHouseList.css";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "post_code", headerName: "Post Code", width: 130 },
  { field: "price", headerName: "Price", width: 130 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 189,
    renderCell: (params) => {
      return (
        <div>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleButtonClick(params)}
          >
            DETAIL
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleButtonClick(params)}
          >
            DELETE
          </Button>
        </div>
      );
    },
  },
];

const handleButtonClick = (params) => {
  // handle button click for a specific row
  console.log("Button clicked for row:", params.row);
};



const TableHouseList = () => {
  const [isVisibleModalCreate, setIsVisibleModalCreate] = useState(false);
  const [isVisibleModalUpdate, setIsVisibleModalUpdate] = useState(false);
  const [isVisibleModalSuccess, setIsVisibleModalSuccess] = useState(false);
  const [isVisibleModalFail, setIsVisibleModalFail] = useState(false);

  const [dataSource, setDataSource] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const onClickCreate = () => {
    setIsVisibleModalCreate(!isVisibleModalCreate);
  }
  const handleOk = () => {
    setIsVisibleModalCreate(false);
  };

  const handleCancel = () => {
    setIsVisibleModalCreate(false);
  };

  useEffect(() => {
    let params = `?skip${paginationModel.page}&take${paginationModel.pageSize}`;
    baaniaServices.getHome(params).then((res) => {
      console.log(res.data)
      setDataSource(res.data.payload)
    }).catch((err) => {
      console.error(err)
    })
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <p style={{ fontWeight: "bold" }}>HOUSE LIST</p>
        <Button type="primary" style={{ background: "#22BB66" }} onClick={onClickCreate}>
          CREATE
        </Button>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={dataSource}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10]}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </div>
      <Modal
        centered
        open={isVisibleModalCreate}
        bodyStyle={{ height: "60vh" }}
        width="90vw"
        onCancel={handleCancel}
        onOk={handleOk}
        style={{ textAlign: "center" }}
      >
        <div>
          สร้างฟอร์มแล้วก็ ฟอร็มสำเร็จไม่สำเร็จ
        </div>
      </Modal>
    </div>
  );
};

export default TableHouseList;
