import { useFetcher } from "react-router-dom";
import { action } from "./updateOrderAction";
import Button from "../../ui/Button";

export default function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right text-sm">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}
