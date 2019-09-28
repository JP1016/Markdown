import { CONTRIBUTION_GUIDE } from "./app-constants";

export const IMAGE_SELECT = "image";
export const LINK_SELECT = "link";
export const CONTRIB_GUIDELINES_SELECT = "cguide";
export const CONTRIB_LIST = "clist";
export const LICENCE_SELECT = "licence";
export const SAVE_TEMPLATE = "save";
export const LOAD_TEMPLATE = "load";

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
      }
    ]
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
      }
    ]
  },
  [CONTRIB_GUIDELINES_SELECT]: {
    title: "Add Contribution Guideline",
    fields: [
      {
        label: "Enter Contibution Guideline",
        name: "descr"
      }
    ]
  },
  [CONTRIB_LIST]: {
    title: "Add Contribution List",
    fields: [
      {
        label: "Enter Contibution List",
        name: "descr"
      }
    ]
  },
  [LICENCE_SELECT]: {
    title: "Enter licence information",
    fields: [
      {
        label: "Enter licence information",
        name: "descr"
      }
    ]
  }
};
