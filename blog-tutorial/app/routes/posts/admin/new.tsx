import type { ActionFunction } from "@remix-run/node";
import type { Post } from "~/models/post.server";
import { useActionData } from "@remix-run/react";
import PostForm from "~/routes/posts/admin/PostForm";
import { posts_action } from "~/routes/posts/utility";

export const action: ActionFunction = async (params) => {
  return posts_action(params);
};

export default function NewPost() {
  const errors = useActionData();

  return (
    <PostForm
      post={{} as Post}
      errors={errors}
      formType={'add'}
    />
  );
}
