import { atom } from 'jotai';

export const loadingDarkAtom = atom(false);
export const loadingLightAtom = atom(false);
export const LoadingProvider = () => {
  return (
    <>
      <>Loading</>
    </>
  );
};
