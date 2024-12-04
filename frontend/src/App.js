import React, { useState } from "react";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message to chat
        setMessages([...messages, { text: input, user: true }]);

        try {
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            setMessages((prev) => [...prev, { text: data.reply, user: false }]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                { text: "Error getting response", user: false },
            ]);
        }

        setInput("");
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Chatbot</h1>
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    height: "400px",
                    overflowY: "scroll",
                    marginBottom: "10px",
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.user ? "right" : "left",
                            margin: "5px 0",
                        }}
                    >
                        <span
                            style={{
                                display: "inline-block",
                                padding: "10px",
                                borderRadius: "5px",
                                background: msg.user ? "#007bff" : "#f1f1f1",
                                color: msg.user ? "#fff" : "#000",
                            }}
                        >
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                style={{
                    width: "calc(100% - 80px)",
                    padding: "10px",
                    marginRight: "10px",
                }}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} style={{ padding: "10px" }}>
                Send
            </button>
        </div>
    );
};

export default App;