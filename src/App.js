import React, { useState } from 'react';
import './App.css';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [siteName, setSiteName] = useState('');

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
          setSiteName(e.target.value)
        }}
        placeholder='Login URL'>
      </input>
      <button 
        onClick={()=>{
          console.log(username, 'username Test');
          console.log(password, 'password Test');
        }
      }>
      Test
      </button>
    </>
  );
}

export default App;
