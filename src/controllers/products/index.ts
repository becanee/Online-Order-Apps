import { supabase } from "../../config/supabase";
import { responseBuilder } from "../../utils/response";

export const getProducts: any = async (req: any, res: Response) => {
  try {
    const findProduct: any = await supabase.from("products").select();

    if (findProduct.data) {
      responseBuilder(res, true, findProduct.status, findProduct.data);
    } else {
      responseBuilder(res, false, 200, null, "Product not found!");
    }
  } catch (error) {
    console.log("🚀 ~ getProducts ~ error:", error);
  }
};

export const getLiveProducts: any = async (req: any, res: Response) => {
  try {
    const findProduct: any = await supabase.from("products").select().eq("status", "live");

    if (findProduct.data) {
      responseBuilder(res, true, findProduct.status, findProduct.data);
    } else {
      responseBuilder(res, false, 200, null, "Product not found!");
    }
  } catch (error) {
    console.log("🚀 ~ getLiveProducts ~ error:", error);
  }
};

export const getProductID: any = async (req: any, res: Response) => {
  try {
    if (req.params.id) {
      const findProduct: any = await supabase
        .from("products")
        .select("id")
        .eq("id", req.params.id)
        .select(`*, merchant: users (*)`);

      if (findProduct.data?.length !== 0) {
        responseBuilder(res, true, findProduct.status, findProduct.data[0]);
      } else {
        responseBuilder(res, false, 200, null, "Product not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getProductID ~ error:", error);
  }
};

export const getProductByMrcID: any = async (req: any, res: Response) => {
  try {
    if (req.params.mrc_id) {
      const findProduct: any = await supabase
        .from("products")
        .select("mrc_id")
        .eq("mrc_id", req.params.mrc_id)
        .select();

      if (findProduct.data) {
        responseBuilder(res, true, findProduct.status, findProduct.data[0]);
      } else {
        responseBuilder(res, false, 200, null, "Product not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "mrc_id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getProductByMrcID ~ error:", error);
  }
};
