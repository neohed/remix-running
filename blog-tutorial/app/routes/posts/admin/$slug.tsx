import type { LoaderFunction } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import type { Post } from "~/models/post.server";

import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";
import PostForm from "~/routes/posts/admin/PostForm";
import { posts_action } from "~/routes/posts/utility";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  return json<LoaderData>({ post });
};

export const action: ActionFunction = async (params) => {
  return posts_action(params)
}

export default function EditPostSlug() {
  const errors = useActionData();

  const { post } = useLoaderData() as LoaderData;

  const transition = useTransition();
  const isUpdating = Boolean(transition.submission);

  return (
    <Form method="put">
      <PostForm
        post={post}
        errors={errors}
        isInProgress={isUpdating}
      />
    </Form>
  );
}

/*
 * The part of the filename attached to the $ becomes a named key on the params object that comes into your loader.
 */
