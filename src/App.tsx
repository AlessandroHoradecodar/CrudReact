import "./App.css";
import { useState, useEffect } from "react";
import { api } from "../src/services/index";
import axios from "axios";

function App() {
  const [user, setUser] = useState([]);

  //MÉTODOS HTTP : GET(ok), POST(ok), DELETE(ok), UPDATE(ok)

  //GET
  useEffect(() => {
    api.get("http://localhost:5555/users").then((response) => {
      setUser(response.data);
    });
  }, []);

  //POST
  const addUser = () => {
    const userName = document.getElementById("userName") as HTMLInputElement;
    const userAge = document.getElementById("userAge") as HTMLInputElement;

    const newUser = {
      name: userName.value,
      age: userAge.value,
    };

    if (userName.value == "" || userAge.value == "") {
      alert("Please enter a name and age");
    } else {
      api.post("http://localhost:5555/users", newUser).then(() => {
        setUser([...user, newUser]);
      });
    }
  };

  //DELETE
  const deleteUser = async (id: number) => {
    await axios.delete(`http://localhost:5555/users/${id}`);
    const newUsers = user.filter((user: any) => user.id !== id);
    setUser(newUsers);
  };

  //UPDATE
  const updateUser = async (id: number) => {
    const updatedName = document.getElementById(
      `updatedName${id}`
    ) as HTMLInputElement;
    const updateAge = document.getElementById(
      `updateAge${id}`
    ) as HTMLInputElement;

    const updatedUser = {
      name: updatedName.value,
      age: updateAge.value,
    };

    await axios.put(`http://localhost:5555/users/${id}`, updatedUser);
    const newUsers = user.filter((user: any) => user.id !== id);
    setUser(newUsers);
  };

  return (
    <>
      <h1>Users</h1>
      <ul>
        {user.map((user: any) => (
          <div key={user.id} className="sec1">
            <span className="dataContainer">
              {user.name} - {user.age}
            </span>
            <input
              type="text"
              id={`updatedName${user.id}`}
              className="nameIpt"
            />
            <input
              type="number"
              id={`updateAge${user.id}`}
              className="ageIpt"
            />
            <button onClick={() => updateUser(user.id)}>Update</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </ul>
      <div className="createUserContainer">
        <label htmlFor="">Name</label>
        <input type="text" id="userName"  className="nameIpt" required />
        <label htmlFor="">Age</label>
        <input type="number" id="userAge" className="ageIpt" required />
        <button onClick={addUser}>Add User</button>
      </div>
    </>
  );
}

export default App;
