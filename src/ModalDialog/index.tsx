/* 
 *************************************
 * <!-- Modal Dialog -->
 *************************************
 */
import React, { Component } from 'react';


/*-- Apply global scripts and styles --*/
import '@/components/_utils/styles/_all.scss';
import '@/components/_utils/styles/rtl/_all.scss';
import { __ } from '@/components/_utils/_all';

/*-- Apply this component styles --*/
import '@/components/ModalDialog/styles/_style.scss';
import '@/components/ModalDialog/styles/rtl/_style.scss';

/*-- Apply Third-party animation plugins --*/
import TweenMax from '@/components/_plugins/_lib-gsap';


//Destroys body scroll locking
import { clearAllBodyScrollLocks } from '@/components/_plugins/_lib-scrolllock';

// 
import { fireModalDialog } from '@/components/ModalDialog/fire-modal-dialog';
import { closeModalDialog } from '@/components/ModalDialog/close-modal-dialog';

declare global {
    interface Window {
        curVideo?: any;
        setCloseModalDialog?: any;
    }
}


type ModalDialogProps = {
    /** Custom modal height whick need a unit string.  
     * This attribute "data-modal-height" may not exist. Such as: 200px
    */
    height?: number | string | boolean;
    /** Custom modal width whick need a unit string.
     * This attribute "data-modal-width" may not exist. Such as: 200px
     */
    width?: number | string | boolean;
    /** Whether to enable the lightbox effect */
    lightbox?: boolean;
    /** Specify auto-close time. This function is not enabled when this value is false. If the value is 2000, it will automatically close after 2 seconds. */
    autoClose?: number | boolean;
    /** Disable mask to close the window */
    closeOnlyBtn?: boolean;

    /** /////  */
    /** Toggles whether fullscreen should be enabled */
    fullscreen?: boolean;
    /** Set a window title */
    heading?: React.ReactNode;
    /** Tag name of the trigger. Allowed values are: `a`, `button`, `div`, `span` */
    triggerTagName?: string;
    /** Specify a class for this Node. */
    triggerClassName?: string;
    /** Set a piece of text or HTML code for the trigger */
    triggerContent?: React.ReactNode;
    /** Automatically open the component, you can use it with the `autoClose` property at the same time */
    autoOpen?: boolean;
    /** Adapt the video to the window */
    enableVideo?: boolean;
    /** -- */
    id?: string;
};
type ModalDialogState = false;


export default class ModalDialog extends Component<ModalDialogProps, ModalDialogState> {

    uniqueID: string;

    constructor(props) {
        super(props);

        this.uniqueID = 'app-' + __.GUID.create();
    }


    closeWin(e) {
        e.preventDefault();
        this.closeAction();
    }


    openWin(e, obj) {
        e.preventDefault();
        this.openAction(obj);

    }


    closeAction() {
        // pause video without controls
        //------------------------------------------
        if (window.curVideo !== null) window.curVideo.pause();


        // close Modal Dialog
        //------------------------------------------
        closeModalDialog( __( '.poemui-modal-box' ) );
    }


