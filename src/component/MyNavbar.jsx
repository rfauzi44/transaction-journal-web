import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducer/user";
import Swal from "sweetalert2";

function MyNavbar() {
  const { isAuth, data } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const setLogout = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "We will be miss",
      showCancelButton: true,
      confirmButtonText: "Yes, i will go!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      dispatch(logout(data.token));

      Swal.fire({
        icon: "success",
        title: "You're log out",
        text: `You can comeback anytime`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          Transaction Journal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
          </Nav>
          <Nav>
            {!isAuth ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
            ) : (
              <>
                <span className="navbar-text fw-bold me-3">
                  Hi {data.name} !
                </span>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link onClick={setLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
