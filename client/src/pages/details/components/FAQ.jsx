/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DetailsContext } from '..';
import QandA from '../../home/components/QandA';

function FAQ() {
  const { data } = useContext(DetailsContext);

  return (
    <>
      <h2 className="text-zinc-400 text-2xl font-medium mb-4 mt-12">Frequently Asked Questions</h2>
      <div className="flex flex-col gap-4">
        <QandA
          question={`How do I join ${data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))}?`}
          answer={(
            <>
              {data.javaIP || data.serverIP ? (
                <>
                  Play McYAY with Minecraft Java:
                  <ul className="list-disc pl-8">
                    <li>
                      <span className="underline text-amber-400">Copy the Java server IP</span>
                      {' '}
                      from this page.
                    </li>
                    <li>Open up Minecraft and wait for it to fully load.</li>
                    <li>Click on &quot;Multiplayer&quot;, then &quot;Add Server&quot;.</li>
                    <li>Paste the Server&apos;s IP in the &quot;IP Address&quot; field.</li>
                    <li>Click &quot;Done&quot;.</li>
                    <li>
                      Select
                      {' '}
                      <b>{data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))}</b>
                      {' '}
                      from the list and click on &quot;Join Server&quot;.
                    </li>
                  </ul>
                </>
              ) : ''}
              {data.bedrockIP ? (
                <>
                  <br />
                  Play McYAY with Minecraft Bedrock/PE:
                  <ul className="list-disc pl-8">
                    <li>Play BumbleCraft with Minecraft Bedrock / PE:</li>
                    <li>
                      <span className="underline text-amber-400">Copy the Bedrock server IP</span>
                      {' '}
                      from this page.
                    </li>
                    <li>
                      Open up Minecraft Pocket Edition and press
                      the &quot;Play&quot; button.
                    </li>
                    <li>
                      Go to the &quot;Servers&quot; tab and
                      press the &quot;Add Server&quot; button.
                    </li>
                    <li>
                      Paste the Server&apos;s IP in the &quot;Server
                      Address&quot; field,&nbsp;
                    </li>
                    <li>
                      and
                      {' '}
                      <b>{data.bedrockPort}</b>
                      {' '}
                      in the &quot;Port&quot; field.
                    </li>
                    <li>Click &quot;Play&quot; to quickly join the server.</li>
                  </ul>
                </>
              ) : ''}
              <br />
              If you&apos;re having issues connecting,&nbsp;
              check out our connection troubleshooting guide.
            </>
          )}
        />
        <QandA
          question={`What is the server IP for ${data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))}?`}
          answer={(
            <>
              {data.javaIP || data.serverIP ? (
                <>
                  BumbleCraft&apos;s Java Edition IP Address is
                  {' '}
                  <b>{data.javaIP || data.bedrockIP}</b>
                  .
                </>
              ) : ''}
              {data.bedrockIP ? (
                <>
                  <br />
                  The Bedrock IP Address is
                  {' '}
                  <b>{data.bedrockIP}</b>
                  {' '}
                  and the port is
                  {' '}
                  <b>{data.bedrockPort}</b>
                  .
                </>
              ) : ''}
            </>
          )}
        />
        <QandA
          question={`Does ${data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))} have a PE server?`}
          answer={data.bedrockIP ? (
            <>
              <b>Yes</b>
              , BumbleCraft is a Bedrock-compatible server!
              You can join it using a PS4, Xbox, Android, iOS (iPod Touch, iPhone, iPad),Windows
              10 PC, or any other device supporting Minecraft Bedrock / Pocket Edition (MCPE).
            </>
          ) : (
            <>
              No. You can only join McYAY using Minecraft Java Edition.
            </>
          )}
        />
        <QandA
          question={`Is ${data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))} free to play?`}
          answer={(
            <>
              Yes - As are all
              {' '}
              <Link to="/" className="underline text-amber-400">Minecraft servers</Link>
              {' '}
              listed on MCS.
            </>
            )}
        />
        <QandA
          question="I have an issue. Who can I contact?"
          answer={(
                data.discord ? (
                  <>
                    You can join the
                    {' '}
                    <a className="text-amber-400 underline" target="_blank" rel="noreferrer" href={data.discord}>
                      {data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))}
                      {' '}
                      Discord server
                    </a>
                    {' '}
                    and direct your questions there. There should be instructions on how to get
                    support - If not, contact a staff member.
                  </>
                ) : (data.website ? (
                  <>
                    You can look on
                    {' '}
                    <a className="text-amber-400 underline" target="_blank" rel="noreferrer" href={data.website}>
                      {data.name.substr(0, data.name.lastIndexOf('Minecraft Server'))}
                      &apos;s website
                    </a>
                    {' '}
                    to find the owner&apos;s or staff team&apos;s contact information.
                  </>
                ) : (
                  <>
                    The server owner hasn&apos;t provided any contact information.
                  </>
                ))
            )}
        />
        <QandA
          question="I have an issue. Who can I contact?"
          answer={`Right now, there are ${parseInt(data.players?.split('/')?.shift()?.trim(), 10) || 'no'} people playing on ${data.name.substr(0, data.name.lastIndexOf('Minecraft Server')).trim()}. Up to ${data.players?.split('/')?.pop()?.trim()} can join.`}
        />
      </div>
    </>
  );
}

export default FAQ;
