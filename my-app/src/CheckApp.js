import React, { Component } from 'react';
import './App.css';
import List from './OneList';
import Lists from './Lists';
import { connect} from 'react-redux';
import {addList, exit, back, deleteItem, toggleItem} from "./actions";

const Title = () => {
        return(
            <h1>
                Check Lists
            </h1>
        )
};
class CheckApp extends Component {
    constructor(props) {
        super(props);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleViewClick = this.handleViewClick.bind(this);
        this.handleExitClick = this.handleExitClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.toggle = this.toggle.bind(this);
        this.inputRef = React.createRef();
        this.state = {
            isCreate: false,
            isView: false,
        };
    }
    handleCreateClick(){
        this.setState({isCreate: true});
    }
    handleViewClick(){
        this.setState({isView: true});
    }
    handleExitClick(){
        this.setState({isCreate: false,
                        isView: false,
        });
        this.props.dispatch(exit());
    }
    handleBackClick(){
        this.props.dispatch(back());
    }

    add(list) {
        let inputText = this.inputRef.current.value;
        if (inputText) {
            this.props.dispatch(
                addList(inputText)
            );
        }
        this.inputRef.current.value='';
        list.preventDefault();
    }
    delete(id) {

        this.props.dispatch(
            deleteItem(id)
        );
    }
    toggle(id) {
        this.props.dispatch(
            toggleItem(id)
        );
    }
    render() {
        const {isCreate, isView} = this.state;
        const {store} = this.props;
        const Menu = () => {
            return (
                <div className='Menu'>
                    <button className='menuBtn' onClick={this.handleCreateClick}>Create list</button>
                    <button className='menuBtn' onClick={this.handleViewClick}>View all lists</button>
                </div>
            );
        };
        const App = isCreate || isView ? (
            isCreate ?
                (
                    <div>
                        <List store={store} delete={this.delete} toggle={this.toggle}/>
                        <form onSubmit={this.add} className='CreateList'>
                            <input ref={this.inputRef} placeholder='Name of list' tabIndex={2}/>
                            <button className='Add' type='submit'>Add list</button>
                        </form>
                        <button className='Exit' type='submit' onClick={this.handleExitClick}>Exit</button>
                    </div>
                ) :
                (
                    <div>
                        <Lists store={store} delete={this.delete} toggle={this.toggle}/>
                        <button className='Add' type='submit' onClick={this.handleBackClick}>Lists</button>
                        <button className='Exit' type='submit' onClick={this.handleExitClick}>Exit</button>
                    </div>
                )
            ) : <Menu/>;
        return (
            <div className='container'>
                <div className='CheckApp'>
                    <div className='Title'>
                        <Title />
                    </div>
                    {App}
                </div>
            </div>
    );
  }
}
const mapStateToProps = (store) => {
    return {
        lists: store.appState.lists
    };
};
export default connect(mapStateToProps)(CheckApp);

