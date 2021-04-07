import { useContext } from 'react';
import { ScreenContext } from '../ScreenProvider';

export const useScreen = () => useContext(ScreenContext);
