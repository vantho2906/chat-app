const socketReducer = (state = null, action) => {
  switch (action.type) {
    case 'SOCKET':
      return action.payload;
    default:
      return state;
  }
};

export default socketReducer;
