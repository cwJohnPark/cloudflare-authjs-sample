import { ListProducts, listProducts } from "@lemonsqueezy/lemonsqueezy.js";
import { setupLemonSqueezy } from "../setup";
import logger from "@/lib/logger";

export const getProductList = async (): Promise<ListProducts> => {
  setupLemonSqueezy();

  const products = await listProducts({
    filter: { storeId: process.env.LEMONSQUEEZY_STORE_ID },
  });

  if (products.error) {
    logger.error(
      `status:${products.statusCode}, Error fetching products: ${products.error}`
    );
    throw new Error(`Error fetching products: ${products.error}`);
  }

  return products.data;
};
