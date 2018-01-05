const token = localStorage.getItem('token');

const axiosDefaultOption = {
  headers: {
      Authorization: token ? token : '',
  },
};

export default axiosDefaultOption;