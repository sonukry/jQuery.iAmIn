/**
 * @author {https://github.com/ezhikov|Kirill Popolov}
 * @license MIT
 * @version 0.3.0
 * @todo make it relate not only to body, but any desired container
 * @todo make demo
 * @todo add callback
 * @todo make respond to window resizing
 */
(function($){
    'use strict';
    /**
     * @extends jQuery
     * @function jQuery.iAmIn
     * @param {number} [offset = 0] Number of offset pixels
     * @param {jQuery} [parent = this.parent()] Element to stick to
     * @returns {jQuery}
     */
    $.fn.iAmIn = function(offset, parent) {
        var bodySize = {h:document.body.offsetHeight, w:document.body.offsetWidth},
            params = {};
        params.offset = typeof offset === 'number' ? offset : 0;
        params.parent = offset instanceof jQuery ? offset : (parent || false);
        return this.each(function(){
            params.parent = params.parent || $(this).parent();
            var self = this,
                parentPos = params.parent.offset(),
                vertPosMiddle = function() {
                    return parentPos.top + (params.parent.height() / 2) - (self.offsetHeight / 2);
                },
                horPosMiddle = function() {
                    return parentPos.left + (params.parent.width() / 2) - (self.offsetWidth / 2);
                },
                vertPos,
                horPos,
                tryLeft = function(){
                    horPos = parentPos.left - self.offsetWidth - params.offset;
                    if (horPos < 0) {
                        return false;
                    }
                    vertPos = vertPosMiddle();
                    if (vertPos + self.offsetHeight > bodySize.h) {
                        vertPos = bodySize.h - self.offsetHeight - 5;
                    } else if (vertPos <= 0) {
                        vertPos = 5;
                    }
                    //$(self).addClass(params.classes[2]);
                    return true;

                },
                tryRight = function(){
                    horPos = parentPos + params.parent.width() + params.offset;
                    if (horPos + self.offsetWidth > bodySize.w) {
                        return false;
                    }
                    vertPos = vertPosMiddle();
                    if (vertPos + self.offsetHeight > bodySize.h) {
                        vertPos = bodySize.h - self.offsetHeight - 5;
                    } else if (vertPos <= 0) {
                        vertPos = 5;
                    }
                    //$(self).addClass(params.classes[1]);
                    return true;

                },
                tryBottom = function(){
                    vertPos = parentPos.top + params.parent.height() + params.offset;
                    if (vertPos + self.offsetHeight > bodySize.h) {
                        return false;
                    }
                    horPos = horPosMiddle();
                    if (horPos + self.offsetWidth > bodySize.w) {
                        horPos = bodySize.w - self.offsetWidth - 5;
                    } else if (horPos <= 0) {
                        horPos = 5;
                    }
                    //$(self).addClass(params.classes[2]);
                    return true;
                },
                tryTop = function(){
                    vertPos = parentPos.top - self.offsetTop - params.offset;
                    if (vertPos < 0) {
                        return false;
                    }
                    horPos = horPosMiddle();
                    if (horPos + self.offsetWidth > bodySize.w) {
                        horPos = bodySize.w - self.offsetWidth - 5;
                    } else if (horPos <= 0) {
                        horPos = 5;
                    }
                    //$(self).addClass(params.classes[0]);
                    return true;

                };
            $(self).removeClass(params.classes.join(' '));
            if (self.offsetHeight > bodySize.h || self.offsetWidth > bodySize.w) {
                $(self).offset({top:0, left: 0});
            } else {
                if (!tryBottom()) {
                    if (!tryLeft()) {
                        if (!tryRight()) {
                            tryTop();
                        }
                    }
                }
                $(self).offset({top: vertPos, left: horPos});
            }
        });
    };
}(jQuery));
