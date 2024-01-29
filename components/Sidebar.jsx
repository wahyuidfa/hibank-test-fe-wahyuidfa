import Link from "next/link";
import { usePathname } from "next/navigation";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { ChevronDown, MenuIcon, MenuSquareIcon, SettingsIcon, Users2Icon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SIDENAV_ITEMS } from "@/styles/constant";
import { useState } from "react";

export function Sidebar({ items }) {
  const pathname = usePathname();

    return (
      <div>
        <div className=''>
          <div className='flex flex-col space-y-6 w-full'>
            <Link
              href='/'
              className='flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full'>
             <MenuSquareIcon width='24' height='24'/>
              <span className='font-bold text-xl  md:flex'>Menu</span>
            </Link>

            <div className='flex flex-col space-y-2  md:px-6 '>
              {SIDENAV_ITEMS.map((item, idx) => {
                return <MenuItem key={idx} item={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
}

const MenuItem = ({ item  }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className=''>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}>
            <div className='flex flex-row space-x-4 items-center'>
              {item.icon}
              <span className='font-semibold text-xl  flex'>{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <ChevronDown width='24' height='24' />
            </div>
          </button>

          {subMenuOpen && (
            <div className='my-2 ml-12 flex flex-col space-y-4'>
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href='#'
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}>
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={'#'}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}>
          {item.icon}
          <span className='font-semibold text-xl flex'>{item.title}</span>
        </Link>
      )}
    </div>
  );
};
