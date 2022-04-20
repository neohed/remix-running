import React from "react";
import type { ActionData } from "./types";
import type { Post } from "~/models/post.server";
import { FormTypes } from "~/lib/forms";
import useShallowCopy from "~/lib/useShallowCopy";
import TextInput from "~/components/TextInput";
import { Form, useTransition } from "@remix-run/react";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

interface PostFormProps {
  post: Post,
  errors: ActionData,
  isInProgress: boolean,
  formType: FormTypes,
}

const PostForm = ({ post, errors, isInProgress = false, formType }: PostFormProps) => {
  const [postEntity, isDirty, mutate] = useShallowCopy(post);
  const transition = useTransition();

  return (
    <Form method="post">
      <fieldset
        disabled={transition.state === "submitting"}
      >
        <p className="text-red-700">
          {
            isDirty
              ? "* Unsaved"
              : " "
          }
        </p>
        <input type="hidden" name="formType" value={formType} />
        <p>
          <label>
            Post Title:{" "}
            {errors?.title ? (
              <em className="text-red-600">{errors.title}</em>
            ) : null}
            <TextInput
              id="title"
              className={inputClassName}
              value={postEntity.title}
              changeHandler={title => mutate({ title })}
            />
          </label>
        </p>
        <p>
          <label>
            Post Slug:{" "}
            {errors?.slug ? (
              <em className="text-red-600">{errors.slug}</em>
            ) : null}
            <TextInput
              id="slug"
              className={inputClassName}
              value={postEntity.slug}
              changeHandler={slug => mutate({ slug })}
            />
          </label>
        </p>
        <p>
          <label htmlFor="markdown">
            Markdown:{" "}
            {errors?.markdown ? (
              <em className="text-red-600">
                {errors.markdown}
              </em>
            ) : null}
          </label>
          <br />
          <textarea
            id="markdown"
            rows={20}
            name="markdown"
            className={`${inputClassName} font-mono`}
            value={postEntity.markdown || ""}
            onChange={({ target }) => mutate({ markdown: target.value })}
          />
        </p>
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          disabled={isInProgress}
          name="action"
          value="save"
        >
          {isInProgress ? "Saving..." : "Save"}
        </button>
      </fieldset>
    </Form>
  );
};

export default PostForm;
