import "./Tags.css";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { api } from "../../../services/api";
import PropTypes from "prop-types";
import Table from "../../../components/Table/Table"
import Button from "../../../components/Button/Button"
import InputText from "../../../components/InputText/InputText";

export default function Tags({ tags, setTags }) {
  const [newTag, setNewTag] = useState({ name: "" });

  // const handleDeleteRow = useCallback(
  //   async (id) => {
  //     if (!tags.length) {
  //       return;
  //     }

  //     setTags((prev) => ({
  //       ...prev,
  //       rows: prev.rows.filter((tag) => tag.id !== id),
  //     }));
  //   },
  //   [tags.length, setTags]
  // );

  const handleTagSubmit = async (event) => {
    event.preventDefault();

    if(!newTag) {
      return
    }

    try {
      await api.post("/tags", newTag, {
        headers: {
          Authorization: localStorage.getItem('authToken')
        }
      });

      const response = await api.get("/tags", {
        headers: {
          Authorization: localStorage.getItem('authToken')
        }
      });

      setTags(response.data)
      setNewTag({ name: "" })
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setNewTag({ name: event.target.value });
  };

  return (  
    <div className="tags-wrapper">
      <h1>Tags</h1>
      <div className="form-wrapper">
        <form onSubmit={(event) => handleTagSubmit(event)}>
          <InputText
            placeholder={"Insert tag name"}
            required={true}
            value={newTag.name}
            onChange={handleChange}
          />
          <Button typeSubmit={true}>
            <FaPlus />
            Add Tag 
          </Button>
        </form>
      </div>

      <Table data={{ headers: [{ label: "Tag name", column: "name" }], rows: tags }} handleDeleteRow={() => console.log('abc')}/>
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.object.isRequired,
  setTags: PropTypes.func.isRequired,
};
