const { Client, AuditLogEvent } = require('discord.js')
const client = global.client =new Client({ intents: 3276799 });
const { BOT } = require('./src/Settings/Config')
require("./src/handlers/commandLoader.js")
require("./src/handlers/eventHandler.js")(client)
require("./src/handlers/commandHandler.js")(client)

client.login(BOT.token)

