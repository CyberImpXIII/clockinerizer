import React, { useState } from 'react';
import './App.css';
import Axios from 'axios'

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginURL, setLoginURL] = useState('');
  const [companyId, setCompanyId] = useState('');

  return (
    <>
      <input type='text' 
        onChange={(e)=>{
          setUsername(e.target.value)
        }} 
        placeholder='Username'>
      </input>
      <input type='text' 
        onChange={(e)=>{
          setPassword(e.target.value)
        }} 
        placeholder='Password'>
      </input>
      <input type='text' 
        onChange={(e)=>{
          setLoginURL(e.target.value)
        }}
        placeholder='Login URL'>
      </input>
      <input type='text' 
        onChange={(e)=>{
          setCompanyId(e.target.value)
        }}
        placeholder='Company ID'>
      </input>
      <button 
        onClick={()=>{
          Axios.get('api/test', {
            params : {
              username , password , loginURL, companyId
            }
          })
          .then((res)=>{
            console.log(res)
          })
          .catch((err)=>{
            console.log(err);
          })
        }
      }>
      Test
      </button>
    </>
  );
}

export default App;
