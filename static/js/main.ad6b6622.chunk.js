(this.webpackJsonptwitter=this.webpackJsonptwitter||[]).push([[0],{303:function(e,t,a){e.exports=a(555)},505:function(e,t){},532:function(e,t){},554:function(e,t,a){},555:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(63),i=a.n(c),s=function(e,t,a){var n=new Date;n.setTime(n.getTime()+24*a*60*60*1e3);var r="expires="+n.toGMTString();document.cookie=e+"="+t+";"+r+";path=/"},o=function(e){for(var t=e+"=",a=decodeURIComponent(document.cookie).split(";"),n=0;n<a.length;n++){for(var r=a[n];" "===r.charAt(0);)r=r.substring(1);if(0===r.indexOf(t))return r.substring(t.length,r.length)}return""},l=a(55),u=a(24),m=a(25),h=a(27),d=a(26),b=a(28),p=function(e){function t(){return Object(u.a)(this,t),Object(h.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("h1",null,"home")}}]),t}(r.a.Component),E=a(52),f=a(29),g=a(130),v=a.n(g),k=a(89),O=a.n(k),j=a(56),w=new(function(e){function t(){return Object(u.a)(this,t),Object(h.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(m.a)(t,[{key:"login",value:function(e,t){return v.a.request({url:j.__URL+"/login",method:"POST",data:{email:e,password:t}})}},{key:"setUser",value:function(e,t){return v.a.request({url:j.__URL+"/api/user/new",method:"POST",data:{name:e,order:t},headers:{token:o("token")}})}},{key:"getUsers",value:function(){return v.a.request({url:j.__URL+"/api/user/",method:"GET",headers:{token:o("token")}})}},{key:"checkAuth",value:function(){return O.a.ajax({type:"GET",url:j.__URL+"/api",cache:!1,headers:{token:o("token")},async:!1})}}]),t}(r.a.Component)),C=a(571),S=a(572),y=a(565),_=a(556),I=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this))).handleChange=function(e){a.setState(Object(E.a)({},e.target.name,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),w.login(a.state.email,a.state.password).then((function(e){200===e.status&&(s("token",e.data,.5),a.setState({redirect:!0}))})).catch((function(e){alert("Identifiants incorrects."),console.error(e)}))},a.state={email:"",password:"",redirect:!1},a.handleChange=a.handleChange.bind(Object(f.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(f.a)(a)),a}return Object(b.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return this.state.redirect?r.a.createElement(l.a,{to:"/"}):r.a.createElement(C.a,{placeholder:!0,id:"login"},r.a.createElement(S.a,{columns:2,relaxed:"very",stackable:!0},r.a.createElement(S.a.Column,null,r.a.createElement(y.a,{onSubmit:this.handleSubmit},r.a.createElement(y.a.Input,{id:"email",name:"email",icon:"user",iconPosition:"left",label:"Courriel",placeholder:"email@gmail.com",type:"email",onChange:this.handleChange,value:this.state.email}),r.a.createElement(y.a.Input,{id:"password",name:"password",icon:"lock",iconPosition:"left",label:"Mot de passe",type:"password",onChange:this.handleChange,value:this.state.password}),r.a.createElement(_.a,{content:"Se connecter",primary:!0})))))}}]),t}(r.a.Component),x=function(){return s("token","",0),r.a.createElement(l.a,{to:"/login"})},R=a(573),T=a(44),U=a(91),D=a(564),A=a(569),M=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this))).handleChange=function(e){a.setState(Object(E.a)({},e.target.name,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),w.setUser(a.state.name,Number(a.state.order)).then((function(e){console.log(e),a.successMessage(!0,"")})).catch((function(e){console.log(e),a.successMessage(!1,String(e))}))},a.state={name:"",order:0,users_number:0,message:"",class:"positive"},a.handleChange=a.handleChange.bind(Object(f.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(f.a)(a)),a}return Object(b.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;w.getUsers().then((function(t){var a=t.data;console.log(a),e.setState({users_number:a.length})})).catch((function(e){console.error(e)}))}},{key:"successMessage",value:function(e,t){var a=function(e){switch(String(e)){case"Error: Request failed with status code 400":return 400;case"Error: Request failed with status code 401":return 401;case"Error: Request failed with status code 403":return 403;case"Error: Request failed with status code 404":return 404;default:return 500}}(t);if(e)this.setState({class:"positive",message:"Utilisateur enregistr\xe9.",name:"",order:0,users_number:this.state.users_number+1});else{var n="";400===a?n="Ressource d\xe9j\xe0 existante.":500===a&&(n="Erreur serveur."),this.setState({class:"negative",message:n})}O()(".ui.message").show("fast"),setTimeout((function(){O()(".ui.message").hide("slow")}),5e3)}},{key:"render",value:function(){return r.a.createElement("div",{id:"new-user"},r.a.createElement(R.a,{as:"h2",icon:!0,textAlign:"center"},r.a.createElement(T.a,{circular:!0},this.state.users_number),r.a.createElement(R.a.Content,null,"Utilisateurs ajout\xe9s")),r.a.createElement(y.a,{onSubmit:this.handleSubmit},r.a.createElement(y.a.Field,null,r.a.createElement(U.a,{color:"blue",ribbon:!0},r.a.createElement(T.a,{name:"user circle"}),"Utilisateur"),r.a.createElement(D.a,{iconPosition:"left",placeholder:"nom"},r.a.createElement(T.a,{name:"at"}),r.a.createElement("input",{name:"name",type:"text",onChange:this.handleChange,value:this.state.name}))),r.a.createElement(y.a.Field,null,r.a.createElement(U.a,{color:"black",ribbon:!0},r.a.createElement(T.a,{name:"ordered list"}),"Ordre de priorit\xe9"),r.a.createElement(D.a,{name:"order",type:"number",min:"0",max:"100",onChange:this.handleChange,value:this.state.order})),r.a.createElement(_.a,{type:"submit",positive:!0},"Ajouter"),r.a.createElement(A.a,{size:"mini",className:this.state.class},r.a.createElement("p",null,this.state.message))))}}]),t}(r.a.Component),N=a(90),q=a(568),L=a(293),P=a(566);function z(e){return r.a.createElement(P.a,{trigger:r.a.createElement(L.a,{src:e.src})},r.a.createElement(P.a.Content,{image:!0},r.a.createElement(L.a,{fluid:!0,src:e.src})))}var H=a(290),G=a.n(H).a.connect(j.__URL,j.__SOCKET_OPTIONS),F={getTweets:function(e){G.emit("get_tweets",{token:o("token"),count:Number(e)})}},J={socket:G,functions:F},W=a(291),K=a.n(W),B=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this))).handleChange=function(e){a.setState(Object(E.a)({},e.target.name,e.target.value))},a.handleSubmit=function(e){e.preventDefault()},a.state={tweets:[],userHistory:[]},a.handleChange=a.handleChange.bind(Object(f.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(f.a)(a)),a}return Object(b.a)(t,e),Object(m.a)(t,[{key:"componentWillMount",value:function(){var e=window.prompt("Nombre de tweets par personne ?","5");J.functions.getTweets(e)}},{key:"componentDidMount",value:function(){var e=this;s("users","",0),J.socket.on("tweets",(function(t){e.setState({userHistory:[].concat(Object(N.a)(e.state.userHistory),[t.user])}),t.tweets.forEach((function(t){e.setState({tweets:[].concat(Object(N.a)(e.state.tweets),[t])})}))}))}},{key:"getContent",value:function(){for(var e=[],t=this.state.tweets,a=function(a){var n;e.push(r.a.createElement(C.a,{key:a,id:t[a].id},r.a.createElement(q.a,null,r.a.createElement(q.a.Item,null,r.a.createElement("div",{className:"tweet-header"},r.a.createElement(L.a,{avatar:!0,src:t[a].user.profile_image_url}),r.a.createElement(q.a.Content,null,r.a.createElement(q.a.Header,null,t[a].user.name),r.a.createElement(q.a.Description,null,"@",t[a].user.screen_name),r.a.createElement(q.a.Description,{className:"date"},r.a.createElement("span",null,"\u2022")," ",(n=t[a].created_at,new Date(n).toLocaleDateString("fr-FR",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}))))),r.a.createElement(q.a.Content,null,K()(t[a].text)),r.a.createElement(q.a.Content,null,function(){if(t[a].entities.media){var e=[],n=0;return t[a].entities.media.forEach((function(t){e.push(r.a.createElement(L.a.Group,{key:n,size:"small"},r.a.createElement(z,{src:t.media_url_https}))),n++})),e}}())))))},n=0;n<t.length;n++)a(n);return e}},{key:"render",value:function(){return r.a.createElement("div",{id:"twitter"},this.getContent())}}]),t}(r.a.Component),Q=a(31),V=a(570),X=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this))).handleItemClick=function(e,t){var n=t.name;return a.setState({activeItem:n})},a.state={activeItem:"home"},a}return Object(b.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state.activeItem;return r.a.createElement(V.a,{icon:!0,fixed:"bottom",size:"massive"},r.a.createElement(Q.b,{to:"/"},r.a.createElement(V.a.Item,{as:"span",name:"home",active:"home"===e,onClick:this.handleItemClick},r.a.createElement(T.a,{name:"home"}))),r.a.createElement(Q.b,{to:"/twitter"},r.a.createElement(V.a.Item,{as:"span",name:"twitter",active:"twitter"===e,onClick:this.handleItemClick},r.a.createElement(T.a,{name:"twitter"}))),r.a.createElement(Q.b,{to:"/users"},r.a.createElement(V.a.Item,{as:"span",name:"users",active:"users"===e,onClick:this.handleItemClick},r.a.createElement(T.a,{name:"address book outline"}))),r.a.createElement(Q.b,{to:"/new"},r.a.createElement(V.a.Item,{as:"span",name:"add user",active:"add user"===e,onClick:this.handleItemClick},r.a.createElement(T.a,{name:"add user"}))),r.a.createElement(Q.b,{to:"/logout",id:"logout"},r.a.createElement(V.a.Item,{as:"span",position:"right",name:"sign out",active:"sign out"===e,onClick:this.handleItemClick},r.a.createElement(T.a,{name:"sign out"}))))}}]),t}(r.a.Component),Y=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this))).handleChange=function(e){a.setState(Object(E.a)({},e.target.name,e.target.value))},a.handleSubmit=function(e){e.preventDefault()},a.state={promiseIsResolved:!1,content:[]},a.handleChange=a.handleChange.bind(Object(f.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(f.a)(a)),a}return Object(b.a)(t,e),Object(m.a)(t,[{key:"componentWillMount",value:function(){var e=this;w.getUsers().then((function(t){for(var a=t.data,n=0;n<a.length;n++)e.setState({content:[].concat(Object(N.a)(e.state.content),[r.a.createElement(q.a.Item,{key:a[n]._id},r.a.createElement(q.a.Content,{floated:"right"},r.a.createElement(T.a,{title:"Supprimer",name:"trash alternate","data-id":a[n]._id})),r.a.createElement(Q.b,{to:"/twitter/"+a[n]._id},r.a.createElement(q.a.Icon,{name:"user circle",size:"big",verticalAlign:"middle"}),r.a.createElement(q.a.Content,null,r.a.createElement(q.a.Header,null,r.a.createElement(T.a,{name:"at"}),a[n].name),r.a.createElement(q.a.Description,null,"Ordre : "+a[n].order))))])});e.setState({promiseIsResolved:!0})}))}},{key:"render",value:function(){return this.state.promiseIsResolved?r.a.createElement("div",{id:"users"},r.a.createElement(q.a,{divided:!0,relaxed:!0},this.state.content)):r.a.createElement("div",{id:"users"})}}]),t}(r.a.Component),Z=function(e){var t=Object.assign({},e),a=!0;return J.socket.on("unauthorized",(function(e){a=0!==e})),a?"JsonWebTokenError"===w.checkAuth().responseText||o("token").length<200?r.a.createElement(l.a,{to:"/login"}):r.a.createElement(l.b,t):r.a.createElement(l.a,{to:"/login"})},$=function(){return r.a.createElement(l.d,null,r.a.createElement(X,null),r.a.createElement(l.b,{exact:!0,path:"/login",component:I}),r.a.createElement(l.b,{exact:!0,path:"/logout",component:x}),r.a.createElement(Z,{isAllowed:o("token"),exact:!0,path:"/",component:p}),r.a.createElement(Z,{isAllowed:o("token"),exact:!0,path:"/users",component:Y}),r.a.createElement(Z,{isAllowed:o("token"),exact:!0,path:"/new",component:M}),r.a.createElement(Z,{isAllowed:o("token"),exact:!0,path:"/twitter",component:B}),r.a.createElement(Z,{isAllowed:o("token"),exact:!0,path:"/twitter/:id",component:B}),r.a.createElement(l.b,{path:"*"},r.a.createElement(l.a,{to:"/login"})))};a(554);i.a.render(r.a.createElement(Q.a,{basename:"/"},r.a.createElement($,null)),document.getElementById("root"))},56:function(e,t){e.exports={__URL:"https://project-twitter-api.herokuapp.com",__SOCKET_OPTIONS:{options:{secure:!0,transports:["websocket"]}}}}},[[303,1,2]]]);
//# sourceMappingURL=main.ad6b6622.chunk.js.map