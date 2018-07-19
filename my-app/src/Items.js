import  React, {Component} from 'react';
import './Items.css';

class Items extends Component{
    constructor(props){
        super(props);
        this.createItem = this.createItem.bind(this);
        this.delete = this.delete.bind(this);
        this.toggle = this.toggle.bind(this);

    }


    delete(id) {
        this.props.delete(id);
    }

    toggle(id){
        this.props.toggle(id);
    }

    createItem(item) {
        return (
            <li key={item.id}>
               <label onClick={() => {this.toggle(item.id)}}
                      style={{textDecoration: item.completed ? 'line-through' : 'none'}}>{item.text}</label>
                <button onClick={() => {this.delete(item.id)}}>x</button>
            </li>
        );
    }

    render(){
        let todoEntries = this.props.entries;

        let listItems = todoEntries.map(this.createItem);
        return(
            <ul className='createList'>
                {listItems}
            </ul>
        );
    }
}

export default Items;