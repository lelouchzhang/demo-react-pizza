import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="text-center text-xl font-semibold">
        The best pizza.
        <br />
        <span className="mb-4 block text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" variant="primary">
          Start ordering
        </Button>
      )}
    </div>
  );
}

export default Home;
