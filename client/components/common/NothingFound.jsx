import React from 'react';
import PropTypes from 'prop-types';

const NothingFound = ({ text, id }) => {
  return (
    <div
      className="card-panel row center-align"
      id={id}>
      <h4>
        {text}
      </h4>
    </div>
  )
};

NothingFound.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string
};

export default NothingFound;