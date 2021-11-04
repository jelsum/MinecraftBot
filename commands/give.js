const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	requireAdmin: true,
	data: new SlashCommandBuilder()
		.setName('Give')
		.setDescription('Give a player an item')
		.addStringOption(option =>
			option.setName('player')
				.setDescription('The player to give an item to')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('item')
				.setDescription('The item to give the player (minecraft:iron_ingot for example')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('count')
				.setDescription('The amount of items to give (defaults to 1)')),
	async execute(interaction, server) {
		server.give(interaction);
	},
};