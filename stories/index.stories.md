```js script
import { html } from '@open-wc/demoing-storybook';
import '../dist/denotate-front.js';

export default {
  title: 'DenotateFront',
  component: 'denotate-front',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# DenotateFront

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add denotate-front
```

```js
import 'denotate-front/denotate-front.js';
```

```js preview-story
export const Simple = () => html`
  <denotate-front></denotate-front>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <denotate-front title="Hello World"></denotate-front>
`;
```
