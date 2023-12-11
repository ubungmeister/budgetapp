import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-3xl h-screen justify-center flex flex-col items-center space-y-3">
      <p className="text-7xl">404</p>
      <p>OPPS! Page not Found</p>
      <Link to="/" className="pt-2">
        <button className="auth-button text-2xl">Return Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
