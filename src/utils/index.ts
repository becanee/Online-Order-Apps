import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const salt: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdWxqZ2ZqZ2x3eXB2cm9wb3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MDY5MDIsImV4cCI6MjA0MDA4MjkwMn0.qFb8ANeU-wf0qN80kJTSFDRHJiYHCqaLb2BA59moS_A";

export const saveLoggedUser = (token: string) => {
  Cookies.set("_TOKEN", token);
};

export const getUserData = () => {
  const token: any = Cookies.get("_TOKEN");

  if (!token) {
    window.location.replace("/");
  } else {
    const bytes2nd = CryptoJS.AES.decrypt(token, salt);
    const data = JSON.parse(bytes2nd.toString(CryptoJS.enc.Utf8));
    return data;
  }
};
