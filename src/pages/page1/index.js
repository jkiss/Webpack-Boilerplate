/*
 * @Author: Nokey 
 * @Date: 2017-07-13 18:03:17 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2018-03-05 18:42:47
 */
'use strict';

import config from '../../../config'
// import setWxShare from '../../modules/utils/share'

// polyfills
import 'babel-polyfill'

// Plugins
import { TimelineLite } from 'gsap'
import 'jwplayer'

// Style
import '../../fonts/roboto-light.styl'
import '../../styles/common.styl'
import '../../styles/nk-player'

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
            page: 'page1'
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
            file: 'https://video.cgtn.com/news/3267544e77677a6333566d54/video/625d29fd-2f73-4821-9300-115bd2f5dff7/625d29fd-2f73-4821-9300-115bd2f5dff7.m3u8',
            image: 'https://video.cgtn.com/news/3267544e77677a6333566d54/video/625d29fd-2f73-4821-9300-115bd2f5dff7/625d29fd-2f73-4821-9300-115bd2f5dff7.jpg',
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
    //     let title = config.page1.title,
    //         description = config.page1.desc,
    //         imgUrl = config.page1.thumb,
    //         shareUrl = config.page1.url

    //     window.ofoResponseProxy('shareConfig', [title, description, imgUrl, shareUrl])
    // }
}(jQuery, window))