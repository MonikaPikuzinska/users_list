import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [users, setUsers] = useState([])
  const [usersFiltered, setUsersFiltered] = useState([]);

  const API = 'https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json';
  const handleGetUsers = async () => {
    const response = await axios.get(API);
    const usersData = response.data.sort((a,b) => (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0));
    setUsers(usersData);
    setUsersFiltered(usersData);
  };
  useEffect(()=>{
    handleGetUsers();
  },[]);
  
  const handleSearch = (e) => {
    const foundUser = users.filter((user,i)=>{
      return user.first_name.toLowerCase().includes(e.target.value.toLowerCase()) || user.last_name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setUsersFiltered(foundUser)
  }
  
  const handleChecked = (e) => {
    const checkbox = document.getElementById(`${e.target.id}box`);
    checkbox.checked = !checkbox.checked
    console.log(e.target.id);
      
  }

  return (
    <div className="flex flex-col bg-gray-200">
      <h1 className="bg-green-600 block p-5 text-center text-2xl font-bold text-gray-100">Contacts</h1>
      <form className="self-center bg-gray-200">
        <input type="text" placeholder="Find a user" onChange={handleSearch}/>
      </form>
      {usersFiltered && usersFiltered.map(user => {
        return (
          <div id={user.id} className="flex flex-row bg-gray-200" onClick={handleChecked}>
            <img className="m-5" id={user.id} alt="avatar" src={user.avatar}/>
            <div className="font-bold block m-3" id={user.id}>{user.first_name} {user.last_name}</div>
            <form id={user.id} className="searcher__form">
                <input type="checkbox" id={`${user.id}box`} name="scales" onClick={handleChecked}/>
            </form>
        </div>
        )
      })}
    </div>
  );
}

export default App;
