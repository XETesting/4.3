import { TipCalculator } from "@/components/tip-calculator";
import { CommentThread } from "@/components/comment-thread";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-bold text-[var(--foreground)]">
            Tip Calculator
          </h1>
          <p className="text-[var(--muted-foreground)]">
            Calculate tips quickly and share your feedback below
          </p>
        </header>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
          <TipCalculator />
          <CommentThread />
        </div>
      </div>
    </main>
  );
}
