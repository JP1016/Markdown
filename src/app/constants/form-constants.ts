import { CONTRIBUTION_GUIDE } from "./app-constants";

export const IMAGE_SELECT = "image";
export const LINK_SELECT = "link";
export const CONTRIB_GUIDELINES_SELECT = "cguide";
export const CONTRIB_LIST = "clist";
export const LICENCE_SELECT = "licence";
export const SAVE_TEMPLATE = "save";
export const LOAD_TEMPLATE = "load";
const END_QUOTES = "```";

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
    ],
    default: `## Contributing
If you've ever wanted to contribute to open source, and a great cause, now is your chance!

See the [contributing docs](http://example.com) for more information`
  },
  [CONTRIB_LIST]: {
    title: "Add Contribution List",
    fields: [
      {
        label: "Enter Contibution List",
        name: "descr"
      }
    ],
    default: `## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
	<tr>
		<td align="center">
			<a href="https://kentcdodds.com">
				<img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt="Kent C. Dodds" />
				<br />
				<sub>
					<b>Kent C. Dodds</b>
				</sub>
			</a>
			<br />
			<a href="#question-kentcdodds" title="Answering Questions">💬</a>
			<a href="https://github.com/all-contributors/all-contributors/commits?author=kentcdodds" title="Documentation">📖</a>
			<a href="#review-kentcdodds" title="Reviewed Pull Requests">👀</a>
			<a href="#talk-kentcdodds" title="Talks">📢</a>
		</td>
		<td align="center">
			<a href="https://github.com/jfmengels">
				<img src="https://avatars.githubusercontent.com/u/3869412?v=3" width="100px;" alt="Jeroen Engels" />
				<br />
				<sub>
					<b>Jeroen Engels</b>
				</sub>
			</a>
			<br />
			<a href="https://github.com/all-contributors/all-contributors/commits?author=jfmengels" title="Documentation">📖</a>
			<a href="#review-jfmengels" title="Reviewed Pull Requests">👀</a>
			<a href="#tool-jfmengels" title="Tools">🔧</a>
		</td>
		<tr>
		</table>
    `
  },
  [LICENCE_SELECT]: {
    title: "Enter licence information",
    fields: [
      {
        label: "Enter licence information",
        name: "descr"
      }
    ],
    default: `## LICENCE
${END_QUOTES}
Copyright 2019

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
${END_QUOTES}`
  }
};
