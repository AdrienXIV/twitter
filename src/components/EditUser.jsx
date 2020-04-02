import React from "react";
import API from "../utils/API";
import { HandlerError } from "../utils/ErrorHandler";
import { Button, Input, Form, Icon, Message, Label } from "semantic-ui-react";
import $ from "jquery";
import { Redirect } from "react-router-dom";

export class EditUser extends React.Component {
  _isMounted = false;

  constructor(props) {
    super();
    this.state = {
      name: "",
      order: 0,
      message: "",
      class: "positive",
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    API.getUser(this.props.match.params.id)
      .then(({ data }) => {
        this.setState({ name: data.name, order: data.order });
      })
      .catch(err => {
        alert(
          err + "\nID inexistant. \nRedirection vers la liste d'utilisateur."
        );
        this.setState({ redirect: true });
      });
  }

  componentDidCatch() {
    this.setState({ redirect: true });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.editUser();
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  editUser() {
    API.editUser(Number(this.state.order), this.props.match.params.id)
      .then(data => {
        if (data.status === 201) {
          setTimeout(() => {
            this.setState({ redirect: true });
          }, 2500);
          return this.successMessage(true, "");
        }
      })
      .catch(err => {
        return this.successMessage(false, String(err));
      });
  }

  showMessage() {
    $(".ui.message").hide(); // enlever tous les messages si jamais il y en a un toujours d'afficher
    $(".ui.message")
      .show("fast")
      .delay(2000)
      .hide("slow");
  }

  /**
   *
   * @param {Bool} success
   * @param {String} errorMessage
   */
  successMessage(success, errorMessage) {
    const codeError = HandlerError(errorMessage);

    if (success) {
      this.setState({
        class: "positive",
        message: "Utilisateur modifié."
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
    if (this.state.redirect) {
      return <Redirect to="/users" />;
    } else {
      return (
        <div id="new-user">
          <Form onSubmit={this.handleSubmit} style={{ marginTop: "20%" }}>
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
                  disabled
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
              Modifier
            </Button>

            <Message size="mini" className={this.state.class}>
              <p>{this.state.message}</p>
            </Message>
          </Form>
        </div>
      );
    }
  }
}
