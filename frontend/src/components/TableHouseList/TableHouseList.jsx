import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, Form, Input } from "antd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import baaniaServices from "../../services/baaniaServices";
import "./TableHouseList.css";

const { Item } = Form;
const { TextArea } = Input;

const TableHouseList = () => {
  const [form] = Form.useForm();
  const [isVisibleModalCreate, setIsVisibleModalCreate] = useState(false);
  const [isVisibleModalUpdate, setIsVisibleModalUpdate] = useState(false);
  const [isVisibleModalSuccess, setIsVisibleModalSuccess] = useState(false);
  const [isVisibleModalFail, setIsVisibleModalFail] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataSource, setDataSource] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

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
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleButtonClick(params)}
              style={{
                borderRadius: "40px",
                color: "#FF9900",
                backgroundColor: "#FFF7E6",
                border: "1px",
              }}
            >
              VIEW DETAIL
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleDelButtonClick(params)}
              style={{
                borderRadius: "40px",
                color: "#B93E5C",
                backgroundColor: "#FDF4F7",
                border: "1px",
              }}
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
    setIsVisibleModalUpdate(!isVisibleModalUpdate);
    setDataUpdate(params.row);
  };

  const onFinishUpdate = async (values) => {
    //update
    let newData = {
      id: dataUpdate.id,
      name: values.name || dataUpdate.name,
      post_code: values.post_code || dataUpdate.post_code,
      price: values.price || dataUpdate.price,
      desc: values.desc || dataUpdate.desc,
    };
    await baaniaServices
      .updateHome(newData.id, newData)
      .then((res) => {
        setIsVisibleModalSuccess(!isVisibleModalSuccess);
        setIsVisibleModalUpdate(false);
      })
      .catch((err) => {
        console.error(err);
        setIsVisibleModalFail(!isVisibleModalFail);
        setIsVisibleModalUpdate(false);
      }).finally(() => {
        let params = `?skip${paginationModel.page}&take${paginationModel.pageSize}`;
        baaniaServices
          .getHome(params)
          .then((res) => {
            setDataSource(res.data.payload);
          })
          .catch((err) => {
            console.error(err);
          });
      });
  };

  const onFinishCreate = async (values) => {
    //create
    await baaniaServices
      .createHome(values)
      .then((res) => {
        setIsVisibleModalSuccess(!isVisibleModalSuccess);
        setIsVisibleModalCreate(false);
      })
      .catch((err) => {
        console.error(err);
        setIsVisibleModalFail(!isVisibleModalFail);
        setIsVisibleModalCreate(false);
      })
      .finally(() => {
        let params = `?skip${paginationModel.page}&take${paginationModel.pageSize}`;
        baaniaServices
          .getHome(params)
          .then((res) => {
            setDataSource(res.data.payload);
          })
          .catch((err) => {
            console.error(err);
          });
      });
  };

  const handleDelButtonClick = async (params) => {
    // handle button click for a specific row
    await baaniaServices
      .deleteHome(params.id)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        let params = `?skip${paginationModel.page}&take${paginationModel.pageSize}`;
        baaniaServices
          .getHome(params)
          .then((res) => {
            setDataSource(res.data.payload);
          })
          .catch((err) => {
            console.error(err);
          });
      });
  };

  const onClickCreate = () => {
    setIsVisibleModalCreate(!isVisibleModalCreate);
  };

  const onClickSuccess = () => {
    setIsVisibleModalSuccess(!isVisibleModalSuccess);
  };

  const onClickFail = () => {
    setIsVisibleModalFail(!isVisibleModalFail);
  };

  const handleCancel = () => {
    setIsVisibleModalCreate(false);
    setIsVisibleModalUpdate(false);
  };

  useEffect(() => {
    let params = `?skip${paginationModel.page}&take${paginationModel.pageSize}`;
    baaniaServices
      .getHome(params)
      .then((res) => {
        setDataSource(res.data.payload);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "295px",
        }}
      >
        <p style={{ fontWeight: "bold" }}>HOUSE LIST</p>
        <Button
          type="primary"
          style={{ background: "#22BB66", width: "150px" }}
          onClick={onClickCreate}
        >
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
        bodyStyle={{ height: "363px" }}
        width="700px"
        style={{ textAlign: "center" }}
        closable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            type="primary"
            key="submit"
            onClick={form.submit}
            style={{ backgroundColor: "#22BB66" }}
          >
            CREATE
          </Button>,
        ]}
        destroyOnClose={true}
      >
        <Form
          labelCol={{ xs: { span: 6 } }}
          wrapperCol={{ xs: { span: 12 } }}
          form={form}
          onFinish={onFinishCreate}
        >
          <p style={{ fontWeight: "bold" }}>Create</p>
          <Form.Item name="name" label="Name">
            <Input placeholder={"Name"} />
          </Form.Item>

          <Form.Item name="post_code" label="Post Code">
            <Input placeholder={"Post Code"} />
          </Form.Item>

          <Form.Item name="price" label="Price">
            <Input placeholder={"Price"} />
          </Form.Item>

          <Form.Item name="desc" label="Description">
            <TextArea
              maxLength={100}
              style={{ height: 85, marginBottom: 24 }}
              placeholder="Description"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        centered
        open={isVisibleModalSuccess}
        bodyStyle={{ height: "300px" }}
        width="331px"
        style={{ textAlign: "center", alignItems: "center" }}
        closable={false}
        footer={[
          <Button key="back" onClick={onClickSuccess}>
            CONTINUE
          </Button>,
        ]}
        destroyOnClose={true}
      >
        <div>
          <CheckCircleIcon
            style={{
              color: "#22BB66",
              width: "75px",
              height: "75px",
              marginTop: "44px",
            }}
          />
          <p>Succuess</p>
          <p>Create a Successful!</p>
        </div>
      </Modal>
      <Modal
        centered
        open={isVisibleModalFail}
        bodyStyle={{ height: "300px" }}
        width="331px"
        style={{ textAlign: "center", alignItems: "center" }}
        closable={false}
        footer={[
          <Button key="back" onClick={onClickFail}>
            TRY AGAIN
          </Button>,
        ]}
        destroyOnClose={true}
      >
        <div>
          <CancelIcon
            style={{
              color: "#B93E5C",
              width: "75px",
              height: "75px",
              marginTop: "44px",
            }}
          />
          <p>FAIL</p>
          <p>Let’s try one more again</p>
        </div>
      </Modal>
      <Modal
        centered
        open={isVisibleModalUpdate}
        bodyStyle={{ height: "363px" }}
        width="700px"
        style={{ textAlign: "center" }}
        closable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            type="primary"
            key="submit"
            onClick={form.submit}
            style={{ backgroundColor: "#F6A623" }}
          >
            UPDATE
          </Button>,
        ]}
        destroyOnClose={true}
      >
        <Form
          labelCol={{ xs: { span: 6 } }}
          wrapperCol={{ xs: { span: 12 } }}
          form={form}
          onFinish={onFinishUpdate}
        >
          <p style={{ fontWeight: "bold" }}>Item Detail - {dataUpdate.id}</p>
          <Form.Item name="name" label="Name">
            <Input placeholder={dataUpdate.name} value={dataUpdate.name} />
          </Form.Item>

          <Form.Item name="post_code" label="Post Code">
            <Input
              placeholder={dataUpdate.post_code}
              value={dataUpdate.post_code}
            />
          </Form.Item>

          <Form.Item name="price" label="Price">
            <Input placeholder={dataUpdate.price} value={dataUpdate.price} />
          </Form.Item>

          <Form.Item name="desc" label="Description">
            <TextArea
              maxLength={100}
              style={{ height: 85, marginBottom: 24 }}
              placeholder={dataUpdate.desc}
              value={dataUpdate.desc}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableHouseList;
