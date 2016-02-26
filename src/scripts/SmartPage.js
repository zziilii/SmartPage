/*
 * SmartPage
 * 更好用的分页组件
 * zili.zhang
 *
 * 对象信息储存在变量中
 */

$.fn.smartPage = function(option) {
    var $this = $(this),
        data = $this.data('smartPage'),
        options = $.extend({}, SmartPage.DEFAULTS, {
            container: this
        }, typeof option === 'object' && option);

    if (data) {
        data.reset(option);
        return data;
    }
    var smartPage = new SmartPage(options);
    $this.data('smartPage', smartPage);
    return smartPage;
}

// // // // // // // // // // // // // // // // // // //

function SmartPage(obj) {
    /*
     * pageSize 每页容量
     * total 总数量
     * pageNumber 页码 (从一开始)
     * 
     * pageCount 计算优先 
     */

    this.pageSize = obj.pageSize;
    this.total = obj.total;
    this.pageNumber = obj.pageNumber;
    this.pageTotal = (obj.pageTotal) || Math.ceil(obj.total / obj.pageSize);
    this.displayLimit = obj.displayLimit;

    this.container = obj.container;
    this.view = this.render();
    this.bindPageHandle();
    this.callbackArray = [];
    this.onChangePage = obj.onChangePage;

}
/*
 * pageSize 每页容量
 * 
 * total 总数量
 * pageNumber 页码 (从一开始)
 *
 * displayLimit 显示页数的限制
 */
SmartPage.DEFAULTS = {
    pageSize: 20,
    total: 1,
    pageNumber: 1,
    displayLimit: 5,

    isShowFirst: true,
    isShowbefore: true,

    container: $('body'),
    onChangePage: defaultOnChangePage,
}

SmartPage.prototype = {
    constructor: SmartPage,
    setPageSize: setPageSize,
    setFullSize: setFullSize,
    setPageNumber: setPageNumber,

    render: render,
    resetView: resetView,
    reset: reset,
    bindPageHandle: bindPageHandle,
}

function defaultOnChangePage(number) {
    console.log(number);
}
// // // // // // // // // // // // // // // // // // //
function render() {
    var self = this,
        firstShowPage = 0,
        lastShowPage = 0,
        halfLimit = Math.floor(self.displayLimit / 2),
        htmlArray = [];

    firstShowPage = self.pageNumber - halfLimit;
    lastShowPage = self.pageNumber + halfLimit;
    if (firstShowPage > self.pageTotal - self.displayLimit) {
        firstShowPage = self.pageTotal - self.displayLimit;
    }
    if (firstShowPage < 1) {
        firstShowPage = 1;
    }
    if (lastShowPage < self.displayLimit) {
        lastShowPage = self.displayLimit;
    }
    if (lastShowPage > self.pageTotal) {
        lastShowPage = self.pageTotal;
    }

    htmlArray.push(TEMPLATE.style);
    htmlArray.push(TEMPLATE.first);
    for (var i = firstShowPage; i <= lastShowPage; i++) {
        htmlArray.push(TEMPLATE.left);
        htmlArray.push(i);
        htmlArray.push(TEMPLATE.middle);
        htmlArray.push(i);
        htmlArray.push(TEMPLATE.right);
    };
    htmlArray.push(TEMPLATE.last);
    htmlArray.push(self.pageTotal);
    htmlArray.push(TEMPLATE.page);

    var view = $(htmlArray.join(''));

    self.container.html(view);
    resetClass.call(self);
    return view;
}

/*
 * resetClass 
 * view jQuery object
 */
function resetClass() {
    var self = this;

    self.container.find('.page-number-' + self.pageNumber).addClass('active').siblings('.page-number').removeClass('active');

    if (self.pageNumber <= 1) {
        self.container.find('.page-first,.page-pre').addClass('disabled');
    } else {
        self.container.find('.page-first,.page-pre').removeClass('disabled');
    }
    if (self.pageNumber >= self.pageTotal) {
        self.container.find('.page-last,.page-next').addClass('disabled');
    } else {
        self.container.find('.page-last,.page-next').removeClass('disabled');
    }
}
/*
 * bind SmartPage click
 */
function bindPageHandle(view) {
    var self = this;

    self.container.on('click', '.page-number', function(event) {
        event.preventDefault();

        self.pageNumber = +$(this).find('a').text();
        self.render();
        self.onChangePage(self.pageNumber);
    }).on('click', '.page-next:not(.disabled)', function(event) {
        event.preventDefault();

        self.pageNumber++;
        self.render();
        self.onChangePage(self.pageNumber);
    }).on('click', '.page-pre:not(.disabled)', function(event) {
        event.preventDefault();

        self.pageNumber--;
        self.render();
        self.onChangePage(self.pageNumber);
    }).on('click', '.page-last:not(.disabled)', function(event) {
        event.preventDefault();

        self.pageNumber = self.pageTotal;
        self.render();
        self.onChangePage(self.pageNumber);
    }).on('click', '.page-first:not(.disabled)', function(event) {
        event.preventDefault();

        self.pageNumber = 1;
        self.render();
        self.onChangePage(self.pageNumber);
    }).on('click', '#jumpPageBtn', function(event) {
        event.preventDefault();

        jumpPage.call(self);

    }).on('keypress', '#jumpPage', function(event) {
        if (event.keyCode == 13) {
            jumpPage.call(self);
        }
    });
}

