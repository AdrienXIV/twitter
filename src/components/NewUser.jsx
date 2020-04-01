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
  _isMounted = false;

  constructor(props) {
    super();
    this.state = {
      name: "",
      order: 0,
      users_number: 0,
      message: "",
      class: "positive",
      disabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    io.socket.open();
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
        this.setUser();
      }
    });
    setInterval(() => {
      if (this._isMounted) {
        this.state.name.length > 0
          ? this.setState({ disabled: false })
          : this.setState({ disabled: true });
      }
    }, 250);

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
    io.functions.checkScreenName(this.state.name); // vérifier si l'utilisateur existe dans twitter
  };
  componentWillUnmount() {
    this._isMounted = false;
    io.socket.close();
  }

  setUser() {
    if (this.state.name.length > 0) {
      // enregistrer sans espaces
      let name = this.state.name.split(" ");
      name.forEach((item, index) => {
        if (index > 0) {
          return;
        }

        API.setUser(item, Number(this.state.order))
          .then(() => {
            return this.successMessage(true, "");
          })
          .catch(err => {
            return this.successMessage(false, String(err));
          });
      });
    }
  }

  showMessage() {
    $(".ui.message").hide(); // enlever tous les messages si jamais il y en a un toujours d'afficher
    $(".ui.message")
      .show("fast")
      .delay(4000)
      .hide("slow");
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
          <Button type="submit" positive disabled={this.state.disabled}>
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
