import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

// Import your banner images
import img1 from '../assets/banner/banner1.jpg';
import img2 from '../assets/banner/banner2.jpg';
import img3 from '../assets/banner/banner3.jpg';

const slides = [
  { 
    img: img1, 
    parallaxSpeed: -20,
    title: "Rescue Food, RePlate Hope",
    subtitle: "Join our mission to reduce food waste"
  },
  { 
    img: img2, 
    parallaxSpeed: -15,
    title: "Empower Your Impact - Become a Charity",
    subtitle: "Partner with us to feed communities"
  },
  { 
    img: img3, 
    parallaxSpeed: -25,
    title: "Your Plate Can Make a Difference",
    subtitle: "Every meal shared changes lives"
  }
];

const Banner = () => {
  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] lg:aspect-[25/9] xl:aspect-[28/9] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Parallax]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        effect="fade"
        speed={1000}
        loop={true}
        parallax={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="relative w-full h-full"
              data-swiper-parallax={`${slide.parallaxSpeed}%`}
            >
              <img
                src={slide.img}
                alt={`Banner ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
                data-swiper-parallax-scale="1.05"
                width="1920"
                height="800"
                loading="lazy"
              />

              {/* Overlay Gradient Text Box */}
              <div className="absolute left-4 sm:left-8 md:left-16 lg:left-24 top-1/2 transform -translate-y-1/2 z-10 w-[90%] max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="relative p-4 sm:p-6 md:p-8 rounded-xl bg-gradient-to-r from-green-600/90 to-green-800/90 backdrop-blur-sm shadow-2xl">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400/30 to-green-600/30 rounded-xl blur-sm"></div>
                  <h2 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 opacity-0 animate-fadeIn text-white leading-snug tracking-tight"
                    style={{ 
                      animationDelay: '0.3s', 
                      animationFillMode: 'forwards',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {slide.title}
                  </h2>
                  <p 
                    className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-0 animate-fadeIn text-blue-100 leading-relaxed"
                    style={{ 
                      animationDelay: '0.6s', 
                      animationFillMode: 'forwards'
                    }}
                  >
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 z-10">
          <div className="swiper-progress h-full bg-white origin-left"></div>
        </div>
      </Swiper>

      {/* Animation styles */}
      <style jsx global>{`
        .swiper-progress {
          animation: progressBar 5000ms linear infinite;
        }
        @keyframes progressBar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .swiper-slide:not(.swiper-slide-active) .swiper-progress {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Banner;
