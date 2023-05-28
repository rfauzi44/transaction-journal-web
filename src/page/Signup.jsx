import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Alert, Nav, FloatingLabel } from "react-bootstrap";
import MyNavbar from "../component/MyNavbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setData } from "../store/reducer/user";
import useApi from "../helper/useApi";
import Swal from "sweetalert2";

const Signup = () => {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = useApi();
  const [User, setUser] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    gender: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onChangeInput = (event) => {
    event.preventDefault();
    const data = { ...User };
    data[event.target.name] = event.target.value;
    setUser(data);
  };

  const register = async (event) => {
    event.preventDefault();
    try {
      const res = await api.requests({
        method: "POST",
        url: "/auth/register",
        data: User,
      });


      Swal.fire({
        icon: "success",
        title: "Register success!",
        text: `Welcome ${User.name}, nice to see you today`,
        showConfirmButton: false,
        timer: 2000,
      });

      const data = res.data.data[0];
      dispatch(login(data.token));
      dispatch(setData(data.user));
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <>
      <MyNavbar />
        <Container className="py-4 px-4">
          <Row className="justify-content-center">
            <Col md={6} lg={4}>
              <h1 className="text-center m-4">Create ur account</h1>
              <p className="text-center m-4">
              Before go to dashboard, signup first.
              </p>
              <Form onSubmit={register}>
                <Form.Group className="mb-3">
                <FloatingLabel label="Username">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={onChangeInput}
                    required
                  />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                <FloatingLabel label="Email">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={onChangeInput}
                    required
                  />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                <FloatingLabel label="Name">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={onChangeInput}
                    required
                  />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                <FloatingLabel label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={onChangeInput}
                    required
                  />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                <FloatingLabel label="Gender">
                  <Form.Select name="gender" onChange={onChangeInput} required>
                    <option>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                  </FloatingLabel>
                </Form.Group>

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Button type="submit " variant="success" className="w-100 mb-3">
                  Register
                </Button>
              </Form>

              <p className="text-center mt-3">
                Have registered?
                <Nav.Link  href="/login">Login instead</Nav.Link>
              </p>
            </Col>
          </Row>
        </Container>
    </>
  );
};

export default Signup;
