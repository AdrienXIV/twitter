import React from "react";
import API from "../utils/API";
import { HandlerError } from "../utils/ErrorHandler";
import {
  Button,
  Input,
  Form,
  Icon,
  Header,
  Message,
  Label
} from "semantic-ui-react";
import $ from "jquery";
import io from "../utils/Socket.io";

export class NewUser extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      order: 0,
      users_number: 0,
      message: "",
      class: "positive"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    API.getUsers()
      .then(({ data }) => {
        this.setState({ users_number: data.length });
      })
      .catch(err => {
        this.setState({
          message: err,
          class: "negative"
        });
        this.showMessage();
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    io.socket.open();
    io.functions.checkScreenName(this.state.name);
    io.socket.on("twitter_user", data => {
      // si l'utilisateur twitter n'existe pas
      if (data.errors !== undefined) {
        if (data.errors[0].code === 50) {
          this.setState({
            message: "Utilisateur twitter inexistant.",
            class: "negative"
          });
          this.showMessage();
        }
      } else {
        API.setUser(this.state.name, Number(this.state.order))
          .then(res => {
            this.successMessage(true, "");
          })
          .catch(err => {
            this.successMessage(false, String(err));
          });
      }
    });
  };
  componentWillUnmount() {
    io.socket.close();
  }

  showMessage() {
    $(".ui.message").show("fast");

    setTimeout(() => {
      $(".ui.message").hide("slow");
    }, 5000);
  }

  successMessage(success, errorMessage) {
    const codeError = HandlerError(errorMessage);

    if (success) {
      this.setState({
        class: "positive",
        message: "Utilisateur enregistré.",
        name: "",
        order: 0,
        users_number: this.state.users_number + 1
      });
    } else {
      let message_error = "";
      if (codeError === 400) {
        message_error = "Ressource déjà existante.";
      } else if (codeError === 500) {
        message_error = "Erreur serveur.";
      }
      this.setState({
        class: "negative",
        message: message_error
      });
    }
    this.showMessage();
  }

  render() {
    return (
      <div id="new-user">
        <Header as="h2" icon textAlign="center">
          <Icon circular>{this.state.users_number}</Icon>
          <Header.Content>Utilisateurs ajoutés</Header.Content>
        </Header>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Label color="blue" ribbon>
              <Icon name="user circle" />
              Utilisateur
            </Label>
            <Input iconPosition="left" placeholder="nom">
              <Icon name="at" />
              <input
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </Input>
          </Form.Field>
          <Form.Field>
            <Label color="black" ribbon>
              <Icon name="ordered list" />
              Ordre de priorité
            </Label>
            <Input
              name="order"
              type="number"
              min="0"
              max="100"
              onChange={this.handleChange}
              value={this.state.order}
            />
          </Form.Field>
          <Button type="submit" positive>
            Ajouter
          </Button>

          <Message size="mini" className={this.state.class}>
            <p>{this.state.message}</p>
          </Message>
        </Form>
      </div>
    );
  }
}
