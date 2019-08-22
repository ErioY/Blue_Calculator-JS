/*
 * @Autor: ErioY
 * @Date: 2019-08-21 17:42:42
 * @Email: 1973545559@qq.com
 * @Github: https://github.com/ErioY
 * @LastEditors: ErioY
 * @LastEditTime: 2019-08-22 14:09:29
 */
var oInput = document.getElementsByTagName("input")[0];
var aLi = document.getElementsByTagName("li");

var num = [];
var valueInput = []; // 存入输入的值
var label = false;
// 
for(var i = 0; i < aLi.length; i++) {
    aLi[i].onclick = addClick;
    function addClick() {
        // oInput.value += aLi[i].innerHTML;
        //输入为数字或者为“.”
        if(!isNaN(this.innerHTML) || this.innerHTML=="."){
            //文本框初值不为0
            label = true;
            if(oInput.value !== "0") {
                // 文本框中有“.”
                if(oInput.value.indexOf(".") !== -1) {
                    //处理点重复的问题
                    //输入"."时
                    if(this.innerHTML !== ".") {
                        oInput.value += this.innerHTML;
                    }
                } else {
                    oInput.value += this.innerHTML;
                }
            } else {
                // 文本框初值为0
                if(this.innerHTML == "."){
                    oInput.value = "0" + this.innerHTML ;
                }
                else {
                    oInput.value = this.innerHTML;
                }
            }
        }
        // 非数字
        else {
            switch(this.innerHTML ) {
                case "+" :save(this);
                          break;
                case "-" :save(this);
                          break;
                case "/" :save(this);
                          break;
                case "*":save(this);
                          break;
                case "=":
                    valueInput.push(oInput.value);
                    var result = eval(valueInput.join(""));
                    if(result == "Infinity") {
                        remove_add ("remove");
                    }
                    oInput.value = result == Infinity ? "除数不能为零" : result;
                    //console.log(valueInput.join(""));
                    valueInput=[];
                          break;
                case "Del":
                    //从后往前一个一个的减数字  substr(start,count)  substring(start,end) end不取
                    oInput.value = oInput.value.length == 1 ? "0" : oInput.value.substr(0,oInput.value.length-1);
                    break;
                case "C":
                    oInput.value="0";
                    valueInput=[];
                    remove_add("add");
                    break;
            }
        }
        }
    }
    function save(mini) {
        //清屏之前存储用户按的值
       // 确认一个条件  用户是连续按符号  还是数字+符号
        if(!label){   //连续两次按符号时
            valueInput[valueInput.length-1] = mini.innerHTML ;  //第二次按的符号替代第一次的
        }
        else {
            valueInput.push(oInput.value );
            valueInput.push(mini.innerHTML );
        }
        oInput.value = "0";
        label = false;
    }
    //卸载除c以外的所有元素的事件
    function remove_add(p) {
        for(var i = 0; i < aLi.length;i++) {
           if(p == "add"){
               aLi[i].onclick = addclick;
           }
           else {
               if(aLi[i].innerHTML != "c") {
                   aLi[i].onclick = null;
               }
           }
        }
    }
 
