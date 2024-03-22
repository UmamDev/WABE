# Wa Bot Evolve

### Install
install with npm
```bash
npm install @umamdev/wabe
```

import to your code
```javascript
const {wabe} = require("@umamdev/wabe")
```



### create connection

```javascript

const {wabe} = require("@umamdev/wabe")
const data = {
  "phoneNumber": "whatsapp number with country code",
  "sessionName": "session",
  "logger": "silent"
}
const bot = new wabe(data)
bot.start().then((sock) => {
  sock.ev.on("messages.upsert", m => {
    console.log(m)
  })
})

```
### configuring connection

```javascript
const data = {
  "phoneNumber": "62xxxx", //whatsapp number with country code"
  "sessionName": "session", //folder name to save session
  "logger": "silent" //pino level
}
```

### sending message

```javascript
// send a simple text!
sock.sendMessage(id, { text: 'hi' })


// send a reply messagge
sock.sendMessage(id, { text: 'hi' }, { quoted: message })
```



