import React from "react";
import MenuAdmin from "./menu/Menu";
import ContentAdmin from "./content/Content";
import { Layout } from "antd";
const { Sider, Header, Content, Footer } = Layout;
export default function indexAdmin() {
  return (
    <Layout>
      <Sider>
        <MenuAdmin />
      </Sider>
      <Content>
        <ContentAdmin />
      </Content>
    </Layout>
  );
}
