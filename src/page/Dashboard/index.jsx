import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

import Swal from "sweetalert2";

import MyNavbar from "../../component/MyNavbar";
import ETable from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import useApi from "../../helper/useApi";

const Dashboard = () => {
  const api = useApi();
  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const getTransactions = async () => {
    try {
      const response = await api.requests({
        method: "GET",
        url: "/transaction",
      });
      const { data } = response.data;
      setTransactions(data);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    getTransactions();
  }, []);

  const handleEdit = (id) => {
    const [transaction] = transactions.filter(
      (transaction) => transaction.id === id
    );

    setSelectedTransaction(transaction);
    setIsEditing(true);
  };

  const handleDelete = async (id, code) => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: `Transaction Code ${code} is about to delete`,
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        await api.requests({
          method: "DELETE",
          url: `/transaction/${id}`,
        });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Transaction ${code}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 2000,
        });

        getTransactions();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Failed to delete the transaction.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <MyNavbar />
      <div className="container">
        <div className="d-flex justify-content-end mt-3">
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </div>

        {!isAdding && !isEditing && (
          <ETable
            transactions={transactions}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setIsAdding={setIsAdding}
          />
        )}
        {isAdding && (
          <Add getTransactions={getTransactions} setIsAdding={setIsAdding} />
        )}
        {isEditing && (
          <Edit
            selectedTransaction={selectedTransaction}
            getTransactions={getTransactions}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
