import React from 'react';
import {AppLayout} from "./Layout";
import { useCurrentLink } from '../../hooks/useCurrentLink';


const App: React.FC = () => {

    useCurrentLink();

  
    return (
        <AppLayout />
    )
}

export default App;
