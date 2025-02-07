'use client';

import { useJWTAuthContext } from "@/config/auth/auth";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import IconButton from "../shared/buttons/IconButton";
import { FiMenu, FiX } from "react-icons/fi";

const PublicNavItems = [
    { name: 'Login', link: '/login' },
    { name: 'Register', link: '/register' }
];

const PrivateNavItems = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Messages', link: '/messages' },
    { name: 'Change Password', link: '/change-password' },
];

const Navbar = () =>
{
    const { logout, isLoggedIn } = useJWTAuthContext();
    const [showCollapsibleMenu, setShowCollapsibleMenu] = useState(false);
    const path = usePathname();
    const router = useRouter();
    const menuRef = useRef<any>(null);

    useEffect(() =>
    {
        const handleClickOutside = (event: any) =>
        {
            if (menuRef.current && !menuRef.current.contains(event.target))
            {
                setShowCollapsibleMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
        {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full fixed top-0 flex p-4 bg-primary z-50">
            <div className="w-full hidden lg:flex flex-row justify-between items-center">
                <div className="flex items-center">
                    <Image src="/logo.svg" alt="Logo" className="w-6 h-6 cursor-pointer" width={1000} height={1000} onClick={() => router.push('/home')} />
                    <h1 className="text-2xl font-bold text-white ml-2">SMS Manager</h1>
                </div>
                <div className="flex">
                    {(isLoggedIn ? PrivateNavItems : PublicNavItems).map((item, index) => (
                        <Link key={index} href={item.link} className={twMerge("text-white m-2 p-2 hover:bg-stone-200 rounded-lg", classNames({
                            'cursor-not-allowed': path === item.link,
                            'opacity-50': path === item.link,
                            'hidden': item.link.includes('settings')
                        }))}>{item.name}</Link>
                    ))}
                    {isLoggedIn && <button onClick={logout} className="text-white m-2 p-2 hover:bg-stone-200 rounded-lg">Logout</button>}
                </div>
            </div>
            <div className="w-full flex lg:hidden justify-between items-center">
                <div className="flex items-center">
                    <Image src="/logo.svg" alt="Logo" className="w-6 h-6 cursor-pointer" width={1000} height={1000} onClick={() => router.push('/home')} />
                    <h1 className="text-2xl font-bold text-white ml-2">SMS Manager</h1>
                </div>
                <IconButton icon={showCollapsibleMenu ? <FiX /> : <FiMenu />} className="text-white z-50 m-2 p-2 hover:bg-stone-200 rounded-lg" onClick={() => setShowCollapsibleMenu(!showCollapsibleMenu)} />
            </div>
            <div ref={menuRef} className={twMerge(
                "absolute top-full left-0 w-full bg-primary p-4 shadow-md rounded-b-lg transform transition-all duration-300",
                showCollapsibleMenu ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
            )}>
                <div className="w-full flex flex-col justify-center items-center">
                    {(isLoggedIn ? PrivateNavItems : PublicNavItems).map((item, index) => (
                        <Link key={index} href={item.link} className={twMerge("text-white block text-center m-2 p-2 hover:bg-stone-200 rounded-lg", classNames({
                            'cursor-not-allowed': path === item.link,
                            'opacity-50': path === item.link
                        }))} onClick={() => setShowCollapsibleMenu(false)}>{item.name}</Link>
                    ))}
                    {isLoggedIn && <button onClick={() => { setShowCollapsibleMenu(false); logout(); }} className="text-white block text-center m-2 p-2 hover:bg-stone-200 rounded-lg">Logout</button>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
