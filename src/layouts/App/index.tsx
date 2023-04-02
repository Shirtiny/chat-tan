import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

interface Props {
  children?: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <div className="app-layout">
      <header className="app-layout__header">header</header>
      <div className="app-layout__body">
        <aside className="app-layout__body__sidebar">
          <Link to="/adilgarden">public</Link>
          <Link to="/adilraid">personal</Link>
        </aside>
        <main className="app-layout__body__main">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
