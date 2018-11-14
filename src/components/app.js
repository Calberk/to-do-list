import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import '../assets/css/app.css';
import List from './list'
import AddItem from './add_item';
import axios from 'axios';
import {Route} from 'react-router-dom'
// import listData from '../dummy_data/list'  no longer pulling dummy data after accessing server
// import {randomString} from '../helpers'


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
        // console.log('Response:', resp)
            this.setState({
                list: resp.data.todos
            })
        } catch(err){
            // console.log('Error: ', err.message)

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
 
        
        this.getListData();

       // console.log('Add item response: ', resp)
        // item._id = randomString(8);   //LOCALLY CREATING AN ITEM AND ADDING TO LIST
        // this.setState({
        //     list: [item, ...this.state.list]
        // })
    }

    deleteItem = async (id) => {
        // console.log('Delete item with: ', id);
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
            // console.log(list)
        return (
            <div className="container">

                <Route exact path='/' render={()=>{
                    return <List delete={this.deleteItem} data={list} error={error}/>
                }}/>

                <Route path='/add-item' render={()=>{
                    return <AddItem add={this.addItem}/>
                }}/>

                
            </div>
        );
    }
}
    

export default App;
