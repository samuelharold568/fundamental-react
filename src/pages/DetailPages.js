import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import DetailNotes from "../components/DetailNotes";
import { getNote } from '../utils/api';
const btnRemove = <i className="fa fa-trash"></i>;
const btnUndo = <i className="fa fa-undo"></i>;
const btnArchive = <i className="fa fa-file"></i>;

function DetailPages({
  showFormattedDate,
  popupDelete,
  onArchiveHandler,
  onActiveHandler
}) {
  const {id} = useParams();
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    async function getDetail() {
      const {data} = await getNote(id);

      setDetail(data);
    }

    getDetail();
  }, [id])

  return (
    <article className="detail-container">
      {detail ? <DetailNotes
        id={detail.id}
        title={detail.title}
        createdAt={showFormattedDate(detail.createdAt)}
        body={detail.body}
        key={detail.id}
        onArchive={detail.archived ?onActiveHandler : onArchiveHandler}
        onDelete={popupDelete}
        btnDelete={btnRemove}
        btnName={detail.archived ? btnUndo : btnArchive}
      /> : <p>loading..</p>}
    </article> 
  ) 
};

DetailPages.propTypes = {
/*   detail: PropTypes.array.isRequired, */
  showFormattedDate:PropTypes.func.isRequired,
  popupDelete: PropTypes.func.isRequired,
  onArchiveHandler: PropTypes.func.isRequired,
/*   btnRemove: PropTypes.object.isRequired, */
}

export default DetailPages;