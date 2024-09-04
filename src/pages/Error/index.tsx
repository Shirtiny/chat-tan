import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError() as any;
  console.log("error page: ", error);
  return <div className="page page-error">Oops! {error.statusText || error.message}</div>;
};

export default ErrorPage;
