import { SummarizerClient } from "@/components/summarizer-client";

export default function SummarizePage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">AI Agreement Summarizer</h1>
      </div>
      <div className="flex-1 rounded-lg" >
        <SummarizerClient />
      </div>
    </>
  );
}
