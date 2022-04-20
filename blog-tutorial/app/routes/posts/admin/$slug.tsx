import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { Post } from "~/models/post.server";
import { getPost } from "~/models/post.server";
import { useActionData, useLoaderData, useTransition, Form } from "@remix-run/react";
import invariant from "tiny-invariant";
import PostForm from "~/routes/posts/admin/PostForm";
import { posts_action } from "~/routes/posts/utility";
import { FormTypes } from "~/lib/forms";
import React from "react";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  return json<LoaderData>({ post });
};

export const action: ActionFunction = async (params) => {
  return posts_action(params);
};

export default function EditPostSlug() {
  const errors = useActionData();

  const { post } = useLoaderData() as LoaderData;

  const transition = useTransition();
  const isUpdating = Boolean(transition.submission);

  return (
    <div>
      <PostForm
        post={post}
        errors={errors}
        isInProgress={isUpdating}
        formType={FormTypes.edit}
      />
      <Form method="post">
        <input type="hidden" name="slug" value={post.slug} />
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          name="action"
          value="delete"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

/*
 * The part of the filename attached to the $ becomes a named key on the params object that comes into your loader.
 */
