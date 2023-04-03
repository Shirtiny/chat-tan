import type { ICommonProps } from "@/types";
import type { FC } from "react";
import { Link } from "react-router-dom";
import component from "@/hoc/component";
import Image from "@/components/Image";
import "./index.scss";

interface IProps extends ICommonProps {}

const AppLayout: FC<IProps> = ({ className, children, ...rest }) => {
  return (
    <div className="app-layout" {...rest}>
      <header className="app-layout__header">
        <a href="/" target="_blank">
          <Image height="100%" src="/logo.svg" name="logo.svg" alt="logo" />
        </a>
      </header>
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

export default component<IProps>(AppLayout);
