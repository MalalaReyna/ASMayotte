import { DossierChatMessage } from "../../../../types/dossier/dossierTypes";

const bubbleClasses: Record<DossierChatMessage["direction"], string> = {
  incoming: "bg-[#EDE3DA] text-[#3A2B1D]",
  outgoing: "bg-[#6B3B09] text-white",
};

type DossierChatProps = {
  messages: DossierChatMessage[];
};

type ChatBubbleProps = {
  message: DossierChatMessage;
};

function ChatBubble({ message }: ChatBubbleProps) {
  const align = message.direction === "outgoing" ? "items-end" : "items-start";

  return (
    <div className={`flex flex-col ${align} gap-2`}>
      <span className={`max-w-[220px] rounded-2xl px-3 py-2 text-xs ${bubbleClasses[message.direction]}`}>
        {message.content}
      </span>
    </div>
  );
}

export default function DossierChat({ messages }: DossierChatProps) {
  return (
    <div className="flex flex-col h-[82vh] rounded-2xl border border-[#E8DDD3] bg-[#F3ECE6] p-4">
      <p className="text-sm font-semibold text-[#2A1B12]">Echanges</p>

      {/* zone messages qui prend tout l’espace dispo */}
      <div className="mt-3 flex-1 overflow-y-auto space-y-3">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </div>

      {/* input toujours en bas */}
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#E8DDD3] bg-white px-3 py-2">
        <input
          type="text"
          placeholder="Ecrire un message..."
          className="flex-1 text-xs outline-none"
        />
        <button
          type="button"
          className="rounded-lg bg-[#6B3B09] px-3 py-1 text-xs text-white"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
