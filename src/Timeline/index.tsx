/* 
 *************************************
 * <!-- Timeline -->
 *************************************
 */
import React, { Component } from 'react';


/*-- Apply global scripts and styles --*/
import '@/components/_utils/styles/_all.scss';
import '@/components/_utils/styles/rtl/_all.scss';
import { __ } from '@/components/_utils/_all';

/*-- Apply this component styles --*/
import '@/components/Timeline/styles/_style.scss';


// 
import TimelineItem from '@/components/Timeline/TimelineItem';

// Adapt the easing parameters of CSS3
enum EasingList {
    linear = 'linear',
    easeIn = 'ease-in', 
    easeOut = 'ease-out', 
    easeInOut = 'ease-in-out'
}


interface ItemConfig {
    url?: string | undefined;
    title?: React.ReactNode | undefined;
    content?: React.ReactNode | undefined;
    node?: React.ReactNode | undefined;
}


type TimelineProps = {
    /** When true, the click event will be used to control the display effect of the timeline. */
    interactiveEnabled?: boolean;
    /** With the focus effect enabled, only one Item will be displayed each time you switch. 
     * Only available when `interactiveEnabled` is true. */
    focusEnabled?: boolean;
    /** Let the focus of the entire interaction always be displayed in the center.
     * Only available when `focusEnabled` is true. */
    focusCenteredEnabled?: boolean;
    /** Transition speed. This setting sets how long the transition animation lasts. Amount of time measured in milliseconds. */
    speed?: number;
    /** Types of easing animation */
    easing: string;
    /** The direction of the component animation, the value can be `vertical` and `horizontal` */
    direction?: string;
    /** Centered vertical or horizontal timelines. In this layout, the timeline runs right down 
     * the center of the page, with branches coming off of alternate sides of the timeline.
     * When `focusEnabled` is true, this setting is invalid. */
    centered?: boolean;
    /** Specify data of items as a JSON string format. 
     * Such as: `[{"url":"xxx.jpg","title":<>Title 1</>,"content":"<><p>content here</p></>","node":"<>Feb 19</>},{"url":"xxx.jpg","title":<>Title 1</>,"content":"<><p>content here</p></>","node":"<>Jan 2</>}]` */
    data?: ItemConfig[];
	/** Previous arrow icon */
	arrowPrevIcon?: React.ReactNode;
	/** Next arrow icon */
	arrowNextIcon?: React.ReactNode;
    /** -- */
    id?: string;
};
type TimelineState = false;


export default class Timeline extends Component<TimelineProps, TimelineState> {

    private rootRef = React.createRef<HTMLDivElement>();
    private pushCurrentTextRef = React.createRef<HTMLDivElement>();


    speed: number;
    ease: string;
    dir: string;
    uniqueID: string;

