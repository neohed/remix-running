import type { ActionFunction } from "@remix-run/node";
import type { Post } from "~/models/post.server";
import { useActionData, useTransition } from "@remix-run/react";
import PostForm from "~/routes/posts/admin/PostForm";
import { posts_action } from "~/routes/posts/utility";
import { FormTypes } from "~/lib/forms";

export const action: ActionFunction = async (params) => {
  return posts_action(params);
};

export default function NewPost() {
  const errors = useActionData();

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  return (
    <PostForm
      post={{} as Post}
      errors={errors}
      isInProgress={isCreating}
      formType={FormTypes.add}
    />
  );
}
