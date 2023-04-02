import { FC, useEffect } from "react";
import nprogress from "nprogress";
import component from "@/hoc/component";
import "nprogress/nprogress.css";
import "./index.scss";

nprogress.configure({ showSpinner: false });

interface IProps {}

const RouterLoading: FC<IProps> = () => {
  useEffect(() => {
    nprogress.start();

    return () => {
      nprogress.done();
    };
  });
  return null;
};

export default component<IProps>(RouterLoading);

// TODO: git info version
