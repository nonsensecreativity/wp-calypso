/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import debug from 'debug';

/**
 * Internal dependencies
 */
import { loadScript, removeScriptCallback } from 'lib/load-script';
import {
	setVideoEditorHasScriptLoadError,
} from 'state/ui/editor/video-editor/actions';

/**
 * Module variables
 */
const log = debug( 'calypso:post-editor:videopress' );
const videoPressUrl = 'https://wordpress.com/wp-content/plugins/video/assets/js/next/videopress.js';

class EditorMediaModalDetailPreviewVideoPress extends Component {
	static propTypes = {
		isPlaying: PropTypes.bool,
		item: PropTypes.object.isRequired,
	};

	static defaultProps = {
		isPlaying: false,
	};

	componentDidMount() {
		this.loadInitializeScript();
	}

	componentWillUnmount() {
		removeScriptCallback( videoPressUrl, this.onScriptLoaded );
		this.destroy();
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.item.videopress_guid !== prevProps.item.videopress_guid ) {
			this.destroy();
			this.loadInitializeScript();
		}
	}

	shouldComponentUpdate( nextProps ) {
		if ( this.props.item.videopress_guid !== nextProps.item.videopress_guid ) {
			return true;
		}

		return false;
	}

	setVideoInstance = ref => this.video = ref;

	loadInitializeScript() {
		loadScript( videoPressUrl, this.onScriptLoaded );
	}

	onScriptLoaded = ( error ) => {
		const {
			isPlaying,
			item,
			setHasScriptLoadError,
		} = this.props;

		if ( error ) {
			log( `Script${ error.src } failed to load.` );
			setHasScriptLoadError();

			return;
		}

		if ( typeof window !== 'undefined' && window.videopress ) {
			this.player = window.videopress( item.videopress_guid, this.video, {
				autoPlay: isPlaying,
				height: item.height,
				width: item.width,
			} );
		}
	};

	destroy() {
		if ( ! this.player ) {
			return;
		}

		this.player.destroy();

		// Remove DOM created outside of React.
		while ( this.video.firstChild ) {
			this.video.removeChild( this.video.firstChild );
		}
	}

	render() {
		return (
			<div
				className="editor-media-modal-detail__preview is-video"
				ref={ this.setVideoInstance }>
			</div>
		);
	}
}

export default connect(
	null,
	{
		setHasScriptLoadError: setVideoEditorHasScriptLoadError,
	}
)( EditorMediaModalDetailPreviewVideoPress );
