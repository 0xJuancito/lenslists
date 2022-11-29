export const formatImageUrl = (url: string): string => {
  return url.replace('ipfs://', 'https://lens.infura-ipfs.io/ipfs/');
};

export const formatProfile = (profile: any) => {
  // @ts-ignore
  if (profile.picture?.original?.url) {
    // @ts-ignore
    profile.picture.original.url = formatImageUrl(
      profile.picture?.original?.url,
    );
  }
  // @ts-ignore
  if (profile.picture?.original?.url) {
    // @ts-ignore
    profile.picture.original.url = formatImageUrl(
      profile.picture?.original?.url,
    );
  }

  // @ts-ignore
  if (profile.coverPicture?.original?.url) {
    // @ts-ignore
    profile.coverPicture.original.url = formatImageUrl(
      profile.coverPicture?.original?.url,
    );
  }
  // @ts-ignore
  if (profile.coverPicture?.original?.url) {
    // @ts-ignore
    profile.coverPicture.original.url = formatImageUrl(
      profile.coverPicture?.original?.url,
    );
  }
};
