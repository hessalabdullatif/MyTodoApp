import {useContext} from 'react';
import {storesContext} from '../context';

const useStores = () => useContext(storesContext);

export default useStores;