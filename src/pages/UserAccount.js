import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UserAccount() {
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [userRepo, setUserRepo] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(`https://api.github.com/users/${username}/repos`),
        ]);
        setUserData(userResponse.data);
        setUserRepo(reposResponse.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        setTimeout(() => {
          if (error.response && error.response.status === 404) {
            setErrorMessage("User Not Found");
          } else {
            setErrorMessage(error.message);
          }
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container h-screen w-screen flex flex-col justify-center items-center space-y-4">
        <h1 className="text-custom-red text-3xl text-center">USER NOT FOUND</h1>
        <button
          className="redirect-btn py-1 px-4 rounded-md bg-custom-red"
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => navigate("/github-profile-tracker"), 2000);
          }}>
          Back to Home Page
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <section className="container animated">
      <div className="grid justify-center py-4">
        <div className="profile-card grid gap-2 py-5 px-5 text-center">
          <img
            className="mx-auto"
            src={userData.avatar_url}
            alt="User avatar"
          />
          <h1 className="">{userData.name}</h1>
          <div className="grid place-items-center mb-5">
            <button className="profile-link">
              <a target="_blank" href={userData.html_url}>
                Go to Github
              </a>
            </button>
          </div>
          <div className="user-info flex justify-between gap-6">
            <p className="grid">
              <span>{userData.followers}</span> FOLLOWERS
            </p>
            <p className="grid">
              <span>{userData.following}</span> FOLLOWING
            </p>
            <p className="grid">
              <span>{userData.public_repos}</span> REPOSITORIES
            </p>
          </div>
        </div>
      </div>
      <div>
        {userRepo.map((repo, index) => {
          return (
            <div key={index} className="repo-container">
              <h2 className="repo-name">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h2>
              <p className="repo-desc">{repo.description}</p>
              <p className="created">Created: {formatDate(repo.created_at)}</p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end">
        <button
          className=" home-btn rounded-md bg-custom-blue px-4 py-1 my-3 "
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => navigate("/github-profile-tracker"), 2000);
          }}>
          Back to Home
        </button>
      </div>
    </section>
  );
}

export default UserAccount;
