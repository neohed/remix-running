import type { LoaderFunction } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import type { ActionData } from "~/routes/posts/admin/types";
import type { Post } from "~/models/post.server";

import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";
import { updatePost, getPost } from "~/models/post.server";
import PostForm from "~/routes/posts/admin/PostForm";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  return json<LoaderData>({ post });
};

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: ActionData = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };
  const hasErrors = Object.values(errors).some(
    (errorMessage) => errorMessage
  );
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(
    typeof title === "string",
    "title must be a string"
  );
  invariant(
    typeof slug === "string",
    "slug must be a string"
  );
  invariant(
    typeof markdown === "string",
    "markdown must be a string"
  );

  await updatePost({ title, slug, markdown });

  return redirect("/posts/admin");
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
