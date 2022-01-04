import React, { Component } from 'react';


/*-- Apply global scripts and styles --*/
import '@/components/_utils/styles/_all.scss';
import '@/components/_utils/styles/rtl/_all.scss';
import { __ } from '@/components/_utils/_all';

/*-- Apply this component styles --*/
import '@/components/HybridContentSlider/styles/_style.scss';

/*-- Apply Third-party animation plugins --*/
import TweenMax from '@/components/_plugins/_lib-gsap';

// 
import { hybridSliderAnime } from '@/components/HybridContentSlider/hybrid-slider-anime';
import HybridContentSliderItem from '@/components/HybridContentSlider/HybridContentSliderItem';

declare global {
    interface Window {
        dragEvents?: any[any];
        intervalEvents?: any[any];
    }
}

type HybridContentSliderProps = {
    /** Transition speed. This setting sets how long the transition animation lasts. Amount of time measured in milliseconds. */
    speed?: number;
    /** The direction of the component animation, the value can be `vertical` and `horizontal` */
    direction?: string;
    /** Setup a slider for the slider to animate automatically. */
	auto?: boolean;
    /** Autoplay interval. */
	timing?: number;
    /** Gives the slider a seamless infinite loop. */
	loop?: boolean;   
    /** Display or hide Navigation of paging control. */
    paginationEnabled?: boolean;   
    /** Display or hide Previous/Next arrow. */
	arrowEnabled?: boolean;   
	/** Previous arrow icon */
	arrowPrevIcon?: React.ReactNode;
	/** Next arrow icon */
	arrowNextIcon?: React.ReactNode;
    /** Allow drag and drop on the slider (touch devices will always work). */
    draggable?: boolean;   
    /** Drag & Drop Change icon/cursor while dragging. */
	draggableCursor?: string | boolean;
    /** Custom Navigation of paging control with HTML code.
     * For buttons or links, use the `data-index` attribute to control the index.
     */
    customPagination?: React.ReactNode;
    /** -- */
    id?: string;
};
type HybridContentSliderState = false;


export default class HybridContentSlider extends Component<HybridContentSliderProps, HybridContentSliderState> {

    private rootRef = React.createRef<HTMLDivElement>();

    uniqueID: string;

    constructor(props) {
        super(props);

        this.uniqueID = 'app-' + __.GUID.create();
    }


    componentDidMount() {

        const self = this;

        __( document ).ready( () => {

			const reactDomEl: any = self.rootRef.current;
			const $el = __( reactDomEl );

            //Get parameter configuration from the data-* attribute of HTML
            hybridSliderAnime($el, {
                'speed': $el.data('speed'),
                'dir': $el.data('dir'),
                'auto': $el.data('auto'),
                'timing': $el.data('timing'),
                'loop': $el.data('loop'),
                'paginationID': $el.data('controls-pagination'),
                'arrowsID': $el.data('controls-arrows'),
                'draggable': $el.data('draggable'),
                'draggableCursor': $el.data('draggable-cursor')
            });

        });


    }

     /** Remove the global list of events, especially as scroll and interval. */
     componentWillUnmount() {

        // Remove drag events from document
        if ( Array.isArray( window.dragEvents ) ) {
            window.dragEvents.forEach( function(fn){

                document.removeEventListener('mouseup', fn);
                document.removeEventListener('mousemove', fn);
                document.removeEventListener('touchend', fn);
                document.removeEventListener('touchmove', fn);
            });
            window.dragEvents = [];
        }


        // Remove interval events from window
        if ( Array.isArray( window.intervalEvents ) ) {
            window.intervalEvents.forEach( function(fn){
                clearInterval( fn );
            });
            window.intervalEvents = [];
        }



		// Kill all aniamtions
		TweenMax.killAll();  


    }


    render() {

        const {
            speed,
            direction,
            auto,
            timing,
            loop,
            paginationEnabled,
            arrowEnabled,
            arrowPrevIcon,
            arrowNextIcon,
            draggable,
            draggableCursor,
            customPagination,
            id,
            children
        } = this.props;

        const cid = id || this.uniqueID;


        return (
            <>
					       
            <div 
                ref={this.rootRef}
                id={cid}
                role="slider"
                className="poemui-hybrid-content-slider"
                data-speed={speed || 250} 
                data-dir={direction || 'horizontal'}
                data-draggable={draggable}
                data-draggable-cursor={draggableCursor || 'move'}
                data-auto={auto}
                data-loop={loop}
                data-timing={timing || 10000}
                data-controls-pagination={".app-hybridslider-pagination-" + cid}
                data-controls-arrows={".app-hybridslider-arrows-" + cid}>
                <div className="poemui-hybrid-content-slider__items">

                    {(children != null) ? (children as any[]).map((item, i) => {
                        const childProps = { ...item.props };
                        return <HybridContentSliderItem key={i} {...childProps} />;

                    })
                        : ""
                    }

                </div>

            </div>


            { paginationEnabled ? (
                <div className={"poemui-hybrid-content-slider__pagination app-hybridslider-pagination-" + cid}>{customPagination ? <>{customPagination}</> : ''}</div>
            ) : ''}

            <div className={"poemui-hybrid-content-slider__controls app-hybridslider-arrows-" + cid} style={{display: (arrowEnabled ? 'inherit' : 'none')}}>
                <a href="#" className="poemui-hybrid-content-slider__controls--prev">{ arrowPrevIcon || <><svg width="12" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="#333" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></> }</a>
                <a href="#" className="poemui-hybrid-content-slider__controls--next">{ arrowNextIcon || <><svg width="12" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="#333" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></> }</a>
            </div>
            
            </>
        )
    }
}

