class wabe {
	constructor(data) {
		this.phoneNumber = data.phoneNumber;
		this.sessionId = data.sessionId;
	}

	async start() {
		const {
			default: makeWASocket,
			delay,
			fetchLatestBaileysVersion,
			getAggregateVotesInPollMessage,
			makeCacheableSignalKeyStore,
			makeInMemoryStore,
			PHONENUMBER_MCC,
			proto,
			useMultiFileAuthState,
			WAMessageKey,
			DisconnectReason,
			Browsers,
		} = require("@whiskeysockets/baileys");
		const pino = require("pino");
		const NodeCache = require("node-cache");
		const msgRetryCounterCache = new NodeCache();
		const P = require("pino")({
			level: "silent",
		});
		let { state, saveCreds } = await useMultiFileAuthState(this.sessionId);
		let { version, isLatest } = await fetchLatestBaileysVersion();
		const sock = await makeWASocket({
			version,
			logger: P,
			printQRInTerminal: true,
			browser: Browsers.ubuntu("Chrome"),
			auth: {
				creds: state.creds,
				keys: makeCacheableSignalKeyStore(state.keys, P),
			},
			msgRetryCounterCache,
		});

		sock.ev.on("creds.update", saveCreds);

		if (!sock.authState.creds.registered) {
			console.log("request pairing code");
			const number = this.phoneNumber;
			const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
			await delay(6000);
			const code = await sock.requestPairingCode(number);
			console.log("Pairing Code: ", code);
		}

		sock.ev.on("connection.update", async update => {
			const { connection, lastDisconnect } = update;
			if (connection === "connecting") {
				console.log("starting sockets connections");
			} else if (connection === "open") {
				console.log("sockets connected");
			} else if (connection === "close") {
				if (lastDisconnect.error.output.statusCode == DisconnectReason.loggedOut) {
					process.exit(0);
				}
				this.start().catch(() => this.start());
			}
		});

		return sock;
	}
}

function clearMessages(m) {
	if (m.messages[0].message?.conversation) {
		const text = m.messages[0].message?.conversation.trim();
		const data = {
			remoteJid: m.messages[0].key.remoteJid,
			fromMe: m.messages[0].key.fromMe,
			pushName: m.messages[0].pushName,
			message: text,
		};
		console.log(typeof text);
		if (typeof text !== "undefined") {
			return data;
		} else {
			return m;
		}
	} else if (m.messages[0].message?.extendedTextMessage) {
		const text = m.messages[0].message?.extendedTextMessage.text.trim();
		console.log(typeof text);
		const data = {
			remoteJid: m.messages[0].key.remoteJid,
			fromMe: m.messages[0].key.fromMe,
			pushName: m.messages[0].pushName,
			message: text,
		};
		if (typeof text !== "undefined") {
			return data;
		} else {
			return m;
		}
	}
}

module.exports = {
	wabe,
	clearMessages,
};
