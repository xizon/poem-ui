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


type DynamicFieldsProps = {
	value?: string;
	removeLabel?: string;
	addLabel?: string;
	tempHtmlString?: string | object;
	maxFields?: any;
	/** -- */
	id?: string;
};
type DynamicFieldsState = {
	elVals: Array<any>;
};


export default class DynamicFields extends Component<DynamicFieldsProps, DynamicFieldsState> {

	private rootRef = React.createRef<HTMLDivElement>();
	private addBtnRef = React.createRef<HTMLAnchorElement>();

	uniqueID: string;

	constructor(props) {
		super(props);

		this.uniqueID = 'app-' + __.GUID.create();

		this.state = {
			elVals: this.props.value ? [...Array( JSON.parse( '[' + this.props.value + ']' ).length-1 )].map(() => [""]) : [] 
		};
		
		this.handleClickAdd = this.handleClickAdd.bind(this);
		this.handleClickRemove = this.handleClickRemove.bind(this);
		
		
	}

	handleClickAdd(event){
		event.preventDefault();
		
		const root = this.rootRef.current;
		const curVal = this.state.elVals;
		
	
		//button status
		if ( curVal.length >= parseFloat(this.props.maxFields) && this.addBtnRef.current != null ) {
			this.addBtnRef.current.style.display = 'none';
		}


		//
		this.setState(function(prevState) {
		  return {
			elVals: [...prevState.elVals, [""]]
		  };
		});
		
		
	}

	
	handleClickRemove(param) { // param is the argument you passed to the function
		
		const curVal = this.state.elVals;
		
		//button status
		if ( curVal.length <= parseFloat(this.props.maxFields) && this.addBtnRef.current != null ) {
			this.addBtnRef.current.style.display = 'inherit';
		}
		
		
		//
		return (e) => { // e is the event object that returned
			e.preventDefault();
			
			let elVals = [...curVal];
			elVals.splice(param,1);
			//console.log(curVal); //[[""],[""],[""],[""]]
			this.setState({ elVals });
		};
	}
	
	createUI(){
		return this.state.elVals.map((el, i) => 
		   <div key={i} className="poemui-controls__dynamic-fields__tmpl__wrapper">
									 
				{el.map((data,index) => {
						return (
							<React.Fragment key={index}>
								{this.props.tempHtmlString}
							</React.Fragment>
						)
					})
				}

			  &nbsp;&nbsp;
			  <a href="#" className="poemui-controls__dynamic-fields__removebtn" onClick={this.handleClickRemove(i)}><svg width="15" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#333" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z"></path></svg></a> {this.props.removeLabel || ''}
		   </div>          
		)
	}

	componentDidMount() {

		const _val = this.props.value ? JSON.parse( '[' + this.props.value + ']' ) : [];
	
	
		
		//update values for all displayed controls
		const root = this.rootRef.current;
		const controls = __( root ).find( '.poemui-controls__dynamic-fields__append' ).find( '[name]' );
		
		let n = 0;
		_val.map((data,index) => {

			data.map((item,i) => {

				//console.log(index + '===' + item + 'i: ' + i);
				if ( controls[n] ) controls[n].value = item;
				n++;

			})	

		});
		
		
			

	}
	
	

	render() {
		
		const { 
			addLabel,
			tempHtmlString,
			maxFields,
			id
		} = this.props;
		

		const idRes = id || this.uniqueID;

		
		return (
		  <>

				<div ref={this.rootRef} className="poemui-controls__dynamic-fields-container" data-max-fields={maxFields || 10} id={idRes}>
					<div className="poemui-controls__dynamic-fields__append">
			            {tempHtmlString}
			            {this.createUI()}
			       </div>
					<a ref={this.addBtnRef} href="#" className="poemui-controls__dynamic-fields__addbtn" onClick={this.handleClickAdd}><svg width="15" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#333" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg> {addLabel || 'Add new'}</a>

				</div>
			
		  </>
		)
	}
}


