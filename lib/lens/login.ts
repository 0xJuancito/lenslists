import { apolloClient } from '../apollo-client';
import {
  AuthenticateDocument,
  ChallengeDocument,
  ChallengeRequest,
  SignedAuthChallenge,
} from './graphql/generated';

export const generateChallenge = async (request: ChallengeRequest) => {
  const result = await apolloClient.query({
    query: ChallengeDocument,
    variables: {
      request,
    },
  });

  return result.data.challenge;
};

export const authenticate = async (request: SignedAuthChallenge) => {
  const result = await apolloClient.mutate({
    mutation: AuthenticateDocument,
    variables: {
      request,
    },
  });

  return result.data!.authenticate;
};
