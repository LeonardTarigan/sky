import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UilSearch } from '@iconscout/react-unicons';
import { RootState } from '../store';
import { setCity } from '../slices/citySlice';
import { setHistory } from '../slices/historySlice';

function InputField() {
    const dispatch = useDispatch();

    const prevInput = useRef('');

    const [input, setInput] = useState('');

    const { history } = useSelector((state: RootState) => state.historyList);

    const formatString = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (input !== prevInput.current) {
            prevInput.current = input;

            let newHistory: string[] = history.map((city) => {
                return city;
            });

            if (!history.some((item) => item.toLowerCase() === input)) {
                newHistory.shift();
                newHistory.push(formatString(input));
            }

            dispatch(setHistory(newHistory));

            dispatch(setCity(input));
        }

        return;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <form
            data-aos='fade-right'
            data-aos-duration='1000'
            data-aos-delay='700'
            onSubmit={handleSearch}
            className='relative w-full md:w-fit'
        >
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white '>
                <UilSearch />
            </div>
            <input
                type='text'
                id='city-input'
                placeholder='Enter a city'
                onChange={handleChange}
                className='block w-full rounded-full border-2 border-white border-opacity-50 bg-white bg-opacity-10 px-5 py-2 pl-10 font-normal placeholder-slate-300 outline-offset-4 focus:outline focus:outline-white md:w-fit '
            />
        </form>
    );
}

export default InputField;
