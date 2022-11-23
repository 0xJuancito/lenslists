const LS_LENS_STORE = 'lens.store';

export type LensStore = {
  accessToken: string;
  refreshToken: string;
  handle: string;
  pictureUrl: string | null;
};

export const getFromLocalStorage = (): LensStore | null => {
  const lsLensStoreStr = window.localStorage.getItem(LS_LENS_STORE);
  if (!lsLensStoreStr) {
    return null;
  }

  try {
    const lensStore = JSON.parse(lsLensStoreStr);
    return lensStore as LensStore;
  } catch (err) {
    return null;
  }
};

export const setLensLocalStorage = (lensStore: LensStore) => {
  window.localStorage.setItem(LS_LENS_STORE, JSON.stringify(lensStore));
};

export const deleteLensLocalStorage = () => {
  window.localStorage.removeItem(LS_LENS_STORE);
};
