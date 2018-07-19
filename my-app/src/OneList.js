import React, {Component} from "react";
import './List.css';
import Items from './Items';
import {addItem} from "./actions";
import {connect} from 'react-redux';


export class List extends Component {

    constructor(props){
        super(props);
        this.inputRef = React.createRef();
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.toggle = this.toggle.bind(this);

    }
    add(element) {
        let inputText = this.inputRef.current.value;
           if (inputText){
           this.props.store.dispatch(addItem(inputText));
        }
        this.inputRef.current.value ='';
        element.preventDefault();
    }
    toggle(id) {
        this.props.toggle(id);
    }

    delete(id) {
        this.props.delete(id);
    }

    render(){
       const items = this.props.store.getState().listState;
        const deleteItem = this.delete;
        const toggleItems = this.toggle;
        return(
            <div className='List'>
                <div className='AddItem'>
                    <form onSubmit={this.add}>
                        <input ref={this.inputRef} tabIndex={1}/>
                        <button type='submit' >+</button>
                    </form>
                </div>
                <Items entries={items}  delete={deleteItem} toggle={toggleItems}/>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        items: store.listState
    }
};
export default connect(mapStateToProps)(List);
