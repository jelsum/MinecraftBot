const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restarts the Minecraft Server'),
	async execute(interaction, server) {
		setTimeout(() => {
			interaction.reply({ content: 'Stopping the server, please wait...' });
			server.stopServer();
		}, 100);
		setTimeout(() => {
			interaction.followUp({ content: 'Starting server back up, please wait...' });
			server.startServer();
		}, 10000);
	},
};