import React from 'react';
import { Icon } from "@iconify/react"

const AboutUs = () => {
    return <div className="text-slate-700 w-[28rem]">
        <h2 className="text-2xl font-medium mb-3">About Us</h2>
        <p>This site is published by Melvin Chia, aka The Silly Coder. Here are his <b className="underline">Facebook profile</b> and his <b className="underline">Github page</b>. To learn more about the website and the people running it, visit the <b className="underline">About page</b>.</p>
    </div>;
}

const ContactInfo = () => {
    return <div className="text-slate-700">
        <h2 className="text-2xl font-medium mb-3">Contact Info</h2>
        <p>Email: <span className="font-medium">info@thecodeblog.net</span></p>
        <a className="px-12 py-2 font-medium border-2 mt-4 border-slate-700 text-lg inline-flex items-center justify-center">Contact Us</a>
    </div>;
}

const SocialMedia = () => {
    return <div className="text-slate-700">
        <h2 className="text-2xl font-medium">Social Media</h2>
        <div className="flex gap-8 text-slate-700 my-4">
            <a><Icon icon="uil:facebook" className="w-7 h-7" /></a>
            <a><Icon icon="uil:instagram" className="w-7 h-7" /></a>
            <a><Icon icon="uil:twitter" className="w-7 h-7" /></a>
            <a><Icon icon="uil:github" className="w-7 h-7" /></a>
        </div>
        <p>View website <a className="font-medium underline">source code</a></p>
    </div>;
}

const Footer = () => {
    return <footer class="w-full bg-slate-100 text-slate-700 font-[QuickSand] px-16 py-8">
        <div className="flex justify-between">
            <AboutUs />
            <ContactInfo />
            <SocialMedia />
        </div>
        <p className="text-center mt-12">
            Minecraft and all associated Minecraft images are copyright of Mojang AB. MCS is not affiliated with Minecraft or Mojang AB.
            <br/>
            <span className="text-amber-400 font-medium">Project under MIT License. All rights NOT reserved.</span>
        </p>
    </footer>;
}

export default Footer;