import { apolloClient } from '../apollo-client';
import { ProfileQueryRequest, ProfilesDocument } from './graphql/generated';

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
  const profilesFromProfileIds = await getProfilesRequest({ profileIds });

  return profilesFromProfileIds;
};
