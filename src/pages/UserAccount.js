import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserAccount() {
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [userRepo, setUserRepo] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  // Use the token in your code
  console.log(token);
  
  
  const options = {headers: {
    Authorization: `Bearer ${token}`
  }};

  useEffect(() => {
    axios.get(`https://api.github.com/users/${username}`, options)
    .then((response) => {
      setUserData(response.data)
    })
    .catch((error) => {
      setErrorMessage(error.message);
    });

    axios.get(`https://api.github.com/users/${username}/repos`, options)
    .then((response) => {
      setUserRepo(response.data)
    })
    .catch((error) => {
      setErrorMessage(error.message);
    });
  }, [username]);

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