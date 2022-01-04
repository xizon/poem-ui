/* 
 *************************************
 * <!-- Gallery -->
 *************************************
 */
import React, { Component } from 'react';


/*-- Apply global scripts and styles --*/
import '@/components/_utils/styles/_all.scss';
import '@/components/_utils/styles/rtl/_all.scss';
import { __ } from '@/components/_utils/_all';

/*-- Apply this component styles --*/
import '@/components/Gallery/styles/_style.scss';


//
import Image from '@/components/Gallery/Image';

type GalleryProps = {
    /** Set numbers of columns on a gallery page. The value range is an integer from 1 to 8 */
    fixedColumns?:  number;
    /** Specify data of images as a JSON string format. 
     * Such as: `[{"title":"Image Title 1","url":"xxx.jpg"},{"title":"Image Title 2","url":"xxx.jpg"}]` */
     data?: any[any];
    /** -- */
    id?: string;
};
type GalleryState = false;


export default class Gallery extends Component<GalleryProps, GalleryState> {

    uniqueID: string;

    constructor(props) {
        super(props);

        this.uniqueID = 'app-' + __.GUID.create();
    }


    render() {

        const {
            fixedColumns,
            data,
            id
        } = this.props;


        return (
            <>


                <div id={id || this.uniqueID} className="poemui-gallery">
                    <ul className={`poemui-gallery__tiles poemui-gallery__col-${fixedColumns || 1}`}>
                        {data ? data.map((item, index) => {
                            return <Image key={index} url={item.url} title={item.title} />
                        }) : ''}
                            
                    </ul>
                </div>

            </>
        )
    }
}

