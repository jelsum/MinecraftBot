const path = require('path');
const config = require(path.join(__dirname, '..', 'config.json'));
const playerdata = config.playerdata_path;
const fs = require('fs');
const NbtReader = require('node-nbt').NbtReader;
const zlib = require('zlib');
const addDash = require('add-dashes-to-uuid');
const fetch = require('node-fetch');
const MOJANG_API_URL = 'https://api.mojang.com/users/profiles/minecraft/';

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	requireServer: true,
	data: new SlashCommandBuilder()
		.setName('getplayerlocation')
		.setDescription('Get the location of a player')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('The target player')
				.setRequired(true)),
	async execute(interaction, server) {
		const username = interaction.options.getString('username');
		let uuid;

		await fetch(MOJANG_API_URL + username).then(response => response.text()).then(body => {
			body = JSON.parse(body);
			if (!body.id) {
				return interaction.reply({ content: 'This is not a registed Minecraft account.' });
			}
			uuid = body.id;
			if (!uuid.includes('-')) {
				uuid = addDash(uuid);
			}
		});

		if (await server.server.rconConnection.util.isOnline(username)) {
			server.server.rconConnection.util.getLocation(username).then((location) => {
				return interaction.reply({ embeds: [buildEmbed(location, username, uuid)] });
			});
		}
		else {
			const playerdatafile = playerdata + uuid + '.dat';
			fs.readFile(playerdatafile, (err, data) => {
				if (err) {
					return interaction.reply({ content: 'That player hasn\'t logged in before.' });
				}
				else {
					zlib.gunzip(data, (err, buffer) => {
						if (err) throw err;
						const d = NbtReader.readTag(buffer);
						const playerCoords = {
							x: d.val[26].val.list[0].val,
							y: d.val[26].val.list[1].val,
							z: d.val[26].val.list[2].val,
						};
						return interaction.reply({ embeds: [buildEmbed(playerCoords, username, uuid)] });
					});
				}
			});
		}
	},
};

function buildEmbed(coords, username, uuid) {
	const embed = {
		color: 'BLUE',
		author: {
			name: 'Coordinates of ' + username,
			icon_url: 'https://crafatar.com/renders/head/' + uuid,
		},
		fields: [{
			name: 'X',
			value: coords.x.toString(),
			inline: true,
		}, {
			name: 'Y',
			value: coords.y.toString(),
			inline: true,
		}, {
			name: 'Z',
			value: coords.z.toString(),
			inline: true,
		}],
		timestamp: new Date(),
	};
	return embed;
}