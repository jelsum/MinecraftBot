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
});

useEvent(server.javaServer);
useUtil(server.rconConnection);
useEssentials(server);

function startServer() {
	console.log('Starting server...');
	server.start();
}

module.exports = {
	startServer,
};