import React from "react";
import {
  Button,
  Table,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { format } from "date-fns";

const ETable = ({ transactions, handleEdit, handleDelete, setIsAdding }) => {
  return (
    <>
      <Container className="py-5">
        <Row className="mb-4 justify-content-between">
          <Col xs={12} md={9} className="mb-3 mb-md-0">
            <h1 className="h4 fw-bold">Transactions</h1>
          </Col>

          <Col xs={12} md={3} className="d-flex justify-content-md-end ">
            <Button
              variant="outline-success"
              onClick={() => setIsAdding(true)}
              className="w-100 fw-bold"
            >
              Add Transaction
            </Button>
          </Col>
        </Row>

        <Row>
          <Table bordered hover responsive>
            <thead className="bg-light">
              <tr>
                <th>Code</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th colSpan={2} className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, i) => (
                  <tr key={transaction.id}>
                    <td className="fw-bold">{transaction.code}</td>
                    <td>{format(new Date(transaction.date), "dd-MMM-yyyy")}</td>
                    <td>{transaction.total.toLocaleString()}</td>
                    <td>
                      <td>{transaction.is_paid ? "Paid" : "Unpaid"}</td>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(transaction.id)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(transaction.id, transaction.code)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>No Transaction yet</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
};

export default ETable;
