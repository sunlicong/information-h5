(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-528d3454"],{"0a4e":function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"mine"},[i("div",{staticClass:"top"},[i("img",{staticClass:"top_bg",attrs:{src:a("0e3e"),alt:""}}),i("div",{staticClass:"info"},[i("img",{attrs:{src:t.data.profile.photo,alt:""},on:{click:function(s){t.onClick("editInfo")}}}),i("div",{staticClass:"nick"},[t._v(t._s(t.data.profile.nick))]),i("p",{staticClass:"count"},[i("span",{on:{click:function(s){t.onClick("profile")}}},[t._v("动态："+t._s(t.data.dynamicsCount))]),i("span",{on:{click:function(s){t.onClick("follow")}}},[t._v("关注："+t._s(t.data.followedCount))]),i("span",{on:{click:function(s){t.onClick("fans")}}},[t._v("粉丝："+t._s(t.data.fansCount))])])]),i("div",{staticClass:"card"},[i("img",{staticClass:"top_bg",attrs:{src:a("4421"),alt:""}}),i("div",{staticClass:"card_info"},[i("div",{on:{click:function(s){t.onClick("wallet")}}},[i("p",[t._v("我的钱包")]),i("p",[i("span",[t._v(t._s(t.$formatMoney(t.data.totalToken,1)))]),i("span",[t._v("点钻")])])]),i("div",{staticClass:"line"}),i("div",{on:{click:function(s){t.onClick("wallet")}}},[i("p",[t._v("累计分红")]),i("p",[t.data.incomeTrxToken>0?i("span",[t._v(t._s(t.$formatMoney(t.data.incomeTrxToken,1))+"TRX")]):t._e(),t.data.incomeTrxToken>0&&t.data.totalCommition>0?i("span",[t._v("+")]):t._e(),t.data.totalCommition>0?i("span",[t._v(t._s(t.$formatMoney(t.data.totalCommition,1))+"元")]):t._e(),0==t.data.incomeTrxToken&&0==t.data.totalCommition?i("span",[t._v("0.00")]):t._e()])])])])]),i("div",{staticClass:"item mt_20",on:{click:function(s){t.onClick("invite")}}},[t._m(0),t._m(1)]),i("div",{staticClass:"inviteView",on:{click:function(s){t.onClick("inviteList")}}},[i("div",{staticClass:"inviteItem"},[i("p",{staticClass:"inviteText1"},[t._v("邀请奖励")]),i("p",{staticClass:"inviteText2"},[t._v(t._s(t.data.invitation.award)+"点钻")])]),i("div",{staticClass:"inviteItem inviteLine"},[i("p",{staticClass:"inviteText1"},[t._v("我的邀请")]),i("p",{staticClass:"inviteText2"},[t._v(t._s(t.data.invitation.count)+"人")])])]),i("div",{staticClass:"item mt_20",on:{click:function(s){t.onClick("publish")}}},[t._m(2),t._m(3)]),i("div",{staticClass:"item mt_1",on:{click:function(s){t.onClick("works")}}},[t._m(4),t._m(5)]),i("div",{staticClass:"item mt_20",on:{click:function(s){t.onClick("addressManager")}}},[t._m(6),t._m(7)])])},l=[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"left"},[i("img",{staticClass:"icon",attrs:{src:a("2834"),alt:""}}),i("div",{staticClass:"margin-left-20"},[t._v("邀请好友得点钻")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"right"},[i("div",{staticClass:"quan-total color_FF7821"},[t._v("立即邀请")]),i("img",{staticClass:"arrow",attrs:{src:a("d617")}})])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"left"},[i("img",{staticClass:"icon",attrs:{src:a("da9b"),alt:""}}),i("div",{staticClass:"margin-left-20"},[t._v("发布作品")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"right"},[i("div",{staticClass:"quan-total color_FF7821"},[t._v("复制文章链接，一键发布")]),i("img",{staticClass:"arrow",attrs:{src:a("d617")}})])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"left"},[i("img",{staticClass:"icon",attrs:{src:a("e42a"),alt:""}}),i("div",{staticClass:"margin-left-20"},[t._v("作品管理")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"right"},[i("div",{staticClass:"quan-total color_FF7821"}),i("img",{staticClass:"arrow",attrs:{src:a("d617")}})])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"left"},[i("img",{staticClass:"icon",attrs:{src:a("91b9"),alt:""}}),i("div",{staticClass:"margin-left-20"},[t._v("提现地址管理")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"right"},[i("div",{staticClass:"quan-total color_FF7821"}),i("img",{staticClass:"arrow",attrs:{src:a("d617")}})])}],e=(a("cadf"),a("551c"),a("097d"),{name:"Mine",data:function(){return{data:{dynamicsCount:0,fansCount:0,followedCount:1,invitation:{award:0,count:0},award:0,count:0,profile:{nick:"",photo:"",desc:""},totalCommition:0,incomeTrxToken:0,totalToken:0}}},created:function(){this.requestData()},methods:{onClick:function(t){switch(t){case"publish":this.$router.push({path:"/Publish"});break;case"wallet":this.$router.push({path:"/Wallet"});break;case"rmb":this.$router.push({path:"/WalletItemDetail",query:{formType:2}});break;case"editInfo":this.$router.push({path:"/EditProfile",query:{photo:this.data.profile.photo,nick:this.data.profile.nick,desc:this.data.profile.desc}});break;case"profile":this.$router.push({path:"/Profile",query:{uid:this.$store.state.user.uid}});break;case"fans":this.$router.push({path:"/MyFans"});break;case"follow":this.$router.push({path:"/MyAttention"});break;case"works":this.$router.push({path:"/MyWorks"});break;case"invite":this.$router.push({path:"/InviteFriend"});break;case"inviteList":this.$router.push({path:"/inviteList"});break;case"addressManager":this.$router.push({path:"/CashAddressManager"});break;default:break}},requestData:function(){var t=this;this.$ui.Indicator.open({text:"加载中...",spinnerType:"snake"}),this.$axios({method:"get",url:"/blockchain/v1/user/queryProfileCounts"}).then(function(s){t.$ui.Indicator.close(),s.data.status&&(t.data=s.data.data)}).catch(function(s){t.$ui.Indicator.close()})}}}),n=e,c=(a("3685"),a("2877")),A=Object(c["a"])(n,i,l,!1,null,"14d6e52e",null);A.options.__file="Mine.vue";s["default"]=A.exports},"0e3e":function(t,s,a){t.exports=a.p+"assets/img/bg_mine.cef828e1.png"},2834:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAlCAMAAAD7q3BLAAAAkFBMVEUAAAA5s/8IlfwHmf8LnP8Hlf0Mlv8Hlf0Hlf0Hlf0JlvwIlf0Ilf0Kl/8Hlf0Ilf0IlfwIlf0IlfwIlv8Ynf8IlP0Hlf0Hlf0IlfwIlf0Ilf0Ilf8Hl/8JmP8OnP8Ilf0Hlf0IlfwIlf0Ilf0IlvwJlv8Jlf8LmP8Ml/8Plv8Hlf0Ilv0Hlv0HlfwHlfwHlP2Z6Vu3AAAAL3RSTlMABMQhFfYr+dyrVqWRM/Hlvp5jPwrt0s+5mXdJRhwS39bIfm5cUjktJxGKg2mwr+RHnbUAAAFOSURBVDjLhZLXdqswFAWPkWR6MeDeu32Tm/n/v0vsJMQSxJkX2HvNQgdJ8shiuslMEB560k3q8UVw7BQiA5PXRXWIDbx0CAufcfr5unyDWUvQQ4q6SQlUrpGQrx5igecIPUP5mM+Q2sYcU1vFlp1tzCjs4h+hW8R2sXcHeSF0Pzqxi1dGdjFgYBd9UNa/5ZRis2H6GEt87Z4KzH+SGpKIy4SsUS4B61XLuG7wp/dZVruM7CxtrgUw+h9ufQj60skh4M5wVstvnBJvFEa/XcJelay5k0/TLuEYAGAMAKNIHJQHfrE/X0X0qbwFR6iGEKuffNmVzob6rNtLx14zcmrwdHty+N4VnTOu5ZkxIF/KM6MPkbistF5CpfVt9ZBtS0homEjtM28ZAxo8OZJ1nMNSqQsslFI3PRYbd1KP/R9GQPSHYThJN+H4c8D44/mUd3+wJjsHVRZRAAAAAElFTkSuQmCC"},3685:function(t,s,a){"use strict";var i=a("d7bc"),l=a.n(i);l.a},4421:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAAC0BAMAAACakdKHAAAAElBMVEX9/v/9/v/9/v/9/f/////0+v89WvElAAAABHRSTlMBl+NHbpjblgAAAydJREFUeNrt2sFS4kAQxvEWX4DC9Q61elfLfQAwc9+qnX7/V9kYcDUyAbKka7pT/+/sofPjo2cQRPZ5Xj005PrsNnfSywqTybL5CvsDjwmz/YR9QWPS/PmAvcFi4izZBbb7gMpalZbKGpX2FgeDPLWyCxgM8ptlYLgOUDAJNwO72wFr1iZreQXBJG8cYGZHGLJWsg8gmGSHrJksBlYXWgiQRZYgiyyyBFlkkSXIIossQRZZZAmyyCJLkEUWWYIsssgSZJFFliCLLLIEWWSRJcgiiyxBFllkCbLIIkuQRZYgiyyyBFlkkSXIIossQRZZZAmyyCJLkEUWWYIsssgSZJFFliCLLLIEWWSRJcgiiyxBFllkCbLIIkuQRRZZgiyyBFlkkSXIIossQRZZZAmyyCJLxsmqagbGQFYVWhNZ1cC0niaXMmxI2eRqdinDqsaFdUIrA8NpzFXgaHgZgI23DlR90coAbDjZ3vAeppeh2TRmZbOb6WUIViNW1tOFXIZgg62D9KUMzmQ1tmxvYhdvORmCjbUOUm/g5EhWZyDbb3B2sw3a5H00vSfezcCxbOB8o/SwDuYp2yA7oWzjTVZPJuYB5mLRnpHVMJ3N36m9y+YopW2iyTotbUrt5fD0ekD2v//9cmq4CLIe18H5Fx7Z6yrbzZdKk0aQVeey5Vn932f9d7ZsS2evXbND49LZyTt7GDiCrEaT7WjprIWsdn+S6ezUi3Y/cv1ChJRNEWYO+RksRRg6ZGebCEOH7Oz50iqdtZLNdNZmG3j4JccsTzAXvzcoTpVdNnVMZZ1+Bmt8J8WQfYz3fe1FsLXXwS6g7GWVrf0YO7kvvdhOrwTjZOs+wrYom1wXV4PI/iq8i3QWsnUf4U0WA7I5+jKoLLuWm2idvRi2bjmWIqFkdUyqyoocH2GN3xMsjZKt+QzbVnZRvHXNoLJVH2Ldyt4G+mFnHNknKa+DCNeC7PlLm/dlIMe3gxgXrgvWbr0HWXayx6XNAWSzZ9l9ZQul9aqcCj8ycjn7obIiLzOVrXVi/JR/uUfWYBd0WSE7WTbSy/PqMZbsJXeDCrK7zd1B9C+aNAJcSo+H8wAAAABJRU5ErkJggg=="},"91b9":function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABMCAMAAAD0vHEkAAAAM1BMVEVHcEwGlP0GlP0Hlf0Hlf4HlP0HlPwGlf0AlP8HlP0GlP0HlP0FlP0FlP4Glf0Hlf0HlPxt8UrYAAAAEHRSTlMA7/lFarYbfg3fmc00LFaIH3q2ngAAAtpJREFUWMO9WOuaqzAINPdLNfH9n3a7iZqoQNA938m/tnZkGCDANP3f4+eUtHM6pdn/EWp2JqzdCcbNb7FUFCtwRFQvKLqwoie4Z7RtFit5RLZ8NN2DyWBizDlGE2QPqLn+/7T/GL2cftKmvenDUkXvNkiTABf5ZI4HxgZ6cwiIesfGHdAMJLE70Ui62sadMPnYErhu2R0cFgJt83Pm+DhvTkHxbLVNMKNe1ZcHhK//DM0HXfOB9TDkywg6Boy3x2gHHhB/s6QdS4kn74FQHfe49qjqPphqfl7JMkTXCvAlnFNoCQu841Xhnu+8fDEuvrsESv6KPvhc0ccC1ehSoxRQs2yJCdd9E2DjfvOkrxm/1QsIzOKpcFEbME6fA7tmYUbMU2f2ZpQoW05nJD0buSJEwnJIVrwNTQJ5k4oYJ6mFxwvgL96OBuVNDYy519VQORkshbaxdf0HTRboQKJVJ5s+TBa6ZpBo09KFii9PDi8QAm2ayut8UyLA9f7b2Ln95l3N94ODIUPTIqFK+Fps5anbcagWqcFFvN5fmye0DKT2p38Bp1vYZYLsOiab2y84XJXCuVhbTodLoZt1elg6FZ42HY/gB1Lw4b48tJ/oQNmonsk67Rl3R2AKsR6kUDuRJNNY2z7oYQN8Kb6FQwrUS7Jo+WRK4SEthH8ZKFFeJxbs6uHA6XvixUGYUnBAB4Vd2xw4Bagd6DwjfZfveA7o0dg5WycgmdgN2aAE3PHodnFUUcwVj25mhwXKXC9OstUe17sNb2YNAie4I/X6k+VlIKDGlB7OB2rlsHCGKNvprskNhmKNeLl9T8NZ3gA6Kz8xyJrn4zEkxdYVXZg9Gt572wXMi79agNDs28UHeydwrGUkF1BJckzflkYSWRrdZgo52M8QKy0czT9buCGdiWWggetA+LJOrM0WtKzU6EBhWKvLyypVI36Rkb0I7Ra9aGfycJlc19D6ryvod+cH63pcSiN4B+sAAAAASUVORK5CYII="},d617:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAVBAMAAACAghKHAAAAFVBMVEUAAACampqcnJybm5uampqbm5uZmZlL8ECiAAAABnRSTlMA7jEXy2G6BwtVAAAAMElEQVQI12MwNWAAATchCJWoAKIU08BcJjHiuMIgijUtFcqDykFU4uZA7UPYDnULAIWODDk3zx5uAAAAAElFTkSuQmCC"},d7bc:function(t,s,a){},da9b:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAiCAMAAAAEcluKAAAAkFBMVEUAAAAHlf0Ilf0Ilf0HlfwPmv8HlP0sqP8UmP8aov8Ilf0MnP8Hlf0Hlf0Ilv0Jlv0Ilv0Rov8Ilf0HlP0Ilf0Ilf0Ilf0Jlf0Ilf0Ilf8Ilv8LmP8HlfwIlf0IlfwJlv0Jlv8Jlf8IlfwIlP0Hlf0Jlv8Mlv8Il/8Jmv8IlfwIlf0Ilf0KmP8HlPwIlfwHlP0t8vb5AAAAL3RSTlMA8+vnsxDwBQwJexT4zYNybw7g1pyGf3buQz4tuZNdVk82wqCLSSggG8OopTGsqveTBs4AAAFoSURBVDjLpdPZcoJAEIXhhhFRZFEQE1yicYtZ//d/uzgNURMBrcqpomYuvoKe7kFupj/M1qPbyADTexAMWlFSIkwbenCpMm9EPUXOWtm2FXXjj+Myh6d6FJTI62WwiGFWg0bBo0UTT6QDc79D6DegR4skh8yTlOgv8iZdRdr1J+juxYNNLQoUyXMIO5EpJL9QbJEb9ERzMDA8rkMortBDhaQfwdhuxhejGuTOGWne4VUPGGEakQSQ6kv8kHmJthaZpC/nrMApe7qHXI99jWTmwKrcLmFpV70ri+dLNUghqPY57LUKBxsz3v2MxF/Dm1Q5jcrfjV2VzttyVLUgOtVgLkc13aYquwftpzmcvq/duyx7EunFKiA8V1rYUfzJy+r42AKy/AcmDX/VF2XMorClb8CrYx2c1cYtC31f9iJSaWAi/nSRqgyh08g0H3GmMm5leqTklXDWzsp4I7nJNP9in7j3sCJLpCbfOOQ0L1vEC8cAAAAASUVORK5CYII="},e42a:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAiBAMAAADMnMbMAAAAHlBMVEUAAAAIlf0Ilv0Ilf0Ilf0Ilf0Jm/8Hlf0IlP0HlP0nQZPyAAAACXRSTlMAgIXmpqQc8+3zFLF6AAAAVElEQVQoz2Ngc56JBEwSGDJmooA2Bs+pgkggcgqDZQADEmCdzDBTAFmAcSa5ApoQKyfBBSohAtOxqhgO1k5CFqgE2YlPBQRQUQAjKjEiGyM5YCQYACs5bWDLncbdAAAAAElFTkSuQmCC"}}]);