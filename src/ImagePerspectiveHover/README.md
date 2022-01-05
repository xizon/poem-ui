# poem-ui/ImagePerspectiveHover

[Source](https://github.com/xizon/poem-ui/tree/main/src/ImagePerspectiveHover)

## Version

=> 0.0.1 (November 22, 2021)

## API

### Image Perspective Hover
```js
import { ImagePerspectiveHover } from 'poem-ui/ImagePerspectiveHover';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | array | - | Specify data of images as a JSON string format. Such as: <br />`[{"title":"Image Title 1","url":"xxx.jpg","width":200},{"title":"Image Title 2","url":"xxx.jpg","width":300}]` |
| `offset` | array  | - | Base offset value and power of target number, the format is an array, such as `[20,2]` |
| `reset` | boolean  | false | If enabled, it will return to the default position when the mouse is moved away from the image |



Array configuration properties of the `data`:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string \| boolean | - | Specifies an alternate and title text for the image |
| `url` | string | - | Specifies the path to the image |
| `width` | number | - | Specify a width |



## Examples

```js
import React from 'react';
import { ImagePerspectiveHover } from 'poem-ui/ImagePerspectiveHover';

//import common styles (CSS reset library)
import 'poem-ui/UtilsReset/styles.css'; 

//import component styles
import 'poem-ui/ImagePerspectiveHover/styles.css';

export default () => {
  return (
    <>

      <h3>Only One</h3>
      <p>Transform individual elements by spying to the entire window.</p>
      {/* ================================================================== */} 
      <ImagePerspectiveHover offset={[10,1]} reset={true} data={[
                    {"title":"Image Title", "url":`/path/demo.png`,"width":320}
                    ]} />


      <h3>Multiple Images</h3>
      <p>This transitional effect can be seen when you move your mouse over a certain element that makes it change position or animate.</p>
      {/* ================================================================== */} 
      <ImagePerspectiveHover offset={[20,2]} reset={false} data={[
                      {"title":"Image Title", "url":`/path/demo.png`,"width":200},
                      {"title":"Image Title", "url":`/path/demo.png`,"width":300},
                      {"title":"Image Title", "url":`/path/demo.png`,"width":170}
                      ]} />


    </>
  );
}

```