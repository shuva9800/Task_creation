import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFalior,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [formData, SetFormData] = useState({});

  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function changeHandler(event) {
    SetFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      dispatch(signInStart());
      const response = await fetch(
        "https://digital-login-backend.onrender.com/api/login",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFalior(data.message));
        return;
      }

      dispatch(signInSuccess(data.data));
      toast.success("login success");
      navigate("/createtask");
      console.log(data);
    } catch (error) {
      dispatch(signInFalior(error));
      return;
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7"> Login</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="email"
          className="p-3 border rounded-lg"
          id="email"
          onChange={changeHandler}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 border rounded-lg"
          id="password"
          onChange={changeHandler}
        />
        <button
          disabled={loading}
          className="p-3 text-white bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:bg-opacity-80"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont ave an account?</p>
        <Link to="/">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      <div>{error && <span className="text-red-600 mt-5">{error}</span>}</div>
    </div>
  );
}
