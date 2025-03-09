import { UploadDocumentsForm } from "@/components/UploadDocumentsForm";
import { Button } from "@/components/ui/button";
import { LuckyButton } from "@/components/LuckyButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-73px)] gap-8 px-4 bg-background">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-6xl font-bold tracking-tight">
          Introducing 📝chat.
        </h1>
        <h3 className="text-2xl font-bold tracking-tight">
          Time to start chatting with medical documents.
        </h3>
        
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <UploadDocumentsForm />
          </div>
          <LuckyButton />
        </div>
      </div>
    </div>
  );
}
