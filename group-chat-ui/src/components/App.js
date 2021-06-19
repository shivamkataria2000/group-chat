import { Fragment, useState } from "react";
import "../styles/App.css";
import MainLayout from "./MainLayout.jsx";
import Registration from "./Registration";
import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";
export const GET_USERS = gql`
  query {
    userMany {
      name
      password
      _id
      email
    }
  }
`;
export const GET_GROUPS = gql`
  query {
    groupMany {
      name
      description
      _id
      chat {
        user
        message
      }
    }
  }
`;
export const PUSH_MESSAGE = gql`
  mutation pushMessage($id: String!, $message: String!, $user: String!) {
    chatPushToArray(
      groupId: $id
      valueToPush: { user: $user, message: $message }
    ) {
      name
      chat {
        message
        user
      }
    }
  }
`;
function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.userMany.map(({ name, email, _id }) => (
    <div key={_id}>
      <p>
        {name}, {email},{_id}
      </p>
    </div>
  ));
}

const client = new ApolloClient({
  uri: "http://localhost:8000/",
  cache: new InMemoryCache(),
});
function App() {
  const [user, setUser] = useState(true);
  return (
    <Fragment>
      {
        // <Users />
      }
      {user ? <MainLayout user={user}></MainLayout> : <Registration />}
    </Fragment>
  );
}

export default App;
