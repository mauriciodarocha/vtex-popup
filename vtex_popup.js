;(function (jQuery,window,document,undefined) {
  jQuery.fn.vtex_popup = function (_popup_options) {

    var _popup_selection = this;

    var _popup_settings = jQuery.extend({
      classes: null,
      opacity: null, // valor de opacidade do shade
      title: null, // título do popup (suporta html)
      close: '.close', // Class for the close button.
      close_text: 'X', // texto do botão fechar
      callback: null,
      unload: null,
      shade: '#000' // "shade" as in css background. It will accept image, color, etc.
    }, _popup_options);

    var _popup_plugin = {
      init: function (e) {
        if (!_popup_plugin.check(_popup_selection)) return;

        _popup_plugin.show.popup();
        return true;
      },
      set: {
        shade: function () {
          if (jQuery(".vtex-popup-shade").length > 0) return false;

          shade = jQuery("<div>").addClass("vtex-popup-shade").addClass(_popup_settings.close.substr(1)).css({
            "opacity": _popup_settings.opacity,
            "display": "none",
            "background": _popup_settings.shade
          });
          jQuery("body").prepend(shade);
          return true;
        },
        popup: function () {
          if (jQuery(".vtex-popup").length > 0) return false;

          var div_wrapper = jQuery("<div>").addClass("vtex-popup").css("display", "none");

          if (_popup_settings.classes !== null) {
            var _classes = _popup_settings.classes.split(',');

            jQuery(_classes).each(function (ndx, item) {
              if (/\./.test(item))
                div_wrapper.addClass(item.substr(1));
              else
                div_wrapper.addClass(item);
            });
          }

          var div_header = jQuery("<div>").addClass("popup-header");
          var btn_close = jQuery("<div>").addClass(_popup_settings.close.substr(1)).css('cursor', 'pointer');
          var div_content = jQuery("<div>").addClass("popup-content");
          var div_container = jQuery("<div>").addClass("popup-container");

          if (_popup_settings.title !== null)
            jQuery(div_header).append(jQuery("<div>").addClass("popup-title").html(_popup_settings.title));

          jQuery(btn_close).append(jQuery("<span>").text(_popup_settings.close_text));
          jQuery(div_header).append(btn_close);
          jQuery(div_container).append(div_header);
          jQuery(div_container).append(div_content);
          jQuery(div_wrapper).append(div_container);
          jQuery("body").prepend(div_wrapper);
          return true;
        },
        events: function () {
          jQuery(_popup_settings.close).unbind().click(function () {
            _popup_plugin.close.popup();
            return true;
          });
          jQuery(document).keyup(function (e) {
            if (e.keyCode == 27) {
              _popup_plugin.close.popup();
            }
            return true;
          });
          return true;
        }
      },
      show: {
        popup: function () {
          _popup_plugin.set.popup();
          _popup_plugin.set.shade();
          _popup_plugin.show.shade();
          jQuery(".vtex-popup").fadeIn();
          _selection_obj = jQuery(_popup_selection); //.clone();
          jQuery(".popup-content").empty();
          jQuery(".popup-content").html(_selection_obj);
          _popup_plugin.set.events();

          if (typeof _popup_settings.callback == "function")
            _popup_settings.callback();

          return true;
        },
        shade: function () {
          jQuery(".vtex-popup-shade").fadeIn();
          return true;
        }
      },
      close: {
        popup: function () {
          jQuery(".vtex-popup").fadeOut("fast", function () {
            $(this).remove();
          });
          jQuery(".vtex-popup-shade").fadeOut("fast", function () {
            $(this).remove();
          });
          jQuery(document).unbind();

          if (typeof _popup_settings.unload == "function")
            _popup_settings.unload();

          return true;
        }
      },
      check: function () {
        var exists = _popup_selection.length;

        if (!exists) // This checks if the container is set. Otherwise, nothing will happen.
          _popup_plugin.log("A container is required to build the popup.");

        return exists;
      },
      log: function (log) {
        if (typeof console == "undefined") return false;

        console.log(log);
        return true;
      }
    }

    return _popup_plugin.init();
  }
})(jQuery,window,document);
