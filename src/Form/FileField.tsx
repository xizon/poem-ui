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


declare global {
    interface Window { dropZoneTimeout: any; }
}


type FileFieldProps = {
	value?: string;
	label?: string | object;
	name?: string;
	required?: any;
	/** -- */
	id?: string;
};
type FileFieldState = false;



export default class FileField extends Component<FileFieldProps, FileFieldState> {
	
	private dropZoneRef = React.createRef<HTMLInputElement>();

	uniqueID: string;

	constructor(props) {
		super(props);
		
		this.uniqueID = 'app-' + __.GUID.create();
		
		this.handleDragOver = this.handleDragOver.bind(this);
        this.handleChange = this.handleChange.bind(this);
		
	}

	
	
	/**
	 * Bind a DragOver event to target modules.
	 *
	 */
    handleDragOver(event) {
		event.preventDefault();
		const $dropZone = __( this.dropZoneRef.current );
	
		const timeout = window.dropZoneTimeout;
		if (!timeout) {
			$dropZone.addClass( 'in' );
		} else {
			clearTimeout(timeout);
		}
		let found = false,
			$node = event.target;
		do {
			if ($node === $dropZone[0]) {
				found = true;
				break;
			}
			$node = $node.parentNode;
		} while ( $node != null );
		if (found) {
			$dropZone.addClass( 'hover' );
		} else {
			$dropZone.removeClass( 'hover' );
		}
		window.dropZoneTimeout = setTimeout(function() {
			window.dropZoneTimeout = null;
			$dropZone.removeClass( 'in hover' );
		}, 100 );	
		
    }
	
	
	
	/**
	 * Listen to changes on this control
	 *
	 */
    handleChange(event) {
		const el = __( event.target );
		const $input = el.get(0);
		
		if ( $input.files && $input.files[0] ) {
			const reader = new FileReader();
			reader.onload = function( e ) {
				const imgName = $input.files[0].name;
				$input.setAttribute( 'data-title', imgName );
				//console.log(e.target.result);
			}
			reader.readAsDataURL( $input.files[0] );
		}
		
	
    }
	
	
	componentDidMount() {

		document.removeEventListener('dragover', this.handleDragOver);
		document.addEventListener('dragover', this.handleDragOver);
	}

	/** Remove the global list of events, especially as scroll and interval. */
	componentWillUnmount() {

		// Remove scroll events from document
		document.removeEventListener('dragover', this.handleDragOver);

	}

	
	render() {
		
		const { 
			required,
			value,
			label,
			name,
			id,
			...attributes
		} = this.props;
		
		
		const nameRes = typeof(name) === 'undefined' ? ( typeof(label) !== 'undefined' ? __.toSlug( label ) : '' )  : name;
		const idRes = id || this.uniqueID;
	
		return (
		  <>
			
			
				<div className="poemui-controls__file-field-container">  
					<div className="poemui-controls__file-field-trigger">
					  <div>
						  <input 
			                  ref={this.dropZoneRef}
							  type="file"
			                  accept="image/*"
			                  data-title={value ? value : label || null}
							  id={idRes}
							  name={nameRes}
							  defaultValue={value || ''}
							  onChange={this.handleChange}
							  required={required || null}
							  {...attributes}
							/>
							<svg width="30" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#333" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>
			
					  </div>
					</div>
				</div>
	
		  </>
		)
	}
}
