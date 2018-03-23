### Cascader级联组件

#### 使用

```html
引入默认cascader样式表
<link rel="stylesheet" href="jq_cascader.css"> 
```
```html
目标dom结构
<div class="cascader1" style="width: 500px;height: 30px;"></div>
```
```html
引入jquery文件
<scriptsrc="jquery-3.3.1.js"></script>
```
```html
引入此插件
<script src="jq_cascader.js"></script>
```

#### 用法
```javascript
$(".cascader1").jqCascader(options,callback);

```
#### options为自定义内容以及样式接口
```javascript

var options = {
    isClick:false,//默认是true,当为true,触发方式为click,否则为hover触发
    subboxTips:'请选择',//初始化显示的内容
    color:'blue',//修改样色
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
```
#### callback得到选择结果
```javascript
var callback = function(result) { //result为JSON格式,获取选择的结果
  console.log(result);

};
```
### 结果(result)以及样式示例
  ![image](https://github.com/niangkouss/pics/raw/master/jq_cascader_resultshow.png)



### 后续
不定期优化增强


