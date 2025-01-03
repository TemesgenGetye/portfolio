"use client";

import Image from "next/image";
import { useRef, useLayoutEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import CustomCursor from "./CustomerCursor";

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  let xPercent = 0;
  const directionRef = useRef(-1);

  const animate = useCallback(() => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * directionRef.current;
  }, [xPercent]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(sliderRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (directionRef.current = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, [animate]);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.main
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <CustomCursor />

      <Image
        src="/images/bgttt.jpg"
        fill={true}
        alt="background"
        className="object-cover opacity-80"
      />

      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-200 pointer-events-none"
        style={{ y }}
      />

      <div className="text-center">
        <p className="text-9xl font-black text-black">Temesgen Getye</p>
      </div>

      <motion.div
        data-scroll
        data-scroll-speed={0.1}
        className="mt-8 text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block mb-4"
          whileHover={{ scale: 1.2, rotate: 90 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
        <motion.p
          className="text-2xl font-light text-gray-700 mb-2"
          whileHover={{ scale: 1.05 }}
        >
          Freelance
        </motion.p>
        <motion.p
          className="text-4xl font-semibold text-gray-800"
          whileHover={{ scale: 1.05 }}
        >
          Full Stack Developer
        </motion.p>
      </motion.div>
    </motion.main>
  );
}
