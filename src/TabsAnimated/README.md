# poem-ui/TabsAnimated

[Source](https://github.com/xizon/poem-ui/tree/main/src/TabsAnimated)

## Version

=> 0.0.1 (October 10, 2021)

## API

### Tabs Animated
```js
import { TabsAnimated } from 'poem-ui/TabsAnimated';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| - | - | - | - |


### Tab List
```js
import { TabList } from 'poem-ui/TabsAnimated';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | string \| `tab-list-*` | - |  A “key” is a special string attribute you need to include when creating lists of elements. Let’s assign a key to our list of items. Must contain the string `tab-list` |
| `defaultActive` | boolean | false | Set an item to activate by default |


### Tab Panel
```js
import { TabPanel } from 'poem-ui/TabsAnimated';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | string \| `tab-panel-*` | - |  A “key” is a special string attribute you need to include when creating lists of elements. Let’s assign a key to our list of items. Must contain the string `tab-panel` |
| `defaultActive` | boolean | false | Set an item to activate by default |
| `tabpanelClass` | string | - | Additional style name, such as `poemui-outer-shadow--regular` |


It accepts all props(include data-* attributes) which native div support.

## Examples

```js
import React from 'react';
import { TabsAnimated, TabList, TabPanel } from 'poem-ui/TabsAnimated';


export default () => {
  return (
    <>

		<TabsAnimated>
			<TabList key="tab-list-1" defaultActive>Tab 1</TabList>
			<TabList key="tab-list-2">Tab 2</TabList>
			<TabList key="tab-list-3">Tab 3</TabList>

			<TabPanel key="tab-panel-1" defaultActive>
				<p>Hi, this is the first tab.</p>
			</TabPanel>
			<TabPanel key="tab-panel-2">
				<p>This is the 2nd tab.</p>
				<p>This is the 2nd tab.</p>
				<p>This is the 2nd tab.</p>
			</TabPanel>
			<TabPanel key="tab-panel-3">
				<p>And this is the 3rd tab.</p>
			</TabPanel>    
		</TabsAnimated>	


    </>
  );
}

```