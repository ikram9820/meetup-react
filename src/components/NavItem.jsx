import { Link } from "react-router-dom";

function NavItem({path,title,children}) {
  return (
    <li className="nav-item">
      <Link className="nav-link " aria-current="page" to={path}>
        {title}
        {children}
      </Link>
    </li>
  );
}

export default NavItem;