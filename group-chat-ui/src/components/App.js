import { Fragment, useEffect, useState } from "react";
import "../styles/App.css";
import MainLayout from "./MainLayout.jsx";
import Registration from "./Registration";
import { useQuery, gql, useMutation } from "@apollo/client";
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
export const GROUP_SUBSCRIPTION = gql`
  subscription {
    group {
      _id
      chat {
        message
        user
      }
    }
  }
`;
export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      jwt
      message
      email
      name
      _id
    }
  }
`;
export const LOGGED_IN = gql`
  query {
    loggedIn {
      success
      email
      name
      _id
    }
  }
`;
export const SIGN_UP = gql`
  mutation ($name: String!, $email: String!, $password: String!) {
    signUp(email: $email, password: $password, name: $name) {
      success
      name
      email
      _id
      jwt
    }
  }
`;
function App() {
  const [user, setUser] = useState(null);
  const [login] = useMutation(LOGIN);
  const [signUp] = useMutation(SIGN_UP);
  const loggedIn = useQuery(LOGGED_IN);
  useEffect(() => {
    if (
      loggedIn.data &&
      loggedIn.data.loggedIn &&
      loggedIn.data.loggedIn.success
    ) {
      const loginInfo = loggedIn.data.loggedIn;
      setUser({
        id: loginInfo._id,
        name: loginInfo.name,
        email: loginInfo.email,
      });
    }
  }, [loggedIn]);
  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const attemptLogin = async (email, password) => {
    const resp = await login({
      variables: {
        email,
        password,
      },
    });
    if (resp && resp.data && resp.data.login && resp.data.login.success) {
      const loginInfo = resp.data.login;
      localStorage.setItem("token", loginInfo.jwt);
      setUser({
        id: loginInfo._id,
        name: loginInfo.name,
        email: loginInfo.email,
      });
    }
  };
  const attemptSignUp = async (name, email, password) => {
    const resp = await signUp({
      variables: {
        name,
        email,
        password,
      },
    });
    console.log(resp.data);
    if (resp && resp.data && resp.data.signUp && resp.data.signUp.success) {
      const signUpInfo = resp.data.signUp;
      localStorage.setItem("token", signUpInfo.jwt);
      setUser({
        id: signUpInfo._id,
        name: signUpInfo.name,
        email: signUpInfo.email,
      });
    }
  };
  return (
    <Fragment>
      {user ? (
        <MainLayout user={user} logOut={logOut}></MainLayout>
      ) : loggedIn.loading ? (
        "Loading..."
      ) : (
        <Registration
          attemptLogin={attemptLogin}
          attemptSignUp={attemptSignUp}
        />
      )}
    </Fragment>
  );
}

export default App;
