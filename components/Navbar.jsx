import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [state, setState] = useState(false);

  const menus = [
    { title: "Home", path: "/" },
    { title: "Blog", path: "/" },
    { title: "About Us", path: "/" },
    { title: "Contact Us", path: "/y" },
  ];

  return (
    <nav className='bg-white w-full border-b-2 shadow-md md:border-0'>
      <div className='items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8'>
        <div className='flex items-center justify-between py-3 md:py-5 md:block'>
          <Link href='/'>
            <h1 className='text-3xl font-bold text-purple-600'>Logoka</h1>
          </Link>
          <div className='md:hidden'>
            <button
              className='text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border'
              onClick={() => setState(!state)}>
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}>
          <ul className='justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
            {menus.map((item, idx) => (
              <li key={idx} className='text-gray-600 hover:text-indigo-600'>
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
            {state ? (
              <li className='text-gray-600 hover:text-indigo-600'>
                <Link href='/login'>Logout</Link>
              </li>
            ) : null}
          </ul>
        </div>
        <div className='max-xl:hidden md:block hidden w-40'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href='/login'>Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