    openAction(obj) {

        const self = this;
        const curModalID = '#' + obj.data('modal-id');

        //Delay Time when Full Screen Effect is fired.
        const modalSpeed: any = __.cssProperty.getTransitionDuration(__('.poemui-modal-box:first-child')[0]);

        let dataH = obj.data('modal-height'),
            dataW = obj.data('modal-width'),
            dataLightbox = obj.data('modal-lightbox'),
            dataCloseTime = obj.data('modal-close-time'),
            dataCloseOnlyBtn = obj.data('modal-close-onlybtn');


        if (dataH === null) dataH = false;
        if (dataW === null) dataW = false;
        if (dataLightbox === null) dataLightbox = true;
        if (dataCloseTime === null) dataCloseTime = false;
        if (dataCloseOnlyBtn === null) dataCloseOnlyBtn = false;

        // Video PopUp Interaction
        //------------------------------------------
        const hasVideo = __( curModalID ).hasClass('is-video') ? true : false;

        if (hasVideo) {

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const $videoWrapper = __( curModalID ).find('.poemui-modal-box__video-container');
            const isIframe = $videoWrapper.find('iframe').len() > 0 ? true : false;
            let $video: any = isIframe ? $videoWrapper.find('iframe') : $videoWrapper.find('video');

            //
            const setVideo = function (currentWidth, currentHeight, obj) {

                const newMaxW = windowWidth - 80,
                    newMaxH = windowHeight - 80;

                let newW = currentWidth,
                    newH = currentHeight;


                if (currentHeight > newMaxH) {
                    newH = newMaxH;

                    //Scaled/Proportional Content 
                    newW = currentWidth * (newH / currentHeight);

                }

                if (newW > newMaxW) {
                    newW = newMaxW;

                    //Scaled/Proportional Content 
                    newH = currentHeight * (newW / currentWidth);
                }


                obj.css({
                    'left': (newMaxW - newW) / 2 + 'px',
                    'top': (newMaxH - newH) / 2 + 'px',
                    'height': newH + 'px',
                    'width': newW + 'px'
                });

                if (windowWidth <= 768) {
                    obj.css({
                        'top': 0
                    }).parent().css({
                        'top': (newMaxH - newH) / 2 + 'px'
                    });

                }
            };


            if (isIframe) {
                setVideo($video.width(), $video.height(), $video);
            } else {

                const _sources = $video.get(0).getElementsByTagName('source');
                const _src = _sources.length > 0 ? _sources[0].src : $video.get(0).src;

                self.getVideoDimensions(_src).then(function (res: any): void {
                    setVideo(res.width, res.height, $video);
                });
            }

            //Set current video when the tag is <video>
            window.curVideo = $video.get(0).tagName === 'VIDEO' ? $video.get(0) : null;


        }


        // fire Modal Dialog
        //------------------------------------------
        fireModalDialog( __( curModalID ), {
            height       : dataH,
            width        : dataW,
            speed        : modalSpeed,
            btn          : obj,
            lightbox     : dataLightbox,
            autoClose    : dataCloseTime,
            closeOnlyBtn : dataCloseOnlyBtn
        });
        

    }


    createTrigger(tagName, classes, content, dataID, dataCloseOnlyBtn, dataAutoClose, dataWidth, dataHeight, dataAutoOpen, dataLightbox) {

        switch (tagName) {
    
            case 'a':
                return (
                    <>
                        <a role="button" href="#" className={classes} data-modal-width={dataWidth} data-modal-height={dataHeight} data-modal-auto-open={dataAutoOpen} data-modal-id={dataID} data-modal-close-onlybtn={dataCloseOnlyBtn} data-modal-close-time={dataAutoClose} data-modal-lightbox={dataLightbox}>{content}</a>
                    </>
                )
    
            case 'button':
                return (
                    <>
                        <button type="button" className={classes} data-modal-width={dataWidth} data-modal-height={dataHeight} data-modal-auto-open={dataAutoOpen} data-modal-id={dataID} data-modal-close-onlybtn={dataCloseOnlyBtn} data-modal-close-time={dataAutoClose} data-modal-lightbox={dataLightbox}>{content}</button>
                    </>
                )
    
            case 'div':
                return (
                    <>
                        <div role="button" className={classes} data-modal-width={dataWidth} data-modal-height={dataHeight} data-modal-auto-open={dataAutoOpen} data-modal-id={dataID} data-modal-close-onlybtn={dataCloseOnlyBtn} data-modal-close-time={dataAutoClose} data-modal-lightbox={dataLightbox}>{content}</div>
                    </>
                )
    
            case 'span':
                return (
                    <>
                        <span role="button" className={classes} data-modal-width={dataWidth} data-modal-height={dataHeight} data-modal-auto-open={dataAutoOpen} data-modal-id={dataID} data-modal-close-onlybtn={dataCloseOnlyBtn} data-modal-close-time={dataAutoClose} data-modal-lightbox={dataLightbox}>{content}</span>
                    </>
                )
    
        }
    
    }
    


    //Returns the dimensions of a video asynchrounsly.
    getVideoDimensions(url) {
        return new Promise(function (resolve) {
            // create the video element
            let video = document.createElement('video');

            // place a listener on it
            video.addEventListener("loadedmetadata", function () {
                // retrieve dimensions
                let height = this.videoHeight;
                let width = this.videoWidth;
                // send back result
                resolve({
                    height: height,
                    width: width
                });
            }, false);

            // start download meta-datas
            video.src = url;
        });
    }


