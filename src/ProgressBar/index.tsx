/* 
 *************************************
 * <!-- Progress Bar -->
 *************************************
 */
import React, { Component } from 'react';


/*-- Apply global scripts and styles --*/
import '@/components/_utils/styles/_all.scss';
import '@/components/_utils/styles/rtl/_all.scss';
import { __ } from '@/components/_utils/_all';

/*-- Apply this component styles --*/
import '@/components/ProgressBar/styles/_style.scss';


type ProgressBarProps = {
    /** Set a shape that circle, annulus or rectangle shaped progress bar. */
    shape?: string;
    /** Set a unit that is percentage for progress bar. */
    unit?: string;
    /** Set a percentage you want to show */
    value?: number;
    /** Reference to div element which presents the text label for progress bar. Returns empty if text is not defined. */
    label?: React.ReactNode;
    /** Whether to display percentage */
    displayPercentage?: boolean;
    /** -- */
    id?: string;
};
type ProgressBarState = false;


export default class ProgressBar extends Component<ProgressBarProps, ProgressBarState> {

    private rootRef = React.createRef<HTMLDivElement>();

    windowScrollUpdate: () => void;
    uniqueID: string;
    
    constructor(props) {
        super(props);

        this.uniqueID = 'app-' + __.GUID.create();

        // Add a scroll event listener to window
        this.handleScrollEvent = this.handleScrollEvent.bind(this);
        this.windowScrollUpdate = __.throttle(this.handleScrollEvent, 5);

    }

    handleScrollEvent() {

        const reactDomEl: any = this.rootRef.current;
        const viewport = 1;

        //
        const spyTop = reactDomEl.getBoundingClientRect().top;

        //Prevent asynchronous loading of repeated calls
        const actived = reactDomEl.dataset.activated;


        if (spyTop < (window.innerHeight * viewport)) {

            if (actived === undefined) {


                let	percent      = reactDomEl.dataset.progressbarPercent,
                    unit         = reactDomEl.dataset.progressbarUnit;

                if ( percent === undefined ) percent = 0;
                if ( unit === undefined ) unit = '%';


                //Radial Progress Bar
                
                if ( reactDomEl.classList.contains( 'poemui-progressbar--circle' ) ) {
                    reactDomEl.querySelector( '.poemui-progressbar__track' ).innerHTML = '<span>'+percent+'<em className="poemui-progressbar__unit">'+unit+'</em></span>';
                    reactDomEl.classList.add( 'poemui-progressbar--progress-' + percent )
                } 


                //Rectangle Progress Bar
                if ( reactDomEl.classList.contains( 'poemui-progressbar--rectangle' ) ) {
                    reactDomEl.querySelector( '.poemui-progressbar__bar > span' ).innerHTML = percent+'<em className="poemui-progressbar__unit">'+unit+'</em>';
                    reactDomEl.classList.add( 'poemui-progressbar--progress-' + percent )
                } 


                //Prevents front-end javascripts that are activated in the background to repeat loading.
                reactDomEl.dataset.activated = 1;


            }//endif actived


        }

    }


    componentDidMount() {

        // Add function to the element that should be used as the scrollable area.
        window.removeEventListener('scroll', this.windowScrollUpdate);
        window.removeEventListener('touchmove', this.windowScrollUpdate);
        window.addEventListener('scroll', this.windowScrollUpdate);
        window.addEventListener('touchmove', this.windowScrollUpdate);

        // Prevent calculation errors caused by unloaded completion
        __( document ).ready( () => {
            this.windowScrollUpdate();
        });

    }

    /** Remove the global list of events, especially as scroll and interval. */
    componentWillUnmount() {
		
        // Remove scroll events from window
        window.removeEventListener('scroll', this.windowScrollUpdate);
        window.removeEventListener('touchmove', this.windowScrollUpdate);  

    }


    render() {

        const {
            shape,
            unit,
            value,
            label,
            displayPercentage,
            id,
        } = this.props;


        let shapeClassName = '';
        if ( shape === 'annulus') {
            shapeClassName = 'poemui-progressbar--circle is-transparent';
        } else if ( shape=== 'circle' ) {
            shapeClassName = 'poemui-progressbar--circle';
        } else if ( shape=== 'rectangle' ) {
            shapeClassName = 'poemui-progressbar--rectangle';
        }


        return (
            <>
            
                <div 
                ref={this.rootRef}
                id={id || this.uniqueID}
                className={`${shapeClassName} poemui-progressbar--progress-0`} 
                data-progressbar-percent={value || 0} 
                data-progressbar-unit={unit}> 
                    { shape === 'rectangle' ? (<>
                        { label ? <><div className="poemui-progressbar__title">{label}</div></> : '' }
                        <div className="poemui-progressbar__bar">
                            <div className="poemui-progressbar__track"></div>
                            <span>0<em className="poemui-progressbar__unit">%</em></span>
                        </div>
                    </>) : (<>
                        <span className="poemui-progressbar__track">
                            { displayPercentage ? <><span>0<em className="poemui-progressbar__unit">{unit || ''}</em></span></> : '' }
                        </span>
                        <div className="poemui-progressbar__pie">
                            <div className="poemui-progressbar__pie--left-side poemui-progressbar__pie--half-circle"></div>
                            <div className="poemui-progressbar__pie--right-side poemui-progressbar__pie--half-circle"></div>
                        </div>
                        { label ? <><div className="poemui-progressbar__title">{label}</div></> : '' }
                    </>)}
                    
                </div>   


            </>
        )
    }
}

