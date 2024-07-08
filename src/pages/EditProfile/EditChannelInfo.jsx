import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useUpdateChannelInfo } from "../../hooks/user.hook";
import { ProgressBar } from "../../components";

const schema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username cannot be empty" })
    .regex(/^\S*$/, { message: "Username cannot contain spaces" })
    .regex(/^[a-z]*$/, { message: "Username must be lowercase" }),
  description: z
    .string()
    .max(275, { message: "Description must be less than 275 characters" }),
});

function EditChannelInfo() {
  const channelInfo = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: channelInfo?.username,
      description: channelInfo?.description || "",
    },
    mode: "onChange",
  });

  const description = watch("description");
  const maxChars = 275;

  const descriptionCharsLeft = maxChars - description.length;

  const { mutateAsync: updateChannelInfo, isPending } = useUpdateChannelInfo();
  const onSubmit = async (data) => {
    const { username, description } = data;

    const initialData = {
      username: channelInfo?.username,
      description: channelInfo?.description,
    };

    const hasDataChanged =
      username !== initialData.username ||
      description !== initialData.description;

    if (!hasDataChanged) {
      return;
    }

    await updateChannelInfo(data);
  };

  return (
    <div className="flex flex-wrap justify-center gap-y-4 py-4">
      {isPending && <ProgressBar />}
      <div className="w-full sm:w-1/2 lg:w-1/3">
        <h5 className="font-semibold">Channel Info</h5>
        <p className="text-gray-300">Update your Channel details here.</p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-2/3">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl ">
          <div className="flex flex-wrap gap-y-4 p-4 bg-gray-900 rounded-2xl">
            <div className="w-full">
              <label className="mb-1 inline-block" htmlFor="username">
                Username
              </label>
              <div className="flex bg-gray-700 rounded-lg">
                <p className="flex shrink-0 items-center px-3 border-r align-middle">
                  videoTube.vercel.app/
                </p>
                <input
                  type="text"
                  className="w-full bg-transparent px-2 py-1.5"
                  id="username"
                  placeholder="@username"
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="text-md text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="mb-1 inline-block" htmlFor="desc">
                Description
              </label>
              <textarea
                className="w-full rounded-lg bg-gray-700 px-2 py-1.5"
                rows="4"
                id="desc"
                placeholder="Channel Description"
                {...register("description")}
              ></textarea>
              <p className="mt-0.5 text-sm text-gray-300">
                {descriptionCharsLeft} characters left
              </p>
              {errors.description && (
                <p className="text-md text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-4 p-4">
            <button
              type="button"
              onClick={() => reset()}
              disabled={isPending}
              className="inline-block rounded bg-red-700 px-3 py-1.5 hover:bg-red-500"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-block hover:bg-green-500 bg-green-700 text-white rounded px-3 py-1.5"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditChannelInfo;
