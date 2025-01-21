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
  const tagColors = [
    {
      backgroundHex: '#E1F6FF',
      nameHex: '#2C62B4'
    },
    {
      backgroundHex: '#FFF2EC',
      nameHex: '#FF5733'
    },
    {
      backgroundHex: '#E6FAEC',
      nameHex: '#28A745'
    },
    {
      backgroundHex: '#F2E6FF',
      nameHex: '#6F42C1'
    },
    {
      backgroundHex: '#FFF8E1',
      nameHex: '#FFC107'
    },
    {
      backgroundHex: '#FFEDE9',
      nameHex: '#DC3545'
    },
    {
      backgroundHex: '#E0F7FA',
      nameHex: '#17A2B8'
    },
    {
      backgroundHex: '#F8F9FA',
      nameHex: '#343A40'
    },
    
  ]

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleTagSubmit = async (event) => {
    event.preventDefault();

    if(!newTag) {
      return
    }

    const randomColor = tagColors[getRandomInt(0, tagColors.length - 1)]
    newTag.backgroundHex = randomColor.backgroundHex;
    newTag.nameHex = randomColor.nameHex;

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
            <span className='button-label'>Add Tag</span> 
          </Button>
        </form>
      </div>

      <Table data={{ headers: [{ label: "Tag name", column: "name" }], rows: tags }} setTags={setTags}/>
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
};
