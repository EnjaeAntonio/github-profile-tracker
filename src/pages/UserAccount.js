import { useState, useEffect } from "react";
import axios from "axios";

function UserAccount() {
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState({});
  const [userRepo, setUserRepo] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const token = "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";
  const options = {headers: {
    Authorization: `Bearer ${token}`
  }};
  
  useEffect(() => {
    axios.get(`https://api.github.com/users/${user}`, options)
    .then((response) => {
      setUserData(response.data)
    })
    .catch((error) => {
      setErrorMessage(error.message);
    });

    axios.get(`https://api.github.com/users/${user}/repos`, options)
    .then((response) => {
      setUserRepo(response.data)
    })
    .catch((error) => {
      setErrorMessage(error.message);
    });
  }, [user]);

  return (
    <section>
        <img src={userData.avatar_url} alt="User avatar"/>
        <button><a href={userData.html_url}>Profile</a></button>
        <h1>{userData.name}</h1>
        <div>
          <p>{userData.followers}</p>
          <p>{userData.following}</p>
        </div>
        <div>
        <p>Number of repos: {userData.public_repos}</p>
            {userRepo.map((repo, index)=> {
              return (
                <div key={index}>
                <h2>{repo.name}</h2>
                <p>{repo.description}</p>
              </div>
              )
            })}
        </div>
      </section>
  )
}

export default UserAccount;