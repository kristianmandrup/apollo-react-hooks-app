import ApolloClient from "apollo-boost";
const cache = new InMemoryCache();

export const client = new ApolloClient({
  clientState: {
    defaults: {
      isConnected: true
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected } });
          return null;
        }
      }
    }
  }
});
