import React, { Component } from 'react';


/*-- Apply global scripts and styles --*/
import '@/components/_utils/styles/_all.scss';
import '@/components/_utils/styles/rtl/_all.scss';
import { __ } from '@/components/_utils/_all';

/*-- Apply this component styles --*/
import '@/components/Form/styles/_basic.scss';
import '@/components/Form/styles/_layout.scss';
import '@/components/Form/styles/_theme_material.scss';
import '@/components/Form/styles/rtl/_basic.scss';
import '@/components/Form/styles/rtl/_layout.scss';
import '@/components/Form/styles/rtl/_theme_material.scss';


type InputProps = {
	type?: string;
	theme?: string;
	ui?: string;
	value?: string;
	label?: string | object;
	units?: string;
	name?: string;
	maxLength?: any;
	disabled?: any;
	required?: any;
	placeholder?: string;
	iconLeft?: object;
	iconRight?: object;
	/** -- */
	id?: string;
};
type InputState = false;



export default class Input extends Component<InputProps, InputState>  {

	uniqueID: string;
	
	constructor(props) {
		super(props);
	
		this.uniqueID = 'app-' + __.GUID.create();

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlurChange = this.handleBlurChange.bind(this);
		
	}

    handleFocus(event) {
		const el = __( event.target );
		
		el.closest( 'div' ).find( 'label, .poemui-controls__bar' ).addClass( 'is-active' );
    }

    handleBlurChange(event) {
		const el = __( event.target );
		const val = event.target.value;
		

		//----
		//remove focus style
		if( val === '' || val === 'blank' ) {
			el.closest( 'div' ).find( 'label' ).removeClass( 'is-active' );
		}	

		//
		if( 
			val === '' || 
			val === 'blank' || 
			( val != '' && val != 'blank' ) 
		) {
			el.closest( 'div' ).find( '.poemui-controls__bar' ).removeClass( 'is-active' );
		}	
    }
	
	
    /**
     * Set the class names of different styles
     */
	uiSwitch(param) {
		
		let classes = '';
		
		//status
		if ( param.indexOf( 'error' ) >= 0 ) classes += ' is-error';
		if ( param.indexOf( 'success' ) >= 0 ) classes += ' is-success';
		
		//corners
		if ( param.indexOf( 'pill' ) >= 0 ) classes += ' is-pill';
		if ( param.indexOf( 'rounded' ) >= 0 ) classes += ' is-rounded';

		//size
		if ( param.indexOf( 'fullwidth' ) >= 0 ) classes += ' is-fullwidth';
		if ( param.indexOf( 'small' ) >= 0 ) classes += ' poemui-controls__short-s';
		if ( param.indexOf( 'medium' ) >= 0 ) classes += ' poemui-controls__short-m';
		if ( param.indexOf( 'large' ) >= 0 ) classes += ' poemui-controls__short-l';


		
		return classes;
	}
	
		

	render() {
		
		const { 
			type,
			theme,
			ui,
			disabled,
			required,
			placeholder,
			value,
			label,
			units,
			name,
			id,
			maxLength,
			iconLeft,
			iconRight,
			...attributes
		} = this.props;
		
		
		const typeRes = typeof(type) === 'undefined' ? 'text' : type;
		const uiRes = typeof(ui) === 'undefined' ? '' : ui;
		const nameRes = typeof(name) === 'undefined' ? ( typeof(label) !== 'undefined' ? __.toSlug( label ) : '' )  : name;
		const idRes = id || this.uniqueID;
		const wrapperClassDisabled = disabled ? ' is-disabled' : '';
		const wrapperClassIconLeft = iconLeft ? ' is-iconic' : '';
		const wrapperClassIconRight = iconRight ? ' is-iconic is-reversed' : '';
		const wrapperClassUi = this.uiSwitch(uiRes);
		const wrapperClassTheme = theme === 'line' ? ' poemui-controls--line' : '';
		
		return (
		  <>

				<div className={"poemui-controls" + wrapperClassDisabled + wrapperClassIconLeft + wrapperClassIconRight + wrapperClassUi + wrapperClassTheme}>
			      {iconLeft || null}
			      {iconRight || null}
				  <input 
					  type={typeRes} 
					  className="js-poemui-float-label" 
			          id={idRes}
					  name={nameRes}
					  placeholder={placeholder || ''}
					  defaultValue={value || ''}
					  maxLength={maxLength || null}
			          onFocus={this.handleFocus}
					  onBlur={this.handleBlurChange}
			          onChange={this.handleBlurChange}
			          disabled={disabled || null}
					  required={required || null}
                      {...attributes}
					/>
				  <label htmlFor={idRes} className={(value && value.length > 0 ? 'is-active' : '')}>
					  {label || null}
					  {required ? <><span className="poemui-controls__im">*</span></> : ''}
				  </label>
				  {theme === 'line' ? <><ins className="poemui-controls__bar"></ins><ins className="poemui-controls__basic-bar"></ins></> : ''}
				  {units || null}

				</div>
	
		  </>
		)
	}
}