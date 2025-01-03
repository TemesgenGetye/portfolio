"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";
import "./style.css";
import Link from "next/link";

export default function Header({ customClass }) {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useLayoutEffect(() => {
    let ScrollTrigger;
    (async () => {
      const scrollModule = await import("gsap/ScrollTrigger"); // Fixed variable name
      ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(button.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: window.innerHeight,
          onLeave: () => {
            gsap.to(button.current, {
              scale: 1,
              duration: 0.25,
              ease: "power1.out",
            });
          },
          onEnterBack: () => {
            gsap.to(
              button.current,
              { scale: 0, duration: 0.25, ease: "power1.out" },
              setIsActive(false)
            );
          },
        },
      });
    })();
  }, []);

  return (
    <>
      <header ref={header} className={`${styles.header} ${customClass}`}>
        <div className={styles.logo}>
          <div className={styles.name}>
            <p className={styles.codeBy}>Temesgen</p>
            <p className={styles.dennis}>Getye</p>
          </div>
        </div>
        <div className={styles.nav}>
          <Magnetic>
            <div className={styles.el}>
              <Link href={`/`}>
                <p>Home</p>
              </Link>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <Link href={`/work`}>Work</Link>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <Link
                href={`https://drive.google.com/file/d/1SVgUfGjXl7K-T-oqUQ2P-RRvMm4wrY5D/view?usp=drive_link`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </Link>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <Link href={`#footer`}>Contact</Link>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
        </div>
      </header>
      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
