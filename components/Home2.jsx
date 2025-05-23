"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Home = () => {
  const evenSpansRef = useRef([]);
  const oddSpansRef = useRef([]);

  evenSpansRef.current = [];
  oddSpansRef.current = [];

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate top line (even letters)
    gsap.set(evenSpansRef.current, { y: 500, opacity: 1 });
    tl.to(evenSpansRef.current, {
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.05,
    });

    // Animate bottom line (odd letters) into place
    gsap.set(oddSpansRef.current, { y: 0, opacity: 1 });
    tl.to(
      oddSpansRef.current,
      {
        y: "-100vh",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
      },
      ">0.3"
    );

    // Change background + text color
    tl.to(".home-section", { backgroundColor: "var(--grey-transparent)", duration: 0.5 }, ">0.3");
    tl.to(
      [...evenSpansRef.current, ...oddSpansRef.current],
      { color: "#ff98a2", duration: 0.4 },
      "<"
    );
  }, []);

  return (
    <div className="home-section">
      <div className="home-wrapper">
        <div className="title-line">
          {["A", "D", "T", "A"].map((char, i) => (
            <span key={i}>
              <span ref={(el) => (evenSpansRef.current[i] = el)}>{char}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="bottom-layer">
        {["A", "I", "Y"].map((char, i) => (
          <span key={i}>
            <span ref={(el) => (oddSpansRef.current[i] = el)}>{char}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;