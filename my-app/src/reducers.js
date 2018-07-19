import {
    ADD_ITEM, DELETE_ITEM,
    ADD_LIST, VISIBLE, EXIT, TOGGLE, BACK
} from "./actions";
import { combineReducers} from 'redux';
import { createStore } from 'redux';


//using for unique id
let nextItemId = 0;
let nextListId = 0;

const initialState = {
    lists: [],
    activeIndex: -1
};
const list = {
    items:[]
};

//for actions in each list
function listReducer (state = [], action) {
    switch (action.type){
        case ADD_ITEM:
            const newItem = {
                id : nextItemId++,
                completed: false,
                text: action.item
            };
            list.items = state.concat(newItem);
            return state.concat(newItem);

        case DELETE_ITEM:
            list.items = state.filter((item) => {return item.id !== action.id});
            return state.filter((item) => {return item.id !== action.id});
        case ADD_LIST:
            return [];
        case TOGGLE:
            list.items = list.items.map(item =>
                (item.id === action.id) ? {...item, completed: !item.completed} :
                    item);
            return state.map(item =>
                (item.id === action.id) ? {...item, completed: !item.completed} :
                    item);
        default:
            return state;
    }
}

// for actions to CheckList
function checkAppReducer (state = initialState, action) {
    switch (action.type){
        case ADD_LIST:
            const items = list.items;
            const newList = {
                id: nextListId++,
                items: items,
                name: action.name
            };
            return Object.assign({}, state, {
                lists: [
                    ...state.lists,
                    newList
                ]
            });
        case VISIBLE:
            return Object.assign({}, state, {
                activeIndex: action.id} );
        case TOGGLE:
            if (state.activeIndex !== -1) {
                state.lists[state.activeIndex].items =
                    listReducer(state.lists[state.activeIndex].items, action);
            }
            return state;

        case DELETE_ITEM:
            if(state.activeIndex !== -1) {
                state.lists[state.activeIndex].items = listReducer(state.lists[state.activeIndex].items, action);
            }
            return state;
        case EXIT:
            return Object.assign({}, state, {
                activeIndex: initialState.activeIndex});
        case BACK:
            return Object.assign({}, state, {
                activeIndex: initialState.activeIndex});
        default:
            return state;
    }
}

const reducers = combineReducers({
    listState: listReducer,
    appState: checkAppReducer,
});

const store = createStore(reducers);

export default store;