import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import  TextAreaInput from '../common/TextAreaInput'
import  TextInput from '../common/TextInput'
/**
 * 
 * 
 * @class ModifyBookDetail
 * @extends {Component}
 */
class ModifyBookDetail extends Component {

  /**
   * Creates an instance of ModifyBookDetail.
   * @param {any} props 
   * @memberof ModifyBookDetail
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      publishedYear: '',
      isbn: '',
      quantity: '',
      description: '',
      aboutAuthor: '',
      image: '',
      errors: {},
    }
    this.handleChange = this.handleChange.bind(this);

  }

  /**
   * @returns {void}
   * 
   * @memberof ModifyBookDetail
   */
  componentWillMount() {
    const { book } = this.props
    // this.setState({
    //   title: book.title,
    //   author: book.author,
    //   publishedYear: book.publishedYear,
    //   isbn: book.isbn,
    //   quantity: book.quantity,
    //   description: book.description,
    //   aboutAuthor: book.aboutAuthor,
    //   image: book.image
    // })
  }

  /**
   * @returns {void}
   * 
   * @param {any} event 
   * @memberof ModifyBookDetail
   */
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    }, () => this.validate());
  }

  validate() {

  }

  /**
   * 
   * 
   * @returns  {Object} Edited Book Object
   * @memberof ModifyBookDetail
   */
  render () {
    console.log(this.props)
    const { book } = this.props
    
    const { errors, isValid, saving, } = this.state;
    return (
      // redirect ? <Redirect to='/allbooks' /> : 
      <div>
        <div id="banner">
          <div className="container form-style">
            <div className="row">
              <div className="row signup-head">  
                <div className="col s12"> 
                  <h5 className="center-align"> Edit Book </h5> 
                </div>
              </div> 
              <div className="col s12 ">
                <div className="row ">
                  <form className="col s12 signup" onSubmit={this.handleSubmit}>      
                  <TextInput
                    id = 'title'
                    type = 'text'
                    icon = 'title'
                    name = 'title'
                    placeholder = 'Title'
                    onChange = {this.handleChange}
                    value = {this.state.title || book.title }
                    errors = {errors.title}
                    />
                    <TextInput
                    id = 'author'
                    type = 'text'
                    icon = 'account_circle'
                    name = 'author'
                    placeholder = 'Author'
                    onChange = {this.handleChange}
                    value = {this.state.author || book.author }
                    errors = {errors.author}
                    />
                    <TextInput
                    id = 'publishedYear'
                    type = 'text'
                    icon = 'date_range'
                    name = 'publishedYear'
                    placeholder = 'Published Year'
                    onChange = {this.handleChange}
                    value = {this.state.publishedYear || book.publishedYear}
                    errors = {errors.publishedYear}
                    />
                    <TextInput
                    id = 'isbn'
                    type = 'text'
                    icon = 'lock'
                    name = 'isbn'
                    placeholder = 'ISBN'
                    onChange = {this.handleChange}
                    onBlur = {this.handleBlur}                    
                    value = {this.state.isbn || book.isbn }
                    errors = {errors.isbn}
                    />
                    <TextInput
                    id = 'quantity'
                    type = 'number'
                    icon = 'date_range'
                    name = 'quantity'
                    placeholder = 'Quantity'
                    onChange = {this.handleChange}
                    value = { this.state.quantity !== '' ? this.state.quantity || book.quantity : null}
                    errors = {errors.quantity}
                    />
                    <TextAreaInput
                    id='description'
                    icon = 'short_text'
                    name = 'description'
                    placeholder = 'Description'
                    value = {this.state.description || book.description}
                    onChange = {this.handleChange}
                    errors = {errors.description}
                    />
                    <TextAreaInput
                    id='aboutAuthor'
                    icon = 'short_text'
                    placeholder = 'About the Author'
                    name = 'aboutAuthor'
                    value = {this.state.aboutAuthor || book.aboutAuthor}
                    onChange = {this.handleChange}
                    errors = {errors.aboutAuthor}
                    />
                    <TextInput
                    id = 'image'
                    type = 'text'
                    icon = 'image'
                    name = 'image'
                    placeholder = 'Image'
                    onChange = {this.handleChange}
                    value = {this.state.image || book.image}
                    errors = {errors.image}
                    />
                    <button type="submit" className="waves-effect waves-light btn" disabled= {!isValid || saving}>Edit Book</button>
                  </form>
                </div>
              </div>
            </div>
           </div> 
        </div>
      </div>
    )
  } 
}

export default ModifyBookDetail; 