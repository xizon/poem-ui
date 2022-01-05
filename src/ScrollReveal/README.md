# poem-ui/ScrollReveal

[Source](https://github.com/xizon/poem-ui/tree/main/src/ScrollReveal)

## Version

=> 0.0.2 (November 22, 2021)


## API

### Scroll Reveal
```js
import { ScrollReveal } from 'poem-ui/ScrollReveal';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `config` | JSON Object Literals  | - | <strong>(Required)</strong> Detailed animation parameters, using JSON string format.<br />**default value:**<br />`{"from": {"opacity":0,"x":70},"to":{"opacity":1,"x":0},"ease":"Power2.easeOut","duration": 0.4,"delay": 0,"infinite" : false,"viewport" : '100%'}` <br />**other:**<br />`{"viewport":"100%","from":{"opacity":0,"x":100},"to":{"opacity":1,"x":0},"ease":"Power2.easeOut","duration":0.8,"delay":0,"infinite":false}` <br />`{"viewport":"100%","from":"","to":".demo-sr-active","infinite":true}` |

It accepts all props(include data-* attributes) which native div support.



JSON configuration properties of the `config`:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `viewport` | string  | 100% | This attribute expands/contracts the active boundaries of the viewport when calculating element visibility. The default value is `100%`.  `20%` means 20% of an element must be visible for its reveal to occur. |
| `from` | JSON Object Literals  | {"opacity":0,"x":70} | Starting config using JSON string format, will transition from these values. Follow the parameter style of GSAP 2+. Eg. `{"opacity":0,"scale":0.5,"transform":"translateX(50px) rotate(30deg)"}` |
| `to` | JSON Object Literals \| string  | {"opacity":1,"x":0} | Ending config using JSON string format, will transition from these values. Follow the parameter style of GSAP 2+. Eg. `{"opacity":1,"scale":1,"transform":"translateX(0) rotate(0deg)"}` <br />Can be a pure string, this style will be enabled when the viewport is specified, for example `.demo-sr-active` |
| `ease` | string  | Power2.easeOut | Accepts any valid GSAP 2+ easing, e.g. `Power2.easeOut`, etc. |
| `duration` | number  | 0.4 | This attribute controls how long animations take to complete. |
| `delay` | number  | 0 | This attribute is the time before reveal animations begin. |
| `infinite` | boolean  | false | This attribute enables/disables elements returning to their initialized position when they leave the viewport. When true elements reveal each time they enter the viewport instead of once. |



## Examples

```js
import React from 'react';
import { ScrollReveal } from 'poem-ui/ScrollReveal';

//import common styles (CSS reset library)
import 'poem-ui/UtilsReset/styles.css'; 

//import component styles
import 'poem-ui/ScrollReveal/styles.css';

export default () => {
	

   React.useEffect(() => {
		if ( document.querySelector( '#app-demo-sr-style') === null ) {
			const $style = document.createElement("style");
			$style.id = 'app-demo-sr-style';
			document.head.appendChild($style);
			$style.innerHTML = `
				.demo-sr-active {
					transition: all 1s ease;
					transform: scale(0.7);
				}
			`;  
		}  
   });
	
  return (
    <>

		<ScrollReveal className="poemui-spacing--s poemui-height--50 poemui-el--transparent" config='{"viewport":"100%","from":{"opacity":0,"x":100},"to":{"opacity":1,"x":0},"ease":"Power2.easeOut","duration":0.8,"delay":0,"infinite":false}' style={{background:"#FBFBFB"}}>
			<div className="poemui-v-align--relative poemui-t-c">
				<h3>Moving the element when going left</h3>
			</div>
		</ScrollReveal> 



		<ScrollReveal className="poemui-spacing--s poemui-height--50 poemui-el--transparent" config='{"viewport":"100%","from":{"opacity":0,"scale":0.5,"transform":"translateX(50px) rotate(30deg)"},"to":{"opacity":1,"scale":1,"transform":"translateX(0) rotate(0deg)"},"ease":"Power2.easeOut","duration":0.8,"delay":0.5,"infinite":false}' style={{background:"#ACABA3"}}>
			<div className="poemui-v-align--relative poemui-t-c">
				<h3>Flipping the element when going left</h3>

			</div>
		</ScrollReveal>


		<ScrollReveal className="poemui-spacing--s poemui-height--50 poemui-el--transparent" config='{"viewport":"80%","from":{"opacity":0,"y":150},"to":{"opacity":1,"y":0},"ease":"Power2.easeOut","duration":0.8,"delay":0,"infinite":true}' style={{background:"#C7BAAF"}}>
			<div className="poemui-v-align--relative poemui-t-c">
				<h3>Infinite loop animation</h3>

			</div>
		</ScrollReveal>


		<ScrollReveal className="poemui-spacing--s poemui-height--50 poemui-el--transparent" config='{"viewport":"100%","from":{"opacity":0,"y":150},"to":{"opacity":1,"y":0},"ease":"Power2.easeOut","duration":0.8,"delay":0,"infinite":false}' style={{background:"#AB9799"}}>
			<div className="poemui-v-align--relative poemui-t-c">
				<h3>Moving the element when going top</h3>

			</div>
		</ScrollReveal>



		<ScrollReveal className="poemui-spacing--s poemui-height--50" config='{"viewport":"100%","from":"","to":".demo-sr-active","infinite":true}' style={{background:"#91707A"}}>
			<div className="poemui-v-align--relative poemui-t-c">
				<h3>Add class <code>.demo-sr-active</code> when element becomes visible</h3>

			</div>
		</ScrollReveal>




		<ScrollReveal className="poemui-spacing--s poemui-height--50 poemui-el--zoom" config='{"viewport":"100%","from":{"scale":0},"to":{"scale":1},"ease":"Power2.easeOut","duration":0.8,"delay":0,"infinite":false}' style={{background:"#805965"}}>
			<div className="poemui-v-align--relative poemui-t-c">
				<h3>Scale effect</h3>

			</div>
		</ScrollReveal>



		<div className="poemui-spacing--s">
			<ScrollReveal className="d-inline-block poemui-sr-image-anim poemui-sr-image-anim--x" config='{"viewport":"50%","from":"","to":".is-active","infinite":false}'>
				<img src={`/path/demo.png`} style={{maxWidth:"500px"}} alt="" />
			</ScrollReveal>
		</div>



		<div className="poemui-spacing--s">
			<ScrollReveal className="d-inline-block poemui-sr-image-anim poemui-sr-image-anim--y" config='{"viewport":"50%","from":"","to":".is-active","infinite":false}'>
				<img src={`/path/demo.png`} style={{maxWidth:"500px"}} alt="" />
			</ScrollReveal>
		</div>



		<div className="poemui-spacing--s">
			<ScrollReveal className="d-inline-block poemui-sr-image-anim poemui-sr-image-anim--z" config='{"viewport":"50%","from":"","to":".is-active","infinite":false}'>
				<img src={`/path/demo.png`} style={{maxWidth:"500px"}} alt="" />
			</ScrollReveal>
		</div>
	  
	  
    </>
  );
}

```