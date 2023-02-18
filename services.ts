export const getBgColor = (id: number) => {
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

export const formatString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
