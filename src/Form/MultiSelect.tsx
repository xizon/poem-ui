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



type MultiSelectProps = {
	options: string;
	theme?: string;
	value?: string;
	name?: string;
	required?: any;
	/** -- */
	id?: string;
};
type MultiSelectState = false;


export default class MultiSelect extends Component<MultiSelectProps, MultiSelectState> {
	
	private rootRef = React.createRef<HTMLDivElement>();
	private resRef = React.createRef<HTMLInputElement>();
	
	uniqueID: string;

	constructor(props) {
		super(props);

		this.uniqueID = 'app-' + __.GUID.create();
	
        this.handleClickItem = this.handleClickItem.bind(this);
		
	}


    /**
     * Change Event Here
	  * Prevents the triggering of multiple change events
     */
	handleClickItem(event) {
		event.preventDefault();
		
		const el = __( event.target );
		const root = this.rootRef.current;
		const resInput = this.resRef.current;
		
		const $multiSelWrapper = __( root ),
			  curVal = el.data( 'value' ),
			  tarVal = __.removeFirstLastStr( __( resInput ).val(), ',' ) + ',';
		
		let resVal = '';
	
		
		//update each item status
		if ( __( resInput ).val().indexOf( curVal ) < 0 ) {
			el.addClass( 'is-active' ).attr( 'aria-checked', true );
		} else {
			el.removeClass( 'is-active' ).attr( 'aria-checked', false );
		}	

		//update result for input
		if ( tarVal.indexOf( curVal + ',' ) < 0 ) {
			resVal = tarVal + curVal + ',';
		} else {
			resVal = tarVal.replace( curVal + ',', '' );
		}

		resVal = __.removeFirstLastStr( resVal, ',' );
		
		
		//resort result
		let resValNew = '';
		const _valArr = resVal != '' ? resVal.split( ',' ) : [];
		_valArr.sort();    
		_valArr.forEach(function(item,i){
			resValNew += item + ',';
		});
		resValNew = __.removeFirstLastStr( resValNew, ',' );

		
		
		//update input
		__( resInput ).val( resValNew );
		


    }
	
		

	render() {
		
		const { 
			theme,
			options,
			required,
			value,
			name,
			id,
			...attributes
		} = this.props;
		
		
		const nameRes = typeof(name) === 'undefined' ? '' : name;
		const idRes = id || this.uniqueID;
		const wrapperClassTheme = theme === 'line' ? ' poemui-controls--line' : '';
		
		// Get all options from option prop
		const multiSelOptions = __.validate.isJSON( options ) ? JSON.parse( options ) : {};
		const optionKeys = Object.keys(multiSelOptions);
		const optionValues = Object.values(multiSelOptions);
		
		
		// Generate list of options
		const multiSelOptionsList = optionKeys.map((selectOption, index) => {
			
			//get current value
			const _val = value ? __.removeFirstLastStr( value, ',' ) : '';
			const _valArr = _val != '' ? _val.split( ',' ) : [];
			let activeThisEl = false;
			_valArr.forEach(function(item,i){
				if ( optionValues[index] === item ) {
					activeThisEl = true;
				}
			});
			
		    return (
			    <React.Fragment key={index}>
				    <span aria-checked={(activeThisEl ? 'true' : 'false')} role="checkbox" data-value={optionValues[index]} className={activeThisEl ? 'is-active' : ''}  onClick={this.handleClickItem}>
				        {theme === 'line' ? <><ins className="poemui-controls__bar"></ins><ins className="poemui-controls__basic-bar"></ins></> : ''}
				        {selectOption}
				        <i><svg width="10" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#333" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg></i>
				    </span>
				</React.Fragment>
			)
		});

		
		return (
		  <>

				<div ref={this.rootRef} className={"poemui-controls poemui-controls__multi-sel" + wrapperClassTheme} id={idRes + "__wrapper"}>
				  {multiSelOptionsList}

				</div>
				<input 
				  ref={this.resRef}
				  type="hidden"
				  id={idRes}
				  name={nameRes}
				  defaultValue={value || ''}
				  required={required || null}
				  {...attributes}
				/>
			
	
		  </>
		)
	}
}
