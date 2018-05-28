const axiosDefaultOption = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: token ? token : '',
    },
  }
};

export default axiosDefaultOption;