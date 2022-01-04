import React, { Component } from 'react';


/*-- Apply global scripts and styles --*/
import '@/components/_utils/styles/_all.scss';
import '@/components/_utils/styles/rtl/_all.scss';
import { __ } from '@/components/_utils/_all';

/*-- Apply this component styles --*/
import '@/components/ListBulleted/styles/_style.scss';
import '@/components/ListBulleted/styles/rtl/_style.scss';



// 
import ListBulletedItem from '@/components/ListBulleted/ListBulletedItem';


type ListBulletedProps = {
	/** Sets the marker (such as a disc, character, or custom counter style) of a list item element. 
     *  Possible values are: `icon`, `dot`, `numbered`, `numbered-large`, `numbered-large-bg`, `numbered-step`
    */
	type: string;
    /** Add a leading zero is any 0 digit that comes before the first nonzero digit in a 
     * number string in positional notation. Only valid for lists with numbered type. */
    leadingZero?: boolean;
    /** -- */
    id?: string;
};
type ListBulletedState = false;


export default class ListBulleted extends Component<ListBulletedProps, ListBulletedState> {

    uniqueID: string;

    constructor(props) {
        super(props);

        this.uniqueID = 'app-' + __.GUID.create();

    }


    render() {

        const {
            type,
            leadingZero,
            id,
            children
        } = this.props;

        const leadingZeroClassName = leadingZero ? ' poemui-list--numbered-leading-zero' : '';

        let listClassName = '';

        switch (type) {
            case 'icon':
                listClassName = 'poemui-list poemui-list--icon';
                break;
            case 'dot':
                listClassName = 'poemui-list poemui-list--dot';
                break;
            case 'numbered':
                listClassName = 'poemui-list poemui-list--numbered' + leadingZeroClassName;
                break;
            case 'numbered-large':
                listClassName = 'poemui-list poemui-list--numbered-large' + leadingZeroClassName;
                break;
            case 'numbered-large-bg':
                listClassName = 'poemui-list poemui-list--numbered-large poemui-list--numbered-bg' + leadingZeroClassName;
                break;
            case 'numbered-step':
                listClassName = 'poemui-list poemui-list--numbered-step';
                break;

        }//end switch


        const items = ( children != null ) ? (children as any[]).map((item, i) => {
                            const childProps = { ...item.props };
                            return <ListBulletedItem
                                        key={"item" + i}
                                        type={type}
                                        {...childProps}
                                        />;						

                        }) : '';
          

        return (
            <>

                {type === 'icon' || type === 'dot' || type === 'numbered-step' ? <>
                    <ul
                        id={id || this.uniqueID}
                        className={listClassName}>
                            {items}
                    </ul>
                </> : ''}

                {type === 'numbered' ? <>
                    <ol
                        id={id || this.uniqueID}
                        className={listClassName}>
                            {items}
                    </ol>
                </> : ''}

                {type === 'numbered-large' || type === 'numbered-large-bg' ? <>
                    <div 
                        id={id || this.uniqueID}
                        className={listClassName}>
                        <ol>
                            {items}
                        </ol>
                        
                    </div>
                </> : ''}


            </>
        )
    }
}

