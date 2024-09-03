import { supabase } from "../../config/supabase";
import { responseBuilder } from "../../utils/response";

export const getChatByID: any = async (req: any, res: Response) => {
  try {
    if (req.params.id) {
      const findChat: any = await supabase
        .from("chats")
        .select("id")
        .eq("id", req.params.id)
        .select(
          `*, order: orders!chats_order_id_fkey(*), product: products!chats_product_id_fkey(*), buyer: users!chats_user_id_fkey(*), merchant: users!chats_mrc_id_fkey(*)`
        );

      if (findChat.data) {
        responseBuilder(res, true, findChat.status, findChat.data[0]);
      } else {
        responseBuilder(res, false, 200, null, "Chat not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getChatByID ~ error:", error);
  }
};

export const getChatByUserID: any = async (req: any, res: Response) => {
  try {
    if (req.params.user_id) {
      const findChat: any = await supabase
        .from("chats")
        .select("user_id")
        .eq("user_id", req.params.user_id)
        .select(
          `*, order: orders!chats_order_id_fkey(*), product: products!chats_product_id_fkey(*), buyer: users!chats_user_id_fkey(*), merchant: users!chats_mrc_id_fkey(*)`
        );
      console.log("🚀 ~ constgetChatByUserID:any= ~ findChat:", findChat)

      if (findChat.data) {
        responseBuilder(res, true, findChat.status, findChat.data);
      } else {
        responseBuilder(res, false, 200, null, "Chat not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "user_id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getChatByUserID ~ error:", error);
  }
};

export const getChatByMrcID: any = async (req: any, res: Response) => {
  try {
    if (req.params.mrc_id) {
      const findChat: any = await supabase
        .from("chats")
        .select("mrc_id")
        .eq("mrc_id", req.params.mrc_id)
        .select(
          `*, order: orders!chats_order_id_fkey(*), product: products!chats_product_id_fkey(*), buyer: users!chats_user_id_fkey(*), merchant: users!chats_mrc_id_fkey(*)`
        );

      if (findChat.data) {
        responseBuilder(res, true, findChat.status, findChat.data);
      } else {
        responseBuilder(res, false, 200, null, "Chat not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "mrc_id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getChatByMrcID ~ error:", error);
  }
};

export const getChatByOrderID: any = async (req: any, res: Response) => {
  try {
    if (req.params.order_id) {
      const findChat: any = await supabase
        .from("chats")
        .select("order_id")
        .eq("order_id", req.params.order_id)
        .select(
          `*, order: orders!chats_order_id_fkey(*), product: products!chats_product_id_fkey(*), buyer: users!chats_user_id_fkey(*), merchant: users!chats_mrc_id_fkey(*)`
        );

      if (findChat.data?.length !== 0) {
        responseBuilder(res, true, findChat.status, findChat.data[0]);
      } else {
        responseBuilder(res, false, 200, null, "Chat not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "order_id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getChatByOrderID ~ error:", error);
  }
};

export const getChatByProductID: any = async (req: any, res: Response) => {
  try {
    if (req.params.product_id) {
      const findChat: any = await supabase
        .from("chats")
        .select("product_id")
        .eq("product_id", req.params.product_id)
        .select(
          `*, product: products!chats_product_id_fkey(*), buyer: users!chats_user_id_fkey(*), merchant: users!chats_mrc_id_fkey(*)`
        );

      if (findChat.data?.length !== 0) {
        responseBuilder(res, true, findChat.status, findChat.data[0]);
      } else {
        responseBuilder(res, false, 200, null, "Chat not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "product_id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getChatByProductID ~ error:", error);
  }
};

export const sendMessage: any = async (req: any, res: Response) => {
  try {
    const payload: any = req.body;
    const sendMsg: any = await supabase
      .from("messages")
      .insert([payload])
      .select(
        `*, buyer: users!messages_user_id_fkey(*), merchant: users!messages_mrc_id_fkey(*), order: orders!messages_order_id_fkey(*), product: products!messages_product_id_fkey(*)`
      );

      if (sendMsg.data?.length !== 0) {
        responseBuilder(res, true, sendMsg.status, sendMsg.data[0]);
      } else {
        responseBuilder(res, false, 200, null, "Send chat error!");
      }
  } catch (error) {
    console.log("🚀 ~ sendMessage ~ error:", error);
  }
};

export const getMessageByChatID: any = async (req: any, res: Response) => {
  try {
    if (req.params.chat_id) {
      const findMsg: any = await supabase
        .from("messages")
        .select("chat_id")
        .eq("chat_id", req.params.chat_id)
        .select(
          `*, order: orders!messages_order_id_fkey(*),  product: products!messages_product_id_fkey(*), buyer: users!messages_user_id_fkey(*), merchant: users!messages_mrc_id_fkey(*)`
        );

      if (findMsg.data) {
        responseBuilder(res, true, findMsg.status, findMsg.data);
      } else {
        responseBuilder(res, false, 200, null, "Chat not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "chat_id is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getMessageByChatID ~ error:", error);
  }
};


export const updatechatByID: any = async (req: any, res: Response) => {
  try {
    const payload: any = req.body;
    if (req.params.id) {
      const updateOrder: any = await supabase
        .from("chats")
        .update({ order_id: payload?.order_id, updated_at: new Date() })
        .eq("id", req.params.id)
        .select(
           `*, order: orders!chats_order_id_fkey(*), product: products!chats_product_id_fkey(*), buyer: users!chats_user_id_fkey(*), merchant: users!chats_mrc_id_fkey(*)`
        );

      if (updateOrder.data?.length !== 0) {
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