# poem-ui/Pagination

[Source](https://github.com/xizon/poem-ui/tree/main/src/Pagination)

## Version

=> 0.0.1 (October 14, 2021)

## API

### Pagination
```js
import Pagination from 'poem-ui/Pagination';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `pageRangeDisplayed` | number  | 3 | <strong>(Required)</strong> The range of pages displayed |
| `activePage` | number  | - | <strong>(Required)</strong> The currently selected page number.  |
| `totalPages` | number  | - | <strong>(Required)</strong> The total number of pages |
| `gotoPageClickEvent` | function  | - | The method to call when a page is clicked. Exposes the current page number as an argument. |
| `previousLabel` | ReactNode  | - | Label for the previous button |
| `nextLabel` | ReactNode  | - | Label for the next button |
| `firstLabel` | ReactNode  | - | Label for the first button |
| `lastLabel` | ReactNode  | - | Label for the last button |
| `breakLabel` | ReactNode  | - | Label for ellipsis |
| `align` | null \| '' \| `left` \| `right` \| `center`  | - | Set the alignment of the control  |
| `onlyPrevNext` | boolean  | false | Only display the previous and next buttons |
| `activeClass` | string  | is-active | The classname for the active page |
| `previousClass` | string  | prev | The classname on tag li of the previous button |
| `nextClass` | string  | next | The classname on tag li of the next button |
| `firstClass` | string  | first | The classname on tag li of the first button |
| `lastClass` | string  | last | The classname on tag li of the last button |
| `disabledClass` | string  | is-disabled | The classname for disabled buttons |


## Examples

```js
import React from 'react';
import Pagination from 'poem-ui/Pagination';


function gotoPageNumber( number ) {
	//`number` comes from the public parameter thrown by the component `<Pagination />`
	alert( `page number: ${number}` );
	
}


export default () => {
  return (
    <>

      <h3>Basic</h3>
      {/* ================================================================== */} 

      <Pagination
        gotoPageClickEvent={gotoPageNumber}
        pageRangeDisplayed={3}
        activePage={2}
        totalPages={5}
        previousLabel="prev"
        nextLabel="next"
        firstLabel="first"
        lastLabel="last"
      />	
      

      <h3>Custom Icon</h3>
      {/* ================================================================== */} 

      <Pagination
        gotoPageClickEvent={gotoPageNumber}
        pageRangeDisplayed={3}
        activePage={2}
        totalPages={3}
        onlyPrevNext={true}
        previousLabel={<><i className="icon-angle-left" aria-hidden="true"></i></>}
        nextLabel={<><i className="icon-angle-right" aria-hidden="true"></i></>}
      />	
        

      <Pagination
        gotoPageClickEvent={gotoPageNumber}
        pageRangeDisplayed={3}
        activePage={2}
        totalPages={3}
        onlyPrevNext={true}
        previousLabel={<><i className="icon-angle-left" aria-hidden="true"></i></>}
        nextLabel={<><i className="icon-angle-right" aria-hidden="true"></i></>}
        previousClass="previous poemui-f-l"
        nextClass="next poemui-f-r"
      />	
        
        
      <h3>Centered Buttons</h3>
      {/* ================================================================== */} 

      <Pagination
        gotoPageClickEvent={gotoPageNumber}
        pageRangeDisplayed={3}
        activePage={1}
        totalPages={5}
        previousLabel={<><i className="icon-angle-left" aria-hidden="true"></i></>}
        nextLabel={<><i className="icon-angle-right" aria-hidden="true"></i></>}
        firstLabel={<><i className="icon-angle-double-left" aria-hidden="true"></i></>}
        lastLabel={<><i className="icon-angle-double-right" aria-hidden="true"></i></>}
        align="center"
      />	
      


      <Pagination
        gotoPageClickEvent={gotoPageNumber}
        pageRangeDisplayed={3}
        activePage={5}
        totalPages={5}
        previousLabel={<><i className="icon-angle-left" aria-hidden="true"></i></>}
        nextLabel={<><i className="icon-angle-right" aria-hidden="true"></i></>}
        firstLabel={<><i className="icon-angle-double-left" aria-hidden="true"></i></>}
        lastLabel={<><i className="icon-angle-double-right" aria-hidden="true"></i></>}
        align="center"
      />	
      

      <h3>Use Ellipsis</h3>
      {/* ================================================================== */} 

      <Pagination
        gotoPageClickEvent={gotoPageNumber}
        pageRangeDisplayed={10}
        activePage={1}
        totalPages={1999}
        previousLabel={<><i className="icon-angle-left" aria-hidden="true"></i></>}
        nextLabel={<><i className="icon-angle-right" aria-hidden="true"></i></>}
        firstLabel={<><i className="icon-angle-double-left" aria-hidden="true"></i></>}
        lastLabel={<><i className="icon-angle-double-right" aria-hidden="true"></i></>}
        align="center"
        breakLabel="..."
      />	
      
      

      <Pagination
        gotoPageClickEvent={gotoPageNumber}
        pageRangeDisplayed={10}
        activePage={1996}
        totalPages={1999}
        previousLabel={<><i className="icon-angle-left" aria-hidden="true"></i></>}
        nextLabel={<><i className="icon-angle-right" aria-hidden="true"></i></>}
        align="center"
        breakLabel="..."
      />	
      


      <Pagination
        gotoPageClickEvent={gotoPageNumber}
        pageRangeDisplayed={10}
        activePage={1996}
        totalPages={2006}
        previousLabel={<><i className="icon-angle-left" aria-hidden="true"></i></>}
        nextLabel={<><i className="icon-angle-right" aria-hidden="true"></i></>}
        align="center"
        breakLabel="..."
      />	
                


      <Pagination
        gotoPageClickEvent={gotoPageNumber}
        pageRangeDisplayed={10}
        activePage={1997}
        totalPages={1999}
        previousLabel={<><i className="icon-angle-left" aria-hidden="true"></i></>}
        nextLabel={<><i className="icon-angle-right" aria-hidden="true"></i></>}
        align="center"
        breakLabel="..."
      />	
      
            



    </>
  );
}

```