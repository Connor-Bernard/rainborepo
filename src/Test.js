import React from 'react';
import useBookCover from './hooks/useBookCover';

export default function Test() {
    const movieInfo = useBookCover({ title: 'The Pale Blue Dot', author: 'Carl Sagan' });

    console.debug(movieInfo);

    return (<div>test</div>);
}
