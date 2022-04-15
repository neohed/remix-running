import type { ActionFunction } from "@remix-run/node";
import type {ActionData} from "./types";
import type { Post } from "~/models/post.server";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createPost } from "~/models/post.server";
import PostForm from "~/routes/posts/admin/PostForm";

export const action: ActionFunction = async ({request}) => {
  //await new Promise((res) => setTimeout(res, 1000));

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

  await createPost({ title, slug, markdown });

  return redirect("/posts/admin");
};

export default function NewPost() {
  const errors = useActionData();

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  return (
    <Form method="post">
      <PostForm
        post={{} as Post}
        errors={errors}
        isInProgress={isCreating}
      />
    </Form>
  );
}
