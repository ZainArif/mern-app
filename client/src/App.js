import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import { Form, FormControl } from 'react-bootstrap/lib';
import './assets/react-toolbox/theme.css';
import theme from './assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Grid from 'react-bootstrap/lib/Grid';
import { Row, Col } from 'react-bootstrap/lib';
import Card from 'react-toolbox/lib/card';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {Link} from 'react-router-dom';

class App extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
      vote: '234',
      name: 'backend',
      myDescription: {},
      change: false,
      myname: '',
      myvote: '',
      search: '',
      formFields: {
        username: '',
        vote: ''
      },
      filteredArray: [],
    details: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.gotoLogin = this.gotoLogin.bind(this);
    this.handleChangemyname = this.handleChangemyname.bind(this);
    this.handleChangemyvote = this.handleChangemyvote.bind(this);
    //  this.sendData = this.sendData.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.getFiltered = this.getFiltered.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    //  this.getDescription =this.getDescription.bind(this);
  }


  componentWillMount() {
    axios('http:localhost:4000/api/ninja')
      .then(res => {
        const users = res.data;
        let array = Object.values(users);
        console.log(array)
        this.setState({ users: array });
      })
  }

  handleChange(e) {
    this.setState({ vote: e.target.value });
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangemyname(e) {
    this.setState({ myname: e.target.value });
  }

  handleChangemyvote(e) {
    this.setState({ myvote: e.target.value });
  }

  handleChangeSearch(e){
    this.setState({ search : e.target.value })
   
  }





  gotoLogin(e) {
    let { users } = this.state;
    var flg = false;
    e.preventDefault();
    const found = users.map((obj) => {
      if (obj.name == this.state.name && obj.vote == this.state.vote) {
        this.setState({ change: !this.state.change })
        flg = false
      }
      else if (flg == true) {
        alert('user not found ');
        flg = false;
      }
    })
  }


  formHandler(e) {
    e.preventDefault();
    let { myname, myvote } = this.state;
    var myobj = {};
    myobj.name = myname;
    myobj.vote = myvote;

    axios.post('/api/ninja', myobj)
      .then(function (response) {
        console.log(response);

      }).catch(function (error) {
        console.log(error);

      });
  }



  getFiltered(e) {

    let { users } = this.state;
    const filter = e.target.value;
    let filteredArray = [];

    users.forEach((user) => {
      if (user.name === filter) {
        filteredArray.push(user);
      }
    })
    this.setState({filteredArray})
    console.log('filteredArray', this.state.filteredArray)
  }

  getProductDetails(obj){
   let details=[];
   details.push(obj);
   this.setState({ details })
    console.log(this.state.details);
  }



  render() {

    console.log(this.state.filteredArray);
    return (
 
       <ThemeProvider theme={theme}>
         <div className="App">
           <AppBar title='React Toolbox' leftIcon='menu' >
             {/* <Link to="/description"> desc </Link> */}
           </AppBar>


           <br /><br /><br /><br />

           <div>

             {/* <form method="post" onSubmit={this.sendData}>

               <input type="text" onChange={this.handleChangemyname} /> <br />
               <input type="password" onChange={this.handleChangemyvote} /> <br />
               <input type="submit" />

             </form>
  */}


             <br/><br/><br/>

             <input type="text" onChange={this.handleChangeSearch}/>  

             <br /><br /><br /><br />

           </div>

           {!this.state.change && <div>

             {/* <form method="post" > 

            <input type="text" name="name"/>

         </form> */}
             <div style={{ width: '320px', marginLeft: '500px' }}>
               <Card>
                 <Form onSubmit={this.gotoLogin} style={{ height: '260px', paddingLeft: '5px', paddingRight: '5px' }} >
                   <h1> Login Form </h1>
                   <FormControl
                     type="text"
                     value={this.state.name}
                     placeholder="Enter Name"
                     name="name"
                     onChange={this.handleChangeName}

                   />

                   <br />
                   <FormControl
                     type="password"
                     value={this.state.vote}
                     name="vote"
                     placeholder="Enter pass"
                     onChange={this.handleChange}
                   />
                   <br /><br /><br />
                   {/* <input type="submit"/> */}
                   <Button type="submit" bsStyle="info"> submit </Button>
                 </Form>
               </Card>
             </div>
             <br /><br />
           </div>

           }

           <div>
             <h3> Filter By Category </h3>
             <select onChange={this.getFiltered}>
             <option value="selected" > selected  </option>
             <option value="native" > native  </option>
               <option value="frontend" id="fe"> Front End  </option>
               <option value="backend" id="be"> Back End </option>
             </select>
           </div>

           {this.state.change && <div className="div1" >

             {this.state.filteredArray.map((obj) => {
              
 const newTo = { 
   pathname: "/description", 
   state: this.state.details 
 };
               return (
                 <Card style={{ width: '270px', height: '280px', marginTop: '35px', marginLeft: '45px' }}>
                   <p> <h5> {obj._id}   </h5> </p>
                   <p> <img src={obj.image} width="85%" /></p>
                   <p> <h5> {obj.name}  </h5> </p>
                   <p> <Link to={newTo}>  <Button bsStyle="info" onClick={this.getProductDetails.bind(this,obj)}> Details  </Button> </Link>  </p>
                   {/* <p> <Link to="/description/{obj._id}">   Details </Link> </p> */}
                   {/* <p> <Glyphicon glyph="star" /> </p> */}
                   {/* <p> <h5> {obj.vote} </h5> </p> */}
                 </Card>
               )
       })}

             <br /><br /><br /><br />
           </div>

           }

           <br /><br /><br /><br />




         </div>
       </ThemeProvider >
    );
  }
}

export default App;
