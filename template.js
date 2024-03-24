const { wabe } = require("./index.js");
const data = {
	phoneNumber: "6287845032372",
	sessionName: "session",
};
const bot = new wabe(data);
bot.start().then(sock => {
	sock.ev.on("messages.upsert", m => {
		console.log(m.messages[0]);
	});
});
