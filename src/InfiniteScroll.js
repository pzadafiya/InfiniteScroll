/*!
 * Infinite Scroll JS
 * @author PranavZadafiya
 * @version 1.0
 * @requires jQuery v1.4.3+ 
 */
(function ($) {

    'use strict';

    // Define the jscroll namespace and default settings
    $.infinitescroll = {
        defaults: {
            serverProcessing: true,
            url: '',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            async: false,
            callback: false,
            appendEle: '',
            //isappend: true,
            data: null,
            loadMore: true,
            pagination: {
                pageId: 1,
                pageSize: 10
            }
        }
    };

    // Constructor
    var infiniteScroll = function ($e, options) {
        // Private vars and methods
        var _data = $e.data('infinitescroll'),
            _userOptions = (typeof options === 'function') ? { callback: options } : options,
            _options = $.extend({}, $.infinitescroll.defaults, _userOptions, _data || {}),
            //_isWindow = ($e.css('overflow-y') === 'visible'),
            //_$window = $(window),
            //_$body = $('body'),
            _$scroll = $e, //_isWindow ? _$window : $e,
            _loadMore = _options.loadMore, //true,
            _createInfiniteScroll = function () {

                var $scrollableElement = $e;
                var $innerDataElement = options.appendEle == '' ? $e : $(options.appendEle);

                if ($e.is("table")) {
                    if ($e.find(" > tbody").length > 0)
                        $innerDataElement = $e.find(" > tbody");
                }

                // _IsAppend = options.isappend == undefined ? true : options.isappend;
                _objData = _options.data;
                $scrollableElement.on('scroll', function () {
                    if (($(this).scrollTop() + $(this).innerHeight()) + 20 >= $(this)[0].scrollHeight) {
                        if (_options.serverProcessing && _loadMore) {
                            //  var isAppendEle = fnIsAppend();

                            if (_options.data == null)
                                _options.data = dataOptions();

                            if (_options.data == null) {
                                _options.data = {
                                    pageId: _options.pagination.pageId,
                                    pageSize: _options.pagination.pageSize
                                }
                            }
                            else {
                                _options.data.pagination = _options.pagination;
                            }

                            $.ajax({
                                type: _options.type,
                                url: _options.url,
                                data: JSON.stringify(_options.data),
                                //data: kkk,
                                contentType: _options.contentType,
                                async: _options.async,
                                success: function (result) {
                                    if (typeof _options.callback === 'function') {
                                        _options.callback($innerDataElement, result);
                                    }
                                    else {
                                        $innerDataElement.append(result);
                                    }
                                    if (result.total) {
                                        if ((_options.pagination.pageId * _options.pagination.pageSize) > result.total) {
                                            _loadMore = false;
                                        }
                                    }
                                    //change the page id
                                    _options.pagination.pageId++;
                                }
                            });
                        }
                    }
                }).scroll();
            },
        // Remove the jscroll behavior and data from an element
        _destroy = function () {
            return _$scroll.unbind('.infinitescroll')
                .removeData('infinitescroll');
        };

        // Initialization
        $e.data('infinitescroll', $.extend({}, _data, { initialized: true, waiting: false }));
        _createInfiniteScroll();

        // Expose API methods via the jQuery.jscroll namespace, e.g. $('sel').jscroll.method()
        $.extend($e.iScroll, {
            destroy: _destroy
        });
        return $e;
    };

    var _IsAppend = true;
    function fnIsAppend() {
        return _IsAppend;
    }
    var _objData;
    var dataOptions = function () {
        return _objData;
        //return JSON.stringify(_objData);
    }
    // Define the jscroll plugin method and loop
    $.fn.iScroll = function (m) {
        return this.each(function () {
            var $this = $(this),
            data = $this.data('infinitescroll'), infinitescroll;

            // Instantiate iScroll on this element if it hasn't been already
            if (data && data.initialized) {
                return;
            }

            infiniteScroll($this, m);

            //infiniteScroll = new infiniteScroll($this, m);
        });
    };

})(jQuery);


