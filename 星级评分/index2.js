var rating = (function () {
    //点亮整颗
    var LightEntire = function (el, options) {
        this.$el = $(el);
        this.$item = this.$el.find('.rating-item');
        this.opts = options;
    }

    LightEntire.prototype.init = function () {
        this.lightOn(this.opts.num);
        this.bindEvent();
    }

    LightEntire.prototype.lightOn = function (num) {
        num = parseInt(num);
        this.$item.each(function (index) {
            if (index < num) {
                $(this).css('background-position', '-83px 0');
            } else {
                $(this).css('background-position', '0 0');
            }
        });
    };


    LightEntire.prototype.bindEvent = function () {
        var self = this,
            itemLength = self.$item.length;
        self.$el.on('mouseover', '.rating-item', function () {
            var nums = $(this).index() + 1;
            self.lightOn(nums);
            (typeof self.opts.select === 'function') && self.opts.select.call(this,nums,itemLength)
        }).on('click', '.rating-item', function () {
            self.opts.num = $(this).index() + 1;
            (typeof self.opts.chosen === 'function') && self.opts.chosen.call(this,self.opts.num,itemLength)
        }).on('mouseout', function () {
            self.lightOn(self.opts.num);
        });
    }


    //默认参数
    var defaults = {
        num: 0,
        readOnly: false,
        select: function () {},
        chosen: function () {}
    }

    //初始化
    var init = function (el, options) {
        options = $.extend({}, defaults, options);
        new LightEntire(el, options).init();
    }


    return {
        init: init
    }
})();

rating.init('#rating', {
    num: 2,
    select: function (nums, total) {
        console.log(this);
        console.log(nums + '/' + total);
    },
    // chosen:function(nums,total){
    //     console.log(nums + '/' + total);
    // }
})