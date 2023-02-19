import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

function MyDocument() {
    return (
        <Html>
            <Head>
                <link rel='manifest' href='/manifest.json' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default MyDocument;
