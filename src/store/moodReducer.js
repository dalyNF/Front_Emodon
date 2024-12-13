const initialState = {
  selectedMood: null,
};

const moodReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOOD':
      return {
        ...state,
        selectedMood: action.payload,
      };
    default:
      return state;
  }
};

export default moodReducer;
