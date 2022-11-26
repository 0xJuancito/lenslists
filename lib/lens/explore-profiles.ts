import { apolloClient } from '../apollo-client';
import {
  ExploreProfilesDocument,
  ExploreProfilesRequest,
  ProfileSortCriteria,
} from './graphql/generated';
import { formatProfile } from './utils';

export const exploreProfiles = async (request: ExploreProfilesRequest) => {
  const result = await apolloClient.query({
    query: ExploreProfilesDocument,
    variables: {
      request,
    },
  });

  return result.data.exploreProfiles;
};

export const explore = async () => {
  const result = await exploreProfiles({
    sortCriteria: ProfileSortCriteria.MostFollowers,
  });

  result.items.forEach((item) => {
    formatProfile(item);
  });

  return result;
};
