import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";
import { useDispatch } from "react-redux";

function DeleteButton({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button variant="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteButton;
