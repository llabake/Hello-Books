import React from 'react';
import PropTypes from 'prop-types';


const TextAreaInput = ({ id, icon, placeholder, errors, name, value, onChange, }) => {
  return (
    <div className="row">
      <div className="input-field col s12">
        <i className="material-icons prefix">{icon}</i>
        <textarea 
        id={id} 
        className="materialize-textarea validate"
        placeholder={placeholder}
        value={value}
        name ={name}
        onChange={onChange}
        />
        {errors && errors.length ?
        errors.map((error, i) => { return (
        <div key={i} className= 'red-text'>
          <i className="material-icons">error_outline</i>
          {error}
        </div>
        )}) : null }
      </div>
    </div>
  )

}


TextAreaInput.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  errors: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};


export default TextAreaInput;
