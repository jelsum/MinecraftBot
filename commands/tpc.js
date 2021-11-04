const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('tpc')
		.setDescription('Teleport a player to another player.')
		.addStringOption(option =>
			option.setName('target')
				.setDescription('The player to teleport')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('x')
				.setDescription('The x co-ordinate')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('y')
				.setDescription('The y co-ordinate')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('z')
				.setDescription('The z co-ordinate')
				.setRequired(true)),
	async execute(interaction, server) {
		server.teleportToCoordinate(interaction);
	},
};