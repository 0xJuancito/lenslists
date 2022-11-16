import { getDefaultProfile } from '@/lib/get-default-profile';
import jwt_decode from 'jwt-decode';

export const getProfileId = async (token: string): Promise<string> => {
  const { id: address } = jwt_decode(token) as any;
  const response = await getDefaultProfile(
    token.replace('Bearer ', ''),
    address,
  );
  return response.defaultProfile.id;
};
