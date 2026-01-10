// src/components/ExplorersSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

type Testimonial = {
  text: string;
  name: string;
  role: string;
  img: string;
};

const testimonials: Testimonial[] = [
  {
    text:
      "Exceptional service! I couldn’t be happier with the results. The team went above and beyond to meet my needs and deliver outstanding outcomes.",
    name: "James Freshman",
    role: "Global Explorer",
    img: "/avatar-1.png",
  },
  {
    text:
      "Amazing experience from start to finish. Professional, efficient, and exceeded every expectation.",
    name: "Sarah Thompson",
    role: "Product Designer",
    img: "/avatar-1.png",
  },
  {
    text:
      "Truly outstanding! The team demonstrated incredible skill and dedication throughout.",
    name: "Liam Parker",
    role: "Tech Founder",
    img: "/avatar-1.png",
  },
];

const ExplorersSection: React.FC = () => {
  return (
    <section className="w-full bg-linear-to-b from-[#050020] via-[#07002b] to-[#0a003d] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-24">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <p className="text-xs uppercase tracking-[0.45em] text-white/40 mb-4">
            Explorers Stories
          </p>
          <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Hear from our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#a855f7] via-[#7c3aed] to-[#4f46e5]">
              Explorers
            </span>
          </h2>
        </motion.div>

        {/* Swiper */}
        <div className="mt-14 relative">
          <div className="absolute -top-20 -left-24 w-64 h-64 bg-[#8a2bff]/10 blur-3xl rounded-full" />
          <div className="absolute top-10 -right-32 w-72 h-72 bg-[#0ea5e9]/10 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4200, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
              slidesPerView={1}
              className="py-8!"
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    <div className="relative rounded-3xl p-px bg-linear-to-r from-[#7c3aed]/30 via-[#8a2bff]/15 to-[#0ea5e9]/25">
                      <div className="rounded-[22px] bg-linear-to-br from-[#0b0123] via-[#110334] to-[#1a0646] border border-white/5 px-8 py-10">
                        <p className="text-lg text-white/90 leading-relaxed">{t.text}</p>
                        <div className="mt-8 flex items-center gap-4">
                          <img
                            src={t.img}
                            alt={t.name}
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-[#7c3aed]/50"
                          />
                          <div>
                            <p className="text-base font-semibold">{t.name}</p>
                            <p className="text-sm text-white/60">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* stacked CTAs */}
        <div className="mt-16 space-y-12">
          {/* Instructor CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row items-start gap-6 border-l-2 border-[#8a2bff] pl-6"
          >
            <img
              src="/teacher-1.png"
              alt="instructor"
              className="w-40 h-40 rounded-2xl object-cover"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Teach with AE</p>
              <h3 className="text-3xl font-bold text-white mt-2">Become an instructor</h3>
              <p className="text-sm text-white/70 mt-3 max-w-2xl">
                Earn from teaching and reach millions of explorers globally. Build immersive cohorts,
                share your craft, and grow your influence.
              </p>
              <button className="mt-6 px-5 py-3 rounded-full bg-linear-to-r from-[#8a2bff] to-[#4f46e5] font-semibold">
                Start teaching
              </button>
            </div>
          </motion.div>

          {/* Learner CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="md:w-[70%] md:ml-auto flex flex-col md:flex-row-reverse items-start gap-6 border-r-2 border-[#0ea5e9] pr-6"
          >
            <img
              src="/student-1.png"
              alt="learner"
              className="w-36 h-36 rounded-2xl object-cover"
            />
            <div className="md:text-right">
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Join a cohort</p>
              <h3 className="text-3xl font-bold text-white mt-2">Transform your career</h3>
              <p className="text-sm text-white/70 mt-3">
                Explore curated learning paths with accountability partners, live mentor sessions,
                and project reviews that keep you moving forward.
              </p>
              <button className="mt-6 px-5 py-3 rounded-full bg-linear-to-r from-[#0ea5e9] to-[#6366f1] font-semibold">
                Browse courses
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExplorersSection;
