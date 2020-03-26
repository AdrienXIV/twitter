import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
export class Navbar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      activeItem: "home"
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu icon  size="huge" attached='top' tabular>
        <Link to="/">
          <Menu.Item
            as={"span"}
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          >
            <Icon name="home" />
          </Menu.Item>
        </Link>

        <Link to="/twitter">
          <Menu.Item
            as={"span"}
            name="twitter"
            active={activeItem === "twitter"}
            onClick={this.handleItemClick}
          >
            <Icon name="twitter" />
          </Menu.Item>
        </Link>

        <Link to="/users">
          <Menu.Item
            as={"span"}
            name="users"
            active={activeItem === "users"}
            onClick={this.handleItemClick}
          >
            <Icon name="address book outline" />
          </Menu.Item>
        </Link>

        <Link to="/new">
          <Menu.Item
            as={"span"}
            name="add user"
            active={activeItem === "add user"}
            onClick={this.handleItemClick}
          >
            <Icon name="add user" />
          </Menu.Item>
        </Link>

        <Link to="/logout" id="logout">
          <Menu.Item
            as={"span"}
            position="right"
            name="sign out"
            active={activeItem === "sign out"}
            onClick={this.handleItemClick}
          >
            <Icon name="sign out" />
          </Menu.Item>
        </Link>
      </Menu>
    );
  }
}
