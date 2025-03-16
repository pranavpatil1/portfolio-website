/**
 * @module IndexRoute
 * @description A Hollow Knight-inspired portfolio homepage for Pranav Patil with a centered title and menu options
 * that display decorative symbols on hover.
 * @copyright 2025 Pranav Patil
 */

import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import ParticleBackground from "~/components/ParticleBackground";
import GlowingBackground from "~/components/GlowingBackground";
// import TopOrnamentation from "../public/img/hollow-knight-top-ornamentation.png"
// import BottomOrnamentation from "../public/img/hollow-knight-bottom-ornamentation.png"

export const meta: MetaFunction = () => {
  return [
    { title: "pranav patil" },
    { name: "description", content: "Pranav Patil's portfolio page. Pranav Patil is a software engineer and Codepoint Fellow at Sutter Hill Ventures who graduated from Caltech with a degree in Computer Science. He has experience in payment systems at Stripe, streaming search technologies at Salesforce." },
  ];
};

/**
 * Menu item interface defining the structure of navigation options
 */
interface MenuItem {
  text: string;
  href: string;
  leftSymbol: string;
  rightSymbol: string;
}

export default function Index() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      text: "start",
      href: "/start",
      leftSymbol: "✧",
      rightSymbol: "✧"
    },
    {
      text: "blog",
      href: "/blog",
      leftSymbol: "❧",
      rightSymbol: "❧"
    },
    {
      text: "projects",
      href: "/projects",
      leftSymbol: "✦",
      rightSymbol: "✦"
    },
    {
      text: "about",
      href: "/about",
      leftSymbol: "❈",
      rightSymbol: "❈"
    },
    {
      text: "quit",
      href: "https://github.com/pranavpatil1",
      leftSymbol: "✕",
      rightSymbol: "✕"
    }
  ];

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white overflow-hidden relative">
      {/* Background effects */}
      <GlowingBackground 
        maxWidth={80}
        minWidth={60}
        color="100, 150, 255"
        variationAmount={5}
      />
      <ParticleBackground 
        particleCount={50}
        maxSize={4}
        minSize={1}
        maxOpacity={0.5}
        minOpacity={0.2}
      />
      
      <div className="flex flex-col items-center gap-16 w-full px-4 z-20 relative">
        <header className="flex flex-col items-center gap-6 w-full">
          {/* <img src={TopOrnamentation} className="w-1/3"/> */}
          <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[7rem] uppercase font-game transform scale-y-[1.3] text-center text-white max-w-[90%] mx-auto leading-tight">
            pranav://
          </h1>
          {/* <img src={BottomOrnamentation} className="w-2/3"/> */}
        </header>
        
        <nav className="flex flex-col items-center justify-center gap-6 w-full">
          <ul className="w-full">
            {menuItems.map((item) => (
              <li key={item.text} className="mb-1">
                <Link
                  to={item.href}
                  className="group flex items-center justify-center gap-1 py-2 font-game text-lg md:text-xl text-white hover:text-amber-200 transition-colors duration-300 w-fit mx-auto"
                  onMouseEnter={() => setHoveredItem(item.text)}
                  onMouseLeave={() => setHoveredItem(null)}
                  target={item.text === "quit game" ? "_blank" : undefined}
                  rel={item.text === "quit game" ? "noreferrer" : undefined}
                >
                  <span 
                    className={`transition-opacity duration-300 ${
                      hoveredItem === item.text ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.leftSymbol}
                  </span>
                  
                  <span className="relative uppercase tracking-widest">
                    {item.text}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-200 group-hover:w-full transition-all duration-300"></span>
                  </span>
                  
                  <span 
                    className={`transition-opacity duration-300 ${
                      hoveredItem === item.text ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.rightSymbol}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}