import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div className="text-zinc-700 dark:text-white w-[28rem] transition-all duration-500">
      <h2 className="text-2xl font-medium mb-3">About Us</h2>
      <p>
        This site is published by
        {' '}
        <a href="https://minecraft.buzz" target="_blank" rel="noopener noreferrer" className="underline">Stelios Mac</a>
        , and remade by Melvin Chia, aka The Silly Coder.&nbsp;
        Here are his
        {' '}
        <a href="https://facebook.com/TheSillyCoder" target="_blank" rel="noopener noreferrer" className="underline">Facebook profile</a>
        {' '}
        and his
        {' '}
        <a href="https://github.com/melvinchia3636" target="_blank" rel="noopener noreferrer" className="underline">Github page</a>
        {' '}
        . To learn more about the website and the people running it, visit the
        {' '}
        <Link to="/about" className="underline">About page</Link>
        .
      </p>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="text-zinc-700 dark:text-white transition-all duration-500">
      <h2 className="text-2xl font-medium mb-3">Contact Info</h2>
      <p>
        Email:
        <span className="font-medium"> info@thecodeblog.net</span>
      </p>
      <a href="/" className="px-12 py-2 font-medium border-2 mt-4 border-zinc-700 dark:border-white transition-all duration-500 text-lg inline-flex items-center justify-center">Contact Us</a>
    </div>
  );
}

function SocialMedia() {
  return (
    <div className="text-zinc-700 dark:text-white transition-all duration-500">
      <h2 className="text-2xl font-medium">Social Media</h2>
      <div className="flex gap-8 text-zinc-700 dark:text-white transition-all duration-500 my-4">
        <a href="/" aria-label="link"><Icon icon="uil:facebook" className="w-7 h-7" /></a>
        <a href="/" aria-label="link"><Icon icon="uil:instagram" className="w-7 h-7" /></a>
        <a href="/" aria-label="link"><Icon icon="uil:twitter" className="w-7 h-7" /></a>
        <a href="/" aria-label="link"><Icon icon="uil:github" className="w-7 h-7" /></a>
      </div>
      <p>
        View website
        {' '}
        <a href="https://github.com/melvinchia3636/MCS" target="_blank" rel="noreferrer" className="font-medium underline">source code</a>
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-zinc-100 dark:bg-zinc-600 text-zinc-700 dark:text-white px-16 py-8 transition-all duration-500">
      <div className="flex justify-between">
        <AboutUs />
        <ContactInfo />
        <SocialMedia />
      </div>
      <p className="text-center mt-12">
        Minecraft and all associated Minecraft images are copyright of Mojang AB.
        MCS is not affiliated with Minecraft or Mojang AB.
        <br />
        <span className="text-amber-400 font-medium">
          Data are scraped from
          {' '}
          <a href="https://minecraft.buzz" className="underline">minecraft.buzz</a>
          . All rights NOT reserved.
        </span>
      </p>
    </footer>
  );
}

export default Footer;
