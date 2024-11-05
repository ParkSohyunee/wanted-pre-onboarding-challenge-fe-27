import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

export default function DefaultLayout() {
  return (
    <section>
      <Header />
      <Outlet />
      <div id="portal"></div>
    </section>
  );
}
