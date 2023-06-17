import React from "react";
import PropTypes from 'prop-types';
import UnorderedList from "../components/UnorderedList";
import TitleArticle from "../components/TitleArticle";

function NotesPages({
  titleArticle,
  stylingID,
  filteredNotes,
  status,
  showFormattedDate,
  popupDelete,
  onArchiveHandler,
  btnRemove,
  name,
}) {
  return (
    <article className="article-container">
      <TitleArticle titleArticle={titleArticle}/>
      <div className="div-ul-container" id={stylingID}>
      <UnorderedList
        status={status}
        filteredNotes={filteredNotes} 
        showFormattedDate={showFormattedDate}
        popupDelete={popupDelete}
        onArchiveHandler={onArchiveHandler}
        btnRemove={btnRemove}
        name={name}
      /> 
      </div>
    </article>
  ) 
};

NotesPages.propTypes = {
  titleArticle: PropTypes.string.isRequired,
  stylingID: PropTypes.string.isRequired,
  filteredNotes: PropTypes.array.isRequired,
  status: PropTypes.bool.isRequired,
  showFormattedDate:PropTypes.func.isRequired,
  popupDelete: PropTypes.func.isRequired,
  onArchiveHandler: PropTypes.func.isRequired,
  btnRemove: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired
}

export default NotesPages;

