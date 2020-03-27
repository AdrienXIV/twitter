import React from "react";
import { Image, List, Segment, Icon } from "semantic-ui-react";
import { ModalMedia } from "./ModalMedia";
import io from "../utils/Socket.io";
import ReactHtmlParser from "react-html-parser";
import { dateConverter } from "../utils/DateConverter";

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
  uns;
  componentDidMount() {
    let count = window.prompt("Nombre de tweets par personne ?", "5");
    io.socket.open();
    io.functions.getTweets(count);

    io.socket.on("tweets", data => {
      this.setState({
        userHistory: [...this.state.userHistory, data.user]
      });
      data.tweets.forEach(item => {
        //console.log(item);
        this.setState({
          tweets: [...this.state.tweets, item]
        });
      });
    });
  }
  componentWillUnmount() {
    io.socket.close();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  getTweets() {
    let content = [];
    let tweets = this.state.tweets;
    for (let i = 0; i < tweets.length; i++) {
      if (tweets[i].retweeted_status !== undefined) {
        content.push(this.getContent(tweets[i], true, false));
      } else {
        content.push(this.getContent(tweets[i], false, false));
      }
    }
    return content;
  }

  getTweetRT(tweet) {
    // RT devient false car la méthode getContent() est rappelée mais avec le tweet en question
    return this.getContent(tweet, false, true);
  }
  /**
   * @param {Object} tweet
   * @param {Boolean} RT
   * @param {Boolean} IconRT - afficher l'icon de RT quand getTweetRt() est appelée
   */
  getContent(tweet, RT, iconRT) {
    return (
      <Segment key={tweet.id}>
        {(() => {
          if (iconRT) {
            return <Icon name="retweet" color="green" />;
          }
        })()}
        <List>
          <List.Item>
            <div className="tweet-header">
              <Image avatar src={tweet.user.profile_image_url_https} />
              <List.Content>
                <List.Header>{tweet.user.name}</List.Header>
                <List.Description>@{tweet.user.screen_name}</List.Description>
                <List.Description className="date">
                  <span>&bull;</span> {dateConverter(tweet.created_at)}
                </List.Description>
              </List.Content>
            </div>
            {this.isRetweet(tweet, RT)}

            {(() => {
              // si le tweet est un RT, ne pas afficher l'image pour ne pas l'avoir en double
              if (!RT) {
                // si y'a une vidéo, l'url de entities.media est une image de la vidéo
                if (tweet.extended_entities !== undefined) {
                  return this.getMedia(tweet.extended_entities.media);
                } else {
                  return this.getMedia(tweet.entities.media);
                }
              }
            })()}
          </List.Item>
        </List>
      </Segment>
    );
  }

  // est un retweet ?
  isRetweet(tweet, RT) {
    // si le tweet est un RT, afficher le tweet de la personne qui est RT
    if (tweet.retweeted_status !== undefined && RT) {
      return this.getTweetRT(tweet.retweeted_status);
    } // si ce n'est pas un retweet
    else {
      return this.getWebsiteUrl(tweet);
    }
  }

  // getMedia() appelle getImage() ou getVideo()
  getMedia(media) {
    if (media !== undefined) {
      if (media[0].type === "video") {
        return this.getVideo(media[0]);
      } else {
        return this.getImage(media);
      }
    } else {
      return null;
    }
  }
  getImage(image) {
    return (
      <List.Content>
        {(() => {
          let images = [];
          let childKey = 0;
          image.forEach(item => {
            images.push(
              <Image.Group key={childKey} size="small">
                <ModalMedia src={item.media_url_https} />
              </Image.Group>
            );
            childKey++;
          });
          return images;
        })()}
      </List.Content>
    );
  }
  getVideo(video) {
    return (
      <List.Content className="twitter-video">
        <video controls preload="metadata" width="250">
          <source src={video.video_info.variants[3].url} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </List.Content>
    );
  }
  getWebsiteUrl(tweet) {
    if (tweet.entities.urls.length !== 0) {
      let content = "<div class='content'>";
      content += "<p>";
      content += tweet.full_text; // texte du tweet
      content += "</p>";
      content += "<a href=";
      content += tweet.entities.urls[0].expanded_url;
      content += " target='_blank'>";
      content += tweet.entities.urls[0].expanded_url;
      content += "</a>";
      content += "</div>";
      return ReactHtmlParser(content);
    } else {
      return ReactHtmlParser(
        "<div class='content'><p>" + tweet.full_text + "</p></div>"
      );
    }
  }

  render() {
    return <div id="twitter">{this.getTweets()}</div>;
  }
}
