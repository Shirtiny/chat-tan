import { FC, useEffect } from "react";
import nprogress from "nprogress";
import component from "@/hoc/component";
import "nprogress/nprogress.css";

interface IProps {}

const RouterLoading: FC<IProps> = () => {
  useEffect(() => {
    nprogress.start();

    return () => {
      nprogress.done();
    };
  });
  return <>loading</>;
};

export default component<IProps>(RouterLoading);

// TODO: git info version
