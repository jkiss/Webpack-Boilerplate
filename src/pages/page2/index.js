/*
 * @Author: Mr.B 
 * @Date: 2017-12-08 13:36:43 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2018-03-05 15:19:23
 */
'use strict'; 

import config from '../../../config'

// polyfills
import 'babel-polyfill'

// Plugins
import { TimelineLite } from 'gsap'
import 'jwplayer'

// Style
import 'roboto-light.styl'
import 'common.styl'
import 'nk-player'

// images
import poster from '../../media/page2/poster.png'

(function ($, win) {
    /**
     * Public Parameters
     */
    let _win = $(win),
        _win_height = _win.height(),
        _win_width = _win.width(),
        _ua = win.navigator.userAgent.toLowerCase(),
        _isMac = /macintosh|mac os x/.test(_ua),
        _isIphone = /iphone/.test(_ua),
        _isIpad = /ipad/.test(_ua),
        _isAndroid = /android|adr|linux/.test(_ua),
        _isMobile = /mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(_ua),
        tap_event_name = _isMobile ? 'touchend' : 'click'

    // zan action
    let _TL = new TimelineLite(),
        finger_box = $('#finger_box'),
        zan_num = $('#zan_num')

    finger_box.on(tap_event_name, (e)=>{
        _TL.clear()
            .to('#finger_box', 0.2, {scale: 1.3})
            .to('#finger_box', 0.1, {scale: 1.1})
            .to('#finger_box', 0.1, {scale: 1.3})
            .to('#finger_box', 0.2, {scale: 1})
        postZan()
    })

    // init zan number
    function postZan(){
        $.post('https://op.cgtn.com/api/ga/ofo', {
            page: 'page2'
        }, (d)=>{
            switch (d.stat) {
                case 200:
                    zan_num.text(d.zan)
                    break;
            
                default:
                    console.error(d.msg)
                    break;
            }
        })
    }
    postZan();

    // Video
    jwplayer.key = 'IaFpnm2qy71qN1ip6dC+1PkqT2JClZfpdNl7lYjX15g=';

    try {
        jwplayer('jw_video').setup({
            file: 'https://video.cgtn.com/news/30676a4e78677a6333566d54/video/e7f4809c-e524-47e9-b9f8-f5155990fc69/e7f4809c-e524-47e9-b9f8-f5155990fc69.m3u8',
            image: poster,
            skin: {
                name: 'nk-player'
            },
            stretching: 'fill',
            width: '100%',
            aspectratio: '16:9',
            androidhls: true,
            primary: 'html5',
            autostart: false,
            hlshtml: true,
            base: 'https://op.cgtn.com/plugins/jwplayer-7.12.11',
            flashplayer: 'https://op.cgtn.com/plugins/jwplayer-7.12.11'
        }).on('setupError', ()=>{
            console.log('Setup Error...')
        }).on('play', ()=>{
            console.log('video play')
        });
    } catch(error){
        console.error('JWplayer: ' + error)
    }

    // if(window.OFO_ENV.isLikelyInApp){
    //     let title = config.page2.title,
    //         description = config.page2.desc,
    //         imgUrl = config.page2.thumb,
    //         shareUrl = config.page2.url

    //     window.ofoResponseProxy('shareConfig', [title, description, imgUrl, shareUrl])
    // }
}(jQuery, window))