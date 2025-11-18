import * as ActionTypes from './ActionTypes';

const initialState = {
  isLoading: true,   // Ban đầu true để hiện "Loading..." khi chưa có dữ liệu
  errMess: null,
  dishes: []
};

export const dishes = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DISHES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        dishes: [] // clear danh sách cũ khi đang tải lại
      };

    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload
      };

    case ActionTypes.DISHES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        dishes: [] // clear danh sách nếu lỗi
      };

    default:
      return state;
  }
};

export default dishes;
