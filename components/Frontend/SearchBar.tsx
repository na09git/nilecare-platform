"use client";
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search?query=${query}`);
    setQuery("");
  }
  return (
    <form className="max-w-md" onSubmit={handleSearch}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full py-3 px-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search doctors, services,symptoms..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}
