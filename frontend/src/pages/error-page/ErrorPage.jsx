
import { Link, useRouteError } from "react-router-dom";
import './errorpage.css'
function ErrorPage() {
  const error = useRouteError();


  return (
    <div id="error-page" className="errorpageContainer">
    
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to="/directory/login">Back Home</Link>
     
    </div>
  );
}

export default ErrorPage