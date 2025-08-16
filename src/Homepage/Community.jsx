import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Community = () => {
  const stories = [
    {
      id: 1,
      quote: "RePlate helped us redirect 200kg of surplus food weekly to shelters. Our staff now takes pride in our sustainability efforts.",
      author: "Maria Gonzalez",
      role: "Manager, Fresh Bites Cafe",
      image: "https://i.ibb.co/N696yjh0/photo-1555396273-367ea4eb4db5.jpg",
      stats: "1,200+ meals donated"
    },
    {
      id: 2,
      quote: "As a small charity, RePlate has been a game-changer. We now reliably serve 150 extra meals every week to those in need.",
      author: "David Chen",
      role: "Director, Hope Kitchen",
      image: "https://i.ibb.co/6JVKsHqC/premium-photo-1683140538884-07fb31428ca6.jpg",
      stats: "3,500+ people served"
    },
    {
      id: 3,
      quote: "The platform made food recovery so simple that we expanded our donations to three new neighborhoods this year.",
      author: "Sarah Johnson",
      role: "Owner, Daily Harvest Bakery",
      image: "https://i.ibb.co/qFPWJx7C/photo-1546069901-ba9599a7e63c.jpg",
      stats: "85% waste reduction"
    }
  ];

  return (
    <section className="py-16 px-4 ">
      <div className=" max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4  bg-clip-text bg-gradient-to-r text-green-900">
          Community Success Stories
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Hear how RePlate is transforming lives and businesses across our community
        </p>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id}>
                <div className="h-full">
                  <div className="bg-white rounded-2xl overflow-hidden border-cyan-400 border-2 shadow-cyan-500 shadow-xl h-full flex flex-col mb-4 mx-3 my-3 transform hover:scale-[1.02] transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={story.image} 
                        alt={story.author}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-800/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                          {story.stats}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-grow">
                      <blockquote className="text-gray-700 italic mb-4">
                        "{story.quote}"
                      </blockquote>
                    </div>
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="font-semibold text-green-800">{story.author}</p>
                        <p className="text-sm text-gray-600">{story.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination !bottom-0"></div>
        </div>

     
      </div>
    </section>
  );
};

export default Community;