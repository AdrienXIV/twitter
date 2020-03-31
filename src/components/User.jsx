import React from "react";
import { Image, List, Segment, Icon } from "semantic-ui-react";
import { Tweet } from "./Tweet";
import { Link } from "react-router-dom";

export class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      isClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.TweetElement = React.createRef();
  }

  handleClick = () => {
    this.setState({
      isClicked: this.state.isClicked ? false : true
    });
  };

  firstIconRender() {
    if (this.state.isClicked) {
      return (
        <Icon
          size="large"
          name="arrow circle down"
          onClick={this.handleClick}
        />
      );
    } else {
      return (
        <Icon
          size="large"
          name="arrow circle right"
          onClick={this.handleClick}
        />
      );
    }
  }
  lastIconRender() {
    if (this.state.isClicked) {
      return (
        <Icon size="large" name="arrow circle up" onClick={this.handleClick} />
      );
    }
  }

  isVerified() {
    if (this.props.isVerified) {
      return <Icon color="blue" name="check circle" />;
    }
  }

  render() {
    return (
      <Segment>
        <List>
          <List.Item>
            <List.Content verticalAlign="middle" floated="right">
              {this.firstIconRender()}
            </List.Content>
            <Link  to={"/twitter/" + this.props.screen_name}>
              <div className="tweet-header">
                <Image avatar src={this.props.profile_image_url_https} />
                <List.Content>
                  <List.Header>
                    {this.props.name} {this.isVerified()}
                  </List.Header>
                  <List.Description>@{this.props.screen_name}</List.Description>
                </List.Content>
              </div>
            </Link>
          </List.Item>
        </List>
        <List.Content>
          <Tweet
            isClicked={this.state.isClicked}
            count={this.props.count}
            ref={this.TweetElement}
            screen_name={this.props.screen_name}
            key={this.props.id}
          />

          <List.Content
            verticalAlign="middle"
            floated="right"
            style={{ textAlign: "right" }}
          >
            {this.lastIconRender()}
          </List.Content>
        </List.Content>
      </Segment>
    );
  }
}
