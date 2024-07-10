import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

function Search() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate(`/search/${data?.query}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center w-full max-w-lg"
    >
      <div className="relative flex-grow">
        <input
          className="w-full border border-gray-500 rounded-l-3xl bg-transparent py-2 pl-10 pr-3 placeholder-white outline-none focus:border-blue-400"
          placeholder="Search"
          {...register("query", { required: true })}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <button
        type="submit"
        className="bg-gray-700 text-white rounded-r-3xl px-4 py-2 hover:bg-gray-500 transition-colors"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
