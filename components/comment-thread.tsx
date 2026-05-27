"use client";

import { useState } from "react";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  replies: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  onReply: (parentId: string, content: string, author: string) => void;
  depth?: number;
}

function CommentItem({ comment, onReply, depth = 0 }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");

  const handleSubmitReply = () => {
    if (replyContent.trim() && replyAuthor.trim()) {
      onReply(comment.id, replyContent.trim(), replyAuthor.trim());
      setReplyContent("");
      setReplyAuthor("");
      setIsReplying(false);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className={`${depth > 0 ? "ml-6 border-l-2 border-[var(--border)] pl-4" : ""}`}>
      <div className="mb-3 rounded-xl bg-[var(--card)] p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-[var(--primary-foreground)]">
            {comment.author.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-[var(--foreground)]">
            {comment.author}
          </span>
          <span className="text-sm text-[var(--muted-foreground)]">
            {formatTime(comment.timestamp)}
          </span>
        </div>
        <p className="mb-3 leading-relaxed text-[var(--foreground)]">
          {comment.content}
        </p>
        {depth < 2 && (
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="text-sm font-medium text-[var(--primary)] hover:underline"
          >
            Reply
          </button>
        )}

        {isReplying && (
          <div className="mt-3 space-y-2 rounded-lg bg-[var(--secondary)] p-3">
            <input
              type="text"
              value={replyAuthor}
              onChange={(e) => setReplyAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none"
            />
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              rows={2}
              className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSubmitReply}
                className="rounded-lg bg-[var(--primary)] px-3 py-1.5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:opacity-90"
              >
                Reply
              </button>
              <button
                onClick={() => setIsReplying(false)}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {comment.replies.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentThread() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah",
      content:
        "Love this tip calculator! Makes splitting bills so much easier at restaurants.",
      timestamp: new Date(Date.now() - 3600000),
      replies: [
        {
          id: "2",
          author: "Mike",
          content: "Agreed! The split feature is super handy.",
          timestamp: new Date(Date.now() - 1800000),
          replies: [],
        },
      ],
    },
    {
      id: "3",
      author: "Alex",
      content:
        "Would be great to have a dark mode option. Otherwise, really clean design!",
      timestamp: new Date(Date.now() - 7200000),
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const addComment = () => {
    if (newComment.trim() && newAuthor.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: newAuthor.trim(),
        content: newComment.trim(),
        timestamp: new Date(),
        replies: [],
      };
      setComments([comment, ...comments]);
      setNewComment("");
      setNewAuthor("");
    }
  };

  const addReply = (parentId: string, content: string, author: string) => {
    const reply: Comment = {
      id: Date.now().toString(),
      author,
      content,
      timestamp: new Date(),
      replies: [],
    };

    const addReplyToComment = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return { ...comment, replies: [...comment.replies, reply] };
        }
        return { ...comment, replies: addReplyToComment(comment.replies) };
      });
    };

    setComments(addReplyToComment(comments));
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-4 text-xl font-bold text-[var(--foreground)]">
        Comments
        <span className="ml-2 text-sm font-normal text-[var(--muted-foreground)]">
          ({comments.length})
        </span>
      </h2>

      {/* New Comment Form */}
      <div className="mb-6 rounded-xl bg-[var(--card)] p-4 shadow-sm">
        <input
          type="text"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          placeholder="Your name"
          className="mb-2 w-full rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows={3}
          className="mb-3 w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none"
        />
        <button
          onClick={addComment}
          disabled={!newComment.trim() || !newAuthor.trim()}
          className="rounded-xl bg-[var(--primary)] px-5 py-2.5 font-medium text-[var(--primary-foreground)] transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Post Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} onReply={addReply} />
        ))}
      </div>
    </div>
  );
}
