import React, { Component } from 'react';

/*-- Apply global scripts and styles --*/
import '@/components/_utils/styles/_all.scss';
import '@/components/_utils/styles/rtl/_all.scss';
import { __ } from '@/components/_utils/_all';

/*-- Apply this component styles --*/
import '@/components/Slideshow/styles/_style.scss';
import '@/components/Slideshow/styles/rtl/_style.scss';


// 
import { sliderAnime } from '@/components/Slideshow/slider-anime';
import SlideshowItem from '@/components/Slideshow/SlideshowItem';

declare global {
    interface Window {
        dragEvents?: any[any];
        intervalEvents?: any[any];
        windowResizeEvents?: any[any];
    }
}

type SlideshowProps = {
    /** Transition effects */
    effect?: string;
    /** Setup a slideshow for the slider to animate automatically. */
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
    /** -- */
    id?: string;
};
type SlideshowState = false;


export default class Slideshow extends Component<SlideshowProps, SlideshowState> {

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
            sliderAnime($el, {
                'auto': $el.data('auto'),
                'timing': $el.data('timing'),
                'loop': $el.data('loop'),
                'countTotalID': $el.data('count-total'),
                'countCurID': $el.data('count-now'),
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


		// Remove resize events from window
        if ( Array.isArray( window.windowResizeEvents ) ) {
            window.windowResizeEvents.forEach( function(fn){
                clearInterval( fn );
            });
            window.windowResizeEvents = [];
        }


    }


    render() {

        const {
            effect,
            auto,
            timing,
            loop,
            paginationEnabled,
            arrowEnabled,
            arrowPrevIcon,
            arrowNextIcon,
            draggable,
            draggableCursor,
            id,
            children
        } = this.props;

        const cid = id || this.uniqueID;


        return (
            <>


            <div role="banner" className="poemui-slideshow__wrapper" id={cid}>
                <div ref={this.rootRef}
                    className={"poemui-slideshow__outline poemui-slideshow poemui-slideshow--eff-" + effect}
                    data-draggable={draggable}
                    data-draggable-cursor={draggableCursor || 'move'}
                    data-auto={auto}
                    data-loop={loop}
                    data-timing={timing || 10000}
                    data-count-total="false"
                    data-count-now="false"
                    data-controls-pagination={".app-slider-pagination-" + cid}
                    data-controls-arrows={".app-slider-arrows-" + cid}>
                    <div className="poemui-slideshow__inner">

                        {(children != null) ? (children as any[]).map((item, i) => {
                            const childProps = { ...item.props };
                            return <SlideshowItem key={i} {...childProps} />;

                        })
                            : ""
                        }

                    </div>
                    {/*<!-- /.poemui-slideshow__inner -->*/}

                </div>
                {/*<!-- /.poemui-slideshow__outline -->*/}

            </div>
            {/*<!-- /.poemui-slideshow__wrapper -->*/}


            { paginationEnabled ? (
                <div className={"poemui-slideshow__pagination app-slider-pagination-" + cid}></div>
            ) : ''}

            { arrowEnabled ? (
                <div className={"poemui-slideshow__arrows app-slider-arrows-" + cid}>
                <a href="#" className="poemui-slideshow__arrows--prev">{ arrowPrevIcon || <><svg width="12" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="#333" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></> }</a>
                <a href="#" className="poemui-slideshow__arrows--next">{ arrowNextIcon || <><svg width="12" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="#333" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></> }</a>
            </div>
            ) : ''}
            
            </>
        )
    }
}

