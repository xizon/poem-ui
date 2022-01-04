import React, { Component } from 'react';
import { __ } from '@/components/_utils/_all';

/*-- Apply Third-party animation plugins --*/
import TweenMax from '@/components/_plugins/_lib-gsap';

/* Recursively nested components to traverse nodes
-------------------------------------------------*/		
type MenuListProps = {
	menuListData: any[any];
};
type MenuListState = false;

export default class MenuList extends Component<MenuListProps, MenuListState>  {

	constructor(props) {
		super(props);
        this.handleCollapseMenuList = this.handleCollapseMenuList.bind(this);
    }

    handleCollapseMenuList(e) {

        const el = __(e.target);
        const $sub = el.next('ul');

        if ($sub.len() > 0) {

            e.preventDefault();
       
            if ( el.attr( 'aria-expanded' ) === 'false' || el.attr( 'aria-expanded' ) === null ) {
                //Hide other all sibling <ul> of the selected element
                const $siblingsItems = el.parent().siblings();
				if ( $siblingsItems.len() > 0 ) {
					$siblingsItems.each( function(this: any) {

						const _link = __( this ).find( '> a' );

						_link.removeClass('is-active').attr( 'aria-expanded', false );
						TweenMax.to( _link.next('ul').get(-1), 0.5, { height: 0 });
						
		
					});
				}

                el.addClass( 'is-active' ).attr( 'aria-expanded', true );
                el.parent( 'li' ).addClass( 'is-active' );

                //to open
                // - temporarilty set height:auto
                // - tween from height:0
                TweenMax.set($sub.get(-1), { height: 'auto' });
                TweenMax.from($sub.get(-1), 0.5, { height: 0 });

            } else {

                el.removeClass( 'is-active' ).attr( 'aria-expanded', false );
                el.parent( 'li' ).removeClass( 'is-active' );

                //to close
                TweenMax.to($sub.get(-1), 0.5, { height: 0 });

            }

        }

    }


	render() {
		if ( this.props.menuListData ) {
			
			return (
			  <>
                <ul className="poemui-vertical-menu">
                    
                    {this.props.menuListData.map((item, i) => {
                        return (
                        <li key={i}>
                            <a href={item.link || '#'} aria-expanded="false" onClick={this.handleCollapseMenuList}>
                                {item.title}
                                {item.children ? <span className="poemui-vertical-menu__arrow"><svg aria-hidden="true" width="8" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="#333" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></span> : ''}
                            </a>
                            {item.children && <MenuList menuListData={item.children}  />}
                        </li>
                        );
                    })}
                </ul>

			  </>
			)	
		} else {
			return (
				<></>
			)
		}
	}
}