    componentDidMount() {

        const self = this;
        window.curVideo = null;

        __( document ).ready( () => {

            //Add modal mask to stage
            if (__('.poemui-modal-mask').len() == 0) {
                __('body').prepend('<div class="poemui-modal-mask"></div>');
            }

            const btnClose = '.poemui-modal-box [data-modal-close-trigger], .poemui-modal-mask:not(.js-poemui-disabled)';
            __( btnClose ).off( 'click' ).on( 'click', function (this: any, e: any) {
                self.closeWin(e);
            });


            // Move HTML templates to tag end body </body>
            Array.prototype.forEach.call(document.querySelectorAll('.poemui-modal-box:not(.is-loaded)'), (node) => {
                node.classList.add( 'is-loaded' );
                document.body.appendChild(node);
            });   


            //click to open Modal Dialog 
            const btnOpen = '[data-modal-id]';
            __( btnOpen ).off( 'click' ).on( 'click', function (this: any, e: any) {
                self.openWin(e, __( this ));
            });


            //automatically open Modal Dialog 
            __( btnOpen ).each(function (this: any) {

                let dataAutoOpen = __( this ).data('modal-auto-open');
                if (dataAutoOpen === null) dataAutoOpen = false;
                if (dataAutoOpen) self.openAction(__( this ));

            });



        });


    }

    /** Remove the global list of events, especially as scroll and interval. */
    componentWillUnmount() {
        clearAllBodyScrollLocks();  

		// Kill all aniamtions
		TweenMax.killAll();  

        // Cancels a timeout previously established by calling setTimeout().
        clearTimeout( window.setCloseModalDialog );	

        // Remove all moved elements
        Array.prototype.forEach.call(document.querySelectorAll('.poemui-modal-box.is-loaded'), (node) => {
            node.remove();
        });

    }


    render() {

        const {
            height,
            width,
            lightbox,
            autoClose,
            closeOnlyBtn,
            fullscreen,
            heading,
            triggerTagName,
            triggerClassName,
            triggerContent,
            autoOpen,
            enableVideo,
            id,
            children
        } = this.props;

        const cid = id || this.uniqueID;
        const fullClassName = fullscreen ? 'is-fullscreen' : '';
        const lightboxEnabled = (lightbox === null || lightbox === undefined) ? true : lightbox;

        return (
            <>

                {this.createTrigger(triggerTagName, triggerClassName, triggerContent, cid, closeOnlyBtn, autoClose, width, height, autoOpen, lightboxEnabled)}

                {!enableVideo ? (
                    <div className={`poemui-modal-box ${fullClassName}`} role="dialog" tabIndex={-1} aria-hidden="true" id={cid}>
                        <button type="button" className="poemui-modal-box__close" data-modal-close-trigger="true"><svg style={{verticalAlign:"middle",width:"15px"}} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="#fff" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></button>
                        <div className="poemui-modal-box__content" role="document">
                            <div className="poemui-modal-box__head">
                                {heading || ''}
                            </div>
                            <div className="poemui-modal-box__body">
                                <div role="note">
                                    {/*<!-- ////////  content  begin //////// -->*/}
                                    {children}
                                    {/*<!-- ////////  content  end //////// -->*/}
                                </div>
                            </div>


                        </div>
                    </div>
                ) : (
                    <div className="poemui-modal-box is-fullscreen is-video" role="dialog" tabIndex={-1} aria-hidden="true" id={cid}>
                        <button type="button" className="poemui-modal-box__close" data-modal-close-trigger="true"><svg style={{verticalAlign:"middle",width:"15px"}} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="#fff" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></button>
                        <div className="poemui-modal-box__content" role="document">
                            <div className="poemui-modal-box__video-waiting">loading...</div>
                            <div className="poemui-modal-box__video-container">
                                <div className="embed-responsive embed-responsive-16by9">
                                    {/*<!-- ////////  content  begin //////// -->*/}
                                    {children}
                                    {/*<!-- ////////  content  end //////// -->*/}
                                </div>
                            </div>
                        </div>
                    </div>
                )}



            </>
        )
    }
}

