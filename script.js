const socket = io("https://ТВОЙ_RAILWAY_СЕРВЕР");

let currentChannel = "general";

const channels = document.querySelectorAll("#channels li");
const messagesBox = document.getElementById("messages");
const input = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");

channels.forEach(ch => {
    ch.addEventListener("click", () => {
        document.querySelector("#channels li.active").classList.remove("active");
        ch.classList.add("active");

        currentChannel = ch.dataset.channel;
        document.getElementById("channel-title").textContent = "#" + currentChannel;

        messagesBox.innerHTML = "";
    });
});

sendBtn.onclick = sendMessage;
input.onkeydown = e => e.key === "Enter" && sendMessage();

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    socket.emit("message", {
        channel: currentChannel,
        text,
        user: "Kiks",
        time: new Date().toLocaleTimeString()
    });

    input.value = "";
}

socket.on("message", msg => {
    if (msg.channel !== currentChannel) return;

    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<b>${msg.user}</b> [${msg.time}]: ${msg.text}`;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
});
