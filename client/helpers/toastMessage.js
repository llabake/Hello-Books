const toastMessage = (message) => {
  Materialize.toast(
    message, 2000,
    'green darken-4 white-text rounded');
};

export default toastMessage;