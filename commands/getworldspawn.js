const path = require('path');
const config = require(path.join(__dirname, '..', 'config.json'));
const level = config.leveldat_path;
const fs = require('fs');
const NbtReader = require('node-nbt').NbtReader;
const zlib = require('zlib');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getworldspawn')
		.setDescription('Gets the coordinates of spawn'),
	async execute(interaction) {
		fs.readFile(level, (err, data) => {
			if (err) {
				throw err;
			}
			else {
				zlib.gunzip(data, (err, buffer) => {
					if (err) throw err;
					const d = NbtReader.readTag(buffer);
					const worldSpawn = {
						x: d.val[0].val[28].val,
						y: d.val[0].val[22].val,
						z: d.val[0].val[25].val,
					};

					const embed = {
						color: 'WHITE',
						author: {
							name: 'Minecraft World Spawn',
							icon_url: 'https://i.imgur.com/5DnHbTs.png',
						},
						fields: [{
							name: 'X',
							value: worldSpawn.x.toString(),
							inline: true,
						}, {
							name: 'Y',
							value: worldSpawn.y.toString(),
							inline: true,
						}, {
							name: 'Z',
							value: worldSpawn.z.toString(),
							inline: true,
						}],
						timestamp: new Date(),
					};

					interaction.reply({ embeds: [embed] });
				});
			}
		});
	},
};