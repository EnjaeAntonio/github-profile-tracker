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
      console.log(response.data)
      setTimeout(() => {
        setIsLoading(false);
      });
    })
    .catch((error) => {
      setErrorMessage(error.message);
      setIsLoading(false)
    });

    axios.get(`https://api.github.com/users/${username}/repos`, options)
    .then((response) => {
      setUserRepo(response.data);
      console.log(response.data)
      setTimeout(() => {
        setIsLoading(false);
      });
    })
    .catch((error) => {
      setErrorMessage(error.message);
      setIsLoading(false);
    });
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };


  return (
    <section>
      <div className="grid py-4 justify-center items-center text-center">
        <img className="mx-auto" src={userData.avatar_url} alt="User avatar" />
        <h1 className="">{userData.name}</h1>
        <button><a href={userData.html_url}>Profile</a></button>
        <div className="flex justify-between">
          <div>
            <p>{userData.followers} <span>Followers</span></p>
          </div>
          <p>{userData.following} <span>Following</span></p>
        </div>
      </div>

      <div>
      <p>Number of repos: {userData.public_repos}</p>
          {userRepo.map((repo, index)=> {
            return (
              <div key={index} className="repo-container">
              <h2 className="repo-name">
                <a 
                href={repo.html_url} target="_blank" 
                rel="noopener noreferrer"
                >{repo.name}</a>
                </h2>
              <p className="repo-desc">{repo.description}</p>
              <p className="created">Created: {formatDate(repo.created_at)}</p>
            </div>
            )
          })}
      </div>
    </section>
  )
}

export default UserAccount;