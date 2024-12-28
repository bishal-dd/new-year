import React, { useState } from "react";
import { Sparkles, Check } from "lucide-react";

export function CreateLink() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [finalUrl, setFinalUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUrlCopied, setIsUrlCopied] = useState(false);

  const apiKey = import.meta.env.VITE_TINY_URL_API;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ name, message });
    const url = `${window.location.origin}/?${params.toString()}`;

    try {
      setIsLoading(true); // Start loading
      // Prepare the request body for the TinyURL API
      const requestBody = {
        url: url,
        domain: "tinyurl.com",
      };

      // Make the POST request to the TinyURL API
      const response = await fetch("https://api.tinyurl.com/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // Replace with your API key
        },
        body: JSON.stringify(requestBody),
      });

      // Parse the response from the API
      if (response.ok) {
        const data = await response.json();
        const shortenedUrl = data.data.tiny_url; // Assuming the API returns the shortened URL here
        setFinalUrl(shortenedUrl);

        // Navigate to the new URL or any other relevant page
      } else {
        throw new Error("Failed to shorten URL:");
      }
    } catch (error) {
      throw new Error(String(error));
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400 mr-2" />
          <h1 className="text-2xl font-bold text-white">
            Create New Year's Wish
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white"
              placeholder="Enter name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white h-32"
              placeholder="Write your New Year's message..."
              required
            />
          </div>
          {finalUrl && (
            <div className="mb-4 p-4 bg-white/10 border border-gray-600 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">{finalUrl}</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(finalUrl);
                    setIsUrlCopied(true);
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg text-sm"
                >
                  {isUrlCopied ? <Check color="green" /> : "Copy"}
                </button>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition duration-300 relative"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? (
              <>
                <span className="loader"></span>{" "}
              </>
            ) : (
              "Generate Celebration Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
