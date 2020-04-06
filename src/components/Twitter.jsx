import React from 'react';
import io from '../utils/Socket.io';
import { User } from './User';
import { Icon, List, Button } from 'semantic-ui-react';
import { COOKIE } from '../utils/Cookie';

export class Twitter extends React.Component {
  _isMounted = false;

  constructor(props) {
    super();
    this.state = {
      userHistory: [],
      users: [],
      hasError: false,
    };
    this.UserElement = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.checkCookieNumberOfTweets();

    io.socket.open();
    io.functions.getUsers();
    io.socket.on('twitter_users', (user) => {
      if (this._isMounted) {
        this.setState({
          users: [...this.state.users, user],
        });
      }
    });
  }

  checkCookieNumberOfTweets() {
    if (COOKIE.getCookie('number_of_tweets') === (null || '')) {
      let count = window.prompt('Nombres de tweets ?', '5');
      COOKIE.setCookie('number_of_tweets', count, 1);
    } else {
      // réactualisation du cookie
      COOKIE.setCookie(
        'number_of_tweets',
        COOKIE.getCookie('number_of_tweets'),
        1
      );
    }
  }

  handleClick = () => {
    let count = window.prompt('Nombres de tweets ?', '5');
    COOKIE.setCookie('number_of_tweets', count, 1);

    // mettre en cache les tweets récents côté serveur
    this.state.users.forEach((user) => {
      io.functions.refreshUserTweets(user.screen_name, count);
    });
    document.location.reload();
  };

  componentWillUnmount() {
    this._isMounted = false;
    io.socket.close();
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    alert(error + '\n' + info);
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
          <List style={{ padding: '1em 1em 0 1em' }}>
            <List.Item>
              <List.Content style={{ marginTop: '2%' }} floated="right">
                <Icon
                  onClick={() => {
                    document.location.reload();
                  }}
                  color="blue"
                  size="large"
                  name="refresh"
                />
              </List.Content>
              <Button
                onClick={this.handleClick}
                color="twitter"
                content="Tweets à afficher"
                icon="twitter"
                label={{
                  basic: true,
                  color: 'blue',
                  pointing: 'left',
                  content: Number(COOKIE.getCookie('number_of_tweets')),
                }}
              />
            </List.Item>
          </List>

          {this.getUsers()}
        </div>
      );
    }
  }
}
