import { FaPlus } from "react-icons/fa";
import "./Tags.css";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Table from "../../../components/Table/Table"
import Button from "../../../components/Button/Button"
import InputText from "../../../components/InputText/InputText";

export default function Tags({ tags, setTags }) {
  const [newTag, setNewTag] = useState("");

  const handleDeleteRow = useCallback(
    async (id) => {
      if (!tags.rows.length) {
        return;
      }
      setTags((prev) => ({
        ...prev,
        rows: prev.rows.filter((tag) => tag.id !== id),
      }));
    },
    [tags.rows.length, setTags]
  );

  const handleTagSubmit = (event) => {
    event.preventDefault();
    if (!newTag) {
      return;
    }
    setTags((prev) => ({
      ...prev,
      rows: [...prev.rows, { id: prev.rows.length + 1, tag: newTag }],
    }));
  };

  const handleChange = (event) => {
    setNewTag(event.target.value);
  };

  return (
    <div className="tags-wrapper">
      <h1>Tags</h1>
      <div className="form-wrapper">
        <form onSubmit={(event) => handleTagSubmit(event)}>
          <InputText
            placeholder={"Insert tag name"}
            required={true}
            onChange={handleChange}
          />
          <Button typeSubmit={true}>
            <FaPlus />
            Add Task
          </Button>
        </form>
      </div>

      <Table data={tags} handleDeleteRow={handleDeleteRow}/>
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.object.isRequired,
  setTags: PropTypes.func.isRequired,
};
