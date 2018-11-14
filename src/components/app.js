import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import '../assets/css/app.css';
import List from './list'
import AddItem from './add_item';
// import listData from '../dummy_data/list'  no longer pulling dummy data after accessing server
import {randomString} from '../helpers'
import axios from 'axios';

const BASE_URL = 'http://api.reactprototypes.com/todos';
const API_KEY = '?key=c918_edmund';

class App extends Component{
    constructor (props){
        super(props);

        this.state = {
            list: [],
            error:'',
        }
    }

    async getListData(){   //CALL SERVER TO GET DATA
        // http://api.reactprototypes.com/todos?key=c718_demouser 

        try {

            // throw new Error('This is a Edmund Error')  'throw' is a keyword
            // asdfasdf  //error thrown in 


        const resp =await axios.get(BASE_URL + API_KEY);
        console.log('Response:', resp)
            this.setState({
                list: resp.data.todos
            })
        } catch(err){
            console.log('Error: ', err.message)

            this.setState({
                error: 'Error getting Todos',
            })
        }
        
    }
    //     axios.get(BASE_URL + API_KEY).then((resp) =>{
    //         this.setState({
    //             list: resp.data.todos,
    //         })
    //     }).catch((err)=> {
    //         console.log('Request Error:', err.message);
    //         this.setState({
    //             error: "Error getting todo",
    //         })
    //     })
    // }
    
    componentDidMount(){
        this.getListData();
    }

    addItem = async (item) => {
        await axios.post(BASE_URL + API_KEY, item);  //not setting to a const variable because its not being reused
        console.log('Add item response: ', resp);
        
        this.getListData();


        // item._id = randomString(8);   //LOCALLY CREATING AN ITEM AND ADDING TO LIST
        // this.setState({
        //     list: [item, ...this.state.list]
        // })
    }

    deleteItem = async (id) => {
        console.log('Delete item with: ', id);
        // http://api.reactprototypes.com/todos/{id}?key=c718_demouser 
        await axios.delete(`${BASE_URL}/${id + API_KEY} `)   //not setting to a const variable because its not being reused


            this.getListData();

        // const listCopy = this.state.list.slice();

        // listCopy.splice(index,1);

        // this.setState({
        //     list: listCopy
        // });
    }

    render(){
        const {error, list} = this.state;
            console.log(list)
        return (
            <div className="container">
                <h1 className="center">To Do List</h1>
        
                <AddItem add={this.addItem}/> 

                {
                    error 
                    ? <h1 className="center red-text">{error}</h1> 
                    : <List delete={this.deleteItem} data={this.state.list}/>
                } 
                
            </div>
        );
    }
}
    

export default App;
