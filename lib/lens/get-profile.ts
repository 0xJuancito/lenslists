import { apolloClient } from '../apollo-client';
import {
  ProfileDocument,
  SingleProfileQueryRequest,
} from './graphql/generated';

const getProfileRequest = async (request: SingleProfileQueryRequest) => {
  const result = await apolloClient.query({
    query: ProfileDocument,
    variables: {
      request,
    },
  });

  return result.data.profile;
};

export const profile = async (profileId: String) => {
  const profile = await getProfileRequest({
    profileId,
  });

  return profile;
};
