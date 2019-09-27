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
    text: "Bold",
    startTag: "**",
    endTag: "**"
  },
  [OPTION.ITALIC]: {
    text: "Italic",
    startTag: "*",
    endTag: "*"
  },
  [OPTION.SIZE]: {
    text: "Italic",
    startTag: "#"
  },
  [OPTION.STRIKE]: {
    text: "Italic",
    startTag: "~~",
    endTag: "~~"
  },
  [OPTION.LIST]: {
    text: "Bullet List",
    startTag: "-"
  },
  [OPTION.CHECK_BOX]: {
    text: "List",
    startTag: "- [ ] "
  },
  [OPTION.BLOCK_QUOTE]: {
    text: "Blockquote",
    startTag: "> "
  },
  [OPTION.CODE]: {
    text: "Code",
    startTag: "```",
    endTag: "```"
  },
  [OPTION.TABLE]: {
    text: "Table",
    startTag:
      `|  |  |
       |--|--|
       |  |  |`
  },
  [OPTION.LINK]: {
    text: "Link",
    startTag: "[enter link description here](",
    endTag: ")"
  },
  [OPTION.IMAGE]: {
    text: "Image",
    startTag: "![enter image description here](",
    endTag: ")"
  }
});
