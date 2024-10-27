import LinkButton from "../../ui/LinkButton";
import { getCart } from "./cartSlice";
import { useSelector } from "react-redux";

function CartOverview() {
  const { totalCartQuantity, totalCartPrice } = useSelector(getCart);

  if (totalCartQuantity === 0) return null;
  return (
    <div className="fixed bottom-0 flex w-full items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 sm:text-base md:px-8 md:text-lg">
      <p className="space-x-4 font-semibold">
        <span>{totalCartQuantity} pizzas</span>
        <span>$ {totalCartPrice}</span>
      </p>
      <LinkButton to="/cart">Open cart &rarr;</LinkButton>
    </div>
  );
}
export default CartOverview;
