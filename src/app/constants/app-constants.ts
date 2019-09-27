const LINK_DESC = 'enter link description here';
const IMG_DESC = 'enter image description here';

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
    text: "Blockquote ⌘+Shift+B",
    startTag: "> "
  },
  [OPTION.CODE]: {
    text: "Code ⌘+Shift+D",
    startTag: "```javascript ",
    endTag: "```"
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
    startTag: `[${LINK_DESC}](`,
    endTag: ")"
  },
  [OPTION.IMAGE]: {
    text: "Image ⌘+Shift+G",
    startTag: `![${IMG_DESC}](`,
    endTag: ")"
  }
});
