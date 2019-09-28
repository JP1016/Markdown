const IMAGE_SELECT = "image";
const LINK_SELECT = "link";
const CONTRIB_GUIDELINES_SELECT = "cguide";
const CONTRIB_LIST = "clist";
const LICENCE_SELECT = "licence";
const SAVE_TEMPLATE = "save";
const LOAD_TEMPLATE = "load";

export const FORM_OPTIONS = {
  [IMAGE_SELECT]: {
    title: "Insert Image",
    fields: [
      {
        label: "Enter Image URL",
        name: "link"
      },
      {
        label: "Enter Image Description",
        name: "description"
      }],
  },
  [LINK_SELECT]: {
    title: "Insert Link",
    fields: [
      {
        label: "Enter URL",
        name: "link"
      },
      {
        label: "Enter Description",
        name: "description"
      }],
  }

}
