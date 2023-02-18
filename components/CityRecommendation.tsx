import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCity } from '../slices/citySlice';
import { setHistory } from '../slices/historySlice';
import { RootState } from '../store';

function CityRecommendation() {
    const dispatch = useDispatch();

    const { history } = useSelector((state: RootState) => state.historyList);

    useEffect(() => {
        const data = localStorage.getItem('history')?.split(',');

        if (data !== undefined) dispatch(setHistory(data!));
    }, []);

    return (
        <ul className='flex w-full flex-wrap justify-center gap-1 sm:gap-3'>
            {history.map((city, index) => {
                return (
                    <li
                        data-aos='zoom-in'
                        data-aos-duration='1000'
                        data-aos-delay={100 * index}
                        key={index}
                    >
                        <button
                            onClick={() => dispatch(setCity(city))}
                            value={city}
                            className='rounded-full border border-transparent py-1 px-5 font-medium transition-all duration-150 hover:border-white hover:bg-white hover:bg-opacity-10'
                        >
                            {city}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default CityRecommendation;
