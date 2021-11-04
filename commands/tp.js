const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('tp')
		.setDescription('Teleport a player to another player.')
		.addStringOption(option =>
			option.setName('target')
				.setDescription('The player to teleport')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('destination')
				.setDescription('The destination player')
				.setRequired(true)),
	async execute(interaction, server) {
		server.teleportToPlayer(interaction);
	},
};