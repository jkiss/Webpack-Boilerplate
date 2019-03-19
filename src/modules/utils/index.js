/*
 * @Author: Nokey 
 * @Date: 2017-09-05 15:38:44 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2019-01-24 13:46:39
 */
'use strict';

import config from '../../../config'

class Util {
    isIE() {
        let ua = window.navigator.userAgent,
            e = ua.indexOf("MSIE ")

        if (e > 0)
            return parseInt(ua.substring(e + 5, ua.indexOf(".", e)), 10);
        if (ua.indexOf("Trident/") > 0) {
            let n = ua.indexOf("rv:");
            return parseInt(ua.substring(n + 3, ua.indexOf(".", n)), 10)
        }
        return false
    }

    isWeiXin(){
        let ua = window.navigator.userAgent.toLowerCase()
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true
        }else{
            return false
        }
    }

    /**
     * HTML:
     * <div class="center-image">
     *     <img />
     * </div>
     * 
     * JS:
     * var center_images = $('.center-image');
     * 
     * @param {Array} image_boxs 
     * @memberof Util
     */
    centerImage(image_boxs) {
        image_boxs.each(function (i) {
            let container = $(this),
                img = $("img", this),
                containerRatio = container.outerWidth() / container.outerHeight(),
                imgRatio = img.width() / img.height();

            if (imgRatio >= containerRatio) {
                img.css({
                    "width": "auto",
                    "height": "102%"
                });
            } else {
                img.css({
                    "width": "102%",
                    "height": "auto"
                });
            }

            img.css({
                "position": "absolute",
                "top": "50%",
                "left": "50%",
                "margin-top": -1 * img.height() * 0.5 + "px",
                "margin-left": -1 * img.width() * 0.5 + "px"
            });

        });
    }

    centerFillEle(ele_box) {
        let container = $(ele_box),
            ele = container.find(".center-ele"),
            containerRatio = container.outerWidth() / container.outerHeight(),
            eleRatio = ele.data('width') / ele.data('height')

        if (eleRatio >= containerRatio) {
            ele.css({
                "width": "auto",
                "height": "100%"
            })
        } else {
            ele.css({
                "width": "100%",
                "height": "auto"
            })
        }
    }

    /**
     * JWplayer
     */
    setJWplayer(dom, data, opt){
        opt = opt || {}

        try {
            jwplayer(dom).setup({
                file: data.video,
                image: data.poster,
                skin: {
                    name: 'nk-player'
                },
                stretching: 'fill',
                width: '100%',
                aspectratio: opt.ratio || '16:9',
                androidhls: true,
                primary: 'html5',
                autostart: false,
                hlshtml: true,
                base: config.plugin_url + '/plugins/jwplayer-8.7.3',
                flashplayer: config.plugin_url + '/plugins/jwplayer-8.7.3/jwplayer.flash.swf'
            }).on('setupError', (e)=>{
                console.log('Setup Error...', e)
            }).on('play', ()=>{
                console.log('video play')
            });
        } catch(error){
            console.error('Setup JWplayer: ' + error)
        }

        return dom
    }

    setJWplayer360(dom, opt){
        opt = opt || {}

        try {
            jwplayer(dom).setup({
                playlist: [{
                    title: opt.title,
                    mediaid: opt.id,
                    stereomode: 'monoscopic',
                    file: opt.file,
                    image: opt.poster
                }],
                width: '100%',
                height: '100%',
                // aspectratio: opt.ratio || '16:9',
                androidhls: true,
                primary: 'html5',
                autostart: false,
                hlshtml: true,
                base: config.plugin_url + '/plugins/jwplayer-8.7.3',
                flashplayer: config.plugin_url + '/plugins/jwplayer-8.7.3/jwplayer.flash.swf'
            }).on('setupError', (e)=>{
                console.log('Setup Error...', e)
            }).on('play', ()=>{
                console.log('video play')
            }).addButton(
                require('./res/fullscreen-on.svg'), // img
                'Fullscreen',                       // tooltip
                opt.fullscreenToggle,               // callback
                'jw-custom-fullscreen',             // id
                'jw-custom-fullscreen'              // btnClass
            );
        } catch(error){
            console.error('Setup JWplayer: ' + error)
        }

        // let fullscreen = false

        // // Function to toggle to and from fullscreen
	  	// function fullscreenToggle() {
        //     if(fullscreen) {
        //         $('.jw-custom-fullscreen .jw-icon').attr('style', `background-image: url("${require('./res/fullscreen-on.svg')}")`);
        //         jwplayer().resize(320, 180);
        //     } else {
        //         $('.jw-custom-fullscreen .jw-icon').attr('style', `background-image: url("${require('./res/fullscreen-off.svg')}")`);
        //         jwplayer().resize('100%', window.innerHeight);
        //     }
        //     fullscreen = !fullscreen;
        // }
        
        // Detecting the orientation change to resize the player
        // window.addEventListener("orientationchange", function() {
        //     if(fullscreen) {
        //         jwplayer().resize('100%', window.innerHeight);
        //     }
        // });

        return dom
    }

    removeJWplayer(dom){
        try {
            jwplayer(dom).remove()
        } catch (error) {
            console.error('Remove JWplayer: ' + error)
        }
    }

    /**
     * determine whether browser can 
     * play 360 video or not
     */
    isCanPlay360(){
        // TODO: Latest Chrome, Firefox & Edge desktop (CFE)
        let _me = this,
            _ua = window.navigator.userAgent.toLowerCase(),
            _isMobile = /mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(_ua),
            _isIOS = /iphone|ipad/.test(_ua),
            _isChrome = /chrome/.test(_ua),
            _isCFE = /firefox|edge|chrome/.test(_ua)

        // if(_isMobile){
        //     return _isIOS || _isChrome
        // }else{
        //     return _isCFE
        // }
        return !_isMobile && _isCFE
    }

    /**
     * Get element background-image's URL
     */
    getBGImage(e){
        return $(e).css('backgroundImage').match(/http.+[jpg|png|svg|jpeg]/i)[0]
    }

    /**
     * getBoundingClientRect
     */
    getBCR(ele, type) {
        if (type !== undefined) {
            return ele.getBoundingClientRect()[type];
        } else {
            return ele.getBoundingClientRect();
        }
    }
}

export default new Util()