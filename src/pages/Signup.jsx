import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useLogin, useRegisterUser } from "../hooks/auth.hook.js";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice.js";
import { Logo, Input, SpButton } from "../components/index.js";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email(),
    username: z
      .string()
      .min(4)
      .refine((value) => !value.includes(" "), {
        message: "Username must not contain spaces",
      })
      .refine((value) => value === value.toLowerCase(), {
        message: "Username must be all lowercase",
      }),
    fullName: z.string().min(4),
    password: z.string().min(6),
    avatar: z.instanceof(FileList).refine((files) => files.length === 1, {
      message: "Avatar is required",
    }),
    coverImage: z.instanceof(FileList).refine((files) => files.length === 1, {
      message: "Cover Image is required",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: registerUser } = useRegisterUser();
  const { mutateAsync: loginUser } = useLogin();

  const createAccount = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("fullName", data.fullName);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar[0]);
    formData.append("coverImage", data.coverImage[0]);

    try {
      const registeredUser = await registerUser(formData);
      if (registeredUser) {
        const loggedInUser = await loginUser({
          usernameOrEmail: data.email,
          password: data.password,
        });
        if (loggedInUser) {
          dispatch(setUser(loggedInUser));
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#0e0e0e] text-white flex justify-center items-center">
      <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
        <div className="w-full flex justify-center items-center">
          <Logo className={"w-full text-center text-2xl font-semibold uppercase"} inline={true} />
        </div>

        <div className="w-full flex flex-col items-center justify-center mb-6">
          <h1 className="text-2xl">Signup</h1>
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 inline">
              Login
            </Link>
          </span>
        </div>

        <form onSubmit={handleSubmit(createAccount)} className="flex flex-col">
          <Input
            label={"Email*"}
            type="email"
            placeholder="you@example.com"
            id={"email"}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <Input
            label={"Username*"}
            type="text"
            placeholder="username"
            id={"username"}
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">{errors.username.message}</span>
          )}

          <Input
            label={"Full Name*"}
            type="text"
            placeholder="John Doe"
            id={"fullName"}
            {...register("fullName", { required: true })}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">{errors.fullName.message}</span>
          )}

          <Input
            label={"Password*"}
            type="password"
            placeholder="*******"
            id={"password"}
            {...register("password", { required: true })}
            className="mb-4"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Profile Picture*
            </label>
            <input
              type="file"
              {...register("avatar", { required: true })}
              className="text-white mt-2"
            />
            {errors.avatar && (
              <span className="text-red-500 text-sm">{errors.avatar.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Cover Image*
            </label>
            <input
              type="file"
              {...register("coverImage", { required: true })}
              className="text-white mt-2"
            />
            {errors.coverImage && (
              <span className="text-red-500 text-sm">{errors.coverImage.message}</span>
            )}
          </div>

          <SpButton type="submit">{isSubmitting ? "Signing Up" : "Signup"}</SpButton>
        </form>
      </div>
    </div>
  );
}

export default Signup;
