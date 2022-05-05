import { useState } from 'react';

export const useForceUpdate = () => {
    const [update, setUpdate] = useState(false);

    const forceUpdate = () => setUpdate(state => !state);

    return [update, forceUpdate];
}