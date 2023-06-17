import React from 'react';
import PropTypes from 'prop-types';

function DetailNotes({
  id,
  title,
  createdAt,
  body,
  onArchive,
  onDelete,
  btnDelete,
  btnName,
}) {
  return (
    <div className="detail">
      <h3 className="title-article-detail">{title}</h3>
      <div>
        <h4 className="date-article">{createdAt}</h4>
        <p className="text-article">{body}</p>
      </div>
      <div className="btn-group-on-detail">
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
    </div> 
  ) 
}

DetailNotes.propTypes = {
/*   title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  btnDelete: PropTypes.object.isRequired,
  btnName: PropTypes.object.isRequired, */
}

export default DetailNotes;

