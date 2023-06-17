import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function ArticleBody({
  title,
  createdAt,
  body,
  id,
  onDelete,
  onArchive,
  btnDelete,
  btnName,
}) {
  return (
    <li className="todo stack-small list">
      <div className="Contact-item-body">
        <h3 className="title-article">{title}</h3>
        <h4 className="date-article">{createdAt}</h4>
        <p className="text-article">{body}</p>
      </div>
      <div className="btn-group">
        <button 
          type="button"
          className="btn-delete btn-circle"
          onClick= {() => onDelete(id)}>
          {btnDelete}
        </button>
        <button 
          type="button"
          className="btn-archive btn-circle"
          onClick={() => onArchive(id)}>
          {btnName} 
        </button>
      </div>
      <Link to={`/detail/${id}`}>Detail..</Link>
    </li>
  );
};

ArticleBody.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  btnDelete: PropTypes.object.isRequired,
  btnName: PropTypes.object.isRequired,
}

export default ArticleBody;
