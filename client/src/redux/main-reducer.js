import { combineReducers } from 'redux';

const userID = localStorage.getItem('userID');

const initialAuthState = { loggedIn: false }
function auth(state = initialAuthState, action) {
  if(userID) {
    state.loggedIn = true;
  }
  switch(action.type) {

    case 'LOGIN':
      return {
        ...state,
        loggedIn: true
      }

    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false
      }

    default:
      return state;
  }
}

// const initialTaskId = localStorage.getItem('taskId');
// const initialTask = localStorage.getItem('task');

// const initialTaskState = { task: '' }
// function task(state = initialTaskState, action) {
//   if(initialTask) {
//     task: [
//       {task: initialTask},
//       {taskId: initialTaskId}
//     ]
//   }

//   switch(action.type) {
//     case 'TASK':
//       return {
//         task: action.task,
//         taskId: action.taskId
//       }

//     default:
//       return state;
//   }
// }

// const initialUserState = { username: '' }
// function user(state = initialUserState, action) {
//   switch(action.type) {
//     case 'UPDATE_USER':
//       return {
//         ...state,
//         username: action.username
//       }

//     case 'DELETE_USER':
//       return {
//         ...state,
//         username: ''
//       }
//     default:
//       return state;
//   }
// }

// const initialQuestionState = { index: 0, data: null }
// function question(state = initialQuestionState, action) {
//   switch(action.type) {

//     case 'QUESTION_1':
//       return {
//         ...state,
//         data: action.data,
//         index: 0
//       }
//       break;

//     case 'QUESTION_2':
//       return {
//         ...state,
//         data: action.data,
//         index: 1
//       }
//       break;

//     case 'QUESTION_3':
//       return {
//         ...state,
//         data: action.data,
//         index: 2
//       }
//       break;

//       case 'NEXT_QUESTION':
//         return {
//           ...state,
//           index: ++state.index
//         }

//     default:
//       return state;
//   }
// }

const MainReducer = combineReducers({
  auth,
  // task,
  // user,
  // question
});

export default MainReducer;
