import { BlogPosts } from "@/services/blogposts.service";
import { BlogEntryBannerentries } from "@/services/blogpostbyslug.service";
import { BlogCard } from "../blog-card";
import { Border } from "./border";

interface BlogEntryBannerProps {
  Blogposts: BlogPosts;
  selectedEntries?: BlogEntryBannerentries[];
  postid: number;
}

export const BlogEntryBanner: React.FC<BlogEntryBannerProps> = ({
  Blogposts,
  selectedEntries,
  postid,
}) => {
  return (
    <div className="p-4 mt-5">
      {selectedEntries && selectedEntries.length > 0 ? (
        <>
          <p className="text-lg font-bold mb-4">Passende Beiträge:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
            {selectedEntries.map((selectedEntry) => {
              const matchingPost = Blogposts.data.find(
                (post) => post.id === selectedEntry.id
              );

              return matchingPost ? (
                <div className="max-w-[300px] max-h-[300px]" key={matchingPost.id}>
                  <BlogCard key={matchingPost.id} post={matchingPost} />
                </div>
              ) : null;
            })}
          </div>
        </>
      ) : (
        <>
          <p className="text-lg font-bold mb-4">Weitere Beiträge:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
            {Blogposts.data
              .filter((post) => post.id !== postid)
              .slice(0, 3)
              .map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
          </div>
        </>
      )
      }
    </div >
  );
};
