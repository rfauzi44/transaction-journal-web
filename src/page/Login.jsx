import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Alert,
  Nav,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import MyNavbar from "../component/MyNavbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setData } from "../store/reducer/user";
import useApi from "../helper/useApi";
import Swal from "sweetalert2";

function Login() {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = useApi();
  const [User, setUser] = useState({
    username_email: "rfauzi44",
    password: "Password*123",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [buttonLoad, setButtonLoad] = useState(false);

  const onChangeInput = (event) => {
    event.preventDefault();
    const data = { ...User };
    data[event.target.name] = event.target.value;
    setUser(data);
  };

  async function setLogin(event) {
    event.preventDefault();
    try {
      setButtonLoad(true)
      const res = await api.requests({
        method: "POST",
        url: "/auth/login",
        data: User,
      });

      const data = res.data.data[0];

      Swal.fire({
        icon: "success",
        title: "Login success!",
        text: `Welcome ${data.user.name}, nice to see you today`,
        showConfirmButton: false,
        timer: 2000,
      });

      dispatch(login(data.token));
      dispatch(setData(data.user));
    } catch (err) {

setButtonLoad(false)
setErrorMessage(err.response.data.message);
    }
  }

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);
  return (
    <>
      <MyNavbar />

      <Container className="py-4 px-4">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <h1 className="text-center m-4">Login first!</h1>
            <p className="text-center m-4">
              Before go to dashboard, login first.
            </p>
            <Form onSubmit={setLogin}>
              <Form.Group controlId="email" className="mb-3">
                <FloatingLabel label="Email / Username">
                  <Form.Control
                    type="text"
                    placeholder="Username / Email"
                    name="username_email"
                    onChange={onChangeInput}
                    value={User.username_email}
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <FloatingLabel label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={onChangeInput}
                    value={User.password}
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Button
                variant="success"
                type="submit"
                onClick={setLogin}
                className="w-100"
              >
                {buttonLoad && (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    aria-hidden="true"
                  />
                )}
                <span className="visually-hidden">Loading...</span>
                Login
              </Button>
            </Form>

            <p className="text-center m-3">
              Not registered yet?
              <Nav.Link href="/signup">Create Account</Nav.Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login
