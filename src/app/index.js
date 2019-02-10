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

// Style
import './css'


/**
 * Writing logic code from Here
 */



/*
* wxShare
*/
// setWxShare({
//     title: config.pages[0].title,
//     desc: config.pages[0].desc,
//     site_link: config.pages[0].url,
//     img_url: config.pages[0].thumb,
//     success: ()=>{
//         console.log('Share success!')
//     },
//     cancel: ()=>{
//         console.log('Share cancel!')
//     }
// })

/**
 * GA
 */
// gtag('config', config.ga_id, {
//     'page_title': config.pages[0].title,
//     'page_path': config.public_path
// })
