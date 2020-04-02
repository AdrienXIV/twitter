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
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    API.getUsers().then(({ data }) => {
      for (let i = 0; i < data.length; i++) {
        this.setState({
          content: [
            ...this.state.content,
            <List.Item key={data[i]._id}>
              <List.Content floated="right" style={{ display: "flex" }}>
                <Link
                  to={"/users/" + data[i]._id}
                  style={{ marginRight: "25%" }}
                >
                  <Icon title="Modifier" name="edit" size="large" />
                </Link>
                <Icon
                  size="large"
                  title="Supprimer"
                  name="trash alternate"
                  data-id={data[i]._id}
                  onClick={this.handleClick}
                />
              </List.Content>
              <Link to={"/twitter/" + data[i].name} style={{width:"fit-content"}}>
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

  handleClick = e => {
    let r = window.confirm("Confirmer la suppression ?");
    if (r) {
      API.deleteUser(e.target.dataset.id)
        .then(res => {
          if (res.status === 200) {
            let content = [...this.state.content];
            content.forEach((item, index) => {
              if (item.key === res.data._id) {
                content.splice(index, 1);
                this.setState({ content });
              }
            });
          }
        })
        .catch(err => {
          alert(err);
        });
    }
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
