# Wa Bot Evolve

### Install

install with npm

```bash
npm install @umamdev/wabe
```

import to your code

```javascript
const { wabe } = require("@umamdev/wabe");
```

### create connection

```javascript
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
				console.log(m);
			} catch (err) {
				console.log("Error processing message:", err);
			}
		});
	})
	.catch(err => {
		console.log("Error starting bot:", err);
	});
```

### configuring connection

```javascript
const data = {
	phoneNumber: "62xxxx", //whatsapp number with country code"
	sessionId: "session", //folder name to save session
	useStore: true, // to save sync chats from WhatsApp
};
```

### To process message

```javascript
const { clearMessages } require("@umamdev/wabe")

sock.ev.on("messages.upsert", async chatUpdate => {
     try {
		let m = chatUpdate.messages[0];
			if (!m.message) return;
				const result = await clearMessages(m);
				console.log("Processed message:", result);
			} catch (err) {
		console.log("Error processing message:", err);
	}
});
```

### Simple Command

````javascript
let cmd;

if (result.chatsFrom === "private") {
     cmd = result.message;
} else if (result.chatsFrom === "group") {
     cmd = result.participant.message;
}

if (cmd === "!ping") {
     sock.sendMessage(result.remoteJid, { text: "pong" });
}
```

### sending message

```javascript
// send a simple text!
sock.sendMessage(id, { text: "hi there" });

// send with quoted message
sock.sendMessage(id, { text: "hi there" }, { quoted: message });

// send image 
sock.sendMessage(id, { image: "imageurl", caption:"this image" });

````
