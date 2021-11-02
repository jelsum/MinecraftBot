// Import required files/modules
const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');
const fs = require('fs');
let playerCount = 0;

// Create a new Discord Client instance with relevant intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Array to hold commands for registration
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Collection();

// Application ID
const clientId = config.clientId;
// ID of Discord Server
const guildId = config.guildId;

// Import server as object
const server = require('./server.js');

// Read ./commands folder and push file data to commands array
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

// Create new REST instance to push commands to Discord for registration
const rest = new REST({ version: '9' }).setToken(config.token);

// Anonymous function to push commands to Discord to register as Slash Commands
(async () => {
	try {
		console.log('Start refreshing application (/) commands.');

		// Push commands to Discord API to register
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Slash commands registered!');
	}
	catch (err) {
		console.log(err);
	}
})();

/*
Here we handle slash commands from interactions. We need to check if the interaction requires the server object be passed in.
Additionally we need to check if the interaction is a command, and also a valid one at that.
*/
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	if (command.requireAdmin && !(interaction.member.roles.cache.has(config.admin_role_id))) {
		return interaction.reply({ content: 'Command requires server admin permissions. ' });
	}

	if (command.requireServer) {
		try {
			await command.execute(interaction, server);
		}
		catch (err) {
			console.error(err);
			await interaction.reply({ content: 'There was an error while executing this command. ', ephemeral: true });
		}
	}
	else {
		try {
			await command.execute(interaction);
		}
		catch (err) {
			console.error(err);
			await interaction.reply({ content: 'There was an error while executing this command. ', ephemeral: true });
		}
	}
});

// When the client is logged in and ready, start the server
client.once('ready', () => {
	console.log('ready');
	client.user.setStatus('dnd');
	updateActivity();
});

// Server events. When something happens on the server, we want something to happen in discord as well. THIS CAN BE USED TO PING ENDPOINTS IN THE FUTURE.

server.server.javaServer.on('login', () => {
	playerCount++;
	updateActivity();
});

server.server.javaServer.on('logout', () => {
	playerCount--;
	updateActivity();
});

server.server.javaServer.on('start', () => {
	client.user.setStatus('online');
});

server.server.javaServer.on('stop', () => {
	client.user.setStatus('dnd');
});

client.login(config.token);

function updateActivity() {
	client.user.setActivity(`${playerCount} players online.`);
}