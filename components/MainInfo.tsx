import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { UilTemperature, UilTear, UilWind } from '@iconscout/react-unicons';
import PuffLoader from 'react-spinners/PuffLoader';

function MainInfo() {
    const {
        city,
        country,
        description,
        humidity,
        iconCode,
        temperature,
        windSpeed,
        feelLike,
        timeShift,
    } = useSelector((state: RootState) => state.weather);

    const [localTime, setLocalTime] = useState('');
    const [localDay, setLocalDay] = useState('');

    const { isLoading } = useSelector((state: RootState) => state.loading);

    const getLocalTime = () => {
        let d = new Date();

        let utcTime =
            d.getTime() + d.getTimezoneOffset() * 60 * 1000 + timeShift * 1000;
        d.setTime(utcTime);

        let daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];

        let dayOfWeek = daysOfWeek[d.getDay()];

        let day = ('0' + d.getDate()).slice(-2);
        let month = ('0' + (d.getMonth() + 1)).slice(-2);
        let year = d.getFullYear().toString().slice(-2);

        setLocalTime(
            d.toLocaleTimeString('us-US', {
                hour: '2-digit',
                minute: '2-digit',
            })
        );

        setLocalDay(`${dayOfWeek}, ${day}/${month}/${year}`);
    };

    useEffect(() => {
        getLocalTime();
    }, [timeShift]);

    return (
        <section
            data-aos='zoom-in'
            data-aos-duration='700'
            className='mt-5 flex h-80 w-full flex-col items-center justify-between gap-14 rounded-xl border-2 border-white border-opacity-50 bg-white bg-opacity-10 p-5 sm:h-72'
        >
            {!isLoading && (
                <>
                    <div className='flex w-full justify-between gap-10'>
                        <div>
                            <h1 className='text-3xl font-semibold'>
                                {city}, {country}
                            </h1>
                            <div className='font-light'>
                                {`${localDay} | ${localTime}`}
                            </div>
                        </div>

                        <div className='flex flex-col items-end'>
                            <div className='capitalize'>{description}</div>
                            <div className='text-5xl'>{temperature}°C</div>
                        </div>
                    </div>
                    <div className='flex w-full justify-between'>
                        <ul className='flex flex-col gap-2 text-xs'>
                            <li className='flex items-center gap-1'>
                                <UilTemperature />
                                <span>Real Fell : {feelLike}°C</span>
                            </li>
                            <li className='flex items-center gap-1'>
                                <UilTear />
                                <span>Humidity : {humidity}%</span>
                            </li>
                            <li className='flex items-center gap-1'>
                                <UilWind />
                                <span>Wind : {windSpeed} km/h</span>
                            </li>
                        </ul>

                        {iconCode.length > 1 && (
                            <img
                                src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                                alt='weather-icon'
                                className='h-20 w-20'
                            />
                        )}
                    </div>
                </>
            )}

            {isLoading && (
                <div className='flex h-full items-center'>
                    <PuffLoader color='#CDCDCD' />
                </div>
            )}
        </section>
    );
}

export default MainInfo;
