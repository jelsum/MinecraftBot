const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Gets a list of online players'),
	async execute(interaction, server) {
		server.list(interaction);
	},
};