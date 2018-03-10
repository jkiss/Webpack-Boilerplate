/*
 * @Author: Nokey 
 * @Date: 2017-09-05 15:38:44 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-09-05 16:46:58
 */
'use strict';

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

    getBCR(ele, type) {
        if (type !== undefined) {
            return ele.getBoundingClientRect()[type]
        } else {
            return ele.getBoundingClientRect()
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
}

export default new Util()