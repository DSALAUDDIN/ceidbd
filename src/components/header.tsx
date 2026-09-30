"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/our-work", "Our Work"],
  ["/research", "Research"],
  ["/learning", "Learning"],
  ["/people", "People"],
  ["/opportunities", "Opportunities"],
];
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>
            Independent research. Shared knowledge. Meaningful change.
          </span>
          <span>
            Dhaka, Bangladesh <i />{" "}
            <Link href="/contact">
              Let’s connect <ArrowUpRight size={12} />
            </Link>
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link
            href="/"
            className="brand"
            aria-label="CEID home"
            onClick={() => setOpen(false)}
          >
            <Image src="/images/logo.png" width={50} height={49} alt="" />
            <span>
              <strong>CEID</strong>
              <small>
                Centre for Equity, Inclusion
                <br />
                and Development
              </small>
            </span>
          </Link>
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            id="main-navigation"
            className={open ? "open" : ""}
            aria-label="Main navigation"
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          >
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={
                  (href === "/" ? path === "/" : path.startsWith(href))
                    ? "page"
                    : undefined
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="nav-cta"
              onClick={() => setOpen(false)}
            >
              Collaborate <ArrowUpRight size={15} />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
