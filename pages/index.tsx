import type { NextPage } from 'next';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWeather } from '../slices/weatherSlice';
import { RootState } from '../store';
import { ToastContainer, toast } from 'react-toastify';
import { setLoading } from '../slices/loadingSlice';
import Head from 'next/head';
import InputField from '../components/InputField';
import ClientTime from '../components/ClientTime';
import MainInfo from '../components/MainInfo';
import CityRecommendation from '../components/CityRecommendation';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Home: NextPage = () => {
    const dispatch = useDispatch();

    const [weatherId, setWeatherId] = useState(0);

    const { currentCity } = useSelector((state: RootState) => state.city);

    const API_KEY = '087db5cb3305065ead660de8e1fa75a4';
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${API_KEY}`;

    const getBgColor = (id: number) => {
        if (id === 800) {
            return 'from-yellow-700 to-orange-700';
        } else if (id.toString().charAt(0) === '8') {
            return 'from-sky-700 to-blue-700';
        } else {
            const idPrefix = id.toString().charAt(0);

            switch (idPrefix) {
                case '2':
                    return 'from-slate-700 to-slate-800';
                case '3':
                    return 'from-cyan-600 to-cyan-700';
                case '5':
                    return 'from-cyan-700 to-sky-800';
                case '6':
                    return 'from-slate-400 to-sky-600';
                case '7':
                    return 'from-zinc-500 to-zinc-700';
            }
        }

        return '';
    };

    useEffect(() => {
        dispatch(setLoading(true));

        axios
            .get(WEATHER_API_URL)
            .then((res) => {
                dispatch(setLoading(true));

                const data = res.data;

                const { name } = data;
                const { icon, description, id } = data.weather[0];
                const { temp, humidity, feels_like } = data.main;
                const { speed } = data.wind;
                const { country } = data.sys;
                const timeShift = data.timezone;

                setWeatherId(id);

                dispatch(
                    setWeather({
                        city: name,
                        country: country,
                        description: description,
                        iconCode: icon,
                        temperature: Number(temp.toFixed(0)),
                        humidity: humidity,
                        windSpeed: speed,
                        feelLike: feels_like,
                        timeShift: timeShift,
                    })
                );
            })
            .catch((err) => {
                toast.error(err.response?.data.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'light',
                });
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [currentCity]);

    return (
        <>
            <Head>
                <title>Sky</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <ToastContainer />

            <div
                className={`absolute -z-10 h-screen w-full bg-gradient-to-r ${useMemo(
                    () => getBgColor(weatherId),
                    [weatherId]
                )}`}
            ></div>

            <main className='mx-auto flex h-fit w-full flex-col items-center gap-5 rounded-xl p-5 sm:w-3/4 md:w-2/3 lg:w-2/4'>
                <CityRecommendation />

                <div className='mt-2 flex w-full flex-col flex-wrap items-center justify-between gap-10 md:mt-10 md:flex-row'>
                    <InputField />

                    <ClientTime />
                </div>

                <MainInfo />
            </main>
        </>
    );
};

export default Home;
