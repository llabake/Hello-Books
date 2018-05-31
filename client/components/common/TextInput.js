import React from 'react';
import PropTypes from 'prop-types';


const TextInput = ({ id, type, icon, placeholder, name, errors, value, onChange, onBlur }) => {
  return (
    <div className='input-field col s12'>
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
      onBlur={onBlur}
      />
      {errors && errors.length ?
        errors.map((error, i) => { return (
        <div key={i} 
        className='red-text left-align' 
        style={{ 
          'fontSize':'medium', 
          'marginLeft': 46, 
          'marginTop': -12
          }}>
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  errors: PropTypes.array,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;

