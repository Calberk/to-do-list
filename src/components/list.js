import React, {Component} from 'react';
import listData from '../dummy_data/list'

class List extends Component{
    constructor (props){
        super(props);

        this.state = {
            list: [],
        }
    }

    getListData(){   //CALL SERVER TO GET DATA
        this.setState({
            list: listData
        })
    }

    componentDidMount(){
        this.getListData();
    }

    render(){
        console.log(this.state);

        const listElements = this.state.list.map((item, index) => {
            return <li className="collection-item" key={item._id}>{item.title}</li>
        });

        return (
            <ul className="collection">
                {listElements}
            </ul>
        );
    }
}

export default List;