import React from "react";
import { Image, List, Segment, Icon } from "semantic-ui-react";
import API from "../utils/API";
import io from "../utils/Socket.io";
import decodeHtml from "decode-html";
import { Link } from "react-router-dom";

export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowed: false,
      user: {},
      error: false
    };
  }
  componentDidMount() {
    io.socket.open();
    io.functions.checkScreenName(this.props.match.params.user);

    io.socket.on("twitter_user", data => {
      if (data.errors !== undefined) {
        if (data.errors[0].code === 50) {
          this.setState({
            error: true
          });
        }
      } else {
        this.setState({
          error: false,
          user: data,
          isShowed: true
        });
      }
    });
  }

  isVerified() {
    if (this.state.user.verified) {
      return <Icon color="blue" name="check circle" />;
    }
  }

  // affichage de la description du profil avec un lien cliquable (site) ou non
  getUrl(user) {
    if (user.entities.url !== undefined) {
      return (
        <List.Content>
          <p>{decodeHtml(user.description)}</p>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={user.entities.url.urls[0].expanded_url}
          >
            {user.entities.url.urls[0].expanded_url}
          </a>
        </List.Content>
      );
    } else {
      return (
        <List.Content>
          <p>{decodeHtml(user.description)}</p>
        </List.Content>
      );
    }
  }

  componentWillUnmount() {
    io.socket.close();
  }

  render() {
    if (this.state.error) {
      return <h2 style={{ padding: "1rem" }}>Utilisateur inexistant.</h2>;
    } else if (this.state.isShowed) {
      return (
        <Segment>
          <Link to="/twitter">
            <Icon name="arrow left" />
          </Link>
          <List>
            <List.Item>
              <div className="tweet-header">
                <Image
                  style={{ width: "100%" }}
                  src={this.state.user.profile_banner_url}
                />
                <Image
                  id="twitter-profile"
                  circular
                  src={this.state.user.profile_image_url_https}
                />
              </div>
              <List.Content style={{ marginTop: "10%", fontSize: "larger" }}>
                <List.Header>
                  {this.state.user.name} {this.isVerified()}
                </List.Header>
                <List.Description>
                  @{this.state.user.screen_name}
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Content style={{ marginTop: "2.5%", fontSize: "larger" }}>
              {this.getUrl(this.state.user)}
            </List.Content>
          </List>
        </Segment>
      );
    } else {
      return null;
    }
  }
}
