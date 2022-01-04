/* 
 *************************************
 * <!-- Content Placeholder -->
 *************************************
 */
import React, { Component } from 'react';


/*-- Apply global scripts and styles --*/
import '@/components/_utils/styles/_all.scss';
import '@/components/_utils/styles/rtl/_all.scss';
import { __ } from '@/components/_utils/_all';

/*-- Apply this component styles --*/
import '@/components/ContentPlaceholder/styles/_style.scss';
import '@/components/ContentPlaceholder/styles/rtl/_style.scss';


type ContentPlaceholderProps = {
	/** Placeholder display style */
	type: string;
    /** -- */
    id?: string;
};
type ContentPlaceholderState = false;


export default class ContentPlaceholder extends Component<ContentPlaceholderProps, ContentPlaceholderState> {

    uniqueID: string;

    constructor(props) {
        super(props);

        this.uniqueID = 'app-' + __.GUID.create();

    }

    render() {

        const {
            type,
            id
        } = this.props;

		//set ID
		const cid = id || this.uniqueID;

		//return HTML structure
		let res: any = null;
		let typeRes = type ? type : '';

		switch (typeRes) {
			case 'page':
				res = (
					<>
                        <div id={cid} className="poemui-content-placeholder">
                            <ul>
                                <li>
                                    <div className="poemui-content-placeholder__view">
                                        <ul>
                                            <li>
                                                <div className="poemui-content-placeholder__textSlot">
                                                    <div className="poemui-content-placeholder__line--first poemui-content-placeholder__line"></div>
                                                    <div className="poemui-content-placeholder__line--second poemui-content-placeholder__line"></div>
                                                </div>
                                                <div className="poemui-content-placeholder__thumbSlot"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                            <ul>
                                <div className="poemui-content-placeholder__view">
                                    <ul>
                                        <li>
                                            <div className="poemui-content-placeholder__thumbSlot"></div>
                                            <div className="poemui-content-placeholder__textSlot">
                                                <div className="poemui-content-placeholder__line--first poemui-content-placeholder__line"></div>
                                                <div className="poemui-content-placeholder__line--second poemui-content-placeholder__line"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="poemui-content-placeholder__thumbSlot"></div>
                                            <div className="poemui-content-placeholder__textSlot">
                                                <div className="poemui-content-placeholder__line--first poemui-content-placeholder__line"></div>
                                                <div className="poemui-content-placeholder__line--second poemui-content-placeholder__line"></div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="poemui-content-placeholder__thumbSlot"></div>
                                            <div className="poemui-content-placeholder__textSlot">
                                                <div className="poemui-content-placeholder__line--first poemui-content-placeholder__line"></div>
                                                <div className="poemui-content-placeholder__line--second poemui-content-placeholder__line"></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </ul>

                        </div>
					</>
				);
				break;
            case 'list':
                    res = (
                        <>
                            <div id={cid} className="poemui-content-placeholder">
                                <ul>
                                    <div className="poemui-content-placeholder__view">
                                        <ul>
                                            <li>
                                                <div className="poemui-content-placeholder__thumbSlot"></div>
                                                <div className="poemui-content-placeholder__textSlot">
                                                    <div className="poemui-content-placeholder__line--first poemui-content-placeholder__line"></div>
                                                    <div className="poemui-content-placeholder__line--second poemui-content-placeholder__line"></div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="poemui-content-placeholder__thumbSlot"></div>
                                                <div className="poemui-content-placeholder__textSlot">
                                                    <div className="poemui-content-placeholder__line--first poemui-content-placeholder__line"></div>
                                                    <div className="poemui-content-placeholder__line--second poemui-content-placeholder__line"></div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="poemui-content-placeholder__thumbSlot"></div>
                                                <div className="poemui-content-placeholder__textSlot">
                                                    <div className="poemui-content-placeholder__line--first poemui-content-placeholder__line"></div>
                                                    <div className="poemui-content-placeholder__line--second poemui-content-placeholder__line"></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </ul>
    
                            </div>
                        </>
                    );
                    break;
            case 'content':
                    res = (
                        <>
                            <div id={cid} className="poemui-content-placeholder">
                                <ul>
                                    <li>
                                        <div className="poemui-content-placeholder__view">
                                            <ul>
                                                <li>
                                                    <div className="poemui-content-placeholder__textSlot">
                                                        <div className="poemui-content-placeholder__line--first poemui-content-placeholder__line"></div>
                                                        <div className="poemui-content-placeholder__line--second poemui-content-placeholder__line"></div>
                                                    </div>
                                                    <div className="poemui-content-placeholder__thumbSlot"></div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </>
                    );
                    break; 
			case 'image':
				res = (
					<>
                        <div id={cid} className="poemui-content-placeholder">
                            <div className="poemui-content-placeholder__view uix-content-placeholder__view--aspectRatio">
                                <div className="poemui-content-placeholder__thumbSlot"></div>
                            </div>
                        </div>
					</>
				);
				break;


		}


        return (
            <>
               {res}
            </>
        )
    }
}

