import axios from 'axios'
import React, { useEffect, useState } from 'react';

function Document({ Email }) {
  const [numRows, setNumRows] = useState(1);
  const [numCols, setNumCols] = useState(1);
  const [tableData, setTableData] = useState([['']]);
  const [documents, SetDocumemt] = useState(null)

  const [changeForGetAll, SetchangeForGetAll] = useState(true)

  useEffect(() => {
    async function getData() {
      await axios.post("https://securelocker.onrender.com/document", { Email }).then((data) => {
        
        // await axios.post("http://localhost:8000/text", { email: Email }).then((data) => {

        SetDocumemt(data.data)

      },)
    }
    getData()

  }, [changeForGetAll])

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
    // await axios.post('https://securelocker.onrender.com/document/Documentsave', { tableData, Email }).then((data) => {

    await axios.post('http://localhost:8000/document/Documentsave', { tableData, Email }).then((data) => {
      setTableData([['']])
      if (changeForGetAll) {
        SetchangeForGetAll(false)
      } else {
        SetchangeForGetAll(true)
      }
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


        {
          documents && documents.map((Arr1, i) => <table className='border shadow m-3 '  >
            <h1   >   Table {i + 1}  </h1>
            {
              Arr1.map((Arr2, j) => <tr>
                {
                  Arr2.map((val, k) => <td> {val} </td>)
                }
              </tr>)
            }
          </table>)
        }
      </div>
    </div >
  );
}

export default Document;



