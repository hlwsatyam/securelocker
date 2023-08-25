import axios from 'axios'
import React, { useState } from 'react';

function Document({ Email }) {
  const [numRows, setNumRows] = useState(1);
  const [numCols, setNumCols] = useState(1);
  const [tableData, setTableData] = useState([['']]);

  const handleRowIncrease = () => {
    setNumRows(numRows + 1);
    setTableData([...tableData, Array(numCols).fill('')]);
  };

  const handleColIncrease = () => {
    setNumCols(numCols + 1);
    setTableData(tableData.map(row => [...row, '']));
  };

  const handleRowRemove = () => {
    if (numRows > 1) {
      setNumRows(numRows - 1);
      setTableData(tableData.slice(0, -1));
    }
  };

  const save = async () => {
    console.log(tableData)
    await axios.post('https://securelocker.onrender.com/document/Documentsave', { tableData, Email }).then((data) => {
      console.log(data.data)
    })
  };


  const handleColRemove = () => {
    if (numCols > 1) {
      setNumCols(numCols - 1);
      setTableData(tableData.map(row => row.slice(0, -1)));
    }
  };

  const handleCellValueChange = (rowIndex, colIndex, value) => {
    const updatedData = tableData.map((row, i) =>
      i === rowIndex ? row.map((cell, j) => (j === colIndex ? value : cell)) : row
    );
    setTableData(updatedData);
  };

  return (
    <div>
      <div className="text-center">
        <button onClick={save}>save</button>
      </div>


      <button onClick={handleRowIncrease}>Add Row</button>
      <button onClick={handleColIncrease}>Add Column</button>
      <button onClick={handleRowRemove}>Remove Last Row</button>
      <button onClick={handleColRemove}>Remove Last Column</button>
      <table>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cellValue, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cellValue}
                    onChange={(e) =>
                      handleCellValueChange(rowIndex, colIndex, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Table Data:</h3>
        <ul>
          {tableData.map((row, rowIndex) => (
            <li key={rowIndex}>
              Row {rowIndex + 1}: {row.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Document;



