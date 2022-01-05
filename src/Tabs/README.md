# poem-ui/Tabs

[Source](https://github.com/xizon/poem-ui/tree/main/src/Tabs)

## Version

=> 0.0.1 (October 10, 2021)

## API

### Tabs
```js
import { Tabs } from 'poem-ui/Tabs';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `center` | boolean | false | When true, the navigation button of the component is centered |
| `fullwidth` | boolean | false | When true, the navigation buttons of the component will be automatically filled in the 100% width area |
| `rotation` | boolean | false | Set whether to enable the rotation layout of the component. When the value is true, the two properties of `rotationRadius` and `rotationWrapperAngle` are valid.  |
| `rotationRadius` | number | 130 | Set the radius of rotation |
| `rotationWrapperAngle` | number | 0 | Set the rotation angle of the entire component |



### Tab List
```js
import { TabList } from 'poem-ui/Tabs';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | string \| `tab-list-*` | - |  A “key” is a special string attribute you need to include when creating lists of elements. Let’s assign a key to our list of items. Must contain the string `tab-list` |
| `defaultActive` | boolean | false | Set an item to activate by default |


### Tab Panel
```js
import { TabPanel } from 'poem-ui/Tabs';
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
import { Tabs, TabList, TabPanel } from 'poem-ui/Tabs';

//import common styles (CSS reset library)
import 'poem-ui/UtilsReset/styles.css'; 

//import component styles
import 'poem-ui/Tabs/styles.css';

export default () => {
  return (
    <>
	  
		<h3>Tab Normal</h3>
		{/* ================================================================== */} 

		<Tabs>
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
		</Tabs>	



		<Tabs center={true}>
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
		</Tabs>		



		<Tabs fullwidth={true}>
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
		</Tabs>	



		<h3>Tab Rotation Effect 1</h3>
		{/* ================================================================== */} 


		<Tabs rotation={true} rotationRadius={130} rotationWrapperAngle={0}>
			<TabList key="tab-list-1" defaultActive>Tab 1</TabList>
			<TabList key="tab-list-2">Tab 2</TabList>
			<TabList key="tab-list-3">Tab 3</TabList>
			<TabList key="tab-list-4">Tab 4</TabList>
			<TabList key="tab-list-5">Tab 5</TabList>

			<TabPanel key="tab-panel-1" tabpanelClass="poemui-outer-shadow--regular" style={{marginTop:"50px"}} defaultActive>
				<p>Hi, this is the first tab.</p>
			</TabPanel>
			<TabPanel key="tab-panel-2" tabpanelClass="poemui-outer-shadow--regular" style={{marginTop:"50px"}}>
				<p>This is the 2nd tab.</p>
				<p>This is the 2nd tab.</p>
				<p>This is the 2nd tab.</p>
			</TabPanel>
			<TabPanel key="tab-panel-3" tabpanelClass="poemui-outer-shadow--regular" style={{marginTop:"50px"}}>
				<p>And this is the 3rd tab.</p>
			</TabPanel>    
			<TabPanel key="tab-panel-3" tabpanelClass="poemui-outer-shadow--regular" style={{marginTop:"50px"}}>
				<p>And this is the 4th tab.</p>
			</TabPanel> 
			<TabPanel key="tab-panel-3" tabpanelClass="poemui-outer-shadow--regular" style={{marginTop:"50px"}}>
				<p>And this is the 5th tab.</p>
			</TabPanel> 
		</Tabs>	



		<h3>Tab Rotation Effect 2</h3>
		{/* ================================================================== */} 


		<Tabs rotation={true} rotationRadius={130} rotationWrapperAngle={-45}>
			<TabList key="tab-list-1" defaultActive>Tab 1</TabList>
			<TabList key="tab-list-2">Tab 2</TabList>
			<TabList key="tab-list-3">Tab 3</TabList>
			<TabList key="tab-list-4">Tab 4</TabList>

			<TabPanel key="tab-panel-1" tabpanelClass="poemui-outer-shadow--regular" style={{marginTop:"50px"}} defaultActive>
				<p>Hi, this is the first tab.</p>
			</TabPanel>
			<TabPanel key="tab-panel-2" tabpanelClass="poemui-outer-shadow--regular" style={{marginTop:"50px"}}>
				<p>This is the 2nd tab.</p>
				<p>This is the 2nd tab.</p>
				<p>This is the 2nd tab.</p>
			</TabPanel>
			<TabPanel key="tab-panel-3" tabpanelClass="poemui-outer-shadow--regular" style={{marginTop:"50px"}}>
				<p>And this is the 3rd tab.</p>
			</TabPanel>    
			<TabPanel key="tab-panel-3" tabpanelClass="poemui-outer-shadow--regular" style={{marginTop:"50px"}}>
				<p>And this is the 4th tab.</p>
			</TabPanel> 
		</Tabs>		


    </>
  );
}

```