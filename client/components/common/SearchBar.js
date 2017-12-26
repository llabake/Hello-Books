import React from 'react';

const SearchBar = () => {
  return (
    <form>
      <div className="input-field col s6 s12 ">
          <input id="search" type="search"  placeholder="Title, author, or ISBN" required/>
          <label className="label-icon icon-sit" htmlFor="search"><i className="material-icons">search</i></label>
          <i className="material-icons">close</i>
      </div>
    </form>
  )
}

export default SearchBar;