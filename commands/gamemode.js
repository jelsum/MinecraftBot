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
		const gamemode = interaction.options.getString('gamemode');
		const username = interaction.options.getString('username');
		server.gamemode(interaction, gamemode, username);
	},
};