import { apolloClient } from '../apollo-client';
import { ProfileQueryRequest, ProfilesDocument } from './graphql/generated';
import { formatProfile } from './utils';

const getProfilesRequest = async (request: ProfileQueryRequest) => {
  const result = await apolloClient.query({
    query: ProfilesDocument,
    variables: {
      request,
    },
  });

  return result.data.profiles;
};

export const profiles = async (profileIds: string[]) => {
  const result = await getProfilesRequest({ profileIds });

  result.items.forEach((item) => {
    formatProfile(item);
  });

  return result;
};
