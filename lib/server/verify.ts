import { gql } from '@apollo/client/core';
import { getApolloClient } from './apollo-client';

const VERIFY = `
  query($request: VerifyRequest!) {
    verify(request: $request)
  }
`;

type VerifyResponse = {
  data: {
    verify: boolean;
  };
};

export const verify = (accessToken: string): Promise<VerifyResponse> => {
  const apolloClient = getApolloClient(accessToken);

  return apolloClient.query({
    query: gql(VERIFY),
    variables: {
      request: {
        accessToken,
      },
    },
  });
};

export const verifyRequest = async (accessToken: string) => {
  const result = await verify(accessToken);

  return result.data;
};
