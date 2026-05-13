import { useEffect } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";
import "./App.css";

function App() {
  const { userState } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userState && location.pathname === "/") {
      navigate("/posts");
    }
  }, [userState]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <Header>
        <NavBar />
      </Header>
      <main id="main" className="main-bg">
        <div className="site-main">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
