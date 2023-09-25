import classes from "./navbar.module.css";
import Logo from "./../../assets/images/gallery-logo.jpg";
import { Link } from "react-router-dom";
import AuthContext from "../../auth/auth-context";
import { useContext } from "react";

const Navbar = () => {
const authCtx = useContext(AuthContext);

const logout = () => {
  authCtx.logout
  console.log('logged out')
}


  return (
    <div className={classes.navComp}>
      <div className={classes.logo}>
        <img src={Logo} alt="logo" />
        <h3>Gallery</h3>
      </div>
      <Link to="/login" className={classes.nav_btn}>
        <div className={classes.bars} onClick={logout}>
         {authCtx.isLoggedIn ? 'Logout' : '='}
          </div>
      </Link>
    </div>
  );
};

export default Navbar;
