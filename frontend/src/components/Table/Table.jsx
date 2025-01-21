import PropTypes from "prop-types";
import "./Table.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineSave } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { api } from "../../services/api";
import { useState } from "react";
import { TagBadge } from "../TagBadge/TagBadge";

export default function Table({ data, setTags }) {
  const { headers, rows } = data;

  const [editingTagId, setEditingTagId] = useState(null);
  const [editingTagName, setEditingTagName] = useState("");

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/tags/${id}`, {
        headers: {
          Authorization: localStorage.getItem('authToken')
        }
      });

      if (res.status === 204) {
        const getRes = await api.get(`/tags`, {
          headers: {
            Authorization: localStorage.getItem('authToken')
          }
        });
        setTags(getRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (tag) => {
    setEditingTagId(tag.id);
    setEditingTagName(tag.name); 
  };

  const handleEditChange = (event) => {
    setEditingTagName(event.target.value);
  };

  const handleEditSubmit = async (id) => {
    try {
      await api.patch(`/tags/${id}`, { name: editingTagName }, {
        headers: {
          Authorization: localStorage.getItem('authToken')
        }
      });

      const response = await api.get("/tags", {
        headers: {
          Authorization: localStorage.getItem('authToken')
        }
      });
      setTags(response.data);
      setEditingTagId(null); 
      setEditingTagName("");
    } catch (error) {
      console.error(error);
    }
  };

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
                  {editingTagId === row.id ? (
                    <input
                      type="text"
                      value={editingTagName}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                  ) : (
                    <TagBadge 
                      name={row.name} 
                      backgroundHex={row.backgroundHex}
                      nameHex={row.nameHex}
                    />
                  )}
                </td>
              ))}
              <td id='table-buttons'>
                {editingTagId === row.id ? (
                  <button onClick={() => handleEditSubmit(row.id)}>
                    <MdOutlineSave size={24} color='#70798D' />
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleDelete(row.id)}>
                      <FaRegTrashAlt size={18} color='#70798D' />
                    </button>
                    <button onClick={() => handleEditClick(row)}>
                      <FiEdit2 size={18} color='#70798D' />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.object.isRequired,
  setTags: PropTypes.func.isRequired,
};
