"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const response = await fetch("/api/emoji", {
      method: "POST",
      body: JSON.stringify({ input }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setOutput(data["emojiLanguage"]);
    setLoading(false);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="mb-4 text-4xl font-bold">
        {" "}
        Express Yourself in a Fun Way
      </h1>

      <textarea
        className="p-2 mb-2 text-lg border rounded-lg focus:outline-none w-1/2 h-48"
        placeholder="Type here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />

      <button
        className="p-4 px-8 mb-2 text-lg text-white bg-blue-700 rounded-lg focus:outline-none"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Generate"}
      </button>

      <textarea
        className="p-2 text-lg border rounded-lg focus:outline-none w-1/2 h-48"
        readOnly
        value={output}
      />
    </div>
  );
}
