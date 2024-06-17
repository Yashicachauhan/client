import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState("March");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  // Memoized fetchTransactions function using useCallback
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/transactions?month=${month}&search=${searchText}&page=${page}&perPage=${perPage}`
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // Handle error (show error message, retry logic, etc.)
    }
  }, [month, searchText, page, perPage]);

  // useEffect hook with fetchTransactions as a dependency
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Handlers for search input and pagination buttons
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPage(1); // Reset page to 1 when search text changes
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h2>Transactions Table</h2>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchText}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr>
            <th>Date of Sale</th>
            <th>Product Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.dateOfSale}</td>
              <td>{transaction.productTitle}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevPage} disabled={page === 1}>
        Previous
      </button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default TransactionsTable;
