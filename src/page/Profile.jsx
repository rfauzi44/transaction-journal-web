import React from "react";
import { useSelector } from "react-redux";
import { Container, Card, ListGroup } from "react-bootstrap";
import MyNavbar from "../component/MyNavbar";
import { format } from "date-fns";

const Profile = () => {
  const { data } = useSelector((state) => state.user);

  return (
    <>
      <MyNavbar />
      <Container className="py-5">
        <Card>
          <Card.Header as="h4" className="fw-bold py-3">
            Profile
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <strong>Username</strong> {data.username}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email</strong> {data.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Name</strong> {data.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Gender</strong> {data.gender}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Registered Date</strong> {format(new Date(data.created_at), "dd-MM-yyyy")}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
