import { NavLink } from "react-router-dom";

const navigations = [
  { to: "/", label: "To Do" },
  { to: "/auth/login", label: "로그인" },
  { to: "/auth/signup", label: "회원가입" },
];

export default function Header() {
  return (
    <header>
      <nav>
        {navigations.map((nav) => (
          <NavLink to={nav.to} key={nav.to}>
            {nav.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
