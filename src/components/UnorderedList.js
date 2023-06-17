import React from "react";
import PropTypes from 'prop-types';
import ArticleBody from "./ArticleBody";
import NotesEmpty from "./NotesEmpty";

function UnorderedList({
  filteredNotes,
  status,
  showFormattedDate,
  popupDelete,
  onArchiveHandler,
  btnRemove,
  name}) {

  const notes = filteredNotes
        .filter((item) => {
          return item.archived === status;
        })
        .map((item) => {
          return (
            <ArticleBody
              id={item.id}
              title={item.title}
              createdAt={showFormattedDate(item.createdAt)}
              body={item.body}
              key={item.id}
              onArchive={onArchiveHandler}
              onDelete={popupDelete}
              btnDelete={btnRemove}
              btnName={name}
            />
          );
        })

  const noteStatus = notes.length !== 0 ? notes : <NotesEmpty/>;

  return (
    <ul className="unordered-list">
      {noteStatus}
    </ul> 
  ) 
};

UnorderedList.propTypes = {
  filteredNotes: PropTypes.array.isRequired,
  status: PropTypes.bool.isRequired,
  showFormattedDate: PropTypes.func.isRequired,
  popupDelete: PropTypes.func.isRequired,
  onArchiveHandler: PropTypes.func.isRequired,
  btnRemove: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired
}

export default UnorderedList;