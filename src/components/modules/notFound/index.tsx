import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="bold text-2xl">Oops!</h1>
      <br />
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>404 Not Found</i>
      </p>
      <div className="text-blue-500">
        <Link to={`/`}>Back</Link>
      </div>
    </div>
  );
}
