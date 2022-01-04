# poem-ui/ContentPlaceholder

[Source](https://github.com/xizon/poem-ui/tree/main/src/ContentPlaceholder)

## Version

=> 0.0.1 (November 22, 2021)

## API

### Content Placeholder
```js
import ContentPlaceholder from 'poem-ui/ContentPlaceholder';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `page` \| `list` \| `content` \| `image` | - | <strong>(Required)</strong> Placeholder display style |



## Examples

```js
import React from 'react';
import ContentPlaceholder from 'poem-ui/ContentPlaceholder';

export default () => {
  return (
    <>

      <h3>For Page Loading</h3>
      <p>These placeholders provide good UX, it gives users a sense of what to expect where on the page when the loading finishes.</p>
      {/* ================================================================== */}
      <ContentPlaceholder type="page" />

      <h3>For List</h3>
      {/* ================================================================== */}
      <ContentPlaceholder type="list" />


      <h3>For Content</h3>
      {/* ================================================================== */}
      <ContentPlaceholder type="content" />

      <h3>For Image</h3>
      <p>Create flexible image placeholders that keep their aspect ratio (1:1) when resized. </p>
      {/* ================================================================== */}
      <ContentPlaceholder type="image" />


    </>
  );
}

```