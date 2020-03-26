import React from "react";
import API from "../utils/API";
import { COOKIE } from "../utils/Cookie";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

export class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    API.login(this.state.email, this.state.password)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          COOKIE.setCookie("token", res.data, 0.5); // cookie 12h
          this.setState({ redirect: true });
        }
      })
      .catch(err => {
        alert("Identifiants incorrects.");
        console.error(err);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <Segment placeholder id="login">
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  id="email"
                  name="email"
                  icon="user"
                  iconPosition="left"
                  label="Courriel"
                  placeholder="email@gmail.com"
                  type="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                <Form.Input
                  id="password"
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  label="Mot de passe"
                  type="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
                <Button content="Se connecter" primary />
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      );
    }
  }
}
