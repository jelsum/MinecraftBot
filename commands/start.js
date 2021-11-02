const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Starts the Minecraft Server'),
	async execute(interaction, server) {
		try {
			server.startServer();
			interaction.reply({ content: 'Starting server.' });
		}
		catch (err) {
			interaction.reply({ content: 'Server already running.' });
		}
	},
};