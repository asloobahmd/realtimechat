import * as Yup from "yup";

export const userRegisterPayload = Yup.object({
  username: Yup.string()
    .min(6, "Username must be atleast 6 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const loginPayload = Yup.object({
  username: Yup.string()
    .min(6, "Username must be atleast 6 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
