const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Starts the Minecraft Server'),
	async execute(interaction, server) {
		server.startServer(interaction);
	},
};