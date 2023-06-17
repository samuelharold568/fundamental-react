import React from "react";
import PropTypes from 'prop-types';

function TitleArticle({titleArticle}) {
  return <h2 id="title-article">{titleArticle}</h2>
};

TitleArticle.propTypes = {
  titleArticle: PropTypes.string.isRequired,
}

export default TitleArticle;