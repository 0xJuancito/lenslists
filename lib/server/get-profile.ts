import { gql } from '@apollo/client/core';
import { getApolloClient } from './apollo-client';

const GET_PROFILE = `
  query($request: SingleProfileQueryRequest!) {
    profile(request: $request) {
      id
    }
  }
`;

const getProfileRequest = (token: string, profileId: string) => {
  const apolloClient = getApolloClient(token);

  return apolloClient.query({
    query: gql(GET_PROFILE),
    variables: {
      request: {
        profileId,
      },
    },
  });
};

export const getProfile = async (token: string, profileId: string) => {
  const result = await getProfileRequest(token, profileId);
  return result.data;
};
