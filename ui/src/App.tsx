import React from "react";

const App: React.FC = () => {
  const promptRef = React.useRef<HTMLTextAreaElement>(null);
  const [answer, setAnswer] = React.useState<string>("");
  const [thinking, setThinking] = React.useState<boolean>(false);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-100">
      <form
        className="block w-120 space-y-2 rounded-xl bg-white p-6 shadow"
        onSubmit={async (e) => {
          e.preventDefault();
          setThinking(true);
          const prompt = promptRef.current?.value;
          if (!prompt) return;
          const res = await fetch(
            `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/prompt`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt }),
            }
          );
          const data = await res.json();
          setAnswer(data.text);
          setThinking(false);
        }}
      >
        <textarea
          name="prompt"
          ref={promptRef}
          className="w-full min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <button className="inline-flex w-full items-center justify-center gap-4 rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700">
          Submit
        </button>
      </form>
      <div className="block w-120 space-y-2 rounded-xl bg-white p-6 shadow">
        <p>
          <b>Answer:</b>
        </p>
        {thinking ? (
          <p className="text-gray-400">
            <i>Thinking...</i>
          </p>
        ) : (
          <p>{answer}</p>
        )}
      </div>
    </div>
  );
};

export default App;
