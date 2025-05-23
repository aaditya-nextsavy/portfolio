"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { gsap } from "gsap";
import { CgArrowTopRight } from "react-icons/cg";

const Home = () => {
  const spansRef = useRef([]);
  const middleLineRef = useRef(null);
  const BottomLineRef = useRef(null);
  const scrollDownRef = useRef(null);

  // const overlayRef = useRef(null);

  const pageTitle = ["a", "a", "d", "i", "t", "y", "a"];


  // Clear ref on re-render
  spansRef.current = [];
  const moveUpRef = useRef(null);

  const elementRef = useRef(null);
  const [isAtTop, setIsAtTop] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        // At top of page - make visible
        scrollDownRef.current.style.opacity = '1';
      } else {
        // Scrolled down - hide
        scrollDownRef.current.style.opacity = '0';
      }
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const tl = gsap.timeline();
    // gsap.set(moveUpRef.current, { zIndex: 3 });

    // Initial setup
    gsap.set(".home-wrapper", { 
      // backgroundColor: "#ff98a2",
      background:"var(--primary-color)",
       width: "100%" });
    gsap.set(spansRef.current, { color: "#000", y: 400, opacity: 0 });
    // Step 1: Even letters slide up
    gsap.set(moveUpRef.current, { zIndex: 0 });

    gsap.set(
      spansRef.current.filter((_, i) => i % 2 === 0),
      { y: 500, opacity: 1 }
    );
    tl.to(
      spansRef.current.filter((_, i) => i % 2 === 0),
      {
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
      },
      0.1
    );

    // Step 2: Odd letters slide up (but not aligned yet)
    gsap.set(
      spansRef.current.filter((_, i) => i % 2 !== 0),
      { y: "100%", opacity: 0 }
    );
    tl.to(
      spansRef.current.filter((_, i) => i % 2 !== 0),
      {
        y: 200,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
      },
      "<0.2" // Starts slightly after even letters
    );

    // Step 3: Odd letters align with even letters + moveUpRef starts moving
    tl.to(
      spansRef.current.filter((_, i) => i % 2 !== 0),
      {
        y: "0%",
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
      },
      "<0.3" // Starts 0.3s after previous step
    );

    // Step 6: Background & text color change
    tl.to(
      ".home-wrapper",
      { backgroundColor: "transparent", duration: 0.1 },
      "<0.01"
    );

    // Step 4: MoveUpRef starts moving up at the same time as alignment
    tl.to(
      moveUpRef.current,
      {
        y: "-100%",
        duration: 1,
        ease: "power3.inOut",
      },
      "<0.11" // Starts at the same time as Step 3
    );

    tl.to(spansRef.current, { 
      // color: "#ff98a2", 
      color:"var(--primary-color)",
      duration: 0.3 }, "<0.31");

    // Step 5: Odd letters fade out at the end of moveUpRef animation
    tl.to(
      spansRef.current.filter((_, i) => i % 2 !== 0),
      {
        opacity: 0,
        duration: 0.5,
      },
      ">-0.3" // Right before moveUpRef finishes
    );

    // Step 5: Odd letters fade out at the end of moveUpRef animation
    // tl.to(
    //   spansRef.current.filter((_, i) => i % 2 !== 0),
    //   {
    //     opacity: 0,
    //     duration: 0.1,
    //   },
    //   ">0.1" // Right before moveUpRef finishes
    // );

    // Step 7: Middle line (job title) and bottom content animate in
    tl.fromTo(
      middleLineRef.current,
      { autoAlpha: 0, y: 100 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      "<0.2"
    );
    tl.fromTo(
      BottomLineRef.current,
      { autoAlpha: 0, y: 100 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      "<0.2"
    );
  }, []);

 
  return (
    <>

      <div className="home-wrapper">
        <div className="home-title">
       
          <div className="pinkbackground-move-up" ref={moveUpRef}>
            <div>A</div>
            <div>I</div>
            <div>Y</div>
          </div>

          <h1 className="m-0">
            {pageTitle.map((char, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  overflow: "hidden", 
                  height: "1em",
                  verticalAlign: "bottom",
                }}
              >
                <span
                  ref={(el) => (spansRef.current[i] = el)}
                  style={{
                    display: "inline-block",
                    transform:
                      i % 2 === 0 ? "translateY(500px)" : "translateY(100%)", // set initial positions per parity
                    opacity: i % 2 === 0 ? 1 : 0,
                  }}
                >
                  {char}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="home-middle-line" ref={middleLineRef}>
          <h3>Web Developer Junior</h3>
        </div>

        <div className="home-bottom-line" ref={BottomLineRef}>
          <div
           ref={scrollDownRef} 
          className="scrollDownText">
            <p
           
            >Scroll to view</p>
          </div>
          <div className="home-quote">
            <p>
              Passionate about creating scalable, maintainable front-end systems
              that put users first.
            </p>
          </div>
          <div className="home-buttons-wrapper">
            <button className="primary-btn">
              <div className="btn-icon">
                <FaGithub />
              </div>
              <div className="button-area flex flex-1 justify-center items-center">
                <p>
                  Github{" "}
                  <CgArrowTopRight
                    style={{ fontWeight: "800", width: "2vw", height: "2vw" }}
                  />
                </p>
              </div>
            </button>

            <button className="primary-btn">
              <div className="btn-icon">
                <FaGithub />
              </div>
              <div className="button-area flex flex-1 justify-center items-center">
                <p>
                  LinkedIn{" "}
                  <CgArrowTopRight
                    style={{ fontWeight: "800", width: "2vw", height: "2vw" }}
                  />
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
