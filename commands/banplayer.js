const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('banplayer')
		.setDescription('Ban a player from the server.')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('The target player')
				.setRequired(true)),
	async execute(interaction, server) {
		server.banPlayer(interaction);
	},
};