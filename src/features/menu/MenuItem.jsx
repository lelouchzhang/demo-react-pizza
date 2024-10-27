import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";

import { useDispatch, useSelector } from "react-redux";
import { createItem, getQuantityById } from "../cart/cartSlice";
import DeleteButton from "../cart/deleteButton";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();
  const quantity = useSelector((state) => getQuantityById(state, id));
  function handleOrderPizza() {
    const newPizza = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
    };
    dispatch(createItem(newPizza));
  }
  return (
    <li className="flex gap-4 py-3">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-50 grayscale" : ""}`}
      />
      <div className="flex grow flex-col gap-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex flex-col items-end justify-between gap-2">
          {!soldOut ? (
            <p className="text-sm">
              {formatCurrency(unitPrice * (quantity ? quantity : 1))}
            </p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && (
            <div className="flex items-center gap-2">
              {quantity > 0 ? (
                <>
                  <DeleteButton pizzaId={id} />
                  <UpdateItemQuantity pizzaId={id} quantity={quantity} />
                </>
              ) : (
                <Button variant="small" onClick={handleOrderPizza}>
                  Add to cart
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
