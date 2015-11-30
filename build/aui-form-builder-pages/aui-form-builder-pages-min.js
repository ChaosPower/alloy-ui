YUI.add("aui-form-builder-pages",function(e,t){var n=e.getClassName("form","builder","pages","add","page"),r=e.getClassName("form","builder","page","controls"),i=e.getClassName("form","builder","pages","content"),s=e.getClassName("form","builder","pagination"),o=e.getClassName("form","builder","pages","remove","page"),u=e.getClassName("form","builder","switch","view"),a=e.getClassName("form","builder","tabs","content"),f=e.getClassName("form","builder","tabview"),l=e.getClassName("form","builder","page","header"),c=e.getClassName("form","builder","page","header","description"),h=e.getClassName("form","builder","page","header","description","hide","border"),p=e.getClassName("form","builder","page","header","title"),d=e.getClassName("form","builder","page","header","title","hide","border"),v=e.getClassName("tab","label");e.FormBuilderPages=e.Base.create("form-builder-pages",e.Base,[],{TPL_PAGE_HEADER:'<div class="'+l+' form-inline">'+'<input placeholder="{untitledPage}" tabindex="1" class="'+p+" "+d+' form-control" type="text" />'+'<input placeholder="{aditionalInfo}" tabindex="2" class="'+c+" "+h+' form-control" type="text" />'+"</div>",TPL_PAGES:'<div class="'+i+'">'+'<div class="'+s+'"></div>'+'<div class="'+r+'">'+'<a href="javascript:;" class="'+u+' glyphicon glyphicon-refresh"></a>'+'<a href="javascript:;" class="'+o+' glyphicon glyphicon-trash"></a>'+'<a href="javascript:;" class="'+n+' glyphicon glyphicon-plus"></a>'+"</div></div>",TPL_TABS:'<div class="'+a+'">'+'<div class="'+f+'"></div>'+"</div>",initializer:function(){var t=this.get("paginationContainer"),r=this.get("tabviewContainer"),i=this.get("pageHeader");t.append(this.TPL_PAGES),r.append(this.TPL_TABS),i.append(e.Lang.sub(this.TPL_PAGE_HEADER,{aditionalInfo:this.get("strings").aditionalInfo})),this._getPagination().render(),this._getTabView().render(),this._eventHandles=[t.one("."+n).on("click",e.bind(this._onAddPageClick,this)),t.one("."+o).on("click",e.bind(this._onRemovePageClick,this)),t.one("."+u).on("click",e.bind(this._onSwitchViewClick,this)),i.one("."+c).on("valuechange",e.bind(this._onDescriptionInputValueChange,this)),i.one("."+p).on("valuechange",e.bind(this._onTitleInputValueChange,this))],this.after({activePageNumberChange:this._afterActivePageNumberChange,pagesQuantityChange:this._afterPagesQuantityChange}),this._uiSetActivePageNumber(this.get("activePageNumber"))},destructor:function(){var t=this._pagination,n=this._tabview;t&&t.destroy(),n&&n.destroy(),(new e.EventHandle(this._eventHandles)).detach()},_addPage:function(){var e=this.get("pagesQuantity");this.set("pagesQuantity",e+1),this.fire("add",{quantity:e}),this._pagination.set("page",this.get("pagesQuantity")),e===0&&this.fire("updatePageContent",{newVal:1})},_addTab:function(){var e=this.get("pagesQuantity"),t=this._getTabView(),n;n=this._createUntitledPageLabel(e,e),t.add({label:e+"."+n}),t.selectChild(e-1),this._updateTabViewContent()},_afterActivePageNumberChange:function(e){this._uiSetActivePageNumber(e.newVal)},_afterPagesQuantityChange:function(){this._uiSetPagesQuantity(this.get("pagesQuantity"))},_afterTabViewSelectionChange:function(){var e,t=this._getPagination(),n=this._getTabView();e=n.getTabs().indexOf(n.getActiveTab()),e>-1&&(t.set("page",e+1),this.set("activePageNumber",e+1))},_createPagination:function(){return new e.Pagination({boundingBox:"."+s,on:{pageChange:e.bind(this._onCurrentPageChange,this)},page:this.get("activePageNumber"),strings:{prev:"&#xAB;",next:"&#xBB;"},total:this.get("pagesQuantity")})},_createTabView:function(){var t;return t=new e.TabView({boundingBox:"."+f}),t.get("contentBox").toggleView(),t.after("selectionChange",e.bind(this._afterTabViewSelectionChange,this)),t},_createUntitledPageLabel:function(t,n){var r;return r=e.Lang.sub(this.get("strings").untitledPage,{activePageNumber:t,pagesQuantity:n}),r},_getPagination:function(){return this._pagination||(this._pagination=this._createPagination()),this._pagination},_getTabView:function(){var e,t=this.get("pagesQuantity"),n,r=this.get("titles");if(!this._tabview){this._tabview=this._createTabView();for(e=0;e<t;e++)n=r[e],n||(n=this._createUntitledPageLabel(e+1,t)),this._tabview.add({label:e+1+"."+n});this._tabview.selectChild(this.get("activePageNumber")-1)}return this._tabview},_onAddPageClick:function(){this._addPage(),this._addTab()},_onCurrentPageChange:function(e){this.set("activePageNumber",e.newVal)},_onDescriptionInputValueChange:function(e){var t=this.get("descriptions");t[this.get("activePageNumber")-1]=e.newVal.trim()},_onRemovePageClick:function(){var e=this.get("activePageNumber"),t=Math.max(1,e-1),n=this.get("titles");this._getPagination().prev(),this.set("pagesQuantity",this.get("pagesQuantity")-1),this.fire("remove",{removedIndex:e-1}),this._pagination.getItem(t).addClass("active"),n.splice(e-1,1),this.set("titles",n),this._removeTab(e-1),this.get("pagesQuantity")||(this._addPage(),this._addTab())},_onSwitchViewClick:function(){var e=this.get("activePageNumber"),t=this._getPagination(),n=this._getTabView();t.get("contentBox").toggleView(),n.get("contentBox").toggleView(),t.set("page",e),n.selectChild(e-1)},_onTitleInputValueChange:function(e){var t=this.get("activePageNumber"),n=this._getTabView().getActiveTab(),r=this.get("pagesQuantity"),i=e.newVal.trim(),s=this.get("titles");s[t-1]=i,i||(i=this._createUntitledPageLabel(t,r)),n.one("."+v).set("text",t+"."+i),this.set("titles",s)},_removeTab:function(e){var t=this._getTabView();e>0&&t.selectChild(e-1),t.remove(e),this._updateTabViewContent()},_uiSetActivePageNumber:function(e){var t=this.get("descriptions")[e-1],n=this.get("titles")[e-1],r=this.get("pageHeader"),i=r.one("."+c),s=this.get("pagesQuantity"),o=r.one("."+p),u;n||(u=this._createUntitledPageLabel(e,s),o.attr("placeholder",u)),o.set("value",n||""),i.set("value",t||"")},_uiSetPagesQuantity:function(e){var t=this.get("activePageNumber"),n=this._getPagination();n.set("total",e),n.set("page",t),this._pagination.getItem(t).addClass("active"),this
._uiSetActivePageNumber(t)},_updateTabViewContent:function(){var e,t=this.get("pagesQuantity"),n=this._getTabView().get("contentBox").all(".tab-content"),r,i=this.get("titles");for(e=0;e<t;e++)r=i[e],r||(r=this._createUntitledPageLabel(e+1,t)),n.item(e).set("text",e+1+"."+r)}},{ATTRS:{activePageNumber:{value:1},descriptions:{value:[]},pageHeader:{setter:e.one,writeOnce:!0},pagesQuantity:{value:1},paginationContainer:{setter:e.one,writeOnce:!0},strings:{value:{aditionalInfo:"An aditional info about this page",untitledPage:"Untitled Page ({activePageNumber} of {pagesQuantity})"},writeOnce:!0},titles:{value:[]},tabviewContainer:{setter:e.one,writeOnce:!0}}})},"3.0.1",{requires:["aui-pagination","aui-tabview","base","event-valuechange","node-base"],skinnable:!0});
