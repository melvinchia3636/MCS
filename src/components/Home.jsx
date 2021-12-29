import React from 'react';
import { Icon } from '@iconify/react';

const Section = ({data, title, desc}) => {
    return <div className="px-16 p-12 font-[QuickSand] text-slate-700">
        <h1 className="font-medium text-4xl mb-3">{title}</h1>
        <p className="text-lg tracking-wide">{desc}</p>
        <div className="grid grid-cols-2 gap-6 mt-8">
            {data.length ? data.map(e => <div className="w-full overflow-hidden rounded-xl shadow-[0_6px_12px_rgba(0,0,0,.15)]">
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src={e.thumbnail} className="w-12 h-12" />
                            <div>
                                <p className="font-medium text-2xl">{e.ip}</p>
                                <div className="flex gap-1 mt-1">
                                    {Array(e.rating).fill(0).map(() => <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full"/>)}
                                    {Array(5-e.rating).fill(0).map(() => <div className="w-2.5 h-2.5 border-2 border-emerald-400 rounded-full"/>)}
                                </div>
                            </div>
                        </div>
                        <div className={`flex items-center gap-1 rounded-full ${e.status === "Online" ? "bg-emerald-400" : "bg-rose-500"} pr-4 pl-3 font-medium py-1 shadow-sm text-white`}><Icon icon={"uil:"+(e.status === "Online" ? "check" : "times")} className="mt-0.5 w-5 h-5" />{e.status}</div>
                    </div>
                    <div class="mt-8 flex px-2">
                        <div className="w-1/2 text-lg flex items-center gap-2"><Icon icon="uil:wrench" className="text-emerald-400 w-6 h-6" />{e.version}</div>
                        <div className="w-1/2 text-lg flex items-center gap-2"><Icon icon="uil:users-alt" className="text-emerald-400 w-6 h-6" />{e.onlinePlayers}</div>
                    </div>
                    <div class="mt-4 flex px-2">
                        <div className="w-1/2 text-lg flex items-center gap-2"><Icon icon="uil:tag-alt" className="text-emerald-400 w-6 h-6" />{e.gamemode}</div>
                        <div className="w-1/2 text-lg flex items-center gap-2"><Icon icon="uil:processor" className="text-emerald-400 w-6 h-6" />{e.serverType}</div>
                    </div>
                </div>
                <img src={e.banner} className="w-full object-fill" />
            </div>) : ""}
        </div>
    </div>;
}

const Home = () => {
    const [data, setData] = React.useState([]);
    
    const fetchData = () => {
        fetch("https://cors-anywhere.thecodeblog.net/minecraft.buzz").then(res => res.text()).then(raw => {
           const HTMLParser = new DOMParser();
           const html = HTMLParser.parseFromString(raw, "text/html");
           const data = Array.from(html.querySelectorAll(".row > section[itemtype*=Table]")).map(e => Array.from(e.querySelectorAll(".server-row")).map(e => ({
               thumbnail: e.querySelector("img[src*=favicon]").src,
               banner: e.querySelector("img[src*=banner]").src,
               ip: e.querySelector(".ip-block").innerText,
               version: e.querySelector("span[title='Server Version']").innerText.trim(),
               gamemode: e.querySelector("span[title='Main Gamemode']").innerText.trim(),
               onlinePlayers: e.querySelector("span[title='Players Online']")?.innerText?.trim(),
               serverType: e.querySelector("span[title='Server Type']").innerText.trim(),
               rating: e.querySelectorAll(".fa-star").length,
               status: e.querySelector(".badge.fs-6")?.innerText?.trim()
           })));
           setData(data);
        })
    }

    React.useEffect(fetchData, []);

    return data.length ? <>
        <Section data={data[0]} title={<><span className="text-emerald-400">The Best</span> Minecraft Servers</>} desc={<>Looking for the <b>best Minecraft servers</b>? We have over 1050 of them! You can find all sorts of game modes and versions. Whether you're looking for a survival server, a creative server, or even one with PvP - we've got it covered.</>} />
        <Section data={data[1]} title={<><span className="text-emerald-400">Most Popular</span> Minecraft Servers</>} desc={<>Play on the largest Minecraft communities along with tons of other competitors by joining any of the servers below! These have the <b>most server players online</b> right this moment, with content ranging from classic MMO RPG games to a parkour paradise. Enjoy the most massive worlds the best Minecraft multiplayer servers have to offer!</>} />
        <Section data={data[2]} title={<><span className="text-emerald-400">New</span> Multiplayer Servers in 2021</>} desc={<>Looking for the newest Minecraft Servers to play on? Game on the freshest servers added to our Minecraft server list in December 2021! This server table updates every few seconds. You can rest assured you won't find MC servers any fresher than this elsewhere! Join any of the <b>{data.length} latest servers below</b>, or browse more servers you can play on here.</>} />
        <Section data={data[3]} title={<><span className="text-emerald-400">1.18</span> Minecraft Servers</>} desc={<>So Microsoft and Mojang just released the latest Minecraft version...But your favorite Minecraft servers haven't quite caught up yet? You can still game with others - Experience the latest Minecraft updates online! Every game server below supports the <b>latest Minecraft 1.18</b>.</>} />
        <Section data={data[4]} title={<><span className="text-emerald-400">Survival</span> Servers on Minecraft</>} desc={<>Check out these excellent Minecraft Survival Servers, also known as <b>SMP Servers</b>! These Minecraft servers are what an MC player would be most familiar with. They tend to be quite close to the original game's survival mode. You know, searching for Minecraft diamonds, crafting "nether portals", avoiding Herobrine, that sort of stuff. Try this list if you're looking for a fun survival Minecraft server network! Also, don't forget to check out a cool variation of this game mode on (... but keep an eye out for mobs like Creepers and Griefers if you do, no Grief prevention plugins on those!)</>} />
        <Section data={data[5]} title={<>Best Minecraft <span className="text-emerald-400">Skyblock</span> Servers</>} desc={<>No server list for Minecraft would be complete without the inclusion of these servers! Upon joining a Skyblock mode server, players get assigned tiny custom islands to play on and eventually expand. In many ways, those servers are similar to survival servers, but are, for the most part, <b>much more challenging</b>.</>} />
        <Section data={data[6]} title={<><span className="text-emerald-400">Prison</span> Minecraft Servers</>} desc={<>hen playing on servers of this game mode, the objective is to <b>earn in-game money as a rookie and advance your player rank over time</b>. Eventually, you'll gain the right to "escape" and be a free player. If you're not into PvP (or fast-paced / high-action) games & you're looking to play on a server for a decent amount of time, a prison server can be a superb choice. To play on Minecraft with servers that include a Prison map just pick one from the list below!</>} />
    </> : "";
}

export default Home;