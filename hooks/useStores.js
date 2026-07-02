import { useContext } from 'react';
import StoresContext from '../context';

const useStores = () => useContext(StoresContext);

export default useStores;