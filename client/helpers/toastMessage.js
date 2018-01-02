const toastMessage = (message, messageType) => {
  let style;
  if ( messageType === 'success') {
    style = 'green darken-4 white-text rounded'
  } else if ( messageType === 'failure') {
    style = 'red darken-4 white-text rounded'
  }
  Materialize.toast(
    message, 2000,
    style );
};

export default toastMessage;