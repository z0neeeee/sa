const { Command } = require('@sapphire/framework');
const { send } = require('@sapphire/plugin-editable-commands');
const fetch = require('node-fetch');

class UserCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'kayıt',
			description: 'Kayıt yapar',
		});
	}

	async chatInputRun(interaction) {
		if (!interaction.guild.members.cache.get(interaction.user.id).roles.cache.has('1096069545740996628')) return;

		const key = interaction.options.getString('key');
		const value = interaction.options.getString('value');


		const sa = await fetch(`http://20.199.10.53/admin/func/kullaniciekle.php`, {
			body: {
				"username": `${key}`,
				"sebep": `${value}`
			}
		});

		await interaction.reply({ content: `${sa.text}`, ephemeral: true });


	}

	registerApplicationCommands(registry) {

		registry.registerChatInputCommand((builder) =>
			builder //
				.setName(this.name)
				.setDescription(this.description)
				
				.addStringOption((option) =>
					option.setName('key').setDescription('The key to set').setRequired(true)
				)
				.addStringOption((option) =>
					option.setName('value').setDescription('The value to set').setRequired(true)
				)
		);
	}
}

module.exports = {
	UserCommand
};
