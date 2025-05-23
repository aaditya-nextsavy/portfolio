"use client";
import { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { CgArrowTopRight } from "react-icons/cg";

const ContactDetails = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.01) {
          document.body.style.backgroundColor = "var(--white)";
        } else {
          document.body.style.backgroundColor = "";
        }
      },
      {
        threshold: [0, 0.01],
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      document.body.style.backgroundColor = ""; // reset on unmount
    };
  }, []);

  return (
    <div ref={sectionRef} className="contact-details-wrapper">
      <div className="contact-details-top-floating-texts">
        <h3>Open to </h3>
        <p>new challenges</p>
      </div>
      <div className="contact-details-bottom-floating-texts">
        <h3> & open to features</h3>
        <p>and sponsors</p>
      </div>

      <div className="details-left-button-area">
        <button className="primary-btn">
          <div className="btn-icon">
            <FaGithub />
          </div>
          <div className="button-area flex flex-1 justify-center items-center">
            <p>
              Lets Build Together{" "}
              <CgArrowTopRight
                style={{ fontWeight: "800", width: "2vw", height: "2vw" }}
              />
            </p>
          </div>
        </button>
      </div>

      <div className="lastrow-links">
        <ul className="links-wrapper">
          <li>LinkedIn</li>
          <li>Github</li>
          <li>usefull Links</li>
          <li>Resume</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactDetails;
