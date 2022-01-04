/* 
 *************************************
 * <!-- Card -->
 *************************************
 */
import React, { Component } from 'react';


/*-- Apply global scripts and styles --*/
import '@/components/_utils/styles/_all.scss';
import '@/components/_utils/styles/rtl/_all.scss';
import { __ } from '@/components/_utils/_all';

/*-- Apply this component styles --*/
import '@/components/Card/styles/_style.scss';



// Specify a background image
import { setBG } from '@/components/_utils/_all';


interface CardBgConfig {
	scr?: string | undefined;
	height?: string | boolean | undefined;
	width?: string | boolean | undefined;
	position?: string | undefined;
	size?: string | undefined;
	repeat?: string | undefined;
	fill?: boolean | undefined;
	move?: {
		[key: string]: string | number | boolean | undefined;
	};
}

type CardProps = {
	/** Card display style */
	type: string;
	/** Button Icon */
	btnIcon?: React.ReactNode;
	/** Handling events for button */
	btnClickEvent?: React.MouseEventHandler<HTMLButtonElement>;
	btnHyperlinkClickEvent?: React.MouseEventHandler<HTMLAnchorElement>;
	/** Title of card */
	title?: string | null;
	/** Omit overflowed title string */
	titleEllipsis?: boolean | null;
	/** Hyperlink or subtitle of card */
	subTitle?: React.ReactNode | string;
	/** The attributes of the background image, use JSON string */
	bgConfig?: string | null | CardBgConfig;

	/** //////////// */
	/** The ratio of the content, used for horizontal gallery style. For `gallery-h-*`, `gallery-full-*`  */
	contentRatio?: number | null;
	/** Primary Icon. For `gallery-icon-*` */
	icon?: React.ReactNode;
	/** Overlay the content on the card background. For `gallery-v-*` */
	overlayArea?: React.ReactNode;
	/** Vertically center text. For `gallery-full-*` */
	verticalCenter?: boolean | null;
	/** Avatar URL. For `thumb`, `authorcard-*` */
	avatar?: string | null;
	/** -- */
	id?: string;
};
type CardState = false;



export default class Card extends Component<CardProps, CardState> {

	uniqueID: string;
	
	constructor(props) {
		super(props);
		
		this.uniqueID = 'app-' + __.GUID.create();
	}

