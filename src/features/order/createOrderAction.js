import { redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";

export async function createOrderAction({ request }) {
  try {
    // 检查 request 是否存在
    if (!request || typeof request.formData !== "function") {
      throw new Error("Invalid request object");
    }

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const order = {
      ...data,
      cart: JSON.parse(data.cart),
      priority: data.priority === "true",
    };

    const newOrder = await createOrder(order);
    // 不要滥用这种写法
    store.dispatch(clearCart());

    return redirect(`/order/${newOrder.id}`);
  } catch (error) {
    console.error("创建订单时出错:", error);
    // 返回一个包含错误信息的对象
    return { error: "创建订单失败", details: error.message };
  }
}

export default createOrderAction;
