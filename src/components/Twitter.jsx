import React from "react";
import io from "../utils/Socket.io";
import { User } from "./User";
import { Icon } from "semantic-ui-react";

export class Twitter extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userHistory: [],
      users: [],
      count: "",
      hasError: false
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

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    alert(error + "\n" + info);
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
          isVerified={item.verified}
        />
      );
    });
    return users_profiles;
  }

  render() {
    if (this.state.hasError) {
      return <h2>Erreur.</h2>;
    } else {
      return (
        <div className="twitter">
          <div id="refresh">
            <Icon
              onClick={() => {
                document.location.reload();
              }}
              color="blue"
              size="large"
              name="refresh"
            />
          </div>
          {this.getUsers()}
        </div>
      );
    }
  }
}
