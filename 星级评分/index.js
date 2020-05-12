var rating = (function () {

    var lightOn = function ($item, num) {
        $item.each(function (index) {
            if (index < num) {
                $(this).css('background-position', '-83px 0');
            } else {
                $(this).css('background-position', '0 0');
            }
        });
    };

    //初始化
    var init = function (el, num) {
        var $rating = $(el),
            $rating_item = $rating.find('.rating-item');

        lightOn($rating_item, num);

        //事件绑定
        $rating.on('mouseover', '.rating-item', function () {
            lightOn($rating_item, $(this).index() + 1);
        }).on('click', '.rating-item', function () {
            num = $(this).index() + 1;
        }).on('mouseout', function () {
            lightOn($rating_item, num);
        });
    };

    //jqury 插件
    $.fn.extend({
        rating: function (num) {
            return this.each(function () {
                init(this, num);
            })
        }
    })
    return {
        init: init
    }
})();

$('#rating').rating(3);