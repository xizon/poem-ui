# poem-ui/BackToTop

[Source](https://github.com/xizon/poem-ui/tree/main/src/BackToTop)

## Version

=> 0.0.1 (October 10, 2021)

## API

### Back To Top
```js
import { BackToTop } from 'poem-ui/BackToTop';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `speed` | number  | 500| Speed of scrolling up. Amount of time measured in milliseconds. |
| `easing` | `linear` \| `easeIn` \| `easeOut` \| `easeInOut` | - | Types of easing animation |
| `btnIcon` | ReactNode  | - | Button Icon |

Scroll the page down to preview. The button is in the bottom right corner of the screen.




## Examples

```js
import React from 'react';
import { BackToTop } from 'poem-ui/BackToTop';

//import common styles (CSS reset library)
import 'poem-ui/UtilsReset/styles.css'; 

//import component styles
import 'poem-ui/BackToTop/styles.css';

export default () => {
  return (
    <>

      <BackToTop speed={700} easing="easeOut" btnIcon={<><svg width="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#333" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg></>} />

    </>
  );
}

```