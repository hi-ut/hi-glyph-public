"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import UserDropdown from "./user-dropdown";
import LoginBtn from "./login-btn";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();
  const username = session?.user?.name as string;
  const role = session?.user?.role as string;

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Related Characters",
      href: "/characters",
    },
    {
      name: "Glyphs",
      href: "/glyphs",
    },
    {
      name: "Admin",
      href: "/admin",
      role: "ADMIN",
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      maxWidth="full"
    >
      <NavbarContent justify="start">
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarBrand className="mr-4">
          <Link href="/" className="hidden sm:block font-bold text-inherit">
            Hi Glyph
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-3">
          {links.map((link) => {
            if (link.role && link.role !== role) {
              return null;
            }
            return (
              <NavbarItem key={link.name}>
                <Link color="foreground" href={link.href}>
                  {link.name}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {session ? (
          <UserDropdown username={username} />
        ) : (
          <>
            <Button
              as={Link}
              href="/auth/register"
              color="secondary"
              variant="flat"
            >
              Register
            </Button>
            <LoginBtn />
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {links.map((item, index) => {
          if (item.role && item.role !== role) {
            return null;
          }
          return (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
