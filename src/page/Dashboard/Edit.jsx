import React, { useState } from "react";
import { DashCircle } from "react-bootstrap-icons";
import {
  Button,
  Container,
  Form,
  Card,
  FloatingLabel,
  Row,
  Col,
  Table,
  Alert,
  Spinner
} from "react-bootstrap";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import useApi from "../../helper/useApi";

const Edit = ({ selectedTransaction, getTransactions, setIsEditing }) => {
  const api = useApi();

  const [date, setDate] = useState(selectedTransaction.date);
  const [isPaid, setIsPaid] = useState(selectedTransaction.is_paid);

  const [errorMessage, setErrorMessage] = useState("");
  const [buttonLoad, setButtonLoad] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      setButtonLoad(true);
      const transactionData = {
        code: `${selectedTransaction.code}`,
        date: date,
        is_paid: isPaid.toString(),
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
        })),
      };

      await api.requests({
        method: "PUT",
        url: `/transaction/${selectedTransaction.id}`,
        data: transactionData,
      });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Transaction ${selectedTransaction.code}'s successfully updated.`,
        showConfirmButton: false,
        timer: 2000,
      });

      setIsEditing(false);
      getTransactions();
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  const [items, setItems] = useState(selectedTransaction.items);

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { id: uuidv4(), name: "", qty: 0, price: 0 }]);
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const subtotal = (item) => {
    return item.qty * item.price;
  };

  const totalTransaction = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.qty * item.price;
    });
    return total;
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Header as="h4" className="fw-bold py-3">
          Update Transaction {selectedTransaction.code}
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleUpdate}>
            <Row className="justify-content-between">
              <Col sm="3">
                <Form.Group controlId="date" className="mb-3">
                  <FloatingLabel label="Date">
                    <Form.Control
                      type="date"
                      name="date"
                      placeholder="Date"
                      required
                      value={format(new Date(date), "yyyy-MM-dd")}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col className="d-flex justify-content-md-end">
                <Form.Group controlId="is_paid" className="mb-3 fw-bold">
                  <Form.Check
                    type="switch"
                    name="is_paid"
                    label="Paid"
                    checked={isPaid}
                    onChange={(e) => setIsPaid(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <h4 className="py-2 text-center fw-bold font-italic">item list</h4>

            <div id="no-more-tables">
              <Table bordered hover className="col-md-12 table-condensed cf">
                <thead className="bg-light cf">
                  <tr>
                    <th>name</th>
                    <th>price</th>
                    <th>qty</th>
                    <th>subtotal</th>
                    <th className="text-center">del</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td n-title="name">
                        <Form.Control
                          type="text"
                          name="name"
                          required
                          value={item.name}
                          onChange={(event) => handleItemChange(index, event)}
                        />
                      </td>
                      <td n-title="price">
                        <Form.Control
                          type="number"
                          name="price"
                          required
                          value={item.price}
                          onChange={(event) => handleItemChange(index, event)}
                        />
                      </td>
                      <td n-title="qty">
                        <Form.Control
                          type="number"
                          name="qty"
                          required
                          value={item.qty}
                          onChange={(event) => handleItemChange(index, event)}
                        />
                      </td>

                      <td n-title="sub">
                        <Form.Control
                          disabled
                          value={subtotal(item).toLocaleString()}
                        />
                      </td>
                      <td n-title="del" className="text-center">
                        <DashCircle
                          color="red"
                          onClick={() => deleteItem(index)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <Button variant="outline-primary" size="sm" onClick={addItem}>
                add item
              </Button>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <Card style={{ width: "18rem" }}>
                <Card.Header className="text-center">
                  Total Transaction
                </Card.Header>
                <Card.Body>
                  <Card.Title className="text-center fw-bold">
                    {totalTransaction().toLocaleString()}
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>

            <div className="d-flex justify-content-end mt-3">
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            </div>

            <div className="d-flex justify-content-between mt-3">
              <Button
                variant="outline-danger"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button variant="success" className="fw-bold" type="submit">
              {buttonLoad && (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    aria-hidden="true"
                  />
                )}
                Update
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Edit;
