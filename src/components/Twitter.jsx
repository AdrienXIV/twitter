import React from "react";
import { Image, List, Segment } from "semantic-ui-react";
import { ModalMedia } from "./ModalMedia";
import io from "../utils/Socket.io";
import ReactHtmlParser from "react-html-parser";
import { COOKIE } from "../utils/Cookie";
import {dateConverter} from "../utils/DateConverter"

//TODO: faire un composant pour les tweets cités

export class Twitter extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tweets: [],
      userHistory: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    let count = window.prompt("Nombre de tweets par personne ?", "5");
    io.functions.getTweets(count);
  }

  componentDidMount() {
    
    COOKIE.setCookie("users", "", 0);
    io.socket.on("tweets", data => {
      this.setState({
        userHistory: [...this.state.userHistory, data.user]
      });
      data.tweets.forEach(item => {
        this.setState({
          tweets: [...this.state.tweets, item]
        });
      });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  getContent() {
    let content = [];
    let tweets = this.state.tweets;
    for (let i = 0; i < tweets.length; i++) {
      content.push(
        <Segment key={i} id={tweets[i].id}>
          <List>
            <List.Item>
              <div className="tweet-header">
              <Image avatar src={tweets[i].user.profile_image_url} />
              <List.Content>
                <List.Header>{tweets[i].user.name}</List.Header>
                <List.Description>
                  @{tweets[i].user.screen_name}
                </List.Description>
                <List.Description className="date">
                  <span>&bull;</span> {dateConverter(tweets[i].created_at)}
                </List.Description>
              </List.Content>
              </div>
              <List.Content>{ReactHtmlParser(tweets[i].text)}</List.Content>
              <List.Content>
                {(() => {
                  if (tweets[i].entities.media) {
                    let images = [];
                    let childKey = 0;
                    tweets[i].entities.media.forEach(item => {
                      images.push(
                        <Image.Group key={childKey} size="small">
                          <ModalMedia src={item.media_url_https} />
                        </Image.Group>
                      );
                      childKey++;
                    });
                    return images;
                  }
                })()}
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      );
    }
    return content;
  }

  render() {
    return <div id="twitter">{this.getContent()}</div>;
  }
}
