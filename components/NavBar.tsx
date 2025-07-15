'use client';

import React, { useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                <Link href={"/"}>
                    <div className="text-2xl font-semibold text-white flex items-center justify-center px-4">
                        <span className="text-purple-400">🧠 Mock</span>
                        <span className="text-white">Mate</span>
                    </div>
                </Link>
                <Link href={"/about-us"}>
                    <div className="text-[22px] text-white flex items-center justify-center gap-2 px-4">
                        <span className="text-white">About Us</span>
                    </div>
                </Link>

                <Link href={"/Profile"}>
                    <div className="text-[22px] text-white flex items-center justify-center gap-2 px-4">
                        <span className="text-white">Profile</span>
                    </div>
                </Link>
            </Menu>
        </div>
    )
}

export default Navbar