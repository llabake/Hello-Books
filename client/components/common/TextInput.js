import React from 'react';
import PropTypes from 'prop-types';


const TextInput = ({ id, type, icon, placeholder, name, errors, value, onChange }) => {
  let wrapperClass = 'input-field col s12';

  return (
    <div className={wrapperClass}>
      <i className="material-icons prefix">{icon}</i>
      <input 
      id={id} 
      type={type} 
      required
      placeholder={placeholder}
      className="validate"
      name={name}
      value={value} 
      onChange={onChange}
      />
      {errors && errors.length ?
        errors.map((error, i) => { return (
        <div key={i} className= 'red-text'>
          <i className="material-icons">error_outline</i>
          {/* <li>{error}</li> */}
          {error}
        </div>
        )}) : null }
    </div>
  )
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string,
  errors: PropTypes.array,
  placeholder: PropTypes.string
};

export default TextInput;

