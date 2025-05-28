import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class ListPlugin extends Plugin {

	async onload() {
		this.addCommand({
			id: 'list-plugin',
			name: 'List Plugin',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.listPlugins(editor);
			}
		});
	}

	async listPlugins(editor: Editor) {
		const plugins = this.app.plugins.plugins;

		let text: string[] = [];
		for (let key in plugins) {
			const plugin = plugins[key].manifest;
			console.log(plugin)
			text.push(`- ${plugin.name}`);
		}
		editor.replaceSelection(text.join('\n') + "\n");
	}

	onunload() {
	}
}
