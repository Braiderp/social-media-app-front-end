import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import { setContext } from "apollo-link-context";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import MenuBar from "./components/MenuBar";
import { AuthProvider } from "./context/auth";
import SinglePost from "./pages/SinglePost";

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV == "dev"
      ? "http://localhost:5000"
      : "https://pacific-waters-91817.herokuapp.com/"
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <MenuBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/posts/:postId" element={<SinglePost />} />
        </Routes>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
