/* 
 *************************************
 * <!-- Back To Top -->
 *************************************
 */
import React, { Component } from 'react';


/*-- Apply global scripts and styles --*/
import '@/components/_utils/styles/_all.scss';
import '@/components/_utils/styles/rtl/_all.scss';
import { __ } from '@/components/_utils/_all';

/*-- Apply this component styles --*/
import '@/components/BackToTop/styles/_style.scss';


/*-- Apply Third-party animation plugins --*/
import TweenMax from '@/components/_plugins/_lib-gsap';


// Adapt the easing parameters of TweenMax
enum EasingList {
    linear = 'Linear.easeNone',
    easeIn = 'Power2.easeIn', 
    easeOut = 'Power2.easeOut', 
    easeInOut = 'Power2.easeInOut'
}


type BackToTopProps = {
    /** Speed of scrolling up. Amount of time measured in milliseconds. */
    speed?: number;
    /** Types of easing animation */
    easing: string;
	/** Button Icon */
	btnIcon?: React.ReactNode;
};
type BackToTopState = {
    isAtRange?: boolean;
};


export default class BackToTop extends Component<BackToTopProps, BackToTopState> {

    speed: number;
    ease: string;
    windowScrollUpdate: () => void;

    constructor(props) {
        super(props);

        
        this.ease = EasingList[this.props.easing];
        this.speed = this.props.speed ? this.props.speed/1000 : 0.5;
		this.state = {
			isAtRange: false
		};

        // Add a scroll event listener to window
        this.handleScrollEvent = this.handleScrollEvent.bind(this);
        this.windowScrollUpdate = __.throttle(this.handleScrollEvent, 5);

    }

    handleScrollEvent() {
        if (__( window ).scrollTop() < window.innerHeight/2) {
            this.setState({ isAtRange: false });
        } else {
            this.setState({ isAtRange: true });
        }
    }


    moveToTop(e) {
        e.preventDefault();

        const self = this;

        TweenMax.to( window, self.speed, {
            scrollTo: {
                y: 0, //y: "max" -->*/} vertical scroll to bottom
                autoKill: false
            },
            ease: self.ease
        });

    }

    componentDidMount() {

        const self = this;

        __( document ).ready( () => {

            // Move HTML templates to tag end body </body>
            Array.prototype.forEach.call(document.querySelectorAll('.poemui-to-top:not(.is-loaded)'), (node) => {
                node.classList.add( 'is-loaded' );
                document.body.appendChild(node);
            });


            // Add function to the element that should be used as the scrollable area.
            window.removeEventListener('scroll', self.windowScrollUpdate);
            window.removeEventListener('touchmove', self.windowScrollUpdate);
            window.addEventListener('scroll', self.windowScrollUpdate);
            window.addEventListener('touchmove', self.windowScrollUpdate);
            self.windowScrollUpdate();


            //
            __( '.poemui-to-top > button' ).off( 'click' ).on( 'click', function( this: any, e: any ) { 
                self.moveToTop(e);
            });
             

        });


    }


    /** Remove the global list of events, especially as scroll and interval. */
    componentWillUnmount() {
        //Hide other pages button of back-to-top
        Array.prototype.forEach.call( document.querySelectorAll( '.poemui-to-top > button' ), function( el ) {
            el.classList.remove( 'is-active' );
        });

        // Remove scroll events from window
        window.removeEventListener('scroll', this.windowScrollUpdate);
        window.removeEventListener('touchmove', this.windowScrollUpdate);  

		// Kill all aniamtions
		TweenMax.killAll();


        // Remove all moved elements
        Array.prototype.forEach.call(document.querySelectorAll('.poemui-to-top.is-loaded'), (node) => {
            node.remove();
        });

    }


    render() {

        const {
            btnIcon,
        } = this.props;


        return (
            <>
            <div className="poemui-to-top">
                <button type="button" className={ this.state.isAtRange ? 'is-active' : ''}>
                    {btnIcon || <><svg width="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#333" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg></>}
                </button>
            </div>

            </>
        )
    }
}

