// apollo-boost 내용 참고 할 것!
import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: "http://localhost:4000",
  clientState:{
    defaults,
    resolvers
  },
  request: async operation => {
    const token = await localStorage.getItem('token');
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
  // headers:{
  //   "Authorization": `Bearer ${localStorage.getItem("token")}`
  // }
});
