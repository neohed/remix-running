import { prisma } from "~/db.server";

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
  const data = await prisma.post.findMany();
  console.log('export async function getPosts()')
  console.log(data)
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
