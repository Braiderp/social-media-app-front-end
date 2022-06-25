import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { GET_POSTS } from "../util/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_POSTS);
  const posts = data?.posts;
  if (loading) return <p>Loading...</p>;
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">Posts</Grid.Row>
      <Grid.Row>
        {user && <Grid.Column>{<PostForm />}</Grid.Column>}
        {loading ? (
          <h1>Loading</h1>
        ) : (
          posts &&
          posts.map(post => (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};
export default Home;
