import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function NavBar() {
  const { userState, setTokenState, setUserState } = useAuth();

  function handleLogout() {
    if (confirm("Are you sure you want to logout?")) {
      setTokenState("");
      setUserState("");
      localStorage.removeItem("token");
    }
  }

  return (
    <nav>
      <div className="nav-bar">
        <Link to="/posts">Blog</Link>
        <Link to="/posts/new">New Blog Post</Link>
        <Link to="/profile">Profile</Link>
        {userState ? (
          <Link onClick={handleLogout}>Log Out</Link>
        ) : (
          <Link to="/">Log In</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
