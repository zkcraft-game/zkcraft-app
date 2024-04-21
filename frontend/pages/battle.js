import React from "react";
import ZombokBattleCard from "../components/ZombokBattleCard";
import loadScript from '../hooks/loadScript';

var loaded =false;
const Battle = () => {
  loadScript('https://zkcraft.vercel.app/script.js');
  return (
    <div className="flex justify-center items-start pt-20">
      <div className="w-1/3"></div> {/* Left-side whitespace */}
      <ZombokBattleCard name="Olafi" level="1" owner="0x968E51108d076A7d" id="hero-bar" idtxt="hero-bar-txt" url="/obs1.jpg" eq1="/sword.jpg" eq2="/plate.jpg"/>
      <div className="skip w-1/3 flex flex-col items-center justify-center">
        <p id="msg"></p>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          <a href="https://zkcraft.vercel.app/post-battle">Skip</a>
        </button>
      </div>{" "}
      {/* Button Section */}
      <ZombokBattleCard name="Private MonKey" level="0" owner="0xAb5801a7D398351" id="villain-bar" idtxt="villain-bar-txt" url="/mon0.jpg" eq1="/empty.png" eq2="/empty.png" />
      <div className="w-1/3"></div> {/* Right-side whitespace */}
    </div>
  );
};

export default Battle;
