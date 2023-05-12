import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError() as any;
  return <div>Oops! {error.statusText || error.message}</div>;
};

export default ErrorPage;
