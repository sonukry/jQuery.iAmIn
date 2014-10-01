/**
 * @file
 * @author {https://github.com/ezhikov|Kirill Popolov}
 * @license MIT
 * @version 0.3.4
 * @todo make it relate not only to body, but any desired container
 * @todo make demo
 * @todo add callback
 * @todo make respond to window resizing
 */
/**
 * @typedef {object} jQuery
 * @see http://api.jquery.com
 */
(function($){
    'use strict';
    /**
     * @global
     * @function jQuery#iAmIn
     * @param {number} [offset = 0] Number of offset pixels
     * @param {jQuery|string} [parent = this.parent()] Element to stick to
     * @returns {jQuery}
     */
    $.fn.iAmIn = function(offset, parent) {
        var bodySize = {h:document.body.offsetHeight, w:document.body.offsetWidth},
            params = {};
        params.offset = typeof offset === 'number' ? offset : 0;
        params.parent = (offset instanceof jQuery || typeof offset === 'string') ? $(offset) : (parent || false);
        return this.each(function(){
            debugger;
            params.parent = params.parent || $(this).parent();
            debugger;
            var self = this,
                parentPos = $(params.parent).offset(),
                middlePos = function(axis) {
                    return axis === 'y' ? parentPos.top + (params.parent.height() / 2) - (self.offsetHeight / 2) : parentPos.left + (params.parent.width() / 2) - (self.offsetWidth / 2);
                },
                vertPos,
                horPos,
                tryPosition = function(pos){
                    if (pos === 'left' || pos === 'right') {
                        horPos = pos === 'left' ? parentPos.left - self.offsetWidth - params.offset : parentPos.left + params.parent.width() + params.offset;
                        if (horPos < 0 || horPos + self.offsetWidth > bodySize.w) {
                            return false;
                        }
                        vertPos = middlePos('y');
                        if (vertPos + self.offsetHeight > bodySize.h) {
                            vertPos = bodySize.h - self.offsetHeight - params.offset;
                        } else if (vertPos <= 0) {
                            vertPos = params.offset;
                        }
                    } else {
                        vertPos = pos === 'bottom' ? parentPos.top + params.parent.height() + params.offset : parentPos.top - self.offsetTop - params.offset;
                        if (vertPos + self.offsetHeight > bodySize.h || vertPos < 0) {
                            return false;
                        }
                        horPos = middlePos('x');
                        if (horPos + self.offsetWidth > bodySize.w) {
                            horPos = bodySize.w - self.offsetWidth - params.offset;
                        } else if (horPos <= 0) {
                            horPos = params.offset;
                        }
                    }
                    return true;
                };
            if (self.offsetHeight > bodySize.h || self.offsetWidth > bodySize.w) {
                $(self).offset({top:params.offset, left: params.offset});
            } else {
                if (!tryPosition('bottom')) {
                    if (!tryPosition('left')) {
                        if (!tryPosition('right')) {
                            tryPosition('top');
                        }
                    }
                }
                $(self).offset({top: vertPos, left: horPos});
            }
        });
    };
}(jQuery));
