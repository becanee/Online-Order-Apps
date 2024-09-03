import { supabase } from "../../config/supabase";
import { responseBuilder } from "../../utils/response";

export const createUserOrder: any = async (req: any, res: Response) => {
  try {
    const payload: any = req.body;
    const placeOrder: any = await supabase
      .from("orders")
      .insert([
        {
          user_id: payload?.user_id,
          mrc_id: payload?.mrc_id,
          product_id: payload?.product_id,
          order_product: payload?.order_product,
          price: payload?.price,
          rating: 0,
          feedback: "",
          status: "pending",
        },
      ])
      .select(
        `*, buyer: users!orders_user_id_fkey(*), merchant: users!orders_mrc_id_fkey(*), product: products!orders_product_id_fkey(*)`
      );

    if (placeOrder?.data?.length !== 0) {
      responseBuilder(res, true, placeOrder.status, placeOrder.data[0]);
    } else {
      responseBuilder(res, false, 200, null, "Error Create Order!");
    }
  } catch (error) {
    console.log("🚀 ~ createUserOrder ~ error:", error);
  }
};

export const createUserChatAfterOrder: any = async (
  req: any,
  res: Response
) => {
  try {
    const payload: any = req.body;
    const createChat: any = await supabase
      .from("chats")
      .insert([
        {
          product_id: payload?.product_id,
          order_id: payload?.order_id,
          avatar: payload?.avatar,
          alt: payload?.alt,
          title: payload?.title,
          subtitle: payload?.subtitle,
          date: new Date(),
          unread: 0,
          user_id: payload?.user_id,
          mrc_id: payload?.mrc_id,
        },
      ])
      .select();

    if (createChat?.data?.length !== 0) {
      responseBuilder(res, true, createChat.status, createChat.data[0]);
    } else {
      responseBuilder(res, false, 200, null, "Error Create Order!");
    }
  } catch (error) {
    console.log("🚀 ~ createUserChatAfterOrder ~ error:", error);
  }
};

export const getOrderByID: any = async (req: any, res: Response) => {
  try {
    if (req.params.id) {
      const findChat: any = await supabase
        .from("orders")
        .select("id")
        .eq("id", req.params.id)
        .select(
          `*, buyer: users!orders_user_id_fkey(*), merchant: users!orders_mrc_id_fkey(*), product: products!orders_product_id_fkey(*)`
        );

      if (findChat.data?.length !== 0) {
        responseBuilder(res, true, findChat.status, findChat.data[0]);
      } else {
        responseBuilder(res, false, 200, null, "Order not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getOrderByID ~ error:", error);
  }
};

export const getOrderByUserID: any = async (req: any, res: Response) => {
  try {
    if (req.params.user_id) {
      const findChat: any = await supabase
        .from("orders")
        .select("user_id")
        .eq("user_id", req.params.user_id)
        .select(
          `*, buyer: users!orders_user_id_fkey(*), merchant: users!orders_mrc_id_fkey(*), product: products!orders_product_id_fkey(*)`
        )
        .order("id", { ascending: false });

      if (findChat.data?.length !== 0) {
        responseBuilder(res, true, findChat.status, findChat.data);
      } else {
        responseBuilder(res, false, 200, null, "Order not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "user_id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getOrderByUserID ~ error:", error);
  }
};

export const getOrderByMrcID: any = async (req: any, res: Response) => {
  try {
    if (req.params.mrc_id) {
      const findChat: any = await supabase
        .from("orders")
        .select("mrc_id")
        .eq("mrc_id", req.params.mrc_id)
        .select(
          `*, buyer: users!orders_user_id_fkey(*), merchant: users!orders_mrc_id_fkey(*), product: products!orders_product_id_fkey(*)`
        )
        .order("id", { ascending: false });

      if (findChat.data?.length !== 0) {
        responseBuilder(res, true, findChat.status, findChat.data);
      } else {
        responseBuilder(res, false, 200, null, "Order not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "mrc_id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getOrderByMrcID ~ error:", error);
  }
};

export const getOrderByProductID: any = async (req: any, res: Response) => {
  try {
    if (req.params.product_id) {
      const findChat: any = await supabase
        .from("orders")
        .select("product_id")
        .eq("product_id", req.params.product_id)
        .select(
          `*, buyer: users!orders_user_id_fkey(*), merchant: users!orders_mrc_id_fkey(*), product: products!orders_product_id_fkey(*)`
        );

      if (findChat.data?.length !== 0) {
        responseBuilder(res, true, findChat.status, findChat.data[0]);
      } else {
        responseBuilder(res, false, 200, null, "Order not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "product_id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getChatByID ~ error:", error);
  }
};

export const updateOrderByID: any = async (req: any, res: Response) => {
  try {
    const payload: any = req.body;
    if (req.params.id) {
      const updateOrder: any = await supabase
        .from("orders")
        .update({ status: payload?.status, updated_at: new Date() })
        .eq("id", req.params.id)
        .select(
          `*, buyer: users!orders_user_id_fkey(*), merchant: users!orders_mrc_id_fkey(*), product: products!orders_product_id_fkey(*)`
        );

      if (updateOrder.data?.length !== 0) {
        if (payload?.status === "selesai") {
          const findProduct: any = await supabase
            .from("products")
            .select("id")
            .eq("id", updateOrder.data[0]?.product?.id)
            .select(`*, merchant: users (*)`);

          await supabase
            .from("products")
            .update({ sold: findProduct.data[0]?.sold + 1 })
            .eq("id", updateOrder.data[0]?.product?.id)
            .select(`*, merchant: users (*)`);
        }

        responseBuilder(res, true, updateOrder.status, updateOrder.data[0]);
      } else {
        responseBuilder(res, false, 200, null, "Update order failed!");
      }
    } else {
      responseBuilder(res, false, 200, null, "id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ updateOrderByID ~ error:", error);
  }
};

export const addRatingByOrderID: any = async (req: any, res: Response) => {
  try {
    const payload: any = req.body;
    if (req.params.id) {
      const updateOrder: any = await supabase
        .from("orders")
        .update({ rating: payload?.rating, feedback: payload?.feedback })
        .eq("id", req.params.id)
        .select(
          `*, buyer: users!orders_user_id_fkey(*), merchant: users!orders_mrc_id_fkey(*), product: products!orders_product_id_fkey(*)`
        );

      if (updateOrder.data?.length !== 0) {
        const findProduct: any = await supabase
          .from("products")
          .select("id")
          .eq("id", updateOrder.data[0]?.product?.id)
          .select(`*, merchant: users (*)`);

        await supabase
          .from("products")
          .update({ rating: findProduct.data[0]?.rating + payload?.rating })
          .eq("id", updateOrder.data[0]?.product?.id)
          .select(`*, merchant: users (*)`);

        responseBuilder(res, true, updateOrder.status, updateOrder.data[0]);
      } else {
        responseBuilder(res, false, 200, null, "Update order failed!");
      }
    } else {
      responseBuilder(res, false, 200, null, "id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ addRatingByOrderID ~ error:", error);
  }
};
