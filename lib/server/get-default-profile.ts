import { gql } from '@apollo/client/core';
import { getApolloClient } from './apollo-client';

const GET_DEFAULT_PROFILES = `
  query($request: DefaultProfileRequest!) {
    defaultProfile(request: $request) {
      id
      handle
    }
  }
`;

const getDefaultProfileRequest = (token: string, ethereumAddress: string) => {
  const apolloClient = getApolloClient(token);

  return apolloClient.query({
    query: gql(GET_DEFAULT_PROFILES),
    variables: {
      request: {
        ethereumAddress,
      },
    },
  });
};

export const getDefaultProfile = async (token: string, address: string) => {
  const result = await getDefaultProfileRequest(token, address);
  return result.data;
};
