import React, { Component } from 'react';


type AccordionItemProps = {
	/** Set an item to activate by default */
	defaultActive?: string | boolean | undefined;
	/** Specify a title */
	title?: React.ReactNode;
	/** Handling events for collapsing item */
	boxToggleEv?: React.MouseEventHandler<HTMLElement>;
	/** Handling events when the animation execution is complete */
	elAnimEndEv?: React.TransitionEventHandler<HTMLElement>;
	/** One event type, such as `click` or `mouseover` */
	triggerType?: string;
};
type AccordionItemState = false;


export default class AccordionItem extends Component<AccordionItemProps, AccordionItemState> {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		
		const { 
            defaultActive,
			title,
			boxToggleEv,
			elAnimEndEv,
			triggerType,
			children
		} = this.props;
		
		const activedClassName = typeof(defaultActive) !== 'undefined' && defaultActive !== false ? ' is-active' : '';

		
		return (
		  <>

				{ triggerType === 'click' ? (
					<dl 
					onClick={boxToggleEv} 
					onTransitionEnd={elAnimEndEv} 
					className={activedClassName} 
					aria-expanded={defaultActive ? 'true' : 'false'}>
						<dt role="presentation"><a href="#">{title}</a><svg aria-hidden="true" width="8" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="#999" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></dt>
						<dd role="tabpanel" 
							style={{
								height: defaultActive ? 'auto' : '0px'
							}}>
							<div>
								{children}
							</div>
						</dd>

					</dl>
				) : ''}

				{ triggerType === 'mouseover' ? (
					<dl 
					onClick={(e) => e.preventDefault()}
					onMouseOver={boxToggleEv} 
					onTransitionEnd={elAnimEndEv} 
					className={activedClassName} 
					aria-expanded={defaultActive ? 'true' : 'false'}>
						<dt role="presentation"><a href="#">{title}</a><svg aria-hidden="true" width="8" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="#999" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></dt>
						<dd role="tabpanel" 
							style={{
								height: defaultActive ? 'auto' : '0px'
							}}>
							<div>
								{children}
							</div>
						</dd>

					</dl>
				) : ''}		


		  </>
		)
	}
}

