import { Alert, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Register.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <Container>
      <Row>
        <Col md={5} className="register__bg"></Col>

        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={registerUser}>
            <h1 className="text-center">Create account</h1>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
                value={registerInfo.name}
              />
              <Form.Text className="text-muted">Enter your name...</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
                value={registerInfo.email}
              />
              <Form.Text className="text-muted">Enter your email...</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
                value={registerInfo.password}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isRegisterLoading}
            >
              {isRegisterLoading ? "Creating your account..." : "Register"}
            </Button>

            {registerError?.error && (
              <Alert variant="danger">
                <b>{`Error status code: ${registerError?.status}`}</b>
                <p>{registerError?.message}</p>
              </Alert>
            )}

            <div className="py-4">
              <p className="text-center">
                Already have an account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
