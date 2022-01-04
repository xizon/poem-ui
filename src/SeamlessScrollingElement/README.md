# poem-ui/SeamlessScrollingElement

[Source](https://github.com/xizon/poem-ui/tree/main/src/SeamlessScrollingElement)

## Version

=> 0.0.1 (October 22, 2021)

## API

### Seamless Scrolling Element
```js
import { SeamlessScrollingElement } from 'poem-ui/SeamlessScrollingElement';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `speed` | number  | 3000 | Speed of animation. Amount of time measured in milliseconds. |
| `gap` | number  | 20 | The separation distance between each item in pixels. |


### Seamless Scrolling Element Item
```js
import { SeamlessScrollingElementItem } from 'poem-ui/SeamlessScrollingElement';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| - | - | - | - |


## Examples

```js
import React from 'react';
import { SeamlessScrollingElement, SeamlessScrollingElementItem } from 'poem-ui/SeamlessScrollingElement';

export default () => {
  return (
    <>

      <SeamlessScrollingElement speed={3000} gap={20}>
        <SeamlessScrollingElementItem>This is list item 1</SeamlessScrollingElementItem>
        <SeamlessScrollingElementItem>This is list item 2</SeamlessScrollingElementItem>
        <SeamlessScrollingElementItem>This is list item 3</SeamlessScrollingElementItem>
        <SeamlessScrollingElementItem>This is list item 4 (last)</SeamlessScrollingElementItem>
      </SeamlessScrollingElement>

    </>
  );
}

```