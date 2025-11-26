// leaders
export const LEADERS_LOADING = 'LEADERS_LOADING';
export const ADD_LEADERS = 'ADD_LEADERS';
export const LEADERS_FAILED = 'LEADERS_FAILED';
// dishes
export const DISHES_LOADING = 'DISHES_LOADING';
export const ADD_DISHES = 'ADD_DISHES';
export const DISHES_FAILED = 'DISHES_FAILED';
// comments
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const COMMENTS_FAILED = 'COMMENTS_FAILED';
export const COMMENTS_LOADING = 'COMMENTS_LOADING';
export const ADD_COMMENT = 'ADD_COMMENT';
//promotions
export const ADD_PROMOS = 'ADD_PROMOS'; 
export const PROMOS_FAILED = 'PROMOS_FAILED';
export const PROMOS_LOADING = 'PROMOS_LOADING';

// favorite
export const ADD_FAVORITE = 'ADD_FAVORITE';
// comments
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  var newcmt = { dishId: dishId, rating: rating, author: author, comment: comment, date: new Date().toISOString() };
  //dispatch(addComment(newcmt));
  fetch(baseUrl + 'comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newcmt)
  }).then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((cmt) => dispatch(addComment(cmt)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};
export const DELETE_FAVORITE = 'DELETE_FAVORITE';