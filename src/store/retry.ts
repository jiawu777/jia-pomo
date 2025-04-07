import { atomWithStorage } from 'jotai/utils';
import { LOCAL_STORAGE_KEY } from './access';

const storageRetryAtom = atomWithStorage<number>(LOCAL_STORAGE_KEY.Retry, 0);

export { storageRetryAtom };
