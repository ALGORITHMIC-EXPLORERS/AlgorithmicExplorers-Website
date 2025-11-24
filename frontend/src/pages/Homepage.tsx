// src/pages/HomePage.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import WhoWeAreSection from "../components/WhoWeAre";
import { Mouse } from "lucide-react";
import { ArrowDown } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import CohortsSection from "../components/CohortsSection";
import TestimonialSwiper from "../components/TestimonialSwiper";
import CommunitySection from "../components/CommunitySection";
import Footer from "../components/Footer";

const bgPath = "/background.jpg";

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

const Card = ({
  title,
  subtitle,
  cta,
  center = false,
  first = false,
  last = false,
  comment,
  commentLink,
}: {
  title: string;
  subtitle?: string;
  cta?: string;
  comment?: string;
  commentLink?: string;
  center?: boolean;
  first?: boolean;
  last?: boolean;
}) => (
  <div
    className="
      w-full min-h-[280px] sm:min-h-[300px] md:h-[307px]
      bg-white/4 backdrop-blur-md border border-white/8
      rounded-xl p-5 sm:p-6 md:p-8
      relative
      flex flex-col justify-between
      shadow-xl
    "
  >
    <div className="w-full sm:w-[95%]">

      {first && (
        <img
          src="/badge 1.png"
          alt={title}
          className="mb-5 rounded-full bg-black h-7"
        />
      )}
      {center && (
        <img
          src="/badge 2.png"
          alt={title}
          className="mb-5 rounded-full bg-white h-7"
        />
      )}
      {last && (
        <img
          src="/badge 3.png"
          alt={title}
          className="mb-5 rounded-full bg-black h-7"
        />
      )}

      <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      {subtitle && first && (
        <p className="text-white/60 text-sm sm:text-base leading-relaxed">{subtitle}</p>
      )}
      {subtitle && center && (
        <p className="text-white/60 text-sm sm:text-base bottom-25 absolute leading-relaxed">
          {subtitle}
        </p>
      )}
      {subtitle && !first && !center && (
        <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>

    {cta && (
      <div className="mt-6">
        <button
          className={
            center
              ? "w-full py-2 rounded-sm bg-linear-to-r from-[#7928FF]  to-[#4C00FF] text-white font-semibold shadow-lg"
              : "py-2 px-4 rounded-full bg-white/6 text-white/90 mb-2 border border-white/10"
          }
        >
          {cta}
        </button>
        {comment && commentLink && (
          <p className="text-white/60 text-sm leading-relaxed">
            <a href="" className="text-[#0F80DD] text-md mr-2">
              {commentLink}
            </a>
            {comment}
          </p>
        )}
      </div>
    )}
  </div>
);

const HomePage = () => {
  const sponsors = [
    { name: "Company 1", logo: "/unsplash-logo.png" },
    { name: "Company 2", logo: "/Notion-logo.png" },
    { name: "Company 3", logo: "/Intercom-logo.png" },
    { name: "Company 4", logo: "/descript-logo.png" },
    { name: "Company 5", logo: "/Grammarly-logo.png" },
    { name: "Company 6", logo: "/Intercom-logo.png" },
  ];

  return (
    <>
    <div className="bg-[#050020]">
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url('${bgPath}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* Enhanced overlay for better blending */}
    
      {/* Additional soft overlay for depth */}
      <div className="absolute inset-0 bg-[#050020]/40 pointer-events-none" />

      {/* centered hero */}
      <header className="relative z-20 flex items-center justify-center min-h-screen pt-24 pb-12 md:h-[120vh]">
        <div className="max-w-3xl text-center px-4 sm:px-6">
          <FadeInWhenVisible>
            <p className="text-white/60 tracking-widest text-xs sm:text-sm md:text-base mb-3 md:mb-4">
              Welcome to AE.
            </p>

            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-[0_8px_40px_rgba(120,40,255,0.25)]">
              Gear Up For The
              <br />
              Future.
            </h1>

            <p className="text-white/60 mt-4 sm:mt-6 max-w-xl mx-auto text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explore
              projects, volunteer, and grow with our community.
            </p>

            {/* circular indicator + down arrow */}
            <div className="flex flex-col items-center gap-3 mt-8">
              <div className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-white/70">
                <Mouse size={25} strokeWidth={1.5} />
              </div>
              <div className="animate-bounce text-white/60">Scroll</div>
              <ArrowDown size={38} className="text-white/80" />
            </div>
          </FadeInWhenVisible>
        </div>
      </header>

      {/* cards row */}
      <section className="relative z-20 -mt-12 sm:-mt-16 md:-mt-20 px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          {/* changed from flex to grid for equal widths */}
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <FadeInWhenVisible delay={0.1}>
              <Card
                title="Do it the Algorithmic Explorers Way"
                subtitle="Phasellus accumsan imperdiet tempor."
                cta="Read More"
                commentLink="AE retreat on"
                comment="31st December, 2025"
                first
              />
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.25}>
              <Card
                title="Prioritizing Growth"
                subtitle="With 120k+ active user's"
                cta="Sign Up as Volunteer"
                center
              />
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.4}>
              <Card
                title="Collaboration & Development"
                subtitle="Phasellus accumsan imperdiet tempor."
                cta="Learn More"
                commentLink="AE retreat on"
                comment="31st December, 2025"
                last
              />
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* decorative purple radial glow in center (enhances the blob) */}
      <div
        className="pointer-events-none absolute -translate-x-1/2 left-1/2 top-32 w-xl h-144 rounded-full blur-3xl opacity-60 z-10"
        style={{
          background:
            "radial-linear(circle at 30% 30%, rgba(255,150,255,0.28), rgba(120,40,255,0.22) 25%, rgba(40,10,80,0.0) 60%)",
        }}
      />

</div>

      {/* Trust Section */}
      <FadeInWhenVisible delay={0.3} y={20}>
        <section className="relative z-20 pb-3 sm:pb-4 px-4 sm:px-6">
          {" "}
          {/* removed top padding, minimal bottom */}
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl text-white font-semibold">
              Trusted by 25,000+ Teams Worldwide
            </h1>
          </div>
        </section>
      </FadeInWhenVisible>
      {/* Sponsors Section – Swiper marquee with blurred fade edges */}
      <FadeInWhenVisible delay={0.5} y={20}>
        <section className="relative z-20 pt-0 pb-6 sm:pb-8 px-4 sm:px-6">
          {" "}
          {/* removed top padding */}
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <Swiper
                className="marquee-swiper pointer-events-none"
                modules={[Autoplay, FreeMode]}
                slidesPerView={2.5}
                spaceBetween={24}
                loop
                loopAdditionalSlides={sponsors.length}
                freeMode={{ enabled: true }}
                allowTouchMove={false}
                speed={8000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                breakpoints={{
                  640: { slidesPerView: 3.5 },
                  768: { slidesPerView: 4.5 },
                  1024: { slidesPerView: 5.5 },
                }}
              >
                {[...sponsors, ...sponsors].map((s, i) => (
                  <SwiperSlide key={i}>
                    <div className="flex items-center justify-center h-22 rounded-xl p-6">
                      <img
                        src={s.logo}
                        alt={s.name}
                        className="max-h-16 object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Blurred linear edges */}
              <div className="marquee-edge-left" />
              <div className="marquee-edge-right" />
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      <WhoWeAreSection />
      {/* GURU CIRCLE */}
      <FadeInWhenVisible delay={0.2} y={30}>
        <section className="relative z-20 px-4 sm:px-6 py-12 sm:py-16 md:py-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-6 sm:mb-8 md:mb-10">
              The Guru Circle
            </h2>
            <div className="flex flex-col md:flex-row gap-6 md:gap-0 p-2 sm:p-4">
              <div className="w-full md:w-1/2 h-[40vh] sm:h-[50vh] md:h-[70vh] p-2 sm:p-4 transition-all duration-700 hover:scale-105 rounded-xl bg-white/4">
                <img
                  src="/guru-preview.png"
                  className="rounded-xl h-full w-full object-cover shadow-lg"
                  alt="Guru Circle Preview"
                />
              </div>
              <div className="w-full md:w-1/2 p-3 sm:p-5 h-full">
                <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 text-white/75 text-sm sm:text-base">
                  <p className="mb-4 sm:mb-5">
                    An exclusive forum section where members who have advanced
                    in their AI journey (Gurus) can share their knowledge,
                    showcase projects, collaborate on challenges, and discuss
                    advanced AI topics.
                  </p>
                  <p>
                    Gain access to general discussions, project showcases, job
                    opportunities, mentorship requests.
                  </p>
                </div>
                <div className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-5">
                  <button className="bg-linear-to-l px-4 py-2 sm:px-5 sm:py-3 rounded-lg border border-transparent text-white text-sm sm:text-base font-bold flex items-center gap-2 from-[#A822DB] to-[#09003B] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-500">
                    <ArrowUpRight size={15} className="sm:w-4 sm:h-4" />
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>
      <CohortsSection />
      <TestimonialSwiper />
      {/* Community Section */}
      <CommunitySection />
      <Footer />
      </div>
    </>
  );
};

export default HomePage;
