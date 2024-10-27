import { getOrder } from "../../services/apiRestaurant";

// params是路由自动传过来的参数，无需useParams
export async function orderLoader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
