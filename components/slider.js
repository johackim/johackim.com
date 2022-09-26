import { Swiper, SwiperSlide } from 'swiper/react'; // eslint-disable-line
import { Autoplay, Pagination } from 'swiper';

import 'swiper/css'; // eslint-disable-line
import 'swiper/css/pagination'; // eslint-disable-line

import styles from '@styles/slider.module.css';

const Slider = ({ slides }) => {
    const pagination = { clickable: true };

    return (
        <Swiper
            pagination={pagination}
            modules={[Pagination, Autoplay]}
            className={styles.swiper}
            autoplay={{
                delay: 3000,
                disableOnInteraction: true,
            }}
        >
            {slides.map((slide) => (
                <SwiperSlide key={slide} className="flex justify-center text-center italic">{slide}</SwiperSlide>
            ))}
        </Swiper>
    );
};

Slider.defaultProps = {
    slides: ['Slide 1', 'Slide 2'],
};

export default Slider;
