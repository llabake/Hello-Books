import React from 'react';

import ajaxLoader from '../../media/ajax-loader.gif';

const Loader = () => {
  return (
    <div
      className="center-align"
      style={{ marginTop: '1em', marginBottom: '1em' }}
    >
      <img src={ajaxLoader} alt="Loading..." />
    </div>
  )
}

export default Loader;