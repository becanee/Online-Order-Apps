import { supabase } from "../../config/supabase";
import { responseBuilder } from "../../utils/response";

export const getUserByRole: any = async (req: any, res: Response) => {
  try {
    if (req.params.role) {
      const findUser: any = await supabase
        .from("users")
        .select("role")
        .eq("role", req.params.role)
        .select();

      if (findUser.data) {
        responseBuilder(res, true, findUser.status, findUser.data);
      } else {
        responseBuilder(res, false, 200, null, "User not found!");
      }
    } else {
      responseBuilder(res, false, 200, null, "role is Required!");
    }
  } catch (error) {
    console.log("🚀 ~ getUserByRole ~ error:", error);
  }
};
