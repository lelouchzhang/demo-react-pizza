import Button from "../../ui/Button";
import { increaseQuantity, decreaseQuantity, deleteItem } from "./cartSlice";
import { useDispatch } from "react-redux";

function UpdateItemQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Button
        variant="round"
        onClick={() => dispatch(increaseQuantity(pizzaId))}
      >
        +
      </Button>
      <span className="text-sm font-medium">{quantity}</span>
      <Button
        variant="round"
        onClick={() => {
          if (quantity > 1) dispatch(decreaseQuantity(pizzaId));
          if (quantity === 1) dispatch(deleteItem(pizzaId));
        }}
      >
        -
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
