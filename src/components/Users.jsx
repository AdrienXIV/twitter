import React from "react";
import API from "../utils/API";
import { List, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export class Users extends React.Component {
  constructor(props) {
    super();
    this.state = {
      promiseIsResolved: false,
      content: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    API.getUsers().then(({ data }) => {
      for (let i = 0; i < data.length; i++) {
        this.setState({
          content: [
            ...this.state.content,
            <List.Item key={data[i]._id}>
              <List.Content floated="right">
                <Icon
                  title="Supprimer"
                  name="trash alternate"
                  data-id={data[i]._id}
                />
              </List.Content>
              <Link to={"/twitter/" + data[i]._id}>
                <List.Icon
                  name="user circle"
                  size="big"
                  verticalAlign="middle"
                />
                <List.Content>
                  <List.Header>
                    <Icon name="at" />
                    {data[i].name}
                  </List.Header>
                  <List.Description>
                    {"Ordre : " + data[i].order}
                  </List.Description>
                </List.Content>
              </Link>
            </List.Item>
          ]
        });
      }
      this.setState({ promiseIsResolved: true });
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

  render() {
    if (this.state.promiseIsResolved) {
      return (
        <div id="users">
          <List divided relaxed>
            {this.state.content}
          </List>
        </div>
      );
    } else {
      return <div id="users"></div>;
    }
  }
}
