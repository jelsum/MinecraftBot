const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the Minecraft Server'),
	async execute(interaction, server) {
		server.stopServer();
		interaction.reply({ content: 'Stopping server.' });
	},
};