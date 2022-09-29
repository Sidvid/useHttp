import React ,{useReducer} from 'react';
const actionsType = {
  GET_DATA: 'GET_DATA',
  GET_DATA_SUCCESS: 'GET_DATA_SUCCESS',
  GET_DATA_FAILED: 'GET_DATA_FAILED',
};
const actions = {
  getData: () => {
    return {
      type: actionsType.GET_DATA,
    };
  },
  getDataSuccess: (data) => {
    return {
      type: actionsType.GET_DATA_SUCCESS,
      data,
    };
  },
  getDataFailed: (error) => {
    return {
      type: actionsType.GET_DATA_FAILED,
      error,
    };
  },
};
const initialState = {
  loading: false,
  error: false,
  data: [''],
};
const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionsType.GET_DATA:

      return {
        ...state,
        loading: true,
        error: false,
        data: [],
      };
    case actionsType.GET_DATA_SUCCESS:

      return {
        ...state,
        loading: false,
        error: false,
        data: action.data,
      };
    case actionsType.GET_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
  
      return {
        ...state,
      };
  }
};
function useHttp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const hitServer = async (url, option) => {
    try {
      dispatch(actions.getData());
      const response = await fetch(url, option);
      const responseJSON =await response.json();
      
      dispatch(actions.getDataSuccess(responseJSON));
    } catch (error) {
      dispatch(actions.getDataFailed(error));
    }
  };

  return {
    hitServer,
    state,
  };
}
export default useHttp;
