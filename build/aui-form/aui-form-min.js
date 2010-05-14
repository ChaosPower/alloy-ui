AUI.add("aui-form-base",function(B){var H=B.Lang,D=B.ClassNameManager.getClassName,I="form",F=D(I),C=D("field","labels"),G=D("field","labels","inline");CSS_LABEL_ALIGN={left:[C,"left"].join("-"),right:[C,"right"].join("-"),top:[C,"top"].join("-")};var E=B.Component.create({NAME:I,ATTRS:{action:{value:location.href,getter:"_attributeGetter",setter:"_attributeSetter"},id:{},method:{value:"POST",getter:"_attributeGetter",setter:"_attributeSetter"},monitorChanges:{value:false},nativeSubmit:{value:false},values:{getter:function(K){var A=this;var J=B.io._serialize(A.get("contentBox").getDOM());return B.QueryString.parse(J);},setter:function(L){var A=this;var J=A._setFieldsObject;var K=A.get("monitorChanges");if(H.isArray(L)){J=A._setFieldsArray;}B.each(L,B.rbind(J,A,K));return B.Attribute.INVALID_VALUE;}},fieldValues:{getter:function(J){var A=this;var K={};A.fields.each(function(M,L,N){K[M.get("name")]=M.get("value");});return K;}},labelAlign:{value:""}},prototype:{CONTENT_TEMPLATE:"<form></form>",initializer:function(){var A=this;A.fields=new B.DataSet({getKey:A._getNodeId});},renderUI:function(){var A=this;A._renderForm();},bindUI:function(){var A=this;var J=A.get("nativeSubmit");if(!J){A.get("contentBox").on("submit",A._onSubmit);}A.after("disabledChange",A._afterDisabledChange);A.after("labelAlignChange",A._afterLabelAlignChange);A.after("nativeSubmitChange",A._afterNativeSubmitChange);},syncUI:function(){var A=this;var J=A.get("contentBox");A.set("id",J.guid());A._uiSetLabelAlign(A.get("labelAlign"));},add:function(M,A){var R=this;var N=B.Array(M);var J=N.length;var P;var M=R.fields;var O=R.get("contentBox");for(var L=0;L<N.length;L++){P=N[L];P=B.Field.getField(P);if(P&&M.indexOf(P)==-1){M.add(P);if(A&&!P.get("rendered")){var K=P.get("node");var Q=null;if(!K.inDoc()){Q=O;}P.render(Q);}}}},clearInvalid:function(){var A=this;A.fields.each(function(K,J,L){K.clearInvalid();});},getField:function(L){var J=this;var K;if(L){var A=J.fields;K=A.item(L);if(!H.isObject(K)){A.each(function(N,M,O){if(N.get("id")==L||N.get("name")==L){K=N;return false;}});}}return K;},invoke:function(K,J){var A=this;return A.fields.invoke(K,J);},isDirty:function(){var A=this;var J=false;A.fields.each(function(L,K,M){if(L.isDirty()){J=true;return false;}});return J;},isValid:function(){var A=this;var J=true;A.fields.each(function(L,K,M){if(!L.isValid()){J=false;return false;}});return J;},markInvalid:function(K){var A=this;var J=A._markInvalidObject;if(H.isArray(K)){J=A._markInvalidArray;}B.each(K,J,A);return A;},remove:function(K,J){var A=this;A.fields.remove(K);if(J){K=A.getField(K);if(K){K.destroy();}}return A;},resetValues:function(){var A=this;A.fields.each(function(K,J,L){K.resetValue();});},submit:function(J){var A=this;var K=A.isValid();if(K){if(A.get("nativeSubmit")){A.get("contentBox").submit();}else{J=J||{};B.mix(J,{id:A.get("id")});B.io(A.get("action"),{form:J,method:A.get("method"),on:{complete:B.bind(A._onSubmitComplete,A),end:B.bind(A._onSubmitEnd,A),failure:B.bind(A._onSubmitFailure,A),start:B.bind(A._onSubmitStart,A),success:B.bind(A._onSubmitSuccess,A)}});}}return K;},_afterDisabledChange:function(J){var A=this;var K="disable";if(J.newVal){K="enable";}A.fields.each(function(M,L,N){M[K];});},_afterLabelAlignChange:function(J){var A=this;A._uiSetLabelAlign(J.newVal,J.prevVal);},_afterNativeSubmitChange:function(K){var A=this;var J=A.get("contentBox");var L="on";if(K.newVal){L="detach";}J[L]("submit",A._onSubmit);},_attributeGetter:function(K,J){var A=this;return A.get("contentBox").attr(J);},_attributeSetter:function(K,J){var A=this;A.get("contentBox").attr(J,K);return K;},_getNodeId:function(K){var J;if(K instanceof B.Field){J=K.get("node");}else{J=B.one(K);}var A=J&&J.guid();return A;},_onSubmit:function(A){A.halt();},_onSubmitComplete:function(J){var A=this;A.fire("complete",{ioEvent:J});},_onSubmitEnd:function(J){var A=this;A.fire("end",{ioEvent:J});},_onSubmitFailure:function(J){var A=this;A.fire("failure",{ioEvent:J});},_onSubmitStart:function(J){var A=this;A.fire("start",{ioEvent:J});},_onSubmitSuccess:function(J){var A=this;A.fire("success",{ioEvent:J});},_renderForm:function(){var A=this;A.get("contentBox").removeClass(F);},_markInvalidArray:function(K,J,M){var A=this;var L=A.getField(K.id);if(L){L.markInvalid(K.message);}},_markInvalidObject:function(K,J,M){var A=this;var L=(!H.isFunction(K))&&A.getField(J);if(L){L.markInvalid(K);}},_setFieldsArray:function(L,K,N,J){var A=this;var M=A.getField(L.id);if(M){M.set("value",L.value);if(J){M.set("prevVal",M.get("value"));}}},_setFieldsObject:function(L,K,N,J){var A=this;var M=(!H.isFunction(L))&&A.getField(K);if(M){M.set("value",L);if(J){M.set("prevVal",M.get("value"));}}},_uiSetLabelAlign:function(K,M){var A=this;var J=A.get("contentBox");J.replaceClass(CSS_LABEL_ALIGN[M],CSS_LABEL_ALIGN[K]);var L="removeClass";if(/right|left/.test(K)){L="addClass";}J[L](G);}}});B.Form=E;},"@VERSION@",{requires:["aui-base","aui-data-set","aui-form-field","querystring-parse"]});AUI.add("aui-form-combobox",function(B){var F=B.Lang,D=B.ClassNameManager.getClassName,G="combobox",E=D(G);var C=B.Component.create({NAME:G,ATTRS:{field:{},fieldWidget:{value:B.Textfield},node:{getter:function(){var A=this;if(A._field){return A._field.get("node");}}},icons:{value:["circle-triangle-b"],validator:F.isArray}},prototype:{renderUI:function(){var A=this;C.superclass.renderUI.call(A);A._renderField();A._renderIcons();},_renderField:function(){var A=this;var H=A.get("contentBox");var I=A.get("field");var J=A.get("fieldWidget");A._field=new J(I).render();H.appendChild(A._field.get("boundingBox"));},_renderIcons:function(){var A=this;var H=A.get("icons");if(H.length){var I=new B.Toolbar({children:H}).render(A.get("contentBox"));A.icons=I;}}}});B.Combobox=C;},"@VERSION@",{skinnable:true,requires:["aui-form-textarea","aui-toolbar"]});AUI.add("aui-form-field",function(P){var G=P.Lang,J=P.ClassNameManager.getClassName,H="field",R=P.cached(function(X,Z){var Y=["field"];if(Z){Y.push(Z);}Y=Y.join("-");
var A=[J(Y,X)];if(X=="password"){A.push(J(Y,"text"));}return A.join(" ");}),C=J(H),W=J(H,"content"),F=J(H,"input"),N=J(H,"hint"),E=J(H,"invalid"),D=J(H,"label"),B=J(H,"labels"),V=J(H,"labels","inline"),T={left:[B,"left"].join("-"),right:[B,"right"].join("-"),top:[B,"top"].join("-")},L=/left|right/,Q='<span class="'+C+'"></span>',U='<span class="'+W+'"></span>',K='<span class="'+N+'"></span>',O='<input autocomplete="off" class="{cssClass}" id="{id}" name="{name}" type="{type}" />',M='<label class="'+D+'"></label>',S={};var I=P.Component.create({NAME:H,ATTRS:{readOnly:{value:false},name:{value:"",getter:function(X){var A=this;return X||A.get("id");}},id:{getter:function(Y){var A=this;var X=this.get("node");if(X){Y=X.get("id");}if(!Y){Y=P.guid();}return Y;}},type:{value:"text",writeOnce:true},labelAlign:{value:""},labelNode:{valueFn:function(){var A=this;return P.Node.create(M);}},labelText:{valueFn:function(){var A=this;return A.get("labelNode").get("innerHTML");},setter:function(X){var A=this;A.get("labelNode").set("innerHTML",X);return X;}},node:{value:null,setter:function(X){var A=this;return P.one(X)||A._createFieldNode();}},fieldHint:{value:""},fieldHintNode:{value:null,setter:function(X){var A=this;return P.one(X)||A._createFieldHint();}},prevVal:{value:""},valid:{value:true,getter:function(Z){var A=this;var X=A.get("validator");var Y=A.get("disabled")||X(A.get("value"));return Y;}},dirty:{value:false,getter:function(Y){var A=this;if(A.get("disabled")){Y=false;}else{var X=String(A.get("value"));var Z=String(A.get("prevVal"));Y=(X!==Z);}return Y;}},size:{},validator:{valueFn:function(){var A=this;return A.fieldValidator;},validator:G.isFunction},value:{getter:"_getNodeValue",setter:"_setNodeValue",validator:"fieldValidator"}},HTML_PARSER:{labelNode:"label",node:"input, textarea, select"},BIND_UI_ATTRS:["id","readOnly","name","size","tabIndex","type","value"],getTypeClassName:R,getField:function(Z){var a=null;if(Z instanceof P.Field){a=Z;}else{if(Z&&(G.isString(Z)||Z instanceof P.Node||Z.nodeName)){var X=P.one(Z).get("id");a=S[X];if(!a){var Y=Z.ancestor(".aui-field");var A=Z.ancestor(".aui-field-content");a=new I({boundingBox:Y,contentBox:A,node:Z});}}else{if(G.isObject(Z)){a=new I(Z);}}}return a;},prototype:{BOUNDING_TEMPLATE:Q,CONTENT_TEMPLATE:U,FIELD_TEMPLATE:O,FIELD_TYPE:"text",initializer:function(){var A=this;var X=A.get("node").guid();S[X]=A;},renderUI:function(){var A=this;A._renderField();A._renderLabel();A._renderFieldHint();},bindUI:function(){var A=this;A.after("labelAlignChange",A._afterLabelAlignChange);A.after("fieldHintChange",A._afterFieldHintChange);},syncUI:function(){var A=this;A.set("prevVal",A.get("value"));},fieldValidator:function(X){var A=this;return true;},isValid:function(){var A=this;return A.get("valid");},isDirty:function(){var A=this;return A.get("dirty");},resetValue:function(){var A=this;A.set("value",A.get("prevVal"));A.clearInvalid();},markInvalid:function(X){var A=this;A.set("fieldHint",X);A.get("fieldHintNode").show();A.get("boundingBox").addClass(E);},clearInvalid:function(){var A=this;A.reset("fieldHint");if(!A.get("fieldHint")){A.get("fieldHintNode").hide();}A.get("boundingBox").removeClass(E);},validate:function(){var A=this;var X=A.get("valid");if(X){A.clearInvalid();}return X;},_afterFieldHintChange:function(X){var A=this;A._uiSetFieldHint(X.newVal,X.prevVal);},_afterLabelAlignChange:function(X){var A=this;A._uiSetLabelAlign(X.newVal,X.prevVal);},_createFieldHint:function(){var A=this;var X=P.Node.create(K);A.get("contentBox").append(X);return X;},_createFieldNode:function(){var A=this;var X=A.FIELD_TEMPLATE;A.FIELD_TEMPLATE=P.substitute(X,{cssClass:F,id:A.get("id"),name:A.get("name"),type:A.get("type")});return P.Node.create(A.FIELD_TEMPLATE);},_getNodeValue:function(){var A=this;return A.get("node").val();},_renderField:function(){var A=this;var a=A.get("node");a.val(A.get("value"));var Y=A.get("boundingBox");var X=A.get("contentBox");var Z=A.get("type");Y.addClass(R(Z));a.addClass(R(Z,"input"));if(!X.contains(a)){if(a.inDoc()){a.placeBefore(Y);X.appendChild(a);}else{X.appendChild(a);}}Y.removeAttribute("tabIndex");},_renderFieldHint:function(){var A=this;var X=A.get("fieldHint");if(X){A._uiSetFieldHint(X);}},_renderLabel:function(){var A=this;var a=A.get("labelText");if(a!==false){var Z=A.get("node");var b=Z.guid();a=A.get("labelText");var Y=A.get("labelNode");Y.addClass(J(A.name,"label"));Y.setAttribute("for",b);Y.set("innerHTML",a);A._uiSetLabelAlign(A.get("labelAlign"));var X=A.get("contentBox");X.prepend(Y);}},_setNodeValue:function(X){var A=this;A._uiSetValue(X);return X;},_uiSetFieldHint:function(X,Y){var A=this;A.get("fieldHintNode").set("innerHTML",X);},_uiSetId:function(X,Y){var A=this;A.get("node").set("id",X);},_uiSetLabelAlign:function(Y,a){var A=this;var X=A.get("boundingBox");X.replaceClass(T[a],T[Y]);var Z="removeClass";if(L.test(Y)){Z="addClass";}X[Z](V);},_uiSetName:function(X,Y){var A=this;A.get("node").setAttribute("name",X);},_uiSetReadOnly:function(X,Y){var A=this;A.get("node").setAttribute("readOnly",X);},_uiSetSize:function(X,Y){var A=this;A.get("node").setAttribute("size",X);},_uiSetTabIndex:function(X,Y){var A=this;A.get("node").setAttribute("tabIndex",X);},_uiSetValue:function(X,Y){var A=this;A.get("node").val(X);},_requireAddAttr:false}});P.Field=I;},"@VERSION@",{requires:["aui-base","aui-component","substitute"]});AUI.add("aui-form-manager",function(E){function N(P,A){if(arguments.length===0){return;}if(!A){A={};}this.form_name=P;this.status_node=E.one(A.status_node);this.enabled=true;this.default_value_map=A.default_value_map;this.validation={fn:{},regex:{}};this.validation_msgs={};this.has_messages=false;this.has_errors=false;this.button_list=[];this.user_button_list=[];this.has_file_inputs=false;}var C="(?:^|\\s)(?:";var I=")(?:\\s|$)";var G="aui-required";var M=/(?:^|\s+)aui-length:\[([0-9]+)?,([1-9][0-9]*)?\](?:\s+|$)/;var L=/(?:^|\s+)aui-integer(?::\[([-+]?[0-9]+)?,([-+]?[0-9]+)?\])?(?:\s+|$)/;var J=/(?:^|\s+)aui-decimal(?::\[([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?,([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?\])?(?:\s+|$)/;
N.integer_value_re=/^[-+]?[0-9]+$/;N.decimal_value_re=/^[-+]?(?:[0-9]+\.?|[0-9]*\.[0-9]+)$/;N.row_marker_class="aui-field";N.status_marker_class="aui-message-holder";N.status_none_class="aui-helper-hidden";N.status_success_class="aui-status-success";N.status_failure_class="aui-status-failure";N.row_status_prefix="aui-has-";var F=N.status_success_class+"|"+N.status_failure_class;var B=N.row_status_prefix+"([^\\s]+)";var O=new RegExp(C+B+I);N.Strings={validation_error:"Correct errors in the highlighted fields before continuing.",required_string:"This field requires a value.",required_menu:"This field is required. Choose a value from the pull-down list.",length_too_short:"Enter text that is at least {min} characters or longer.",length_too_long:"Enter text that is up to {max} characters long.",length_out_of_range:"Enter text that is {min} to {max} characters long.",integer:"Enter a whole number (no decimal point).",integer_too_small:"Enter a number that is {min} or higher (no decimal point).",integer_too_large:"Enter a number that is {max} or lower (no decimal point).",integer_out_of_range:"Enter a number between or including {min} and {max} (no decimal point).",decimal:"Enter a number.",decimal_too_small:"Enter a number that is {min} or higher.",decimal_too_large:"Enter a number that is {max} or lower.",decimal_out_of_range:"Enter a number between or including {min} and {max}."};N.status_order=["error","warn","success","info"];N.getStatusPrecedence=function(A){for(var P=0;P<N.status_order.length;P++){if(A==N.status_order[P]){return P;}}return N.status_order.length;};N.statusTakesPrecendence=function(P,A){return(!P||N.getStatusPrecedence(A)<N.getStatusPrecedence(P));};N.getElementStatus=function(P){var A=E.one(P).get("className").match(O);if(A&&A.length){return A[1];}else{return false;}};function D(A){if(E.Lang.isString(A)){return A.replace(/^#/,"");}else{if(A instanceof E.Node){return A.get("id");}else{return A.id;}}}function H(A){return(!E.Lang.isUndefined(A)&&A.length>0);}function K(){var S=(this.button_list.length===0);for(var R=0;R<this.form.elements.length;R++){var V=this.form.elements[R];var T=(V.type?V.type.toLowerCase():null);if(S&&(T=="submit"||T=="reset"||T=="button")){this.button_list.push(V);}if(!V.name){continue;}var Q=V.tagName.toLowerCase();var A=this.default_value_map[V.name];if(Q=="input"&&T=="file"){V.value="";}else{if(E.Lang.isUndefined(A)){if(Q=="input"&&(T=="password"||T=="text")){this.default_value_map[V.name]=V.value;}else{if(Q=="input"&&T=="checkbox"){this.default_value_map[V.name]=(V.checked?V.value:"");}else{if(Q=="input"&&T=="radio"){var U=this.form[V.name];if(U&&!U.length){this.default_value_map[V.name]=U.value;}else{if(U){this.default_value_map[V.name]=U[0].value;for(var P=0;P<U.length;P++){if(U[P].checked){this.default_value_map[V.name]=U[P].value;break;}}}}}else{if((Q=="select"&&T=="select-one")||Q=="textarea"){this.default_value_map[V.name]=V.value;}}}}}else{if(Q=="input"&&(T=="password"||T=="text")){V.value=A;}else{if(Q=="input"&&(T=="checkbox"||T=="radio")){V.checked=(V.value==A);}else{if(Q=="select"&&T=="select-one"){V.value=A;if(V.selectedIndex>=0&&V.options[V.selectedIndex].value!==A.toString()){V.selectedIndex=-1;}}else{if(Q=="textarea"){V.value=A;}}}}}}}}N.prototype={getForm:function(){if(!this.form){this.form=document.forms[this.form_name];}return this.form;},hasFileInputs:function(){return this.has_file_inputs;},setDefaultValues:function(A){this.default_value_map=A;},setDefaultValue:function(P,A){this.default_value_map[P]=A;},saveCurrentValuesAsDefault:function(){this.default_value_map={};this.button_list=[];K.call(this);},setFunction:function(P,A){this.validation.fn[D(P)]=A;},setRegex:function(Q,P,A){Q=D(Q);if(E.Lang.isString(P)){this.validation.regex[Q]=new RegExp(P,A);}else{this.validation.regex[Q]=P;}if(!this.validation_msgs[Q]||!this.validation_msgs[Q].regex){}},setErrorMessages:function(P,A){this.validation_msgs[D(P)]=A;},addErrorMessage:function(Q,A,P){Q=D(Q);if(!this.validation_msgs[Q]){this.validation_msgs[Q]={};}this.validation_msgs[Q][A]=P;},clearForm:function(){this.clearMessages();this.form.reset();this.postPopulateForm();},populateForm:function(){if(!this.default_value_map){this.default_value_map={};}this.clearMessages();K.call(this);this.postPopulateForm();},postPopulateForm:function(){},isChanged:function(){for(var Q=0;Q<this.form.elements.length;Q++){var T=this.form.elements[Q];if(!T.name){continue;}var R=(T.type?T.type.toLowerCase():null);var P=T.tagName.toLowerCase();var A=this.default_value_map[T.name];if(A===null||typeof A==="undefined"){A="";}if(P=="input"&&R=="file"){if(T.value){return true;}}else{if(P=="input"&&(R=="password"||R=="text"||R=="file")){if(T.value!=A){return true;}}else{if(P=="input"&&(R=="checkbox"||R=="radio")){var S=(T.value==A);if((S&&!T.checked)||(!S&&T.checked)){return true;}}else{if((P=="select"&&R=="select-one")||P=="textarea"){if(T.value!=A){return true;}}}}}}return false;},prepareForm:function(){this.getForm();if(!this.prePrepareForm.apply(this,arguments)){return false;}this.clearMessages();this.populateForm();return this.postPrepareForm.apply(this,arguments);},prePrepareForm:function(){return true;},postPrepareForm:function(){return true;},initFocus:function(){for(var Q=0;Q<this.form.elements.length;Q++){var S=this.form.elements[Q];if(S.disabled||S.offsetHeight===0){continue;}var A=S.tagName.toLowerCase();var R=(S.type?S.type.toLowerCase():null);if((A=="input"&&(R=="file"||R=="password"||R=="text"))||A=="textarea"){try{S.focus();}catch(P){}S.select();break;}}},validateForm:function(){this.clearMessages();var Q=true;this.has_file_inputs=false;var U=this.form.elements;for(var S=0;S<U.length;S++){if(U[S].type&&U[S].type.toLowerCase()=="file"){this.has_file_inputs=true;}else{if(U[S].type&&U[S].type.toLowerCase()=="select-multiple"){}else{if(U[S].value){U[S].value=E.Lang.trim(U[S].value);}}}}for(S=0;S<U.length;S++){var R=U[S].id;var W=this.validation_msgs[R];var V=E.one(U[S]).hasClass(G);if(V&&U[S].value===""){var A=null;
if(W&&W.required){A=W.required;}else{if(U[S].tagName.toLowerCase()=="select"){A=N.Strings.required_menu;}else{A=N.Strings.required_string;}}this.displayMessage(U[S],A,"error");Q=false;continue;}else{if(!V&&U[S].value===""){continue;}}if(U[S].className){var P=U[S].className.match(M);if(P&&P.length){var A=null;var Y=(H(P[1])&&P[1]!=="0");if(Y&&H(P[2])){A=N.Strings.length_out_of_range;}else{if(Y){A=N.Strings.length_too_short;}else{if(H(P[2])){A=N.Strings.length_too_long;}}}if(H(P[1])&&H(P[2])&&parseInt(P[1],10)>parseInt(P[2],10)){}if(U[S].value&&H(P[1])&&U[S].value.length<parseInt(P[1],10)){if(W&&W.min_length){A=W.min_length;}A=E.substitute(A,{min:parseInt(P[1],10),max:parseInt(P[2],10)});this.displayMessage(U[S],A,"error");Q=false;continue;}if(U[S].value&&H(P[2])&&U[S].value.length>parseInt(P[2],10)){if(W&&W.max_length){A=W.max_length;}A=E.substitute(A,{min:parseInt(P[1],10),max:parseInt(P[2],10)});this.displayMessage(U[S],A,"error");Q=false;continue;}}var P=U[S].className.match(L);if(P&&P.length){var A=null;if(W&&W.integer){A=W.integer;}else{if(H(P[1])&&H(P[2])){if(parseInt(P[1],10)>parseInt(P[2],10)){}A=N.Strings.integer_out_of_range;}else{if(H(P[1])){A=N.Strings.integer_too_small;}else{if(H(P[2])){A=N.Strings.integer_too_large;}else{A=N.Strings.integer;}}}}A=E.substitute(A,{min:parseInt(P[1],10),max:parseInt(P[2],10)});var X=parseInt(U[S].value,10);if(U[S].value&&(!N.integer_value_re.test(U[S].value)||(H(P[1])&&X<parseInt(P[1],10))||(H(P[2])&&X>parseInt(P[2],10)))){this.displayMessage(U[S],A,"error");Q=false;continue;}}var P=U[S].className.match(J);if(P&&P.length){var A=null;if(W&&W.decimal){A=W.decimal;}else{if(H(P[1])&&H(P[2])){if(parseFloat(P[1])>parseFloat(P[2])){}A=N.Strings.decimal_out_of_range;}else{if(H(P[1])){A=N.Strings.decimal_too_small;}else{if(H(P[2])){A=N.Strings.decimal_too_large;}else{A=N.Strings.decimal;}}}}A=E.substitute(A,{min:parseFloat(P[1],10),max:parseFloat(P[2],10)});var X=parseFloat(U[S].value);if(U[S].value&&(!N.decimal_value_re.test(U[S].value)||(H(P[1])&&X<parseFloat(P[1]))||(H(P[2])&&X>parseFloat(P[2])))){this.displayMessage(U[S],A,"error");Q=false;continue;}}}if(this.validation.regex[R]&&!this.validation.regex[R].test(U[S].value)){this.displayMessage(U[S],W?W.regex:null,"error");Q=false;continue;}var T=this.validation.fn[R];var Z=this;if(E.Lang.isFunction(T)){}else{if(E.Lang.isString(T)){T=Z[T];}else{if(T&&T.scope){Z=T.scope;T=(E.Lang.isString(T.fn)?Z[T.fn]:T.fn);}else{T=null;}}}if(T&&!T.call(Z,this.form,E.one(U[S]))){Q=false;continue;}}if(!this.postValidateForm(this.form)){Q=false;}if(!Q){this.notifyErrors();}return Q;},postValidateForm:function(A){return true;},registerButton:function(A){var P={e:E.one(A)};this.user_button_list.push(P);},enableForm:function(){this.setFormEnabled(true);},disableForm:function(){this.setFormEnabled(false);},setFormEnabled:function(A){this.enabled=A;var Q=!A;for(var P=0;P<this.button_list.length;P++){this.button_list[P].disabled=Q;}for(P=0;P<this.user_button_list.length;P++){var R=this.user_button_list[P];R.e.set("disabled",Q);}},hasMessages:function(){return this.has_messages;},hasErrors:function(){return this.has_errors;},getRowStatus:function(P){var A=E.one(P).ancestor("."+N.row_marker_class);return N.getElementStatus(A);},clearMessages:function(){this.has_messages=false;this.has_errors=false;if(this.status_node){this.status_node.set("innerHTML","");this.status_node.replaceClass(F,N.status_none_class);}for(var A=0;A<this.form.elements.length;A++){var Q=this.form.elements[A];var P=E.one(Q).ancestor("."+N.row_marker_class);if(P&&P.hasClass(B)){P.all("."+N.status_marker_class).set("innerHTML","");P.removeClass(B);}}E.one(this.form).all("fieldset").removeClass(B);},displayMessage:function(T,U,R,P){if(E.Lang.isUndefined(P)){P=true;}T=E.one(T);var S=T.ancestor("."+N.row_marker_class);if(S&&N.statusTakesPrecendence(N.getElementStatus(S),R)){if(U){S.all("."+N.status_marker_class).set("innerHTML",U);}S.removeClass(B);S.addClass(N.row_status_prefix+R);var A=T.ancestor("fieldset");if(A&&N.statusTakesPrecendence(N.getElementStatus(A),R)){A.removeClass(B);A.addClass(N.row_status_prefix+R);}if(!this.has_messages&&P&&T.get("offsetHeight")>0){S.scrollIntoView();try{T.focus();}catch(Q){}}this.has_messages=true;if(R=="error"){this.has_errors=true;}}},notifyErrors:function(){this.displayFormMessage(N.Strings.validation_error,true,false);},displayFormMessage:function(Q,P,A){if(E.Lang.isUndefined(A)){A=true;}if(this.status_node){if(!this.status_node.innerHTML){this.status_node.replaceClass(N.status_none_class,(P?N.status_failure_class:N.status_success_class));this.status_node.set("innerHTML",Q);}if(A){this.status_node.scrollIntoView();}}else{}}};E.FormManager=N;},"@VERSION@",{requires:["aui-base","substitute"]});AUI.add("aui-form-textarea",function(C){var F=C.Lang,D=C.ClassNameManager.getClassName,L="textarea",I=D(L),E=[D(L,"height","monitor"),D("field","text","input"),D("helper","hidden","accessible")].join(" "),M="&nbsp;&nbsp;",J="&nbsp;\n&nbsp;",B='<pre class="'+E+'">',K="</pre>",H='<textarea autocomplete="off" class="{cssClass}" name="{name}"></textarea>';var G=C.Component.create({NAME:L,ATTRS:{autoSize:{value:true},height:{value:"auto"},maxHeight:{value:1000,setter:"_setAutoDimension"},minHeight:{value:45,setter:"_setAutoDimension"},width:{value:"auto",setter:"_setAutoDimension"}},HTML_PARSER:{node:"textarea"},EXTENDS:C.Textfield,prototype:{FIELD_TEMPLATE:H,renderUI:function(){var A=this;G.superclass.renderUI.call(A);if(A.get("autoSize")){A._renderHeightMonitor();}},bindUI:function(){var A=this;G.superclass.bindUI.call(A);if(A.get("autoSize")){A.get("node").on("keyup",A._onKeyup,A);}A.after("adjustSize",A._uiAutoSize);A.after("heightChange",A._afterHeightChange);A.after("widthChange",A._afterWidthChange);},syncUI:function(){var N=this;G.superclass.syncUI.call(N);N._setAutoDimension(N.get("minHeight"),"minHeight");N._setAutoDimension(N.get("maxHeight"),"maxHeight");var O=N.get("width");var A=N.get("minHeight");N._setAutoDimension(O,"width");
N._uiSetDim("height",A);N._uiSetDim("width",O);},_afterHeightChange:function(N){var A=this;A._uiSetDim("height",N.newVal,N.prevVal);},_afterWidthChange:function(N){var A=this;A._uiSetDim("width",N.newVal,N.prevVal);},_onKeyup:function(N){var A=this;A.fire("adjustSize");},_renderHeightMonitor:function(){var N=this;var P=C.Node.create(B+K);var R=N.get("node");C.getBody().append(P);N._heightMonitor=P;var A=R.getComputedStyle("fontFamily");var S=R.getComputedStyle("fontSize");var O=R.getComputedStyle("fontWeight");var Q=R.getComputedStyle("fontSize");R.setStyle("height",N.get("minHeight")+"px");P.setStyles({fontFamily:A,fontSize:S,fontWeight:O});if("outerHTML" in P.getDOM()){N._updateContent=N._updateOuterContent;}else{N._updateContent=N._updateInnerContent;}},_setAutoDimension:function(O,N){var A=this;A["_"+N]=O;},_uiAutoSize:function(){var N=this;var R=N.get("node");var O=N._heightMonitor;var S=N._minHeight;var Q=N._maxHeight;var P=R.val();var T=document.createTextNode(P);O.set("innerHTML","");O.appendChild(T);O.setStyle("width",R.getComputedStyle("width"));P=O.get("innerHTML");if(!P.length){P=M;}else{P+=J;}N._updateContent(P);var A=Math.max(O.get("offsetHeight"),S);A=Math.min(A,Q);if(A!=N._lastHeight){N._lastHeight=A;N._uiSetDim("height",A);}},_uiSetDim:function(O,N){var A=this;var P=A.get("node");if(F.isNumber(N)){N+="px";}P.setStyle(O,N);},_updateInnerContent:function(N){var A=this;return A._heightMonitor.set("innerHTML",N);},_updateOuterContent:function(N){var A=this;N=N.replace(/\n/g,"<br />");return A._updateInnerContent(N);}}});C.Textarea=G;},"@VERSION@",{skinnable:true,requires:["aui-form-textfield"]});AUI.add("aui-form-textfield",function(B){var F=B.Lang,C=B.ClassNameManager.getClassName,G="textfield",D=C(G);var E=B.Component.create({NAME:G,ATTRS:{selectOnFocus:{value:false},allowOnly:{value:null,validator:function(H){var A=this;return H instanceof RegExp;}},defaultValue:{value:""},validator:{value:null}},EXTENDS:B.Field,prototype:{bindUI:function(){var A=this;E.superclass.bindUI.call(A);var I=A.get("node");if(A.get("allowOnly")){I.on("keypress",A._filterInputText,A);}if(A.get("selectOnFocus")){I.on("focus",A._selectInputText,A);}var H=A.get("defaultValue");if(H){I.on("blur",A._checkDefaultValue,A);I.on("focus",A._checkDefaultValue,A);}},syncUI:function(){var A=this;var I=A.get("value");if(!I){var H=A.get("defaultValue");A.set("value",A.get("defaultValue"));}E.superclass.syncUI.apply(A,arguments);},_filterInputText:function(J){var A=this;var H=A.get("allowOnly");var I=String.fromCharCode(J.charCode);if(!H.test(I)){J.halt();}},_checkDefaultValue:function(M){var A=this;var I=A.get("defaultValue");var L=A.get("node");var K=F.trim(A.get("value"));var J=M.type;var H=(J=="focus"||J=="focusin");if(I){var N=K;if(H&&(K==I)){N="";}else{if(!H&&!K){N=I;}}A.set("value",N);}},_selectInputText:function(H){var A=this;H.currentTarget.select();}}});B.Textfield=E;},"@VERSION@",{requires:["aui-form-field"]});AUI.add("aui-form-validator",function(V){var N=V.Lang,K=V.Object,q=N.isBoolean,j=N.isDate,a=K.isEmpty,X=N.isFunction,x=N.isObject,Q=N.isString,B=N.trim,i=".",S="",R="form-validator",e="Invalid Date",l="|",AC="blurHandlers",AE="boundingBox",G="checkbox",D="container",s="error",AF="errorClass",p="errorContainer",AD="extractCssPrefix",AH="extractRules",U="field",E="inputHandlers",w="message",b="messages",C="messageContainer",r="name",v="radio",T="rules",AB="showAllMessages",c="showMessages",Y="type",AA="valid",g="validateOnBlur",u="validateOnInput",t="validClass",P="blur",o="errorField",y="input",k="reset",d="submit",h="submitError",J="validateField",f="validField",I=V.ClassNameManager.getClassName,AG=I(R,s),m=I(U,S),F=I(R,AA),Z=I(R,s,D),H=I(R,w,D),W='<label class="'+Z+'"></label>',z='<div class="'+H+'"></div>',M=[AH,g,u];var n=V.Component.create({NAME:R,ATTRS:{errorContainer:{getter:function(A){return V.Node.create(A).cloneNode(true);},value:W},errorClass:{value:AG,validator:Q},extractCssPrefix:{value:m,validator:Q},extractRules:{value:true,validator:q},messages:{value:{},validator:x},messageContainer:{getter:function(A){return V.Node.create(A).cloneNode(true);},value:z},render:{value:true},rules:{validator:x,value:{}},showMessages:{value:true,validator:q},showAllMessages:{value:false,validator:q},validateOnBlur:{value:true,validator:q},validateOnInput:{value:false,validator:q},validClass:{value:F,validator:Q}},MESSAGES:{DEFAULT:"Please fix this field.",acceptFiles:"Please enter a value with a valid extension ({0}).",alpha:"Please enter only apha characters.",alphanum:"Please enter only aphanumeric characters.",date:"Please enter a valid date.",digits:"Please enter only digits.",email:"Please enter a valid email address.",equalTo:"Please enter the same value again.",max:"Please enter a value less than or equal to {0}.",maxLength:"Please enter no more than {0} characters.",min:"Please enter a value greater than or equal to {0}.",minLength:"Please enter at least {0} characters.",number:"Please enter a valid number.",range:"Please enter a value between {0} and {1}.",rangeLength:"Please enter a value between {0} and {1} characters long.",required:"This field is required.",url:"Please enter a valid URL."},REGEX:{alpha:/^[a-z_]+$/i,alphanum:/^\w+$/,digits:/^\d+$/,number:/^[+\-]?(\d+([.,]\d+)?)+$/,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i},RULES:{acceptFiles:function(AI,O,AJ){var L=null;
if(Q(AJ)){var A=AJ.split(/,\s*|\b\s*/).join(l);L=new RegExp("[.]("+A+")$","i");}return L&&L.test(AI);},date:function(O,L,AI){var A=new Date(O);return(j(A)&&(A!=e)&&!isNaN(A));},equalTo:function(O,L,AI){var A=V.one(AI);return A&&(B(A.val())==O);},max:function(L,A,O){return(n.toNumber(L)<=O);},maxLength:function(L,A,O){return(L.length<=O);},min:function(L,A,O){return(n.toNumber(L)>=O);},minLength:function(L,A,O){return(L.length>=O);},range:function(O,L,AI){var A=n.toNumber(O);return(A>=AI[0])&&(A<=AI[1]);},rangeLength:function(O,L,AI){var A=O.length;return(A>=AI[0])&&(A<=AI[1]);},required:function(AJ,O,AK){var A=this;if(V.FormValidator.isCheckable(O)){var L=O.get(r);var AI=A.getElementsByName(L);return(AI.filter(":checked").size()>0);}else{return !!AJ;}}},isCheckable:function(L){var A=L.get(Y).toLowerCase();return(A==G||A==v);},toNumber:function(A){return parseFloat(A)||0;},EXTENDS:V.Widget,UI_ATTRS:M,prototype:{CONTENT_TEMPLATE:null,UI_EVENTS:{},blurHandlers:[],errorContainers:{},errors:{},inputHandlers:[],bindUI:function(){var A=this;A._createEvents();A._bindValidation();},addFieldError:function(AI,O){var A=this;var AJ=A.errors;var L=AI.get(r);if(!AJ[L]){AJ[L]=[];}AJ[L].push(O);},clearFieldError:function(L){var A=this;delete A.errors[L.get(r)];},eachRule:function(L){var A=this;V.each(A.get(T),function(O,AI){if(X(L)){L.apply(A,[O,AI]);}});},getField:function(L){var A=this;if(Q(L)){L=A.getElementsByName(L).item(0);}return L;},getFieldError:function(L){var A=this;return A.errors[L.get(r)];},hasErrors:function(){var A=this;return !a(A.errors);},getElementsByName:function(L){var A=this;return A.get(AE).all('[name="'+L+'"]');},getFieldErrorContainer:function(AI){var A=this;var L=AI.get(r);var O=A.errorContainers;if(!O[L]){O[L]=A.get(p);}return O[L];},getFieldErrorMessage:function(AL,AK){var AM=this;var AN=AL.get(r);var O=AM.get(b)[AN]||{};var A=AM.get(T)[AN];var L=n.MESSAGES;var AJ={};if(AK in A){var AI=V.Array(A[AK]);V.each(AI,function(AQ,AP){AJ[AP]=[AQ].join(S);});}var AO=(O[AK]||L[AK]||L.DEFAULT);return V.substitute(AO,AJ);},highlight:function(AI){var L=this;var A=L.get(AF);var O=L.get(t);AI.removeClass(O).addClass(A);},unhighlight:function(AI){var L=this;var A=L.get(AF);var O=L.get(t);AI.removeClass(A).addClass(O);},printErrorStack:function(O,L,AI){var A=this;if(!A.get(AB)){AI=AI.slice(0,1);}L.empty();V.each(AI,function(AK,AJ){var AL=A.getFieldErrorMessage(O,AK);var AM=A.get(C).addClass(AK);L.append(AM.html(AL));});},resetAllFields:function(){var A=this;A.eachRule(function(O,AI){var L=A.getField(AI);A.resetField(L);});},resetField:function(AJ){var L=this;var A=L.get(AF);var AI=L.get(t);var O=L.getFieldErrorContainer(AJ);O.remove();L.clearFieldError(AJ);AJ.removeClass(AI).removeClass(A);},validatable:function(O){var A=this;var AJ=A.get(T)[O.get(r)];var AI=AJ.required;var L=n.RULES.required.apply(A,[O.val(),O]);return(AI||(!AI&&L));},validate:function(){var A=this;A.eachRule(function(L,O){A.validateField(O);});},validateField:function(AI){var A=this;var O=A.getField(AI);var L=A.validatable(O);A.resetField(O);if(L){A.fire(J,{validator:{field:O}});}},_bindValidation:function(){var A=this;var L=A.get(AE);L.on(k,V.bind(A._onFormReset,A));L.on(d,V.bind(A._onFormSubmit,A));},_createEvents:function(){var A=this;var L=function(O,AI){A.publish(O,{defaultFn:AI});};L(o,A._defErrorFieldFn);L(f,A._defValidFieldFn);L(J,A._defValidateFieldFn);},_defErrorFieldFn:function(AI){var A=this;var O=AI.validator;var AJ=O.field;A.highlight(AJ);if(A.get(c)){var L=A.getFieldErrorContainer(AJ);AJ.placeBefore(L);A.printErrorStack(AJ,L,O.errors);}},_defValidFieldFn:function(L){var A=this;var O=L.validator.field;A.unhighlight(O);},_defValidateFieldFn:function(O){var L=this;var AI=O.validator.field;var AJ=L.get(T)[AI.get(r)];V.each(AJ,function(AN,AL){var AM=n.RULES[AL];var AK=B(AI.val());if(X(AM)&&!AM.apply(L,[AK,AI,AN])){L.addFieldError(AI,AL);}});var A=L.getFieldError(AI);if(A){L.fire(o,{validator:{field:AI,errors:A}});}else{L.fire(f,{validator:{field:AI}});}},_onBlurField:function(L){var A=this;var O=L.currentTarget.get(r);A.validateField(O);},_onFieldInputChange:function(L){var A=this;A.validateField(L.currentTarget);},_onFormSubmit:function(L){var A=this;var O={validator:{formEvent:L}};A.validate();if(A.hasErrors()){O.validator.errors=A.errors;A.fire(h,O);L.halt();}else{A.fire(d,O);}},_onFormReset:function(L){var A=this;A.resetAllFields();},_bindValidateHelper:function(AJ,AI,O,L){var A=this;A._unbindHandlers(L);if(AJ){A.eachRule(function(AL,AM){var AK=A.getElementsByName(AM);A[L].push(AK.on(AI,V.bind(O,A)));});}},_uiSetExtractRules:function(AJ){var A=this;if(AJ){var L=A.get(AE);var AI=A.get(T);var O=A.get(AD);V.each(n.RULES,function(AM,AL){var AK=[i,O,AL].join(S);L.all(AK).each(function(AN){if(AN.get(Y)){var AO=AN.get(r);if(!AI[AO]){AI[AO]={};}if(!(AL in AI[AO])){AI[AO][AL]=true;}}});});}},_uiSetValidateOnInput:function(L){var A=this;A._bindValidateHelper(L,y,A._onFieldInputChange,E);},_uiSetValidateOnBlur:function(L){var A=this;A._bindValidateHelper(L,P,A._onBlurField,AC);},_unbindHandlers:function(L){var A=this;V.each(A[L],function(O){O.detach();});A[L]=[];}}});V.each(n.REGEX,function(L,A){n.RULES[A]=function(AI,O,AJ){return n.REGEX[A].test(AI);};});V.FormValidator=n;},"@VERSION@",{requires:["aui-base","aui-event-input","selector-css3","substitute"]});AUI.add("aui-form",function(B){},"@VERSION@",{use:["aui-form-base","aui-form-combobox","aui-form-field","aui-form-manager","aui-form-textarea","aui-form-textfield","aui-form-validator"],skinnable:false});