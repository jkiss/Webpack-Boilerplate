/*
 * @Author: Nokey 
 * @Date: 2017-07-13 18:03:17 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2018-03-05 18:42:47
 */
'use strict';

import config from '../../config'

// polyfills
import 'raf/polyfill'
import "@babel/polyfill"

// Utils
import Util from 'utils'
import { setWxShare } from 'utils/wxShare'
import { device } from 'device.js'
import log from 'utils/log'

// Style
import './css'


/**
 * Writing logic code from Here
 */
log.info('Hello world!')


/*
* wxShare
*/
// if(Util.isWeiXin()){
//     setWxShare({
//         title: config.page.title,
//         desc: config.page.desc,
//         site_link: config.page.url,
//         img_url: config.page.thumb,
//         success: ()=>{
//             console.log('Share success!')
//         },
//         cancel: ()=>{
//             console.log('Share cancel!')
//         }
//     })
//     console.log('isWX')
// }

/**
 * GA
 */
// gtag('config', config.ga_id, {
//     'page_title': config.page.title,
//     'page_path': config.public_path
// })
