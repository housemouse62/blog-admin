import NavBar from "./NavBar";
import logo from "../src/assets/logo.png";
import "./Header.css";

function Header() {
  return (
    <header>
      <img className="logo" src={`${logo}`} />
      <NavBar />
    </header>
  );
}

export default Header;
