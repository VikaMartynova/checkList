import  React, {Component} from 'react';
import './Lists.css';
import {connect} from 'react-redux';
import {visible} from "./actions";
import Items from './Items';


class Lists extends Component {

    constructor(props) {
        super(props);
        this.viewList = this.viewList.bind(this);
        this.delete = this.delete.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    viewList(list) {
        return (
            <li key={list.id}>
                <button onClick={() => {
                    this.props.store.dispatch(visible(list.id));
                }} >
                    {list.name}</button>
            </li>
        );
    }

    delete(id) {
        this.props.delete(id);
    }

    toggle(id) {
        this.props.toggle(id);
    }

    render() {

        const {store} = this.props;
        const activeIndex = this.props.activeIndex;
        let entries = store.getState().appState.lists;
        let listLists = [];
        let list = entries[activeIndex];

        if (activeIndex === -1) {
            listLists = entries.map(this.viewList);
            return(
                <ul className='Lists'>
                    {listLists}
                </ul>
            );
        }
        else {
            return (
                <div>
                    <h1 className='NameList'>{list.name}</h1>
                    <Items entries={list.items} delete={this.delete} toggle={this.toggle}/>
                </div>
            );
        }
    }
}

const mapStateToProps = (store) => {
    return {
    lists: store.appState.lists,
    activeIndex: store.appState.activeIndex
    }
};

export default connect(mapStateToProps)(Lists);