import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

/**
 * Notes:
 * - The uploaded profile image is used from the local path:
 *   /mnt/data/testimonials-person.png
 *
 * - Drop this file into your React + Tailwind project. Make sure you have:
 *   npm install framer-motion swiper lucide-react
 *
 * - Tailwind utilities are used to reproduce the look: gradient background,
 *   blurred card, purple glow, left portrait, right testimonial text, quote mark,
 *   and circular arrow at bottom-right.
 */

/* Small reusable FadeInWhenVisible used for entrance animation */
const FadeInWhenVisible = ({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
};

type Testimonial = {
  id: string;
  text: string;
  name: string;
  title?: string;
  image?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    text: "Using this tool has completely transformed how our team operates. We're more organized, meet our deadlines consistently, and collaboration has never been smoother. It's a game-changer!",
    name: "Ketul Adani",
    title: "CEO of xyz company",
    image: "testimonials-person.png",
  },
  {
    id: "t2",
    text: "This product removed so much friction from our workflow. The UI is delightful and the reliability is outstanding — highly recommended.",
    name: "Aisha K.",
    title: "Head of Ops",
    image: "testimonials-person.png",
  },
  {
    id: "t3",
    text: "We gained clarity and velocity after adopting this. The team morale improved and deliveries became predictable.",
    name: "Daniel R.",
    title: "Product Lead",
    image: "testimonials-person.png",
  },
];

export default function TestimonialSwiper() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      aria-label="Testimonials"
      className="relative w-full py-5 sm:py-6 md:py-10 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeInWhenVisible delay={0.05}>
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-purple-500/80 font-semibold text-base sm:text-lg md:text-xl tracking-wide">
              World Algorithmic Explorers Learning Streak Rank
            </h2>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.12}>
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop
              slidesPerView={1}
              spaceBetween={24}
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="testimonial-swiper"
            >
              {TESTIMONIALS.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className="relative">
                    <article
                      className="relative flex flex-col md:flex-row items-start gap-5 md:gap-6
                                  rounded-3xl bg-gradient-to-br from-[#2c0468] via-[#140037] to-[#050020]
                                  p-3 sm:p-5 md:p-6 max-w-4xl mx-auto
                                  shadow-[0_25px_80px_rgba(5,0,20,0.65)] border border-white/10"
                    >
                      {/* Left image column */}
                      <div className="relative w-full md:w-48 flex-shrink-0">
                        <div className="relative rounded-2xl overflow-hidden">
                          {/* Purple gradient overlay on image */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/60 via-purple-500/40 to-transparent z-10 mix-blend-multiply" />
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-full h-46 sm:h-54 md:h-60 object-cover block"
                          />
                        </div>
                      </div>

                      {/* Right text column */}
                      <div className="relative flex-1 text-white flex flex-col justify-center py-1 sm:py-3 md:py-4">
                        {/* Large quote mark */}
                        <div className="mb-4">
                          <span className="text-5xl md:text-6xl font-serif text-white/90 leading-none">
                            “
                          </span>
                        </div>

                        <div className="space-y-3 md:space-y-5">
                          <p className="text-sm sm:text-base leading-relaxed text-white/90">
                            {t.text}
                          </p>

                          {/* bottom row: name/title and circular arrow */}
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-semibold text-white text-sm sm:text-base">
                                {t.name}
                              </div>
                              <div className="text-[10px] sm:text-xs md:text-sm text-white/60">
                                {t.title}
                              </div>
                            </div>

                            {/* circular arrow */}
                            <button
                              onClick={() => swiperInstance?.slideNext()}
                              aria-label="Next testimonial"
                              className="relative w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center
                                         transition-all duration-300 group/btn flex-shrink-0
                                         hover:scale-110 cursor-pointer"
                            >
                              <img src="/next-arrow.png" className="w-3.5 h-3.5 md:w-20 md:h-7 text-white transition-transform group-hover/btn:translate-x-0.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Pagination dots indicator - minimal style */}
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => swiperInstance?.slideToLoop(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === idx
                      ? "w-8 h-1.5 bg-white/60"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
