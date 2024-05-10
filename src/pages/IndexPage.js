// import Post from "../Post";
// import {useEffect, useState} from "react";

// export default function IndexPage() {
//   const [posts,setPosts] = useState([]);
//   useEffect(() => {
//     fetch('http://localhost:4000/post').then(response => {
//       response.json().then(posts => {
//         setPosts(posts);
//       });
//     });
//   }, []);
//   return (
//     <>
//       {posts.length > 0 && posts.map(post => (

//         <Post 
//         key={post._id}
//         {...post}
//         author={post.author}
        
//         />
//       ))}
//     </>
//   );
// }
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        // Retrieve the JWT token from the user info context
        const token = userInfo ? userInfo.token : null;
        
        if (!token) {
          console.error('JWT token is missing');
          return;
        }

        // Fetch user profile with JWT token included in headers
        const response = await fetch('http://localhost:4000/profile', {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userInfo = await response.json();
          setUserInfo(userInfo);
        } else {
          // Handle error response
        }
      } catch (error) {
        // Handle fetch error
      }
    }

    fetchUserProfile();
  }, [userInfo]); // Run the effect when userInfo changes

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}


