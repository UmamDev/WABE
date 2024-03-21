# Wa Bot Evolve

### create connection

```javascript

const {wabe} = require("@umamdev/wabe")
const data = {
  "phoneNumber": "6285855185068",
  "sessionName": "session",
  "logger": "silent"
}
const bot = new wabe(data)
bot.start().then((sock) => {
  //bot logic 
})sock

```

### upsert message

```javascript

sock.ev.on("messages.upsert", m => {
    console.log(m)
})

```
