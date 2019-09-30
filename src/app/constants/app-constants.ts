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
Thanks goes to these wonderful people :
<table>
    <tr>
        <td align="center">
            <a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt="Kent C. Dodds" />
                <br /><sub><b>Kent C. Dodds</b></sub></a>
            <br /><a href="#question-kentcdodds" title="Answering Questions">💬</a> <a href="https://github.com/all-contributors/all-contributors/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#review-kentcdodds" title="Reviewed Pull Requests">👀</a> <a href="#talk-kentcdodds" title="Talks">📢</a></td>
        <td align="center">
            <a href="https://github.com/jfmengels"><img src="https://avatars.githubusercontent.com/u/3869412?v=3" width="100px;" alt="Jeroen Engels" />
                <br /><sub><b>Jeroen Engels</b></sub></a>
            <br /><a href="https://github.com/all-contributors/all-contributors/commits?author=jfmengels" title="Documentation">📖</a> <a href="#review-jfmengels" title="Reviewed Pull Requests">👀</a> <a href="#tool-jfmengels" title="Tools">🔧</a></td>
    </tr>
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

# Paper

🚀A "no-cloud" note taking app with "no-internet" sharing.

[![Paper](https://github.com/JP1016/Paper/blob/master/preview.png?raw=true 'Paper')]()

✅ Live Preview: <a href="https://paperapp.now.sh/" target="_BLANK">https://paperapp.now.sh</a>

  <p align="center">
   Made with ❤️ by <a href="https://twitter.com/JP1016v1"><img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/jp1016v1?style=social"> </a>
  </p>


## Features

🔥PWA Based

📖 OpenSource

⛓️ Easy Share

🔌 No Internet

🖥️ LocalStorage

📠 Share through QR

🌗 Dark/Light Theme

## 🤝 Contributing

Contributions, issues and feature requests are welcome! 😍

## Show your support

Give a ⭐️ if this project helped you! 🥰

If you like this app , Star it on Github, Follow me on Twitter
`
