import { Button, Icon, PageHeader } from "antd";
// import Button from 'antd/lib/button'
// import 'antd/lib/button/style/css'
import { Link } from "gatsby";
import React from "react";
import { Header } from "../Header";

const IndexPage = () => {
  return (
    <div align="center" style={{ padding: 80 }}>
      <p
        style={{
          color: "cornflowerblue",
          fontSize: 50,
          fontWeight: "bold"
        }}
      >
        @hpcc-js / Visualization Framework 2.0
      </p>
      <h3><i>A collection of JavaScript packages including Visualizations and HPCC-Platform communications</i></h3>
      <p>
        ...todo - add some pretty pictures...
      </p>
      <br />
      <Button.Group size="large">
        <Button type="primary">
          <Link to="/docs/100-getting-started/introduction">Get Started</Link>
        </Button>
        <Button href="https://github.com/hpcc-systems/Visualization" target="_blank" >
          Github
          <Icon type="github" />
        </Button>
        <Button href="https://gitter.im/hpcc-systems/Visualization" target="_blank" >
          Chat
          <Icon type="message" />
        </Button>
      </Button.Group>
    </div>
  );
};

export default IndexPage;
