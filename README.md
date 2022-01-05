# poem-ui
  
[![npm version](https://img.shields.io/npm/v/poem-ui?style=for-the-badge)](https://www.npmjs.com/package/poem-ui)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=for-the-badge)](LICENSE)

Simple and customizable React UI components.

Some components use third-party plug-ins to improve the interaction. You can remove third-party plugins, or compatible with them.


## Demos

[https://xizon.github.io/poem-ui/public/](https://xizon.github.io/poem-ui/public/)


## Components List

Here is a table of the components and their status.


| WEB ELEMENTS | FORMS | INTERACTION | LAYOUT | NAVIGATION |
| --- | --- | --- | --- | --- |
| [Accordion](src/Accordion/README.md) | [Input](src/Form/README.md#input) | [Infinite Scroll](src/InfiniteScroll/README.md) | [Grid](src/Grid/README.md) | [Cascading DropDown List](src/CascadingDropDownList/README.md)  | 
| [Accordion Slider](src/AccordionSlider/README.md) | [Password Input](src/Form/README.md#password-input) | [Image Perspective Hover](src/ImagePerspectiveHover/README.md) | [Gallery](src/Gallery/README.md) | [Dropdown Menu](src/DropdownMenu/README.md)  | 
| [Back To Top](src/BackToTop/README.md) | [Merge Input](src/Form/README.md#merge-input) | [Mousewheel Interaction](src/MousewheelInteraction/README.md) |  | [Multilevel Dropdown Menu](src/MultilevelDropdownMenu/README.md)  | 
| [Button](src/Button/README.md) | [Tag Input](src/Form/README.md#tag-input) | [Parallax](src/Parallax/README.md) |  | [Navigation](src/Navigation/README.md)  | 
| [Card](src/Card/README.md) | [Textarea](src/Form/README.md#textarea) | [Scroll Reveal](src/ScrollReveal/README.md) |  |  | 
| [Content Placeholder](src/ContentPlaceholder/README.md) | [Select](src/Form/README.md#select) | [Sticky Elements](src/StickyElements/README.md) |  |  | 
| [Counter](src/Counter/README.md) | [Custom Select](src/Form/README.md#custom-select) |  |  |  | 
| [Hybrid Content Slider](src/HybridContentSlider/README.md) | [Checkbox](src/Form/README.md#checkbox) |  |  |  | 
| [Image Shapes](src/ImageShapes/README.md) | [Radio](src/Form/README.md#radio) |  |  |  | 
| [Lightbox](src/Lightbox/README.md) | [Multi Select](src/Form/README.md#multi-select) |  |  |  | 
| [List Bulleted](src/ListBulleted/README.md) | [Single Select](src/Form/README.md#single-select) |  |  |  | 
| [Modal Dialog](src/ModalDialog/README.md) | [Date](src/Form/README.md#date) |  |  |  | 
| [Pagination](src/Pagination/README.md) | [Number](src/Form/README.md#number) |  |  |  | 
| [Periodical Scroll](src/PeriodicalScroll/README.md) | [Switch](src/Form/README.md#switch) |  |  |  | 
| [Progress Bar](src/ProgressBar/README.md) | [Dynamic Fields](src/Form/README.md#dynamic-fields) |  |  |  | 
| [Rating](src/Rating/README.md) | [File](src/Form/README.md#file) |  |  |  | 
| [Seamless Scrolling Element](src/SeamlessScrollingElement/README.md) | [File Field](src/Form/README.md#file-field) |  |  |  | 
| [Show More Less](src/ShowMoreLess/README.md) |  |  |  |  | 
| [Slideshow](src/Slideshow/README.md) |  |  |  |  | 
| [Table](src/Table/README.md) |  |  |  |  | 
| [Table Grid](src/TableGrid/README.md) |  |  |  |  | 
| [Table Sorter](src/TableSorter/README.md) |  |  |  |  | 
| [Tabs](src/Tabs/README.md) |  |  |  |  | 
| [Tabs Animated](src/TabsAnimated/README.md) |  |  |  |  | 
| [Timeline](src/Timeline/README.md) |  |  |  |  | 
| [Toaster](src/Toaster/README.md) |  |  |  |  | 
| [Tooltip](src/Tooltip/README.md) |  |  |  |  | 




## Usage

To start using the components, please follow these steps:

### 1. Install package

```sh
npm i poem-ui
```

[https://www.npmjs.com/package/poem-ui](https://www.npmjs.com/package/poem-ui)


### 2. Now you can start using components like so:

**❤️ Recommend ❤️** Use modularized (supports ES modules tree shaking by default for JS part):

> You can manually import the stylesheet as needed.

```jsx
import React from 'react';
import { Button, ButtonGroup } from 'poem-ui/Button';

//import common styles (CSS reset library)
import 'poem-ui/UtilsReset/styles.css'; 

//import component styles
import 'poem-ui/Button/styles.css';

function Example() {
  return <Button border="thin" spacing="bottom" background="primary" corners="pill" size="medium" id="app-btn-1" href="#" data-title="button" onClick={(e) => {e.preventDefault(); alert( e.target.id );} }>Click me to view ID!</Button>
}

function Example2() {
  return <>
    <ButtonGroup spacing="bottom">
      <Button border="thin" background="primary transparent" corners="pill" size="small" href="https://google.com">Group</Button>
      <Button border="thin" background="primary transparent" corners="pill" size="small" href="#">Group</Button>
      <Button border="thin" background="primary transparent" corners="pill" size="small" href="#">Group</Button>
    </ButtonGroup>
  </>;
}
```

Or

```jsx
import React from 'react';
import { Button } from 'poem-ui';

//import common styles (CSS reset library)
import 'poem-ui/UtilsReset/styles.css'; 

//import component styles
import 'poem-ui/Button/styles.css';

function Example() {
  return <Button border="thin" spacing="bottom" background="primary" corners="pill" size="medium" id="app-btn-1" href="#" data-title="button" onClick={(e) => {e.preventDefault(); alert( e.target.id );} }>Click me to view ID!</Button>
}
```


## Development Mode

You will need to have [node](https://nodejs.org/) setup on your machine.

**Step 1.** Clone the repo to get all source files including build scripts: 

```sh
$ git clone git://github.com/xizon/poem-ui.git
```


**Step 2.** First, using an absolute path into your `"poem-ui/"` folder directory.

```sh
$ cd /{your_directory}/poem-ui
```


**Step 3.** Before doing all dev stuff make sure you have `Node 14+` installed. After that, run the following code in the main directory to install the node module dependencies.

```sh
$ sudo npm install
```


**Step 4.** Commonly used commands:

Debug application. It can be checked separately as TypeScript without compiling and packaging behavior.

```sh
$ npm run check
```


**Step 5.** When you’re ready to deploy to production, create commonJS files with:

```sh
$ npm run build
```

Test page `./public/index.html`

```sh
$ npm run dev
```

Clear the components' folder published to npm in the root directory

```sh
$ npm run clear:npm
```


<blockquote>
<h3>💡 Note:</h3>
 
**If you upgrade the version of Node, please execute the following code:**

```sh
$ sudo npm install
$ sudo npm rebuild node-sass
```
</blockquote>



## Changelog

#### = 0.0.4 (January 5, 2022) =

* Optimized the file size compiled by babel.
* Separate styles and independent import style manually.


#### = 0.0.1 (January 3, 2022) =

* First release.


## Contributing

You can remove third-party plugins (used by some components), or compatible with them.

- [boot-helpers](https://github.com/xizon/boot-helpers)
- [GSAP - Standard "No Charge" GreenSock License](https://greensock.com)
- [Body Scroll Lock](https://github.com/willmcpo/body-scroll-lock)


## Licensing

Licensed under the [MIT](https://opensource.org/licenses/MIT).


