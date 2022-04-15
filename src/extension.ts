import * as Code from 'vscode';
import { getCompletions, getHover } from './information';

export function activate(context: Code.ExtensionContext) {
	const hoverProvider = Code.languages.registerHoverProvider('logos', {
		provideHover(document: Code.TextDocument, position: Code.Position) {
			const range = document.getWordRangeAtPosition(position);
			const word = document.getText(range);
			return getHover(word);
		},
	});

	const completionProvider = Code.languages.registerCompletionItemProvider(
		'logos',
		{
			provideCompletionItems(
				document: Code.TextDocument,
				position: Code.Position
			) {
				const lineCharacter = document
					.lineAt(position)
					.text.substring(0, position.character);

				if (lineCharacter.startsWith('%')) {
					return getCompletions();
				} else {
					return undefined;
				}
			},
		},
		'%'
	);

	context.subscriptions.push(completionProvider, hoverProvider);
}

export function deactivate() {}
