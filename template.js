const {wabe} = require("./index.js")
const data = {
  "phoneNumber": "6285855185068",
  "sessionName": "session",
  "logger": "silent"
}
const bot = new wabe(data)
bot.start().then((sock) => {
  sock.ev.on("messages.upsert", m => {
    console.log(m)
  })
})