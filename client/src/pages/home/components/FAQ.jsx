import React from 'react';
import QandA from './QandA';

function FAQ() {
  return (
    <div className="text-zinc-700 dark:text-white transition-all duration-500 faq my-12">
      <h1 className="font-medium text-4xl mb-6">Frequently Asked Questions</h1>
      <div className="flex flex-col gap-3">
        {[['What are Minecraft Servers?',
          <>
            Minecraft servers are
            {' '}
            <b>multiplayer game server for Minecraft</b>
            . They are all owned and operated by people in the giant Minecraft community. They
            contain huge online worlds where thousands of Minecraft players can compete or
            collaborate with friends and frenemies in various games.
            <br />
            <br />
            Source:
            {' '}
            <a href="/">Wikipedia</a>
            ,&nbsp;
            <a href="/">Minecraft</a>
          </>],
        ['What is a Minecraft Server List?',
          <>
            A Minecraft Server List can refer to one of two things; Either a
            {' '}
            <b>website</b>
            {' '}
            where players can find high quality servers for Minecraft, or the
            <b> multiplayer</b>
            {' '}
            menu inside the Minecraft game client, where a list of known servers is saved for
            later use.
            <br />
            <br />
            Source:
            {' '}
            <a href="/">Fandom</a>
          </>],
        ['Does Minecraft have an official multiplayer server?',
          <>
            No, there is no such thing as an official Minecraft server. That being said,
            {' '}
            <a href="/">Mojang</a>
            {' '}
            (Minecraft&apos;s parent company) has officially
            partnered with a few servers like&nbsp;
            <a href="/">Mineplex</a>
            . Additionally, there are servers hosted by Mojang, called Minecraft Realms. Those,
            however, are limited in gameplay features;
            therefore, we wouldn&apos;t recommend them.&nbsp;
            <a href="/">Community-hosted</a>
            {' '}
            servers usually offer more options, better performance, and&nbsp;
            <a href="/">cost less</a>
            .
            <br />
            <br />
            Source:
            {' '}
            <a href="/">XBOX</a>
            ,&nbsp;
            <a href="/">Minecraft</a>
          </>],
        ['How can I find a Minecraft Server IP?',
          <>
            Any gamer can can use our
            {' '}
            <a href="/">Minecraft Server Search</a>
            {' '}
            feature to find a server IP for their specific device (whether that&apos;s a PC, a
            smartphone, or a console), or go through our server list.
          </>],
        ['What should I know before joining a server?',
          <>
            Every server has different rules you need to learn and respect, and a staff team to
            ensure you stick to them.
            <ol className="list-decimal pl-4 mt-4">
              <li>
                Depending on the server, hacking is usually not allowed, nor is using a
                cracked client.

              </li>
              <li>
                Keep swear words under control. Be kind and considerate of others and don&apos;t
                spam the in-game chat.

              </li>
              <li>
                Respect the staff team and those offering their time to keep the server
                running smoothly.

              </li>
              <li>
                Running a server costs money. If you like it, consider donating to support it.
              </li>
            </ol>
          </>],
        ['What games can I play on MC servers?',
          <>
            Pretty much anything your heart desires. There&apos;s hundreds of servers each
            suiting a different gameplay style, catering to all tastes. A Creative server will
            turn you into an artist, allowing you to craft huge constructions with ease, whereas
            a survival vanilla server will have you hunt and mine day and night in order to
            survive the zombies and skeletons!
          </>],
        ['Where can I learn more about Minecraft?',
          <>
            You can visit the
            {' '}
            <a href="/">official Minecraft website</a>
            , or read through the&nbsp;
            <a href="/">Minecraft Wiki</a>
            . If you ever have any questions about Minecraft or Minecraft Servers, feel free to
            contact our support through the contact us button, or by joining our Discord server
            and creating a support ticket.
          </>],
        ['How can I play on a Minecraft server?',
          <>
            Find a server you like and copy it&apos;s IP address. Once you&apos;ve copied the
            IP, start Minecraft, click &quot;Multiplayer&quot;, then &quot;Add Server&quot;.
            Then, paste the server&apos;s address in the IP Address
            field. Click &quot;Done&quot; to confirm,
            you will then be taken back to the servers list. You can now click
            &quot;Join Server&quot; to play on it. Here&apos;s a
            {' '}
            <a href="/">complete video tutorial</a>
            . If you&apos;re facing any issues connecting, here are some&nbsp;
            <a href="/">troubleshooting tips</a>
            .
          </>]].map(([question, answer]) => (
            <QandA
              question={question}
              answer={answer}
              key={question}
            />
        ))}
      </div>
    </div>
  );
}

export default FAQ;
