import React from "react";
import io from "../utils/Socket.io";
import { User } from "./User";

export class Twitter extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userHistory: [],
      users: [],
      count: ""
    };
    this.UserElement = React.createRef();
  }

  componentDidMount() {
    let count = window.prompt("Nombres de tweets ?", "5");
    this.setState({ count });
    io.socket.open();
    io.functions.getUsers();
    io.socket.on("twitter_users", user => {
      this.setState({
        users: [...this.state.users, user]
      });
    });
  }
  componentWillUnmount() {
    io.socket.close();
  }

  getUsers() {
    let users_profiles = [];
    this.state.users.forEach((item, index) => {
      users_profiles.push(
        <User
          ref={this.UserElement}
          key={index}
          id={item.id}
          screen_name={item.screen_name}
          profile_image_url_https={item.profile_image_url_https}
          name={item.name}
          count={this.state.count}
        />
      );
    });
    return users_profiles;
  }

  render() {
    return <div className="twitter">{this.getUsers(this.state.count)}</div>;
  }
}
