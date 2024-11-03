import PropTypes from "prop-types";
import "./Table.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

export default function Table({ data, handleDeleteRow }) {
  const { headers, rows } = data;
  
  return (
    <table className="table">

      <thead className="table-header">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="table-header-cell">
              {header.label}
            </th>
          ))}
          {rows.length !== 0 && <th className="table-header-cell"></th>}
        </tr>
      </thead>
      
      <tbody className="table-body">
        {rows.length === 0 ? (
          <tr className="table-row">
            <td colSpan={headers.length} className="table-cell"></td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.id} className="table-row">
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="table-cell">
                  {row[header.column]}
                </td>
              ))}
              <td id='table-buttons'>
                <button onClick={() => handleDeleteRow(row.id)}>
                  <FaRegTrashAlt size={18} color='#70798D'/>
                </button>
                <button onClick={() => handleDeleteRow(row.id)}>
                  <FiEdit2 size={18} color='#70798D'/>
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.object,
  handleDeleteRow: PropTypes.func.isRequired,
};
