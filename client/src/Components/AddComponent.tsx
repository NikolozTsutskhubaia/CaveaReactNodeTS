import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AddComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
  });
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name || !formData.location || !formData.price) {
      setShowError(true);
    } else {
      console.log(formData);
      axios
        .post("http://localhost:8000/inventories", formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      navigate("/");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column justify-content-between"
      >
        {showError && (
          <div className="alert alert-danger" role="alert">
            გთხოვთ შეავსოთ ყველა ველი
          </div>
        )}
        <input
          className="form-control w-25 m-3"
          type="text"
          name="name"
          onChange={handleChange}
        />
        <select
          className="form-select w-25 m-3"
          name="location"
          onChange={handleChange}
        >
          <option defaultValue={"Default"}>ლოკაცია</option>
          <option value="მთავარი ოფისი">მთავარი ოფისი</option>
          <option value="კავეა გალერეა">კავეა გალერეა</option>
          <option value="კავეა თბილისი მოლი">კავეა თბილისი მოლი</option>
          <option value="კავეა ისთ ფოინთი">კავეა ისთ ფოინთი</option>
          <option value="კავეა სითი მოლი">კავეა სითი მოლი</option>
        </select>
        <input
          className="form-control w-25 m-3"
          type="number"
          name="price"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-dark w-25 m-3">
          დამატება
        </button>
        <Link to={"/"}>
          <button type="submit" className="btn btn-danger w-25 m-3">
            გაუქმება
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AddComponent;
