import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class ListPlugin extends Plugin {

	// 插件加载时调用此方法。
	async onload() {
		// 添加一个命令到编辑器，用于列出已安装的插件。
		this.addCommand({
			id: 'list-plugin',
			name: 'List Plugin',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.listPlugins(editor);
			}
		});
		// 添加一个命令到编辑器，用于以表格形式列出已安装的插件。
		this.addCommand({
			id: 'list-table-plugin',
			name: 'List Table Plugin',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.listTablePlugins(editor);
			}
		});
	}

	/**
	 * 获取所有已安装的插件，并在编辑器中列出它们的名称。
	 * @param editor Obsidian 编辑器实例。
	 */
	async listPlugins(editor: Editor) {
		const plugins = this.app.plugins.plugins;

		const text: string[] = [];
		for (const key in plugins) {
			const plugin = plugins[key].manifest;
			text.push(`- ${plugin.name}`);
		}
		editor.replaceSelection(text.join('\n') + "\n");
	}

	/**
	 * 获取所有已安装的插件，并准备在编辑器中以表格形式列出它们。
	 * @param editor Obsidian 编辑器实例。
	 */
	async listTablePlugins(editor: Editor) {
		const plugins = this.app.plugins.plugins;
		console.log(plugins)

		const text: string[] = [""];
		text.push("|Plugin|Author|Version|Description|");
		text.push("|------|------|------|------|");
		for (const key in plugins) {
			const plugin = plugins[key].manifest;
			console.log(plugin)
			const name = `[${plugin.name}](https://obsidian.md/plugins?id=${plugin.id})`
			let author = "";
			if (plugin.author && plugin.authorUrl) {
				// 去除作者邮箱
				author = `[${plugin?.author.replace(/<.*?@.*?\..*?>/g, "")}](${plugin?.authorUrl})`
			}
			text.push(`|${name}|${author}|${plugin?.version}|${plugin?.description}|`);
		}
		editor.replaceSelection(text.join('\n') + "\n");
	}

	onunload() {
	}
}
