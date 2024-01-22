"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { createUrl } from "../../../lib/utils";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue(searchParams?.get("q") || "");
  }, [searchParams, setSearchValue]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/search", newParams));
  }
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e: any) => {
    const inputDate = e.target.value;

    // yyyy-mm-dd 형식의 입력된 날짜를 yyyy/mm/dd로 변경
    const formattedDate = inputDate;

    setSelectedDate(formattedDate);
  };

  const handleSubmit = () => {
    // 선택된 날짜 활용 예시
    console.log("선택된 날짜:", selectedDate);
    // 여기에 선택된 날짜를 활용하는 로직을 추가할 수 있습니다.
  };

  return (
    <>
      <input type="date" onChange={handleDateChange} />
      <form>
        <input
          type="text"
          name="search"
          placeholder="검색"
          autoComplete="off"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <MagnifyingGlassIcon className="h-4" />
        </div>
      </form>
    </>
  );
}
