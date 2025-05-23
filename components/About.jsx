"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const headingRef = useRef(null);

  const AboutTitle = [ "Work", "Experience"];

  // Helper to render spans for animation
  const renderTitle = (words) => {
    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="word" data-word-index={wordIndex}>
        {word.split("").map((char, charIndex) => (
          <span key={charIndex} className="letter-wrapper">
            <span className="letter">{char}</span>
          </span>
        ))}
        {/* Space after each word */}
        <span className="letter-wrapper">
          <span className="letter">&nbsp;</span>
        </span>
      </span>
    ));
  };

useEffect(() => {
  const ctx = gsap.context(() => {
    // Pin the left column
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftRef.current,
      scrub: true,
      pinSpacing: false,
    });

    // Get the words elements inside headingRef
    const words = headingRef.current.querySelectorAll(".word"); // <- Make sure this is inside useEffect

    words.forEach((word, i) => {
      const letters = word.querySelectorAll(".letter");

      gsap.fromTo(
        letters,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0,          // Animate letters of a word together
          delay: i * 0.3,      // Delay between words
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, containerRef);

  return () => ctx.revert();
}, []);

  return (
    <div ref={containerRef} className="about-section">
      {/* Left Column */}
      <div ref={leftRef} className="about-left">
        <div className="heading-mask">
          <h2 ref={headingRef}>{renderTitle(AboutTitle)}</h2>
        </div>
      </div>

      
      {/* Right Column */}
      <div className="about-right-wrapper">
        <div className="about-right-scrollable">
          <div className="about-content-block about-first-content align-bottom">
            <h4>
              Company Name, <span>Location</span>
            </h4>
            <h5>
              Front end Developer <span>2020-present</span>
            </h5>
            <p>
              Informations related to this ... make a type specimen book. It has
              survived not only five centuries, but also the leap into elec
            </p>
          </div>
          <div className="about-content-block align-middle">
            <h4>
              Company Name, <span>,Location</span>
            </h4>
            <h5>
              Front end Developer <span>2020-present</span>
            </h5>
            <p>
              Informations related to this ... make a type specimen book. It has
              survived not only five centuries, but also the leap into elec
            </p>
          </div>
          <div className="about-content-block align-middle">
            <h4>
              Company Name, <span>,Location</span>
            </h4>
            <h5>
              Front end Developer <span>2020-present</span>
            </h5>
            <p>
              Informations related to this ... make a type specimen book. It has
              survived not only five centuries, but also the leap into elec
            </p>
          </div>
          <div className="about-content-block align-middle">
            <h4>
              Company Name, <span>,Location</span>
            </h4>
            <h5>
              Front end Developer <span>2020-present</span>
            </h5>
            <p>
              Informations related to this ... make a type specimen book. It has
              survived not only five centuries, but also the leap into elec
            </p>
          </div>
          <div className="about-content-block align-top">
            <h4>
              Company Name, <span>,Location</span>
            </h4>
            <h5>
              Front end Developer <span>2020-present</span>
            </h5>
            <p>
              Informations related to this ... make a type specimen book. It has
              survived not only five centuries, but also the leap into elec
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
