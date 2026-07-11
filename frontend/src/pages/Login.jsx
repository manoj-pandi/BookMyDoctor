import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { RxEyeOpen } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";
import { useFormik } from "formik";
import { signupSchema, loginSchema } from "../validation/validation";
import Seo from "../components/Seo";

const Login = () => {
  const { backendUrl, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: state === "Sign Up" ? signupSchema : loginSchema,
    onSubmit: async (values) => {
      try {
        if (state === "Sign Up") {
          const { name, email, password } = values;
          const { data } = await axios.post(backendUrl + "/api/user/register", {
            name,
            email,
            password,
          });
          if (data.success) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            toast.success(data.message);
            navigate("/");
          } else {
            toast.error(data.message);
          }
        } else {
          const { email, password } = values;
          const { data } = await axios.post(backendUrl + "/api/user/login", {
            email,
            password,
          });
          console.log("login data", data);
          if (data.success) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            toast.success(data.message);
            navigate("/");
          } else {
            toast.error(data.message);
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="min-h-[80vh] flex items-center"
    >
      <Seo
        title={state === "Sign Up" ? "Create Account" : "Login"}
        description="Log in or create a BookMyDoctor account to book doctor appointments online."
        path="/login"
        noindex
      />
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  rounded-xl text-zinc-600 text-sm shadow-lg border-0">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              placeholder="Full Name"
            />
          </div>
        )}
        {formik.errors.name && formik.touched.name && (
          <p className="text-red-600">{formik.errors.name}</p>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            placeholder="Enter your email"
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <p className="text-red-600">{formik.errors.email}</p>
        )}

        <div className="w-full">
          <p>Password</p>
          <div className="relative">
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute top-[55%] right-2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <RxEyeClosed size={14} />
              ) : (
                <RxEyeOpen size={14} />
              )}
            </button>
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600">{formik.errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          className="bg-primary text-white w-full py-2 rounded-md text-base disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
                formik.resetForm();
              }}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>{" "}
          </p>
        ) : (
          <p>
            Create an new account?
            <span
              onClick={() => {
                setState("Sign Up");
                formik.resetForm();
              }}
              className="text-primary underline cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
