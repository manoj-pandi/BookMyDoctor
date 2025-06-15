import React, { useState, useContext } from "react";

import { AdminContext, DoctorContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { RxEyeOpen } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-0 rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-primary">{state}</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="password-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password-input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-[#DADADA] rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
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
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer">
            Login
          </button>
          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Doctor")}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Admin")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
