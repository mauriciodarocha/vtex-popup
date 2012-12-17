(function( $ ) {
    jQuery.fn.vtex_popup = function(_popup_options){
        
        var _popup_selection = jQuery(this);
    
        var _popup_settings = jQuery.extend({
            classes: null,
            //shade: '#000',    // "shade" as in css background. It will accept image, color, etc.
            opacity:null,       // valor de opacidade do shade
            title:null,         // título do popup (suporta html)
            close: '.close',    // Class for the close button.
            close_text:'X',     // texto do botão fechar
            callback: null
        }, _popup_options);

        var _popup_plugin = {
            init: function(e)
            {
                if(!_popup_plugin.check(_popup_selection)) return;
                
                _popup_plugin.show.popup();
            },
            set:
            {
                shade: function()
                {
                    if(jQuery(".vtex-popup-shade").length>0) return;
                    shade = jQuery("<div>").addClass("vtex-popup-shade").addClass(_popup_settings.close.split('.')[1]).css({"opacity":_popup_settings.opacity,"display":"none"});
                    jQuery("body").prepend(shade);
                },
                popup: function()
                {
                    if(jQuery(".vtex-popup").length>0) return;
                    
                    div_wrapper = jQuery("<div>").addClass("vtex-popup").css("display","none");

                    if(_popup_settings.classes!=null)
                    {
                        _classes = _popup_settings.classes.split(',');
                        jQuery(_classes).each(function(ndx,item){
                            if(/\./.test(item))
                                div_wrapper.addClass(item.split('.')[1]);
                            else 
                                div_wrapper.addClass(item);
                        });
                    }

                    div_header    = jQuery("<div>").addClass("popup-header");
                    btn_close     = jQuery("<div>").addClass(_popup_settings.close.split('.')[1]).css('cursor','pointer');
                    div_content   = jQuery("<div>").addClass("popup-content");
                    div_container = jQuery("<div>").addClass("popup-container");
                    
                    if(_popup_settings.title!=null)
                        jQuery(div_header).append(jQuery("<div>").addClass("popup-title").html(_popup_settings.title));

                    jQuery(btn_close).append(jQuery("<span>").text(_popup_settings.close_text));
                    jQuery(div_header).append(btn_close);
                    jQuery(div_container).append(div_header);
                    jQuery(div_container).append(div_content);
                    jQuery(div_wrapper).append(div_container);
                    jQuery("body").prepend(div_wrapper);
                },
                events: function()
                {
                    jQuery(_popup_settings.close).unbind().click(function(){
                        // jQuery(this).addClass('active');
                        _popup_plugin.close.popup();
                    });
                    jQuery(document).keyup(function(e) {
                        if(e.keyCode == 27) { _popup_plugin.close.popup(); }
                    });
                }
            },
            show:
            {
                popup: function()
                {
                    _popup_plugin.set.popup();
                    _popup_plugin.set.shade();
                    _popup_plugin.show.shade();
                    jQuery(".vtex-popup").fadeIn();
                    _selection_obj=jQuery(_popup_selection); //.clone();
                    jQuery(".popup-content").empty();
                    jQuery(".popup-content").html(_selection_obj);
                    _popup_plugin.set.events();
                    
                    if(typeof _popup_settings.callback=="function")
                        _popup_settings.callback();
                },
                shade: function()
                {
                    jQuery(".vtex-popup-shade").fadeIn();
                }
            },
            close:
            {
                popup: function()
                {
                    jQuery(".vtex-popup").fadeOut("fast", function(){ $(this).remove(); });
                    jQuery(".vtex-popup-shade").fadeOut("fast", function(){ $(this).remove(); });
                    jQuery(document).unbind();
                }
            },
            check: function(e)
            {
                var result = false;
                if(jQuery(e).length<=0) // This checks if the container is set. Otherwise, nothing will happen.
                {
                    _popup_plugin.log("A container is required to build the menu.");
                    result = false;
                    return result;
                } 
                
                _popup_selection = e;
                result = true;
                
                return result;
            },
            log: function(log)
            {
                if(typeof console=="undefined") return;
                
                console.log(log);
            }
        }

        return _popup_plugin.init();
    }
})( jQuery );