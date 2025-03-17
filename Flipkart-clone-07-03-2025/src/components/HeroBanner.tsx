// src/components/HeroBanner.tsx
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const banners = [
  { id: 1, imageUrl: 'https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1b3806d419cbe60e.jpg?q=20', link: '#' },
  { id: 2, imageUrl: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/352e6f0f8034fab5.jpg?q=80', link: '#' },
  { id: 3, imageUrl: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/a787505b979e7579.jpg?q=80', link: '#' },
  { id: 4, imageUrl: 'https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/5dbe24535d092e63.jpg?q=20', link: '#' },
  { id: 5, imageUrl: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/8a89ee09acc1a9e5.jpg?q=80', link: '#' }
];

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative overflow-hidden bg-[#f1f3f6] pt-2">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ 
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active bg-[#2874f0]',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="w-full h-[170px] sm:h-[200px] md:h-[230px] lg:h-[280px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="relative">
            <a href={banner.link}>
              <img 
                src={banner.imageUrl} 
                alt="Flipkart Banner" 
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        ref={prevRef}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-gray-100 text-gray-800 p-1 md:p-3 rounded-full shadow-md transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        ref={nextRef}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-gray-100 text-gray-800 p-1 md:p-3 rounded-full shadow-md transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default HeroBanner;