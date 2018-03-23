(function () {


    var jqCascader = function ($) {

        $.fn.jqCascader = function (options, callback) {

            //默认选项
            var opt = {
                isClick: true,//默认是click触发,当设置为false为hover触发
                color: 'red',//默认颜色是红色
                subboxTips: '请选择',//默认第一页卡的内容是第一页卡内容
                resultAry: ["请选择"],//默认选择结果是请选择
                borerBottomColor: null,
                area: '',//显示结果
                listIndex: 0,//当前
                listTree: [],
                isColor: false,
                resultVal: '',
                wrapHeight: 0,
                hoverHeight: 0,
                lastValue: 0,
                curAry: [],//当前选中啥的数组
                datas: [//例子数组
                    {
                        value: 'ziyuan',
                        label: '资源',
                        children: [{
                            value: 'axure',
                            label: 'Axure Components'
                        }, {
                            value: 'sketch',
                            label: 'Sketch Templates'
                        }, {
                            value: 'jiaohu',
                            label: '组件交互文档'
                        }]
                    },
                    {
                        value: 'zhinan',
                        label: '指南',
                        children: [{
                            value: 'shejiyuanze',
                            label: '设计原则',
                            children: [{
                                value: 'yizhi',
                                label: '一致'
                            }, {
                                value: 'fankui',
                                label: '反馈'
                            }, {
                                value: 'xiaolv',
                                label: '效率'
                            }, {
                                value: 'kekong',
                                label: '可控'
                            }]


                        }
                        ]
                    }
                ]
            };

            var tabAry = [
                {
                    value: 0,
                    label: opt.subboxTips,
                    isCur: true
                }
            ];

            var cascaderObj = '<div class="cascader-wrap"> <div class="text-wrap" ref="textWrap"><span class="text"></span> <i class="arrow"></i></div> <div class="content-wrapper" style="display:none;"> <i class="close"></i> <div class="area-tab"></div><div class="area-content"> </div></div></div>';

            this.each(function () {
                var $this = $(this);//获取目标
                opt = $.extend(true, {}, opt, options); //和外部输入样式合并
                $this.append(cascaderObj);

                function init(opt) {//插件初始化需要做的工作
                    var dataAry = opt.datas;//传入的数据
                    opt.listTree[0] = dataAry;
                    opt.wrapHeight = $this.height();
                    opt.hoverHeight = opt.wrapHeight + 1;
                    $this.find(".content-wrapper").css("top", opt.hoverHeight);
                    $this.find(".text").css("line-height", opt.wrapHeight + "px");

                    if (opt.color) {//如果有自定义颜色,就改变默认颜色样式
                        colorSettings();
                    }
                    toSelectClose();
                    binds();
                    handleTab();
                    handleArea();
                    tabColor()

                }

                function setTag() {//标识符,如果同个页面实例化两个cascader,易于区分
                    return 'cascader' + Math.random();
                }

                function binds() {
                    var tag = setTag();
                    var resultShow = opt.resultAry[0];
                    $this.find('.text-wrap .text').html(resultShow);
                    $this.find('.cascader-wrap').attr('data-tag', tag);
                    //绑定
                    $this.find('.cascader-wrap').mouseenter(function (e) {
                        toSelect();
                    });
                    $this.find('.cascader-wrap').mouseleave(function (e) {
                        leave();
                    });
                    $this.find('.text-wrap').click(function (e) {
                        toSelectClick(e);
                    });
                    $this.find('.content-wrapper .close').click(function () {
                        toClose();
                    });
                }

                function areaBind() {
                    $this.find('.area-content a').click(function (e) {
                        var dataValue = $(e.target).data('value');
                        var dataLabel = $(e.target).data('label');
                        var dataIndexAry = $(e.target).data('indexary');
                        var dataIndex = $(e.target).data('index');
                        selectProvince(dataValue, dataLabel, dataIndexAry, dataIndex);
                    });
                }

                function handleTab() {
                    var tabAty = '';
                    for (var i = 0; i < tabAry.length; i++) {
                        var cur = tabAry[i];
                        tabAty += ' <a href="javascript:;"  data-label="' + cur.label + '" data-value="' + cur.value + '"  data-tabindex="' + i + '"><span>' + cur.label + '</span><i></i></a>';
                    }
                    $this.find('.area-tab').html(tabAty);
                    selectCity();
                }

                function handleArea() {
                    var areaAry = '';
                    for (var i = 0; i < opt.listTree.length; i++) {
                        var cur = opt.listTree[i];
                        areaAry += ' <div data-index="' + i + '"> <ul class="area-lists">';
                        for (var j = 0; j < cur.length; j++) {
                            var unit = cur[j];
                            areaAry += '<li><a href="javascript:;" data-value="' + unit.value + '" data-label="' + unit.label + '"   data-indexary="' + i + '"  data-index="' + j + '">' + unit.label + '</a></li>';
                        }
                        areaAry += '</ul></div>';
                    }
                    $this.find('.area-content').html(areaAry);
                    areaBind();
                }

                function colorSettings() {
                    if (typeof opt.color === 'string') {
                        opt.isColor = true;
                        $this.find(".area-tab").css("border-bottom-color", opt.color);
                        setColor();
                    }
                }

                function setColor() {
                    $this.find(".area-tab a").css("border-color", '#ddd');
                    $this.find(".area-tab a.cur").css("border-color", opt.color);
                    $this.find(".area-tab a.cur").css("border-bottom-color", '#fff');
                }

                function toSelectClick() {
                    if (!opt.isClick) {
                        return;
                    }
                    store();//同样存储样式
                }

                function store() {
                    if (opt.borerBottomColor === null) {
                        opt.borerBottomColor = $this.find(".text-wrap").css("border-bottom");
                    }

                    $this.find(".text-wrap").css("border-bottom", 0);
                    $this.find(".text-wrap").css("height", opt.hoverHeight);
                    selectOpen();
                }

                function selectOpen() {
                    $this.find('.text-wrap .arrow').addClass('open');
                    $this.find('.content-wrapper').show();
                }

                function selectProvince(val, label, indexAry, index) {
                    var isSelected = tabAry[indexAry + 1];
                    var child = opt.listTree[indexAry][index].children;
                    var obj = {
                        value: val,
                        label: label,
                        isCur: true
                    };
                    if (isSelected) {
                        tabAry[indexAry + 1] = obj;
                        opt.curAry.splice(indexAry);
                        tabAry.splice(indexAry + 2);
                    } else {
                        if (child) {
                            tabAry.push(obj);
                        }
                    }

                    opt.curAry[indexAry] = index;
                    if (!child) {
                        tabAry.splice(indexAry + 1);
                    }
                    selectCity(indexAry);
                    handleChildren(indexAry, index, obj);
                    if (opt.isColor) {
                        setColor();
                    }
                    handleArea();
                    handleTab();
                    tabColor();
                    showOneArea();

                }

                function showOneArea() {
                    var province = $this.find('.area-content').children('div');
                    for (var i = 0; i < province.length; i++) {
                        var dataIndex = $(province[i]).data('index');
                        if (dataIndex == opt.listIndex) {
                            $(province[dataIndex]).show().siblings().hide();
                        }
                    }
                }

                function handleChildren(indexAry, index, lastObj) {
                    var hasChild = opt.listTree[indexAry + 1];
                    var child = opt.listTree[indexAry][index].children;
                    if (hasChild) {
                        opt.listTree.splice(indexAry + 1);
                    }
                    tabAry.splice(indexAry + 2);
                    if (child) {
                        opt.listTree.push(child);
                        initTabAry(indexAry);
                        opt.listIndex = indexAry + 1;
                    } else {
                        showResult(lastObj);
                        opt.listIndex = indexAry;
                    }

                }

                function toSelect() {
                    if (opt.isClick) {//如果此时触发方式是hover,就离开
                        return;
                    }
                    store();
                }

                function leave() {
                    if (opt.isClick) {//如果当前能触发是click触发则不管
                        return;
                    }
                    restore();
                }

                function restore() {
                    $this.find(".text-wrap").css("border-bottom", opt.borerBottomColor); //复原样式
                    $this.find(".text-wrap").css("height", opt.wrapHeight);
                    selectClose();
                }

                function toClose() {
                    restore();
                }

                function toSelectClose() {
                    if (opt.isClick) { //如果触发是clic 对body绑定
                        $("body").click(function (e) {
                            var flag = false;
                            var ary = $(e.target).parents();
                            ary.each(function (index) {
                                if ($(ary[index]).hasClass('cascader-wrap') || $(ary[index]).hasClass('area-lists')) {
                                    flag = true;
                                }
                            });
                            if (!flag) {
                                restore();
                            }
                        });
                    }
                }

                function selectClose() {
                    $this.find('.text-wrap .arrow').removeClass('open');
                    $this.find('.content-wrapper').hide();
                }

                function selectCity() {
                    $this.find('.area-tab a').click(function (e) {
                        var dataIndex = $(this).data('tabindex');
                        opt.listIndex = dataIndex;
                        tabColor();
                        showOneArea();
                        if (opt.isColor) {
                            setColor();
                        }
                    });
                }

                function tabColor() {
                    var tabs = $this.find('.area-tab a');
                    $(tabs[opt.listIndex]).addClass('cur').siblings().removeClass('cur');
                    if (opt.isColor) {
                        setColor();
                    }

                }

                function initTabAry(indexAry) {
                    selectCity(indexAry + 1);
                }

                function showResult(lastObj) {
                    selectClose();
                    opt.area = "";
                    opt.resultVal = "";
                    tabAry.forEach(function (item, index) {
                        if (index != 0) {
                            opt.area += item.label + "/";
                            opt.resultVal += item.value + "/";
                        }
                    });

                    opt.area += lastObj.label;
                    opt.resultVal += lastObj.value;
                    opt.lastValue = lastObj.value;
                    restore();
                    $this.find('.text-wrap .text').html(opt.area);
                    if (typeof callback == 'function') {
                        callback({resultVal: opt.resultVal, restLabel: opt.area, lastValue: opt.lastValue});
                    }

                }
                init(opt);//初始化插件

            });
            return this;
        };
    };

    if (jQuery === 'undefined') {
        throw new Error("jq_cascader requires jQuery");
    }
    jqCascader(jQuery);
})();
