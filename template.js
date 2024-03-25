const { wabe, clearMessages } = require("./index.js");

const data = {
	phoneNumber: "6287845032372",
	sessionId: "session",
	useStore: true,
};
const bot = new wabe(data);

bot
	.start()
	.then(sock => {
		sock.ev.on("messages.upsert", async chatUpdate => {
			try {
				let m = chatUpdate.messages[0];
				if (!m.message) return;
				
				const result = await clearMessages(m);
				console.log("Processed message:", result);

				if (!result) return;

				let cmd;
				if (result.chatsFrom === "private") {
					cmd = result.message;
				} else if (result.chatsFrom === "group") {
					cmd = result.participant.message;
				}

				if (cmd === "!ping") {
					sock.sendMessage(result.remoteJid, { text: "pong" });
				}
			} catch (err) {
				console.log("Error processing message:", err);
			}
		});
	})
	.catch(err => {
		console.log("Error starting bot:", err);
	});
