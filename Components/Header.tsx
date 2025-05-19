'use client';
import Image from 'next/image';
import React from 'react';
import {
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import {
  Bars3Icon,
  BellIcon,
  ChatBubbleLeftIcon,
  GlobeAmericasIcon,
  MegaphoneIcon,
  PlusIcon,
  SparklesIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';

function Header() {
  const { data: session} = useSession();//Destructuring
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-2 shadow">
      {/* Left: Logo & Home */}
      <div className="flex items-center space-x-4">
        <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
          <Image
            src="https://static-00.iconduck.com/assets.00/reddit-icon-512x177-38irq72z.png"
            alt="Reddit Logo"
            width={512}
            height={177}
            priority
          />
        </div>
        <div className="flex items-center space-x-1 xl:min-w-[300px]">
          <HomeIcon className="icon" />
          <p className="ml-2 hidden lg:inline text-sm font-medium">Home</p>
          <ChevronDownIcon className="icon" />
        </div>
      </div>

      {/* Search Box */}
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm px-3 mx-4 max-w-lg bg-gray-50">
        <MagnifyingGlassIcon className="icon text-gray-400" />
        <input
          className="flex-1 bg-transparent py-1 outline-none text-sm"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      {/* Right Side Icons */}
      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeAmericasIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-6 border border-gray-200 mx-2" />
        <ChatBubbleLeftIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <MegaphoneIcon className="icon" />
      </div>

      {/* Mobile Menu Icon */}
      <div className="ml-5 flex items-center lg:hidden">
        <Bars3Icon className="icon" />
      </div>

      {/* Sign In/Sign Out Button */}
      {session ? (
        <div onClick={() => signOut()} className="hidden lg:flex cursor-pointer items-center space-x-2 border border-gray-100 p-2">
        <div className="relative h-5 w-5 flex-shrink-0">
          <Image
            src="https://static-00.iconduck.com/assets.00/logo-reddit-icon-512x444-yyw88y66.png"
            alt="Reddit Avatar"
            width={512}
            height={177}
            className="object-contain"
          />
        </div>
        <div className="flex-1 text-xs">
          {/* Optional Chaining */}
          <p>{session?.user?.name}</p>
        <p className="text-gray-400">1 karma</p>
        </div>
        <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400"/>
        </div>
      ): (
      <div onClick={() => signIn('reddit')} className="hidden lg:flex cursor-pointer items-center space-x-2 border border-gray-100 p-2">
        <div className="relative h-5 w-5 flex-shrink-0">
          <Image
            src="https://static-00.iconduck.com/assets.00/logo-reddit-icon-512x444-yyw88y66.png"
            alt="Reddit Avatar"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-gray-400">Sign In</p>
      </div>
      ) }
    </header>
  );
}

export default Header;
