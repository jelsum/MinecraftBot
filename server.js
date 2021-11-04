const { ScriptServer } = require('@scriptserver/core');
const { useEssentials } = require('@scriptserver/essentials');
const { useUtil } = require('@scriptserver/util');
const { useEvent } = require('@scriptserver/event');
const config = require('./config.json');

const server = new ScriptServer({
	javaServer: {
		path: './game_server',
		jar: config.jar,
		args: [config.args],
	},
	rconConnection: {
		port: config.rcon_port,
		password: config.rcon_password,
	},
	essentials: config.essentials,
	command: config.command,
});

useEvent(server.javaServer);
useUtil(server.rconConnection);
useEssentials(server);

function startServer() {
	try {
		server.start();
		console.log('Starting server...');
	}
	catch (err) {
		console.log('Error starting server: ' + err);
		throw (err);
	}
}

function stopServer() {
	console.log('Stopping Server');
	server.rconConnection.send('stop');
}

function list(interaction) {
	server.rconConnection.send('list')
		.then(result => {
			interaction.reply({ content: result });
		})
		.catch(err => {
			interaction.reply({ content: err });
		});
}

function gamemode(interaction) {
	const mode = interaction.options.getString('gamemode');
	const player = interaction.options.getString('username');
	server.rconConnection.send(`gamemode ${mode} ${player}`)
		.then(result => {
			interaction.reply({ content: result });
		})
		.catch(error => {
			interaction.reply({ content: error });
		});
}

function banPlayer(interaction) {
	const player = interaction.options.getString('username');
	server.rconConnection.send(`ban ${player}`)
		.then(result => {
			interaction.reply({ content: result });
		})
		.catch(error => {
			interaction.reply({ content: error });
		});
}

function unbanPlayer(interaction) {
	const player = interaction.options.getString('username');
	server.rconConnection.send(`pardon ${player}`)
		.then(result => {
			interaction.reply({ content: result });
		})
		.catch(error => {
			interaction.reply({ content: error });
		});
}

function teleportToPlayer(interaction) {
	const target = interaction.options.getString('target');
	const destination = interaction.options.getString('destination');
	server.rconConnection.send(`teleport ${target} ${destination}`)
		.then(result => {
			interaction.reply({ content: result });
		})
		.catch(error => {
			interaction.reply({ content: error });
		});
}

module.exports = {
	server,
	startServer,
	stopServer,
	list,
	gamemode,
	banPlayer,
	unbanPlayer,
	teleportToPlayer,
};