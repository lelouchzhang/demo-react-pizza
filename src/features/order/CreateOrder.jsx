import { Form, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import { getCart } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export default function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const {
    username,
    position,
    status: userStatus,
    address,
  } = useSelector((state) => state.user);

  const isSubmitting = useNavigation().state === "submitting";
  const isLoading = userStatus === "loading";

  const { totalCartPrice } = useSelector(getCart);
  const priorityPrice = withPriority ? 0.2 * totalCartPrice : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="p-4">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let us go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-5 flex flex-col gap-1 p-1 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-1 p-1 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-1 p-1 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full pr-[120px]"
              type="text"
              name="address"
              required
              disabled={isLoading}
              defaultValue={address}
            />
            {!position.latitude && !position.longitude && (
              <span className="absolute right-[5px] top-[3px] sm:right-[5px] sm:top-[5px]">
                <Button
                  variant="small"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                  className="h-[38px] sm:h-[46px]"
                >
                  Use my location
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5 p-1">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="size-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-0"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* input hidden 不会显示在页面上，但是会发送给服务器 */}
          {/* cart 是数组，需要转换为字符串 */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button variant="primary" disabled={isSubmitting}>
            {`Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
