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
	essentials: {
		warp: {
			opOnly: true,
		},
		starterKit: {
			enabled: config.essentials.starterKit.enabled,
			items: config.essentials.starterKit.items,
		},
		home: {
			enabled: config.essentials.home.enabled,
			amount: config.essentials.home.amount,
		},
	},
});

useEvent(server.javaServer);
useUtil(server.rconConnection);
useEssentials(server);

function startServer(interaction) {
	try {
		server.start();
		console.log('Starting server...');
		interaction.reply({ content: 'Starting server.' });
	}
	catch (err) {
		console.log('Error starting server: ' + err);
		interaction.reply({ content: 'Server already running.' });
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

module.exports = {
	startServer,
	stopServer,
	list,
	gamemode,
	banPlayer,
	server,
};