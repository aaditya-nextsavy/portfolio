"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  const projectBriefs = [
    {
      id: "01",
      img:"/assets/images/1.png",
      title: "Loss of performance budget due to using CSS transforms",
      description:
        "Heavy use of `transform` and `will-change` properties causes GPU overuse, leading to performance drops on lower-end devices.",
    },
    {
      id: "02",
      img:"/assets/images/2.png",
      title: "Unoptimized image loading on first paint",
      description:
        "Images not lazy-loaded cause layout shifts and longer LCP, hurting both UX and Core Web Vitals.",
    },
    {
      id: "03",
      img:"/assets/images/3.png",
      title: "Inefficient use of global styles and resets",
      description:
        "Lack of scoped styling or excessive overrides from global CSS leads to maintainability issues and visual bugs.",
    },
    {
      id: "04",
      img:"/assets/images/4.png",
      title: "Unnecessary JavaScript execution on scroll",
      description:
        "Scroll listeners triggering reflows and repaints too often without throttling or debouncing.",
    },
    {
      id: "05",
      img:"/assets/images/5.png",
      title: "Poor accessibility semantics in components",
      description:
        "Missing ARIA roles, incorrect heading structure, and no focus indicators hurt usability for keyboard and screen reader users.",
    },
  ];

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      smooth: true,
      direction: "vertical",
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Horizontal scroll animation setup
    const horizontalElement = horizontalRef.current;
    const containerElement = containerRef.current;

    // Calculate total padding (40vw = 20vw left + 20vw right)
    const padding = 2 * ((10 * window.innerWidth) / 100); // 40vw total

    // Total scrollable width
    const scrollWidth =
      horizontalElement.scrollWidth - containerElement.offsetWidth + padding;

    // Apply horizontal scroll animation
    gsap.from(".projects-horizontal", {
      x: 200,
      y: 200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top bottom", // when the top of the section hits the bottom of the viewport
        end: "center center", // until the center of the section reaches the center of the viewport
        scrub: true,
      },
    });

    // const horizontalScroll = gsap.to(".projects-horizontal", {
    //   x: () => `-${scrollWidth}px`,
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: ".projects-section",
    //     start: "center center", // starts when the center of the section reaches the center of the viewport
    //     end: () => `+=${scrollWidth}`,
    //     scrub: true,
    //     pin: true,
    //     anticipatePin: 1,
    //   },
    // });

    gsap.to(horizontalElement, {
      x: () => `-${scrollWidth}px`,
      ease: "none",
      scrollTrigger: {
        trigger: containerElement,
        start: "center center", // or "top top"
        end: () => `+=${scrollWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.killAll();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="projects-section">
      <div ref={horizontalRef} className="projects-horizontals">
        {/* Replace these divs with your project components */}
        <div className="projects-horizontal">
          {projectBriefs.map((brief) => (
            <div key={brief.id} className="project-card">
              <div className="cardblurredbg">
                {/* <Image
                src={brief.img}
                fill
                alt="img"
              /> */}
              </div>
              <h3>{brief.id}</h3>
              <p>{brief.title}</p>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
