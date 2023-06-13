import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function UserAccount() {
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [userRepo, setUserRepo] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  
  const options = {headers: {
    Authorization: `Bearer ${token}`
  }};

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://api.github.com/users/${username}`, options)
    .then((response) => {
      setUserData(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    })
    .catch((error) => {
      setErrorMessage(error.message);
      setIsLoading(false)
    });

    axios.get(`https://api.github.com/users/${username}/repos`, options)
    .then((response) => {
      setUserRepo(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    })
    .catch((error) => {
      setErrorMessage(error.message);
      setIsLoading(false);
    });
  }, [username]);

  if(isLoading) {
    return <div>Loading...</div>
  }

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