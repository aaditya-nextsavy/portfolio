// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const ContactZoom = () => {
//   const sectionRef = useRef(null);
//   const textRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=3000",
//           scrub: true,
//           pin: true,
//         },
//       });

//       tl.fromTo(
//         textRef.current,
//         {
//           scale: 1,
//           opacity: 0,
//         },
//         {
//           scale: 15, // large enough to fill screen
//           opacity: 1,
//           ease: "power2.out",
//         }
//       )
//         .to(
//           textRef.current,
//           {
//              scale: 505,
//             opacity: 1,
//             ease: "power2.in",
//           },
//           "50%" // fade out around halfway through
//         )
//         .to(
//           sectionRef.current,
//           {
//             backgroundColor: "#ffffff",
//             ease: "power2.out",
//           },
//           "<"
//         );
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={sectionRef} className="contact-wrapper">
//       <div className="zoom-in-text-container">
//         <h2 ref={textRef}>Contact <span>,</span> </h2>
//       </div>
//     </div>
//   );
// };

// export default ContactZoom;

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactZoom = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gotopleft = useRef(null);
  const gobottomRight = useRef(null);


  useEffect(() => {
  const ctx = gsap.context(() => {
    let scrollAmount = window.innerHeight * 5;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollAmount}`,
        scrub: true,
        pin: true,
      }
    });

    tl.fromTo(
      headingRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.1, ease: "none" } 
    );
    
 tl.fromTo(
  [gotopleft.current, gobottomRight.current],
  { opacity: 1, x: 0, y: 0 },
  { 
    opacity: 0,
    scale: 5,
    duration: 0.41,
    ease: "none",
    stagger: 0, 
    x: function(index) {
      return index === 0 ? -1000 : 1000; 
    },
    y: function(index) {
      return index === 0 ? -1000 : 500; 
    }
  },
   "<" 
);


    tl.fromTo(
      headingRef.current,
      { scale: 1 },
      { scale: 495, ease: "power2.inOut" },
      "<" 
    );
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <div ref={sectionRef} className="contact-section">
      <div 
      ref={gotopleft}
       className="contact-top-floating-texts">
        <h3>Open to </h3>
        <p>new challenges</p>
      </div>
      <div 
         ref={gobottomRight}
      className="contact-bottom-floating-texts">
        <h3>Definitely not AI</h3>
      </div>

      <h2 ref={headingRef} className="contact-zoom-fade-in">
        Contact<span>,</span>
      </h2>
    </div>
  );
};

export default ContactZoom;
