import React, {useState} from "react";
import PropTypes from 'prop-types';

function FormPages({addTitle}) {
  const [title, setTitle] = useState("");
  const [textArea, setTextArea] = useState("");
  const [limit, setLimit] = useState(50);

  function handleChangeTitle(e) {
    const reduceLimit = e.target.value.length;
    const updateLimit = 50 - reduceLimit;
    if(reduceLimit === 51) {
      window.alert("title shouldn't exceed 50 characters");
      return;
    }
    setTitle(e.target.value);
    setLimit(updateLimit);
  };

  function  handleChangeTextArea(e) {
    setTextArea(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    addTitle(title, textArea);
    setTitle("");
    setTextArea("");
    setLimit(50);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="title-form">Create Notes</h2>
      <h3 className="limit-caracter">Limit caracter : {limit}</h3>
      <input
        id="new-book-title"
        className="book-title"
        type="text"
        placeholder="Book Title.."
        value={title}
        onChange={handleChangeTitle}
        required 
      />
      <textarea
        id="new-text-areaa"
        className="text-area"
        type="text"
        placeholder="Write here.."
        value={textArea}
        onChange={handleChangeTextArea}
        required
      />
      <button type="submit" id="new-book-submit" className="book-submit btn-summit">Add Book</button>
    </form>
  );
};

FormPages.propTypes = {
  addTitle: PropTypes.func.isRequired
};

export default FormPages;

