import type { ActionFunction } from "@remix-run/node";
import type { ActionData } from "~/routes/posts/admin/types";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { createPost, updatePost } from "~/models/post.server";
import { FormTypes, parseFormType } from "~/lib/forms";

export const posts_action: ActionFunction = async ({request}) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");
  const formType = parseFormType(formData.get("formType") + '')

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

  const entity = { title, slug, markdown };

  if (formType === FormTypes.edit) {
    await updatePost(entity);
  } else {
    await createPost(entity);
  }

  return redirect("/posts/admin");
}
