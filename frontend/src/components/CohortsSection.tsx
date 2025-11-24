import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Search, ArrowRight, Palette, Server, Code, Brain, BarChart3, Binary } from "lucide-react";

const FadeInWhenVisible = ({
  children,
  delay = 0,
  y = 30,
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

const cohorts = [
  { title: "UI/UX & Product Design", icon: Palette },
  { title: "Backend Development", icon: Server },
  { title: "Frontend Development", icon: Code },
  { title: "Machine Learning", icon: Brain },
  { title: "Computational Analysis", icon: BarChart3 },
  { title: "Algorithm Basics", icon: Binary },
];

export default function CohortsSection() {
  return (
    <section className="relative z-20 px-4 sm:px-6 py-12 sm:py-16 md:py-24 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeInWhenVisible delay={0.2}>
          <header className="text-center mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-linear-to-b from-[#6635C4] to-[#050020] bg-clip-text text-transparent">
              Learning Cohorts
            </h1>
            <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
              Phasellus accumsan imperdiet tempor. <br />
              Cras tincidunt, arcu nec eleifend porttitor, orci est vehicula
            </p>
          </header>
        </FadeInWhenVisible>

        {/* Search Bar */}
        <FadeInWhenVisible delay={0.3}>
          <div className="w-full flex justify-center">
            <div
              className="
          flex items-center 
          bg-[#0F0022]/60 
          backdrop-blur-xl 
          border border-white/10 
          rounded-full 
          px-6 py-3 
          w-full max-w-xl 
          shadow-[0_0_25px_rgba(123,44,191,0.3)]
        "
            >
              <input
                type="text"
                placeholder="Search for a course"
                className="
            flex-1 
            bg-transparent 
            text-sm 
            text-white 
            placeholder-white/40 
            focus:outline-none 
            pr-4
          "
              />

              {/* Search Icon Bubble */}
              <div
                className="
            w-9 h-9 
            rounded-lg 
            bg-[#2A0066] 
            border border-white/10 
            flex items-center justify-center 
            hover:bg-[#390088] 
            transition-all
          "
              >
                <Search className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Swiper */}
        <FadeInWhenVisible delay={0.4}>
          <div className="relative w-full flex justify-center items-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
            {/* Center fixed person */}
            <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-white border-2 sm:border-12 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.6)] flex items-center justify-center overflow-hidden mb-3 sm:mb-4 p-5">
                <img
                  src="/favicon.png"
                  alt="center-person"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                className="
        px-6 py-3 
        rounded-xl 
        bg-gradient-to-r from-[#6635C4] to-[#C026D3]
        shadow-lg shadow-purple-500/30 
        flex items-center gap-2 
        font-medium
        text-white
        transition-all
        hover:shadow-purple-500/50
        hover:scale-[1.03]
      "
              >
                Enroll Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Background moving slides */}
            <Swiper
              modules={[Autoplay, FreeMode]}
              spaceBetween={40}
              slidesPerView={1.5}
              centeredSlides={true}
              loop={true}
              loopAdditionalSlides={3}
              freeMode={{ enabled: true, momentum: false }}
              speed={8000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              allowTouchMove={false}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 50 },
                640: { slidesPerView: 3, spaceBetween: 60 },
                1024: { slidesPerView: 5, spaceBetween: 80 },
              }}
              className="cohorts-swiper w-full pointer-events-none"
            >
              {[...cohorts, ...cohorts, ...cohorts].map((item, index) => {
                const Icon = item.icon;
                return (
                  <SwiperSlide
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <div className="flex flex-col items-center opacity-50">
                      <div className="w-16 h-16 sm:w-17 sm:h-17 md:w-18 md:h-18 lg:w-19 lg:h-19 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center mb-2 sm:mb-3">
                        <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white/70" />
                      </div>
                      <p className="text-center text-[10px] sm:text-xs md:text-sm text-white/60 max-w-20 sm:max-w-[100px] md:max-w-[120px] leading-tight">
                        {item.title}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
