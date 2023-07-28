import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError() as any;
  return <div className="page page-error">Oops! {error.statusText || error.message}</div>;
};

export default ErrorPage;
