import { DatabaseClient } from "@/config/databaseClient";
import productAction from "./product.action";

class ReviewAction extends DatabaseClient {
    public getReviewsForProduct = async ({ id }: { id: string }) => {
        const reviews = await productAction.getSingleProduct({ id, include: ["review"] });
        return reviews;
    };
}

const reviewAction = new ReviewAction();
export default reviewAction;
