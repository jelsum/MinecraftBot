const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Set the weather in game')
		.addStringOption(option =>
			option.setName('weather')
				.setDescription('The desired weather type')
				.addChoice('Clear', 'clear')
				.addChoice('Rainy', 'rain')
				.addChoice('Thunder', 'thunder')
				.setRequired(true)),
	async execute(interaction, server) {
		server.weather(interaction);
	},
};