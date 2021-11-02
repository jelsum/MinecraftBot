const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('gamemode')
		.setDescription('Set the gamemode of an online player.')
		.addStringOption(option =>
			option.setName('gamemode')
				.setDescription('The target gamemode')
				.addChoice('Survival', 'survival')
				.addChoice('Creative', 'creative')
				.addChoice('Spectator', 'spectator')
				.addChoice('Adventure', 'adventure')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('username')
				.setDescription('The target player')
				.setRequired(true)),
	async execute(interaction, server) {
		server.gamemode(interaction);
	},
};