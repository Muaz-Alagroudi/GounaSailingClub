import React, { useState } from "react";
import axios from "axios";
import './AddBoat.scss';

const AddBoat = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    capacity: "",
  });
  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("description", formData.description);
    data.append("capacity", formData.capacity);

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      const response = await axios.post("http://localhost:4000/api/boats", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Boat added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("There was an error adding the boat!", error);
    }
  };

  return (
    <div className="boat-form-container">
      <h2>Add a New Boat</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Images:</label>
          <input type="file" name="images" onChange={handleImageChange} multiple />
        </div>
        <button type="submit">Add Boat</button>
      </form>
    </div>
  );
};

export default AddBoat;
