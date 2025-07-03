// 💬 Simulated initial fun messages
const funMessages = [
  "👋 Hey there! Welcome to the chat!",
  "🔥 What's something exciting you're learning right now?",
  "🚀 This app is running entirely serverless using AWS Lambda + WebSockets!",
  "🧠 Did you know: Real-time apps boost engagement 5x more!",
  "💡 Missie built this using React, Node.js, and DynamoDB!",
];

funMessages.forEach((msg, i) => {
  setTimeout(() => {
    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble");
    bubble.textContent = msg;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }, i * 1000);
});

// 🌐 WebSocket Setup
const socket = new WebSocket(
  "wss://a5l9pjb7ne.execute-api.us-east-2.amazonaws.com/production/"
);

// 📦 DOM Elements
const messagesEl = document.getElementById("messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");

// ✅ On WebSocket Connected
socket.addEventListener("open", () => {
  console.log("Connected to WebSocket ✅");
});

// 📥 On Message Received
socket.addEventListener("message", (event) => {
  const bubble = document.createElement("div");
  bubble.classList.add("message-bubble");
  bubble.textContent = event.data;
  messagesEl.appendChild(bubble);
  messagesEl.scrollTop = messagesEl.scrollHeight;
});

// 📤 On Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;
  socket.send(JSON.stringify({ action: "sendMessage", message }));
  input.value = "";
});
