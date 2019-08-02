import { Col, Icon, Layout, Menu, Row } from "antd";
import { Link } from "gatsby";
import React, { Component } from "react";

interface Props {
  siteTitle: string;
}

export class Header extends Component<Props> {
  render() {
    const { siteTitle } = this.props;
    return (
      <Row>
        <Menu mode="horizontal">
          <Menu.Item>
            <a href="/">
              <Icon type="home" />Home
            </a>
          </Menu.Item>
          <Menu.Item>
            <Link to="/docs/100-getting-started/introduction/"><Icon type="book" />{siteTitle}</Link>
          </Menu.Item>
          <Menu.Item>
            <a
              href="https://github.com/hpcc-systems/Visualization"
              target="_blank"
            >
              <Icon type="github" />
              GitHub
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="https://gitter.im/hpcc-systems/Visualization" target="_blank">
              <Icon type="message" />
              Chat
            </a>
          </Menu.Item>
        </Menu>
      </Row >
    );
  }
}