	render() {

		const {
			btnIcon,
			btnClickEvent,
			btnHyperlinkClickEvent,
			title,
			titleEllipsis,
			subTitle,
			type,
			bgConfig,
			contentRatio,
			icon,
			overlayArea,
			verticalCenter,
			avatar,
			id,
			children
		} = this.props;

		//set ID
		const cid = id || this.uniqueID;

		//title
		const _title = title || '';

		//sub title
		const _subTitle = subTitle || '';

		//button icon
		const _btnIcon = btnIcon || '';

		//get background config
		let _bgConfig: any = (bgConfig === null || bgConfig === undefined) ? false : bgConfig;
		if ( __.validate.isJSON(_bgConfig) ) {
			_bgConfig = (Object.prototype.toString.call(_bgConfig) === '[object Object]') ? _bgConfig : JSON.parse(_bgConfig as string);
		}
		
		const _bgStyles = setBG(_bgConfig);

		//avatar (`thumb`, `authorcard-*`)
		const _avatar = avatar || '';


		//ratio of the content (`gallery-h-*`, `gallery-full-*`)
		const _contentRatio = contentRatio || 8;

		//primary icon (`gallery-icon-*`)
		const _icon = icon || '';

		//overlay area (`gallery-v-*`)
		const _overlayArea = overlayArea || '';


		//return HTML structure
		let res: any = null;
		let typeRes = type ? type : '';

		switch (typeRes) {
			case 'thumb':
				res = (
					<>

						<div id={cid} className="poemui-card--thumb">
							<div className="poemui-card--thumb__header">
								<div className="poemui-card--thumb__preview" style={{ flexBasis: "50px" }}>
									{/*<!-- image begin -->*/}
									<img src={_avatar} alt="" className="poemui-border--circle" />
									{/*<!-- image end -->*/}
								</div>

								<div className="poemui-card--thumb__content">
									<div className="poemui-card--thumb__content__child">
										<div className="poemui-card--thumb__content__child--left">
											<div>
												{/*<!-- content begin -->*/}

												<h5 className={titleEllipsis ? 'poemui-t-ellipsis poemui-spacing--no' : 'poemui-relative--inline poemui-spacing--no'}>{_title}</h5>

												{_subTitle !== '' ? <><small className="poemui-typo--color-sub">{_subTitle}</small></> : ''}
												{/*<!-- content end -->*/}
											</div>
										</div>
										<div className="poemui-card--thumb__content__child--right" style={{ minWidth: "50px", textAlign: "right" }}>
											{/*<!-- content begin -->*/}

											{_btnIcon !== '' ? <><button aria-haspopup="true" onClick={btnClickEvent}>{_btnIcon}</button></> : ''}

											{/*<!-- content end -->*/}
										</div>
									</div>

								</div>

							</div>

							<div className="poemui-card--thumb__body">
								{/*<!-- content begin -->*/}
								<small className="poemui-typo--color-sub">
									{children}
								</small>
								{/*<!-- content end -->*/}
							</div>
						</div>

					</>
				);
				break;
			case 'gallery-v-img':
				res = (
					<>

						<div id={cid} className="poemui-card--gallery" role="figure">
							<div className="poemui-card--gallery__preview">
								{/*<!-- image begin -->*/}
								<img src={_bgConfig.src} alt="" />
								{/*<!-- image end -->*/}

								{/*<!-- overlay area begin -->*/}
								{_overlayArea}
								{/*<!-- overlay area end -->*/}


							</div>
							<div className="poemui-card--gallery__body">
								<div className="poemui-card--gallery__header">
									<div className="poemui-card--gallery__header__child">
										{/*<!-- content begin -->*/}
										<h5 className={titleEllipsis ? 'poemui-t-ellipsis' : 'poemui-relative--inline'} style={{ margin: "10px", paddingBottom: 0 }}>{_title}&nbsp;&nbsp;</h5>

										{_subTitle !== '' ? <><small className="poemui-typo--color-sub">{_subTitle}</small></> : ''}

										<div className="poemui-card--gallery__action" style={{ margin: "10px" }}>
											{_btnIcon !== '' ? <><button aria-haspopup="true" onClick={btnClickEvent}>{_btnIcon}</button></> : ''}
										</div>
										{/*<!-- content end -->*/}
									</div>
								</div>
							</div>
						</div>

					</>
				);
				break;
			case 'gallery-v-custom':
				res = (
					<>

						<div id={cid} className="poemui-card--gallery" role="figure">
							<div className="poemui-card--gallery__preview">
								{/*<!-- image begin -->*/}
								<img src={_bgConfig.src} alt="" />
								{/*<!-- image end -->*/}

								{/*<!-- overlay area begin -->*/}
								{_overlayArea}
								{/*<!-- overlay area end -->*/}


							</div>
							<div className="poemui-card--gallery__body">
								<div className="poemui-card--gallery__header">
									<div className="poemui-card--gallery__header__child">
										{/*<!-- content begin -->*/}
										{children}
										{/*<!-- content end -->*/}

									</div>

								</div>
							</div>
						</div>

					</>
				);
				break;
			case 'gallery-h-img':
				res = (
					<>


						<div id={cid} className="poemui-card--gallery poemui-card--gallery--horizontal" role="figure">
							<div className={`poemui-card--gallery__preview poemui-card--gallery__grid__col-${_contentRatio} poemui-card--gallery__preview--mobile-stack`} style={_bgStyles}>
								{/*<!-- image begin -->*/}
								<img src={_bgConfig.src} alt="" />
								{/*<!-- image end -->*/}

							</div>
							<div className="poemui-card--gallery__body">
								<div className="poemui-card--gallery__header">
									<div className="poemui-card--gallery__header__child">
										{/*<!-- content begin -->*/}
										{children}
										{/*<!-- content end -->*/}

									</div>

								</div>
							</div>
						</div>
					</>
				);
				break;
			case 'gallery-full-info':
				res = (
					<>

						<div id={cid} className="poemui-card--gallery poemui-card--gallery--overlay" role="figure">
							<div className="poemui-card--gallery__preview">
								{/*<!-- image begin -->*/}
								<img src={_bgConfig.src} alt="" />
								{/*<!-- image end -->*/}

							</div>
							<div className={`poemui-card--gallery__body ${verticalCenter ? 'poemui-card--gallery__body--verticalCenter' : ''} poemui-card--gallery__grid__col-${_contentRatio} poemui-card--gallery__preview--mobile-stack`}>
								<div className="poemui-card--gallery__header">
									<div className="poemui-card--gallery__header__child">
										{/*<!-- content begin -->*/}
										{children}
										{/*<!-- content end -->*/}

									</div>

								</div>
							</div>
						</div>

					</>
				);
				break;
			case 'gallery-icon':
				res = (
					<>

						<div id={cid} className="poemui-card--gallery poemui-card--gallery--horizontal is-mobile-still" role="figure">
							<div className="poemui-card--gallery__preview" style={{ padding: "25px", background: "#EAEAEA" }}>
								{/*<!-- image begin -->*/}
								{_icon}
								{/*<!-- image end -->*/}

							</div>
							<div className="poemui-card--gallery__body">
								<div className="poemui-card--gallery__header">
									<div className="poemui-card--gallery__header__child">
										{/*<!-- content begin -->*/}
										<span style={{ margin: "0 10px 10px", display: "block" }}>
											<h5 className={titleEllipsis ? 'poemui-t-ellipsis' : ''} style={{ margin: "10px", marginLeft: 0, marginBottom: 0, paddingBottom: 0 }}>{_title}</h5>
											{_subTitle !== '' ? <><small className="poemui-typo--color-sub">{_subTitle}</small></> : ''}

											{_btnIcon !== '' ? <><div className="poemui-card--gallery__action" style={{ margin: "10px" }}><button aria-haspopup="true" onClick={btnClickEvent}>{_btnIcon}</button></div></> : ''}

										</span>
										{/*<!-- content end -->*/}

									</div>

								</div>
							</div>
						</div>

					</>
				);
				break;
			case 'gallery-icon-abreast':
				res = (
					<>

						<div id={cid} className="poemui-card--gallery poemui-card--gallery--horizontal is-mobile-still" role="figure">
							<div className="poemui-card--gallery__preview" style={{ padding: "25px", background: "#EAEAEA" }}>
								{/*<!-- image begin -->*/}
								{_icon}
								{/*<!-- image end -->*/}

							</div>
							<div className="poemui-card--gallery__body">

								<div className="poemui-card--gallery__content">
									<div className="poemui-card--gallery__content__child">
										<div className="poemui-card--gallery__content__child--left">
											<div>
												{/*<!-- content begin -->*/}
												<span style={{ margin: "0 10px 10px", display: "block" }}>
													<h5 className={titleEllipsis ? 'poemui-t-ellipsis' : ''} style={{ margin: "10px", marginLeft: 0, marginBottom: 0, paddingBottom: 0 }}>{_title}</h5>
													{_subTitle !== '' ? <><small className="poemui-typo--color-sub">{_subTitle}</small></> : ''}
												</span>
												{/*<!-- content end -->*/}
											</div>
										</div>


										{_btnIcon !== '' ? <>
											<div className="poemui-card--gallery__content__child--right" style={{ minWidth: "50px" }}>
												{/*<!-- content begin -->*/}
												<div className="poemui-card--gallery__action" style={{ margin: "10px" }}>
													<button aria-haspopup="true" onClick={btnClickEvent}>{_btnIcon}</button>
												</div>
												{/*<!-- content end -->*/}
											</div>
										</> : ''}

									</div>

								</div>

							</div>
						</div>

					</>
				);
				break;
			case 'authorcard-line':
				res = (
					<>

						<div id={cid} className="poemui-card--author">
							<div className="poemui-card--author__header">
								<div className="poemui-card--author__text poemui-f-l">
									<h3 className={titleEllipsis ? 'poemui-t-ellipsis' : ''}>{_title}</h3>
									{_subTitle !== '' ? <>{_subTitle}</> : ''}
								</div>
								<div className="poemui-card--author__preview poemui-border--circle poemui-border--circle-only-img poemui-f-r">
									<img src={_avatar} alt="" className="poemui-border--circle" />
								</div>
							</div>
							<div className="poemui-card--author__content">
								{children}
							</div>
							{_btnIcon !== '' ? <><a role="button" className="poemui-card--author__jump" onClick={btnHyperlinkClickEvent}>{_btnIcon}</a></> : ''}
						</div>

					</>
				);
				break;
			case 'authorcard-detail':
				res = (
					<>

						<div id={cid} className="poemui-card--author poemui-card--author--noborder poemui-t-c">
							<div className="poemui-card--author__header">

								<div className="poemui-card--author__preview poemui-border--circle poemui-border--circle-only-img">
									<img src={_avatar} alt="" className="poemui-border--circle" />
								</div>

							</div>
							<div className="poemui-card--author__content poemui-card--author__content--rounded">
								<h4 className={titleEllipsis ? 'poemui-t-ellipsis poemui-t-c poemui-spacing--no' : 'poemui-t-c poemui-spacing--no'}>{_title}</h4>
								{_subTitle !== '' ? <>{_subTitle}</> : ''}
								{children}
							</div>


						</div>

					</>
				);
				break;
			case 'authorcard-stats':
				res = (
					<>
						<div id={cid} className="poemui-card--author poemui-card--author--noborder poemui-card--author--stats">
							<div className="poemui-card--author__header">

								<div className="poemui-card--author__preview poemui-card--author__preview--rounded poemui-card--author__preview--jumpOut">
									<img src={_avatar} alt="" />
								</div>

							</div>
							<div className="poemui-card--author__content poemui-card--author__content--rounded  poemui-t-r">
								{children}
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
