import React, { useState, useEffect } from "react";
import HeroHome from "../components/HeroHome";
import RadioHome from "../components/RadioHome";
import Eglise from "../components/EgliseHome";
import ProgrammeHome from "../components/ProgrammeHome";
import CommunauteHome from "../components/CommunauteHome";
import StatistiqueHome from "../components/StatistiqueHome";
import GloireHome from "../components/GloireHome";
import TemoignageHome from "../components/TemoignageHome";
import SmsPastorHome from "../components/SmsPastorHome";
import {MotivationHome, CTA } from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {

  return (
    <div className="w-full bg-gray-100 font-sans overflow-x-hidden dark:bg-gray-900 dark:text-white">
      <Header/>
      <HeroHome /> {/* HERO */}
      <RadioHome />  {/* RADIO IMAGES - SCROLLING */}
      <Eglise />  {/* ABOUT IMAGE LEFT */}
      <ProgrammeHome />  {/* ACTIVITIES CARDS */}
      <MotivationHome />  {/* MOTIVATION STRIP : Avec Dieu tout devient possible */}
      <CommunauteHome />  {/* IMAGE RIGHT WITH SLIDER */}
      <StatistiqueHome /> {/* STATS */}
      <GloireHome />  {/* MOMENT DE GLOIRE */}
      <TemoignageHome />  {/* TEMOIGNAGE YOUTUB */}
      <SmsPastorHome />  {/* PASTOR MESSAGE */}
      <CTA />    {/* CTA : Votre miracle commence ici*/}
      <Footer/>
    </div>
  );
}

export default Home;