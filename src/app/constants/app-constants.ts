const DESC = 'enter description here';

export const OPTION = Object.freeze({
  BOLD: "bold",
  ITALIC: "italic",
  SIZE: "type",
  STRIKE: "minus",
  LIST: "list",
  CHECK_BOX: "check-square",
  BLOCK_QUOTE: "chevron-right",
  CODE: "code",
  TABLE: "columns",
  LINK: "link",
  IMAGE: "image"
})
const END_QUOTES = "```"

export const TOOLBAR = Object.freeze({
  [OPTION.BOLD]: {
    text: "Bold ⌘+Shift+B",
    startTag: "**",
    endTag: "**"
  },
  [OPTION.ITALIC]: {
    text: "Italic ⌘+Shift+I",
    startTag: "*",
    endTag: "*"
  },
  [OPTION.SIZE]: {
    text: "Heading ⌘+Shift+H",
    startTag: "#"
  },
  [OPTION.STRIKE]: {
    text: "Strike ⌘+Shift+S",
    startTag: "~~",
    endTag: "~~"
  },
  [OPTION.LIST]: {
    text: "Bullet List ⌘+Shift+L",
    startTag: "- "
  },
  [OPTION.CHECK_BOX]: {
    text: "List ⌘+Shift+C",
    startTag: "- [ ] "
  },
  [OPTION.BLOCK_QUOTE]: {
    text: "Blockquote ⌘+Shift+Q",
    startTag: "> "
  },
  [OPTION.CODE]: {
    text: "Code ⌘+Shift+D",
    startTag: '```javascript ',
    endTag: END_QUOTES
  },
  [OPTION.TABLE]: {
    text: "Table ⌘+Shift+T",
    startTag:
      `| Name | Heading |
|--|--|
| Foo  | Bar |`
  },
  [OPTION.LINK]: {
    text: "Link ⌘+Shift+K",
    startTag: `[${DESC}](`,
    endTag: ")"
  },
  [OPTION.IMAGE]: {
    text: "Image ⌘+Shift+G",
    startTag: `![${DESC}](`,
    endTag: ")"
  }
});

export const CONTRIBUTORS = `
## Contributors ✨

Thanks goes to these wonderful people

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
	<tr>
		<td align="center">
			<a href="https://www.devzstudio.com">
				<img src="https://avatars2.githubusercontent.com/u/5446313?s=460&v=4" width="100px;" alt="Jithin Pariyarath" />
				<br />
				<sub>
					<b>Jithin Pariyarath</b>
				</sub>
			</a>
			<br />
			<a href="https://github.com/JP1016" title="Answering Questions">💬</a>
			<a href="https://github.com/JP1016" title="Documentation">📖</a>
			<a href="https://github.com/JP1016" title="Reviewed Pull Requests">👀</a>
			<a href="https://github.com/JP1016" title="Talks">📢</a>
		</td>
		<td align="center">
			<a href="https://github.com/jfmengels">
				<img src="https://avatars2.githubusercontent.com/u/15993065?s=460&v=4" width="100px;" alt="Jijin Pariyarath" />
				<br />
				<sub>
					<b>Jijin Pariyarath</b>
				</sub>
			</a>
			<br />
			<a href="https://github.com/pjijin" title="Documentation">📖</a>
			<a href="https://github.com/pjijin" title="Reviewed Pull Requests">👀</a>
			<a href="https://github.com/pjijin" title="Tools">🔧</a>
		</td>
		<tr>
		</table>`

export const CONTRIBUTION_GUIDE = `
Contributing
If you've ever wanted to contribute to open source, and a great cause, now is your chance!
See the contributing docs for more information
`

export const LICENCE = `# License

    Copyright 2018

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.`

export const SAMPLE =
  `
# CodeKeep

🗂 Organize your Code Snippets by assigning labels or grouping into folders. Generate Code Screenshots, Share and Discover reusable snippets.



[![CodeKeep](https://i.imgur.com/zG3wLNt.png 'Codekeep')]()

✅ Checkout: <a href="https://codekeep.io/" target="_BLANK">https://codekeep.io</a>

  <p align="center">
   Made with ❤️ by <a href="https://twitter.com/JP1016v1"><img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/jp1016v1?style=social"> </a>
  </p>


## Why Codekeep ?
👉Reduce Context Switching 
Switching between projects to find reusable snippets, Store snippets here for later use.

👉Keep your notes here
Use CodeKeep while learning to create snippets containing the summary.

👉Search for snippets
Quickly find reusable and modular snippets.

👉Reuse snippets
Import snippets using CodeKeep extension, for later reference.

## ✨ Features

⚡️Create Snippets Quickly

Press 'Paste' anywhere on the website to launch the 'Add Snippet' Dialog.

![copy](https://i.imgur.com/uy2RIOt.png)


⚡️Organize into Folders

Share your folder & bookmark folders of other users, if you found it useful

![copy](https://i.imgur.com/nI33OqR.png)


⚡️Assign Labels

Organize Code Snippets by creating labels, filter snippets by label

![copy](https://i.imgur.com/GaQ0g9b.png)


⚡️Feature rich Screenshot editor

Choose templates, Add Images, Background and Social accounts in one click.

![copy](https://i.imgur.com/Q0cH4Y3.png)


⚡️Import/Export Extensions

Import/Export Snippets using our VSCode and Google Chrome Extensions.

![copy](https://i.imgur.com/MQ4aHfB.png)


⚡️Discover Code Snippets

Discover reusable code snippets shared on codekeep, and yes , we have dark mode.

![copy](https://i.imgur.com/wzYsSpE.png)

✅ Checkout: <a href="https://codekeep.io/" target="_BLANK">https://codekeep.io</a>


## Show your support

Give a ⭐️ if this project helped you! 🥰

If you like this app , Star it on Github, Follow me on Twitter

  <p align="center">
   Made with ❤️ by <a href="https://twitter.com/JP1016v1"><img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/jp1016v1?style=social"> </a>
  </p>


`
