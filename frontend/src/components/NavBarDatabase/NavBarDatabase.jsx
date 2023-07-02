import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";

import baaniaServices from "../../services/baaniaServices";
import "./NavBarDatabase.css";

const NavBarDatabase = () => {
  return (
    <Form
      layout={"vertical"}
      initialValues={{ layout: "vertical" }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Form.Item label="URL" style={{ fontWeight: "bold" }}>
        <Input placeholder="http://locallhost" />
      </Form.Item>
      <Form.Item label="PORT" style={{ fontWeight: "bold" }}>
        <Input placeholder="8000" />
      </Form.Item>
      <Form.Item style={{ marginTop: "25px" }}>
        <Button type="primary" style={{ width: "150px" }}>CONNECT</Button>
      </Form.Item>
    </Form>
  );
};

export default NavBarDatabase;
