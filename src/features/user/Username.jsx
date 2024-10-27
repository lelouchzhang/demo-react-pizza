import { useSelector } from "react-redux";

export default function Username() {
  const name = useSelector((state) => state.user.username);
  if (!name) return null;

  return (
    <div>
      <h1 className="text-small hidden font-semibold md:block">{name}</h1>
    </div>
  );
}
