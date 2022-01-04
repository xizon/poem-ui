import React, { Component } from 'react';


type HybridContentSliderItemProps = {};
type HybridContentSliderItemState = false;


export default class HybridContentSliderItem extends Component<HybridContentSliderItemProps, HybridContentSliderItemState>  {

    constructor(props) {
        super(props);
    }
    render() {

        const {
            children
        } = this.props;
        return (

            <div className="poemui-hybrid-content-slider__item">
                {children}
            </div>
    
        );
    }
}

