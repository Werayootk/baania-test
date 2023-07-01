import React from "react";
import { Layout } from "antd";

import NavBarDatabase from "./components/NavBarDatabase/NavBarDatabase" 
import DropDownPostCode from "./components/DropDownPostCode/DropDownPostCode"
import TableHouseList from "./components/TableHouseList/TableHouseList"

const { Header, Footer, Content } = Layout;

const headerStyle = {
  maxHeight: 170,
  backgroundColor: "#F4F7FC",
};
const contentStyle = {
  backgroundColor: "#fff",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#F4F7FC",
};

function App() {
  return (
    <Layout>
      <Header style={headerStyle}>
        <NavBarDatabase />
      </Header>
      <Content style={contentStyle}>
        <TableHouseList />
      </Content>
      <Footer style={footerStyle}>
        <DropDownPostCode />
      </Footer>
    </Layout>
  );
}

export default App;
