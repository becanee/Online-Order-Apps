import { decode } from "base64-arraybuffer";
import { supabase } from "../../config/supabase";
import { responseBuilder } from "../../utils/response";

export const addProduct: any = async (req: any, res: Response) => {
  try {
    const payload: any = req.body;

    if (payload?.product_id) {
      const checkProduct: any = await supabase
        .from("products")
        .select("id")
        .eq("id", payload?.product_id)
        .select(`*, merchant: users (*)`);

      if (checkProduct?.data?.length !== 0) {
        if (req.file) {
          const fileBase64 = decode(req.file.buffer.toString("base64"));

          const { data, error }: any = await supabase.storage
            .from("cdn")
            .upload(
              `${payload.mrc_id}/product-${Date.now()}.${
                req.file.originalname.split(".")[1]
              }`,
              fileBase64,
              {
                contentType: req.file.mimetype,
              }
            );

          const { data: image } = supabase.storage
            .from("cdn")
            .getPublicUrl(data.path);

          if (image.publicUrl) {
            const response: any = await supabase
              .from("products")
              .update({
                name: payload.name,
                picture: image.publicUrl,
                price: +payload.price,
                desc: payload.desc,
                type: payload.type,
                status: payload.status,
              })
              .eq("id", payload.product_id)
              .select();

            responseBuilder(res, true, response.status, response.data[0]);
          } else {
            responseBuilder(res, false, 200, null, "Add Product Failed!");
          }
        } else {
          const response: any = await supabase
            .from("products")
            .update({
              name: payload.name,
              price: +payload.price,
              desc: payload.desc,
              type: payload.type,
              status: payload.status,
            })
            .eq("id", payload.product_id)
            .select();

          responseBuilder(res, true, response.status, response.data[0]);
        }
      }
    } else {
      const fileBase64 = decode(req.file.buffer.toString("base64"));

      const { data, error }: any = await supabase.storage
        .from("cdn")
        .upload(
          `${payload.mrc_id}/product-${Date.now()}.${
            req.file.originalname.split(".")[1]
          }`,
          fileBase64,
          {
            contentType: req.file.mimetype,
          }
        );

      const { data: image } = supabase.storage
        .from("cdn")
        .getPublicUrl(data.path);

      if (image.publicUrl) {
        const response: any = await supabase
          .from("products")
          .insert([
            {
              mrc_id: payload.mrc_id,
              name: payload.name,
              picture: image.publicUrl,
              price: +payload.price,
              desc: payload.desc,
              sold: 0,
              status: "pending",
              type: payload.type,
            },
          ])
          .select();

        responseBuilder(res, true, response.status, response.data[0]);
      } else {
        responseBuilder(res, false, 200, null, "Add Product Failed!");
      }
    }
  } catch (error) {
    console.log("🚀 ~ addProduct ~ error:", error);
  }
};
