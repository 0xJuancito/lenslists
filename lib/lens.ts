import { getDefaultProfile } from '@/lib/get-default-profile';
import { getProfile as getProfileFromLens } from '@/lib/get-profile';
import jwt_decode from 'jwt-decode';

export const getProfileId = async (token: string): Promise<string> => {
  const { id: address } = jwt_decode(token) as any;
  const response = await getDefaultProfile(
    token.replace('Bearer ', ''),
    address,
  );
  return response.defaultProfile.id;
};

export const getProfile = async (
  token: string,
  profileId: string,
): Promise<any> => {
  const response = await getProfileFromLens(
    token.replace('Bearer ', ''),
    profileId,
  );
  return response.profile;
};
