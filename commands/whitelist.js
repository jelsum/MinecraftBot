const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('whitelist')
		.setDescription('Add or remove someone from the whitelist')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('add or remove')
				.addChoice('Add', 'add')
				.addChoice('Remove', 'remove')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('player')
				.setDescription('The player to add/remove')
				.setRequired(true)),
	async execute(interaction, server) {
		server.whitelist(interaction);
	},
};