import React, { Component } from 'react';


/*-- Apply global scripts and styles --*/
import '@/components/_utils/styles/_all.scss';
import '@/components/_utils/styles/rtl/_all.scss';
import { __ } from '@/components/_utils/_all';

/*-- Apply this component styles --*/
import '@/components/TabsAnimated/styles/_style.scss';


//
import TabList from '@/components/TabsAnimated/TabList';
import TabPanel from '@/components/TabsAnimated/TabPanel';


type TabsAnimatedProps = {
	/** -- */
	id?: string;
};
type TabsAnimatedState = {
	selected: number;
};


export default class TabsAnimated extends Component<TabsAnimatedProps, TabsAnimatedState> {

	uniqueID: string;
	
	constructor(props) {
		super(props);

		this.uniqueID = 'app-' + __.GUID.create();
		
		this.state={
			selected: 0
		}	

		this.handleClickItem = this.handleClickItem.bind(this);
		
	}


	handleClickItem(itemIndex) {

		return (e) => { // e is the event object that returned
			e.preventDefault();

			this.setSelected(itemIndex);

			const animSpeed: any = __.cssProperty.getTransitionDuration( __( '.poemui-tabs-animated .poemui-tabs__content' )[0] );	

			__( '.poemui-tabs-animated .poemui-tabs__content.is-active' ).removeClass('is-active').addClass('leave');							
			setTimeout( function() {
				__( '.poemui-tabs-animated .poemui-tabs__content' ).removeClass('leave').eq(itemIndex).addClass('is-active');								
			}, animSpeed);
		};


	}


	componentDidMount() {
		

		__( document ).ready( () => {

			//init content boxes height
			const maxContentHeight = __( '.poemui-tabs-animated .poemui-tabs__content' ).maxDimension().height;	
			__( '.poemui-tabs-animated' ).css({'height': (maxContentHeight+60)+'px'});			
			
			
		});

	}

	
	setSelected(index){
		this.setState({
			selected: index
		});
	}

	
	render() {
		
		const { 
			id,
			children // the contents of the TabList and TabPanel in a loop
		} = this.props;

		
		return (
		  <>
 
			  <div id={id || this.uniqueID} className="poemui-tabs-animated">
				<div className="poemui-tabs__nav">
					<ul role="tablist">
						{( children != null ) ? (children as any[]).map((item, i) => {
							const childProps = { ...item.props };
							const itemIndex = i;
							const activeClassName = (itemIndex === this.state.selected) ? 'is-active' : '';
							
							delete childProps.key;
							delete childProps.defaultActive;

							if ( item.key.indexOf( 'tab-list' ) >= 0 ) {
								return <TabList className={activeClassName} key={item.key} {...childProps} onClick={this.handleClickItem(itemIndex)} />;
							}

						})
						 : ""
						}
					</ul>
				</div>
				{/*<!-- /.poemui-tabs__nav -->*/}

				<div className="poemui-tabs__contentWrapper">

					{( children != null ) ? (children as any[]).map((item, i) => {

					    const childProps = { ...item.props };
						
						delete childProps.key;
						
						if ( item.key.indexOf( 'tab-panel' ) >= 0 ) {
							return <TabPanel key={item.key} {...childProps} />;
						}					
					    								
					 })
					 : ""
					}


				</div>
			  </div>
			  {/*<!-- .poemui-tabs-animated end -->*/}     


	
		  </>
		)
	}
}

