import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/">To Do</NavLink>
        <NavLink to="/auth/login">로그인</NavLink>
        <NavLink to="/auth/signup">회원가입</NavLink>
      </nav>
    </header>
  );
}
