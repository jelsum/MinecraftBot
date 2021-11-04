const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('Set the time in game')
		.addStringOption(option =>
			option.setName('time')
				.setDescription('The desired time')
				.addChoice('Day', 'day')
				.addChoice('Midnight', 'midnight')
				.addChoice('Noon', 'noon')
				.addChoice('Night', 'night')
				.setRequired(true)),
	async execute(interaction, server) {
		server.time(interaction);
	},
};