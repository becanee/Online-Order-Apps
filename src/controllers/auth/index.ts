import { supabase, supabaseKey } from "../../config/supabase";
import CryptoJS from "crypto-js";
import { responseBuilder } from "../../utils/response";

export const userRegister: any = async (req: any, res: Response) => {
  try {
    const payload: any = req.body;

    // Encrypt
    const ciphertext = CryptoJS.AES.encrypt(
      req.body?.password,
      supabaseKey
    ).toString();
    // Decrypt
    // const bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
    // const originalText = bytes.toString(CryptoJS.enc.Utf8);

    const checkPhoneNumber: any = await supabase
      .from("users")
      .select("phone_number")
      .eq("phone_number", req.body.phone_number);
    const checkUsername: any = await supabase
      .from("users")
      .select("username")
      .eq("username", req.body.username);

    if (checkPhoneNumber?.data[0]) {
      responseBuilder(res, false, 200, null, "phone_number Already Registered");
    } else if (checkUsername?.data[0]) {
      responseBuilder(res, false, 200, null, "username Already Registered");
    } else if (
        checkUsername?.data?.length === 0, checkPhoneNumber?.data?.length === 0
    ) {
      const response: any = await supabase
        .from("users")
        .insert({
          ...payload,
          password: ciphertext,
        })
        .select();

      if (response?.data) {
        responseBuilder(res, true, response.status, null);
      } else {
        responseBuilder(
          res,
          response.status,
          response?.data[0],
          response?.error
        );
      }
    } else {
      responseBuilder(res, false, 500, null, "Internal Server Error");
    }
  } catch (error) {
    console.log("🚀 ~ userRegister ~ error:", error);
  }
};

export const userLogin: any = async (req: any, res: Response) => {
  try {
    const payload: any = req.body;

    const findUser: any = await supabase
      .from("users")
      .select("phone_number")
      .eq("phone_number", req.body.phone_number)
      .select();

    if (findUser?.data[0]) {
      const checkPassword = findUser?.data[0]?.password;
      const bytes = CryptoJS.AES.decrypt(checkPassword, supabaseKey);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);

      if (payload.password === originalText) {
        await supabase
          .from("users")
          .update({ is_login: true })
          .eq("id", findUser?.data[0]?.id);

        const ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(findUser?.data[0]),
          supabaseKey
        ).toString();

        responseBuilder(res, true, findUser.status, ciphertext);
      } else {
        responseBuilder(res, false, 200, null, "Invalid Credentials");
      }
    } else {
      responseBuilder(
        res,
        false,
        200,
        null,
        `User ${req.body.phone_number} Not Registered`
      );
    }
  } catch (error) {
    console.log("🚀 ~ userRegister ~ error:", error);
  }
};
