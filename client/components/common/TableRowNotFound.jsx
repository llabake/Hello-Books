import React from 'react';
import PropTypes from 'prop-types';

const TableRowNotFound = ({ text }) => {
  return (
    <tr>
      <td>
      {text}
      </td>
    </tr>
  )
};

TableRowNotFound.propTypes = {
  text: PropTypes.string
};

export default TableRowNotFound;
