import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import "./Login.css";

function Login () {
  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } =
    useContext(AuthContext);

  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={loginUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {loginError?.error && (
                <Alert variant="danger">
                  <b>{`Error status code: ${loginError?.status}`}</b>
                  <p>{loginError?.message}</p>
                </Alert>
              )}

              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
                value={loginInfo.email}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, password: e.target.value })
                }
                value={loginInfo.password}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoginLoading}>
              {isLoginLoading ? "Getting you in..." : "Login"}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="login__bg"></Col>
      </Row>
    </Container>
  );
}

export default Login;
