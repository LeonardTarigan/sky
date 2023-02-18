import { useState, useEffect } from 'react';

function ClientTime() {
    const [time, setTime] = useState('');

    useEffect(() => {
        setInterval(() => {
            setTime(
                new Date().toLocaleTimeString('us-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                })
            );
        }, 1000);
    }, []);

    return (
        <div
            data-aos='fade-left'
            data-aos-duration='1000'
            data-aos-delay='700'
            className='flex h-10 items-center text-3xl font-light'
        >
            {time}
        </div>
    );
}

export default ClientTime;
