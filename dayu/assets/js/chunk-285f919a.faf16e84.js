(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-285f919a"],{"433f":function(t,s,e){"use strict";var a=e("7a07"),i=e.n(a);i.a},"5e96":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",[t._m(0),e("div",{staticClass:"item"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],attrs:{type:"text",placeholder:"请输入提现地址"},domProps:{value:t.address},on:{input:function(s){s.target.composing||(t.address=s.target.value)}}})]),e("div",{staticClass:"item"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.remark,expression:"remark"}],attrs:{type:"text",placeholder:"地址备注"},domProps:{value:t.remark},on:{input:function(s){s.target.composing||(t.remark=s.target.value)}}})]),e("div",{staticClass:"item"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"请输入6位纯数字地址密码",maxlength:"6"},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}})])]),t._m(1),e("mt-button",{staticClass:"button",nativeOn:{click:function(s){t.save()}}},[t._v("保存")])],1)},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"title"},[a("img",{staticClass:"icon",attrs:{src:e("da41"),alt:""}}),a("span",{staticClass:"name"},[t._v("TRX")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("p",{staticClass:"tip_title"},[t._v("添加须知")]),e("p",{staticClass:"tip1"},[t._v("1、为保证资产安全，添加地址后，仅能提现到账该地址，请勿随意添加")]),e("p",{staticClass:"tip1"},[t._v("2、修改提现地址时验证地址密码，请妥善保存，遗失或泄漏造成的资产，平台概不负责")])])}],r=(e("cadf"),e("551c"),e("097d"),{name:"CashAddressAdd",data:function(){return{id:this.$route.query.id||0,address:this.$route.query.withdrawAddress||"",remark:this.$route.query.remark||"",password:""}},mounted:function(){},methods:{save:function(){var t=this;if(this.address.length<1)this.$ui.Toast("请输入提现地址");else if(this.remark.length<1)this.$ui.Toast("请输入备注");else if(/^\d{6}$/.test(this.password)){var s="添加提现地址",e="添加提现地址后，仅能提现到该地址，请核对提现地址和地址密码无误后，进行添加",a="确定添加";this.id&&(s="修改提现地址",e="修改提现地址后，仅能提现到该地址，确认修改么？",a="确定修改"),this.$ui.MessageBox({title:s,message:e,showCancelButton:!0,showConfirmButton:!0,confirmButtonText:a,cancelButtonText:"取消"}).then(function(s){if("confirm"==s){t.$ui.Indicator.open({text:"加载中...",spinnerType:"snake"});var e="/blockchain/v1/user/saveWithdrawAddress";t.id&&(e="/blockchain/v1/user/updateWithdrawAddress"),t.$axios({method:"post",url:e,data:{id:t.id,currency:"trx",withdrawAddress:t.address,remark:t.remark,addressPwd:t.password}}).then(function(s){t.$ui.Indicator.close(),s.data.status&&(t.$ui.Toast("保存成功"),t.$router.go(-1))}).catch(function(s){t.$ui.Indicator.close()})}})}else this.$ui.Toast("请输入6位纯数字地址密码")}}}),n=r,o=(e("433f"),e("2877")),d=Object(o["a"])(n,a,i,!1,null,"4683fb8d",null);d.options.__file="CashAddressAdd.vue";s["default"]=d.exports},"7a07":function(t,s,e){},da41:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAALVBMVEVHcEzkCBTmCRTlCBTmCBTlCBTkCRX////oLDT97+7sUFbweHz1n6H72dn4vsCLYoeoAAAABnRSTlMA7VvGL5zcaYGsAAAFS0lEQVRYw6WZy29bRRTGnQddp1XkdRDgNaLI6xRE1wjRrHHcjm5sx9uJm8fSUQpiiaugZlknSsQyRqjqMpaI6LIGCXXJBVH6NzDvOWfm3PF1fBZRfHW/OzO/M/PNq1Ipis8e3L1dbdy+++DDyoyx/FGVuWh8tT6LFkq1vLR0sc6iaK6V035RZVR8XUb7ASuIT+bQllB/zhLxaVr7HkvGl0nO1bS4kWC+XGdTolncXd5nU+PODRucbPb0Sicqfo+VilWy4Go5cWP9ZrQKmS2y0hEnu8a616flxJtEizucn/zav0mrBeqMi+j9+Ut/VuAK9YSr2P/3dLail+SzEbdxcv08qf4YiTfkoy0O4k2q+o/iPHU4it7bn0tlS/dMRYy/G3j9s6LsQWRmSChix9n5b0D/hsxeM+5diljvUtThxT+g+lT2fL0XzBNNbE/9/+TlxOvj7K1g1prYO/HqX+Ynqv7JdZ/kvWyftDh/OhbluNeyi/9Q9YF6HfYQQ2y3LZmBl568+MPrf4/7Sc09GfF9dqaZQf0rW/1ePxpa3ruOOO9nE8vMR3Zuqv80TBawAUHsin0PmAH9y6DotaDJktgPjCFmLs5U0cdBo++DNwQxxkJmKuTDZ6JoN9weoixrYge6kICZqU4OvqozDV+RxET7YmZdUfDf6q8tuhHZZlcSYzEz+zlR9C4ktgRf0sRiZpLWpRnyl4DYLVS9if5ywKw9sD/HvuhvUP/yxHxRbqyaDIOiNwPYjB0qYgEzTct9Z8/jrjKCGGKGPiQbdGVxL+OUWGKQ2VHYhD07KsMJbsIf+yIUpNYAwfvOVWkNZwoQ88xGYDxkF8rcDkyuFgKxJeaa2nUm4G1Vf2wlSDMgZpg5Wt++8o52bBJ9nxUR08x05ZEZWXwPgz4iYmCJaWbSiy+Ai3Oft82gjyBi1gA4NODnY5f/R7HYE9PMAusXtdl3IzpauQFimpmdM/Wkc+ZdsBmLBbHXsM/g2TobeDtoVuKlGyCmxXCdsA3coEGIx4CY+NKPp4GVXaXEiBhqA8IlxfHE3QVjqBV42RBOGowQwz7WgugVrh5YJxHVDvoYNHCIi24zJNbxiWHaea+miA/9+O0CeOpTB3AhWKkniW0j8Qizb1Ji0Me2eA88H8ApVoo3WIrYIUirNMLHeFFDiT2xQ9jIHKMX4hpLERuC2bITTp2bkQ1hYiOQ1wCXtKFbhLjtXhv7VrY4xiUNcIGliOVefBStNVboDeTYtm7Cd8DIvgy3leR+yhEbuDHSjVdna+FE5zqWLsUzGseLs/UK1bkdscwpkAv4Fc1GgpgfzmfIBdzkXksQc8MZmiZculK9RPQsRaxjxdgF/BJwKUHMecEY25FbSpG5MsSsFxC4zLKXwp1pYttmOA9jXML+KkW4NTHjBYFpwoVrETE/nClcZsmcIDbU4pzAZRbrCWLaCwLTxHu6Ok1sx3pB5AJwN1ncx5QXhKaJt0ZLhcRyWXxomnhTVjwqlRfkkQvA7SCZ6bYcjdILOrELoI0/5WNiKO+oqZ3EBbbAiwXEpBfEphkeGtRpYtILjogNGtr2k0dhgti5QDUhca1OOZISxN5y/hOJCx9MbZDE9jnPqR0tPmQh+0luVpxTj3eoM7xhuN8uPNO6RxLjPDZN4gyRKFov1XfLHCHWKGKccoH4GI/KVl6Aa63M0eWQxnWn1KHpFidMkz40jYG3SVyr5Q6KMwpX0Ql3tMLID2Y4mQ+ZDV+XPxyPKr7dn+FYPrwQyGa5EJjvKmK+S5D5rl/mu/gpunJqlLpymu+yK7ihm/Gabc4LvpJXi/8DANNpjg++gEgAAAAASUVORK5CYII="}}]);