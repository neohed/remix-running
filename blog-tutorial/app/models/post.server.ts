import { prisma } from "~/db.server";
import type { Post } from "@prisma/client";

export type { Post } from "@prisma/client";

/*
type Post = {
  slug: string;
  title: string;
};
 */

/*
 * The types are now derived from Prisma! So we don't need manually typing here.
 * Presumably the command: "npx prisma db seed" generates .ts types from schema.prisma
 */
export async function getPosts()/*: Promise<Array<Post>> */{
  return prisma.post.findMany();
  /*
  return [
    {
      slug: "my-first-post",
      title: "My First Post",
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
    },
  ];
   */
}

export async function getPost(slug: string | undefined) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.create({ data: post });
}

export async function updatePost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.update({
    data: post,
    where: {
      slug: post.slug
    }
  });
}

export async function deletePost(
  slug: string
) {
  return prisma.post.delete({
    where: {
      slug: slug
    }
  })
}
