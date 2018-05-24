
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ADD_LIST = 'ADD_LIST';
export const VISIBLE = 'VISIBLE';
export const EXIT = 'EXIT';
export const TOGGLE = 'TOGGLE';
export const BACK = 'BACK';


export function addList(name) {
    return {type: ADD_LIST, name}
}

export function addItem(item) {
    return {type: ADD_ITEM, item}
}

export function deleteItem(id){
    return {type: DELETE_ITEM, id}
}

export function visible(id){
    return {type: VISIBLE, id}
}

export function exit(){
    return {type: EXIT}
}

export function toggleItem(id){
    return {type: 'TOGGLE', id}
}
export function back(){
    return {type: BACK}
}
