import React from "react";
import { Image, List, Segment, Icon } from "semantic-ui-react";
import io from "../utils/Socket.io";
import { ModalMedia } from "./ModalMedia";

export class Tweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      isClicked: false
    };
  }

  componentDidMount() {
    io.socket.open();
    io.functions.getUserTweets(this.props.screen_name, this.props.count);

    io.socket.on(this.props.screen_name + "_tweets", data => {
      this.getTweets(data);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        isClicked: nextProps.isClicked
      });
    }
  }

  componentWillUnmount() {
    io.socket.close();
  }

  getTweets(tweets) {
    for (let i = 0; i < tweets.length; i++) {
      if (tweets[i].retweeted_status !== undefined) {
        this.state.tweets.push(this.getContent(tweets[i], true, false));
      } else {
        this.state.tweets.push(this.getContent(tweets[i], false, false));
      }
    }
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
        <Image.Group size="tiny">
          {(() => {
            let images = [];
            image.forEach((item, index) => {
              images.push(<ModalMedia key={index} src={item.media_url_https} />);
            });
            return images;
          })()}
        </Image.Group>
      </List.Content>
    );
  }
  getVideo(video) {
    return (
      <List.Content className="twitter-video">
        <video controls preload="metadata" width="250">
          <source src={video.video_info.variants[0].url} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </List.Content>
    );
  }
  getWebsiteUrl(tweet) {
    if (tweet.entities.urls.length !== 0) {
      return (
        <List.Content>
          <p>{tweet.full_text}</p>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={tweet.entities.urls[0].expanded_url}
          >
            {tweet.entities.urls[0].expanded_url}
          </a>
        </List.Content>
      );
    } else {
      return (
        <List.Content>
          <p>{tweet.full_text}</p>
        </List.Content>
      );
    }
  }

  render() {
    if (this.state.isClicked) {
      return this.state.tweets;
    } else return null;
  }
}
