import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Avatar() {
  //유저  정보 불러와야함
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <UserCircleIcon
        className={"h-4 transition-all ease-in-out hover:scale-110 "}
      />
    </div>
  );
}
