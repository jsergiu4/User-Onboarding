import logo from './logo.svg';
import './App.css';
import Form from './Form';
import {useState} from 'react'

function App(props) {
  const [users,setUsers] = useState([]);
  const changeUser = (user) =>{
    setUsers(prevUsers => [...prevUsers ,user])
  }
  
  return (
    <div className="App">
      <Form changeUser ={changeUser}/>
    <pre>{JSON.stringify(users)}</pre>
    </div>
  );    
}
   
export default App ;
