const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('sendraw')
		.setDescription('Send a raw command to the server')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command')
				.setRequired(true)),
	async execute(interaction, server) {
		server.sendRaw(interaction);
	},
};