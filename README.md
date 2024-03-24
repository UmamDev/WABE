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
const { wabe } = require("@umamdev/wabe");

const data = {
	phoneNumber: "whatsapp number with country code",
	sessionName: "sessionid",
};

const bot = new wabe(data);

bot.start().then(sock => {
	sock.ev.on("messages.upsert", m => {
		console.log(m.messages[0]);
	});
});
```

### configuring connection

```javascript
const data = {
	phoneNumber: "62xxxx", //whatsapp number with country code"
	sessionName: "session", //folder name to save session
};
```

### To process message

```javascript
const { clearMessages } require("@umamdev/wabe")

sock.ev.on("messages.upsert", m => {
	const msg = clearMessages(m)
     console.log(msg)
});
```

### sending message

```javascript
// send a simple text!
sock.sendMessage(id, { text: "hi there" });

// send with quoted message
sock.sendMessage(id, { text: "hi there" }, { quoted: message });
```