    constructor(props) {
        super(props);

        this.uniqueID = 'app-' + __.GUID.create();
        this.speed = this.props.speed ? this.props.speed/1000 : 0.5;
        this.ease = EasingList[this.props.easing];
        this.dir = this.props.direction === 'vertical' ? 'vertical' : 'horizontal';

        this.handleClickItem = this.handleClickItem.bind(this);
        this.handleClickPrev = this.handleClickPrev.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);

    }

    handleClickItem(e) {
        if ( this.props.interactiveEnabled ) {
            e.preventDefault();
            this.timelineUpdate( e.currentTarget, false, this.dir );
        }
    }
    handleClickPrev(e) {
        e.preventDefault();
        this.timelineUpdate( null, true, this.dir );   
    }

    handleClickNext(e) {
        e.preventDefault();
        this.timelineUpdate( null, false, this.dir );   
    }

    /*
    * Method that updates items of timeline
    *
    * @param  {?Element} targetEl           - The current item.
    * @param  {Boolean} isPrev              - Whether to slide forward.
    * @param  {String} dir                  - Timeline direction.
    * @return {Void}
    */
    timelineUpdate( targetEl, isPrev, dir ) {
        const root: any = this.rootRef.current;
        const $items       = root.querySelectorAll( '.poemui-timeline__item' ),
              itemsTotal   = $items.length,
              tLoop        = false;
    
        const $timeline      = root.querySelector( '.poemui-timeline' ),
              $prev          = root.querySelector( '.poemui-timeline__btn--prev' ),
              $next          = root.querySelector( '.poemui-timeline__btn--next' );   


        let currentIndex = 0;
        let targetIndex;

        if ( targetEl === null ) {
            const elFiltered = Array.prototype.slice.call($items).filter(function(node, index){
                if ( node.classList.contains( 'is-active' ) ) {
                    currentIndex = index;
                    return node;
                }
            });
            // current element: elFiltered[0]
            
        } else {
            currentIndex = Array.prototype.slice.call($items).indexOf(targetEl.parentElement);
        }

        
        //Check if a value is an object currently
        if ( targetEl != null && Object.prototype.toString.call(targetEl) === '[object HTMLDivElement]' ) {
            targetIndex = currentIndex;
        } else {
            
            if ( isPrev ) {
                targetIndex = ( currentIndex >= 0  ) ? currentIndex-1 : 0;
            } else {
                targetIndex = ( currentIndex < itemsTotal  ) ? currentIndex+1 : itemsTotal-1;
            }
            
        }

        
        //loop the items
        if ( $prev !== null ) $prev.classList.remove( 'is-disabled' );
        if ( $next !== null ) $next.classList.remove( 'is-disabled' );
        
        if ( isPrev ) {
            
            //Previous
            if ( tLoop ) {
                if ( targetIndex < 0 ) targetIndex = itemsTotal-1;
            } else {
                if ( targetIndex < 0 ) targetIndex = 0;
                if ( targetIndex == 0 && $prev !== null ) $prev.classList.add( 'is-disabled' );
                
                    
            }
        } else {
            
            //Next
            if ( tLoop ) {
                if ( targetIndex == itemsTotal ) targetIndex = 0;
            } else {
                if ( targetIndex > itemsTotal-1 ) targetIndex = itemsTotal-1;
                if ( targetIndex > itemsTotal-2 && $next !== null) $next.classList.add( 'is-disabled' );
                if ( targetIndex == 0 && $prev !== null) $prev.classList.add( 'is-disabled' );
            }
        }

        
        //activate the default item
        Array.prototype.forEach.call( $items, function( el ) {
            el.classList.remove( 'is-active' );
        });
        $items[targetIndex].classList.add( 'is-active' );


        //scroll left
        if ( dir == 'horizontal' ) {
            let moveWidth = 0;
            for ( let i = 0; i < targetIndex; i++ ) {
                moveWidth += $items[i].clientWidth; //including: padding
            }

            if ( $timeline !== null ) $timeline.style.marginLeft = -moveWidth + 'px';  
        }

        
        //scroll top
        if ( dir == 'vertical' ) {
            let moveHeight = 0;
            for ( let i = 0; i < targetIndex; i++ ) {

                const _item = $items[i];
                const _style = window.getComputedStyle(_item as HTMLElement);
                const outerHeight = (_item as HTMLElement).offsetHeight + parseFloat( _style.marginTop ) + parseFloat( _style.marginBottom ); //including: padding + borders + v-scrollbars (if rendered) + margin

                moveHeight += outerHeight;
                
            }

            if ( $timeline !== null ) $timeline.style.marginTop = -moveHeight + 'px';
            
        }
        
        
        //Push the current text to focus element 
        const pushCurrentTextDiv: any = this.pushCurrentTextRef.current;
        if ( pushCurrentTextDiv !== null ) {
            pushCurrentTextDiv.innerHTML = $items[targetIndex].querySelector( '.poemui-timeline__item__date' ).innerHTML.replace(/(<([^>]+)>)/ig, '');
        }

        
        
    }
    
    componentDidMount() {


        // Initialize Horizontal
        //-------------------------------------		
        const root: any = this.rootRef.current;
        const $container     = root.querySelector( '.poemui-timeline__container' ),
              $timeline      = root.querySelector( '.poemui-timeline' ),
              $prev          = root.querySelector( '.poemui-timeline__btn--prev' );   

        //Activate the default item
        const targetEl = $timeline.querySelector( '.poemui-timeline__item.is-active .poemui-timeline__item__img' );
        this.timelineUpdate( targetEl, false, this.dir );
        if ( $prev !== null ) $prev.classList.add( 'is-disabled' );



        // for reversed timeline
        if ( this.dir === 'horizontal' && root.classList.contains( 'is-reversed' ) && window.innerWidth > 768 ) {

            // Set equal heights
            const setEqualHeights = function( el ) {
                let counter = 0;

                for ( let i = 0; i < el.length; i++) {

                    const _item = el[i];
                    const _style = window.getComputedStyle(_item as HTMLElement);
                    const outerHeight = (_item as HTMLElement).offsetHeight + parseFloat( _style.marginTop ) + parseFloat( _style.marginBottom ); //including: padding + borders + v-scrollbars (if rendered) + margin

                    const singleHeight = outerHeight;

                    if (counter < singleHeight) {
                        counter = singleHeight;
                    }
                }

                for ( let k = 0; k < el.length; k++) {
                    el[k].style.height = counter + 'px';
                }

                return counter;

            };


            // Reset container height
            const infoNewHeight = setEqualHeights( $timeline.querySelectorAll( '.poemui-timeline__item__info' ) );
            $container.style.padding = ( infoNewHeight + 64 ) + 'px 0';

        }
    }




    render() {

        const {
            interactiveEnabled,
            focusEnabled,
            focusCenteredEnabled,
            centered,
            data,
            arrowPrevIcon,
            arrowNextIcon,
            id
        } = this.props;

        // Time-node position
        //-----
        let timeNodePos = 0;

        // "Centered" setting
        //-----
        let wrapperClassCentered = centered ? ' is-reversed' : '';

        // "Interactive", "Interactive Focus" and "Interactive Focus Centered" settings
        //-----
        let pushCurrentTextOutput: React.ReactNode = '';
        let wrapperClassInteractiveFocusCentered = '';
        let wrapperClassInteractive = interactiveEnabled ? ' js-poemui-timeline' : '';

        //(only for horizontal timeline)
        if ( this.dir === 'horizontal' && interactiveEnabled && focusEnabled ) {

            //extra style 
            wrapperClassInteractive += ' poemui-timeline__container-wrapper--classic';

            //set focus centered
            wrapperClassInteractiveFocusCentered = focusCenteredEnabled ? ' poemui-timeline--to-center' : '';

            //set centered
            wrapperClassCentered = '';

            //set focus element 
            pushCurrentTextOutput = <><h2 className="poemui-t-c" ref={this.pushCurrentTextRef}></h2></>;
        }

        //(for horizontal and vertical timeline)
        if ( interactiveEnabled && focusEnabled ) {
            //set time-node position
            timeNodePos = 1;
        }

    
        return (
            <>
                <div
                    ref={this.rootRef}
                    id={id || this.uniqueID}
                    className={`poemui-timeline__container-wrapper is-${this.dir}` + wrapperClassCentered + wrapperClassInteractive}>

                    {pushCurrentTextOutput}

                    <div className="poemui-timeline__container">
                        <div className={"poemui-timeline" + wrapperClassInteractiveFocusCentered} style={{transition: `all ${this.speed}s ${this.ease} 0s` }}>
                            {data?.map((item, i) => {
							const _defaultActive = i === 0 ? true : false;
                                return <TimelineItem
                                    key={"item" + i}
                                    defaultActive={_defaultActive}
                                    url={item.url}
                                    title={item.title}
                                    content={item.content}
                                    node={item.node}
                                    nodePosition={timeNodePos}
                                    clickEv={this.handleClickItem}
                                />;

                            })}
                        </div>
                    </div>

                    
                    {interactiveEnabled ? (
                        <>
                            <a onClick={this.handleClickPrev} href="#" className="poemui-timeline__btn poemui-timeline__btn--prev">{ arrowPrevIcon || <>{this.dir === 'horizontal' ? <><svg width="12" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="#333" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></> : <><svg width="12" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#333" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg></>}</> }</a>
                            <a onClick={this.handleClickNext} href="#" className="poemui-timeline__btn poemui-timeline__btn--next">{ arrowNextIcon || <>{this.dir === 'horizontal' ? <><svg width="12" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="#333" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></> : <><svg width="12" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#333" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg></>}</> }</a>
                        </>
                    ) : ''}



                </div>

            </>
        )
    }
}