function reset(option) {
    var self = this;

    for (var xx in option) {
        self[xx] = option[xx];
    }
    self.pageTotal = (option.pageTotal) || Math.ceil(self.total / self.pageSize);

    self.render();
}

function jumpPage() {
    var self = this;

    var pageNumberElement = self.container.find('#jumpPage'),
        pageNumber = parseInt(pageNumberElement.val());

    switch (true) {
        case !pageNumber || pageNumber < 1:
            pageNumber = 1;
        case pageNumber > self.pageTotal:
            pageNumber = self.pageTotal;
    }

    self.pageNumber = pageNumber;
    self.render();
    self.container.find('#jumpPage').val(pageNumber);
    self.onChangePage(self.pageNumber);
}

function setPageSize() {

}

function onChangePage(callback) {
    if (typeof callback !== 'function') {
        console.warn('callback is not a function!');
    }
    this.callbackArray.push(callback);
    return;
}

function setFullSize() {

}
/*
 *
 * 
 */
function setPageNumber(number) {
    if (typeof number !== 'number' || number < 1 || number === NaN) {
        console.warn(number + ' is not a legal number!');
    }

    var me = this;
    changePageView(number);
    isFire = (isFire === undefined ? true : isFire);
    // isFire ?
}
/*
 *  改变页面
 */
function changePageNumber(number) {

}
/*
 *  重新渲dom
 */
function resetView() {

}

// function reset(obj) {
//     var me = this;

//     switch (true) {
//         case (obj.hasOwnProperty('pageCount') || typeof obj.pageCount === 'number' || obj.pageCount >= 1):
//             me.pageCount = obj.pageCount;
//             break;
//         case (obj.hasOwnProperty('pageSize') || typeof obj.pageSize === 'number' || obj.pageSize >= 1):
//             me.pageSize = obj.pageSize;
//         case (obj.hasOwnProperty('total') || typeof obj.total === 'number' || obj.total >= 1):
//             me.total = obj.total;
//             me.pageCount = Math.ceil(me.total / me.pageSize);
//             break;
//     }
// }


var TEMPLATE = {
    first: '<ul class="smartPage"><li class="page-first"><a href="javascript:;">«</a></li><li class="page-pre disabled"><a href="javascript:void(0)">‹</a></li>',
    left: '<li class="page-number page-number-',
    middle: '"><a href="javascript:void(0)">',
    right: '</a></li>',
    last: '<li class="page-next"><a href="javascript:void(0)">›</a></li><li class="page-last"><a href="javascript:void(0)">»</a></li></ul><span class="total smartPage">共',
    page: '页</span><input type="number" id="jumpPage" class="form-control"><a class="btn btn-primary form-group" id="jumpPageBtn">跳转</a>',
    style: '<style>.smartPage{display:inline-block;padding-left:0;border-radius:4px;vertical-align:middle}.smartPage>li{display:inline}.smartPage>li:first-child>a{margin-right:0;border-radius:4px 0 0 4px}.smartPage>li:last-child>a{margin-right:0;border-radius:0 4px 4px 0}.smartPage>li>a,.smartPage>li>span{position:relative;float:left;padding:6px 12px;margin-left:-1px;line-height:1.42857143;color:#428bca;text-decoration:none;background-color:#fff;border:1px solid #ddd}.smartPage>.active>a,.smartPage>.active>span,.smartPage>.active>a:hover,.smartPage>.active>span:hover,.smartPage>.active>a:focus,.smartPage>.active>span:focus{z-index:2;color:#fff;cursor:default;background-color:#428bca;border-color:#428bca}.smartPage>li>a:hover,.smartPage>li>span:hover,.smartPage>li>a:focus,.smartPage>li>span:focus{color:#2a6496;background-color:#eee;border-color:#ddd}.smartPage .pager li > a,.smartPage .pager li > span{border-radius:0}.smartPage > .disabled > span,.smartPage > .disabled > span:hover,.smartPage > .disabled > span:focus,.smartPage > .disabled > a,.smartPage > .disabled > a:hover,.smartPage > .disabled > a:focus{color:#777;background-color:#fff;border-color:#ddd;cursor:default}#jumpPage{width:100px;padding:6px 12px;font-size:14px;line-height:1.42857143;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:4px 0 0 4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;vertical-align:middle}#jumpPageBtn{color:#fff;display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:normal;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1px solid transparent;border-radius:0 4px 4px 0;border:1px solid #ccc;vertical-align:middle;background-color:#337ab7;border-color:#2e6da4;pointer:cursor}#jumpPageBtn:hover,#jumpPageBtn:active{background:#23527c}#jumpPageBtn{}.smartPage.total{margin-right:100px;margin-left:20px;color:#666;font-size:12px;vertical-align:middle}</style>'
}
