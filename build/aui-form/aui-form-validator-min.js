AUI.add("aui-form-validator",function(V){var N=V.Lang,K=V.Object,q=N.isBoolean,j=N.isDate,a=K.isEmpty,X=N.isFunction,x=N.isObject,Q=N.isString,B=N.trim,i=".",S="",R="form-validator",e="Invalid Date",l="|",AC="blurHandlers",AE="boundingBox",G="checkbox",D="container",s="error",AF="errorClass",p="errorContainer",AD="extractCssPrefix",AH="extractRules",U="field",E="inputHandlers",w="message",b="messages",C="messageContainer",r="name",v="radio",T="rules",AB="showAllMessages",c="showMessages",Y="type",AA="valid",g="validateOnBlur",u="validateOnInput",t="validClass",P="blur",o="errorField",y="input",k="reset",d="submit",h="submitError",J="validateField",f="validField",I=V.ClassNameManager.getClassName,AG=I(R,s),m=I(U,S),F=I(R,AA),Z=I(R,s,D),H=I(R,w,D),W='<label class="'+Z+'"></label>',z='<div class="'+H+'"></div>',M=[AH,g,u];var n=V.Component.create({NAME:R,ATTRS:{errorContainer:{getter:function(A){return V.Node.create(A).cloneNode(true);},value:W},errorClass:{value:AG,validator:Q},extractCssPrefix:{value:m,validator:Q},extractRules:{value:true,validator:q},messages:{value:{},validator:x},messageContainer:{getter:function(A){return V.Node.create(A).cloneNode(true);},value:z},render:{value:true},rules:{validator:x,value:{}},showMessages:{value:true,validator:q},showAllMessages:{value:false,validator:q},validateOnBlur:{value:true,validator:q},validateOnInput:{value:false,validator:q},validClass:{value:F,validator:Q}},MESSAGES:{DEFAULT:"Please fix this field.",acceptFiles:"Please enter a value with a valid extension ({0}).",alpha:"Please enter only apha characters.",alphanum:"Please enter only aphanumeric characters.",date:"Please enter a valid date.",digits:"Please enter only digits.",email:"Please enter a valid email address.",equalTo:"Please enter the same value again.",max:"Please enter a value less than or equal to {0}.",maxLength:"Please enter no more than {0} characters.",min:"Please enter a value greater than or equal to {0}.",minLength:"Please enter at least {0} characters.",number:"Please enter a valid number.",range:"Please enter a value between {0} and {1}.",rangeLength:"Please enter a value between {0} and {1} characters long.",required:"This field is required.",url:"Please enter a valid URL."},REGEX:{alpha:/^[a-z_]+$/i,alphanum:/^\w+$/,digits:/^\d+$/,number:/^[+\-]?(\d+([.,]\d+)?)+$/,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i},RULES:{acceptFiles:function(AI,O,AJ){var L=null;if(Q(AJ)){var A=AJ.split(/,\s*|\b\s*/).join(l);L=new RegExp("[.]("+A+")$","i");}return L&&L.test(AI);},date:function(O,L,AI){var A=new Date(O);return(j(A)&&(A!=e)&&!isNaN(A));},equalTo:function(O,L,AI){var A=V.one(AI);return A&&(B(A.val())==O);},max:function(L,A,O){return(n.toNumber(L)<=O);},maxLength:function(L,A,O){return(L.length<=O);},min:function(L,A,O){return(n.toNumber(L)>=O);},minLength:function(L,A,O){return(L.length>=O);},range:function(O,L,AI){var A=n.toNumber(O);return(A>=AI[0])&&(A<=AI[1]);},rangeLength:function(O,L,AI){var A=O.length;return(A>=AI[0])&&(A<=AI[1]);},required:function(AJ,O,AK){var A=this;if(V.FormValidator.isCheckable(O)){var L=O.get(r);var AI=A.getElementsByName(L);return(AI.filter(":checked").size()>0);}else{return !!AJ;}}},isCheckable:function(L){var A=L.get(Y).toLowerCase();return(A==G||A==v);},toNumber:function(A){return parseFloat(A)||0;},EXTENDS:V.Widget,UI_ATTRS:M,prototype:{CONTENT_TEMPLATE:null,UI_EVENTS:{},blurHandlers:[],errorContainers:{},errors:{},inputHandlers:[],bindUI:function(){var A=this;A._createEvents();A._bindValidation();},addFieldError:function(AI,O){var A=this;var AJ=A.errors;var L=AI.get(r);if(!AJ[L]){AJ[L]=[];}AJ[L].push(O);},clearFieldError:function(L){var A=this;delete A.errors[L.get(r)];},eachRule:function(L){var A=this;V.each(A.get(T),function(O,AI){if(X(L)){L.apply(A,[O,AI]);}});},getField:function(L){var A=this;if(Q(L)){L=A.getElementsByName(L).item(0);}return L;},getFieldError:function(L){var A=this;return A.errors[L.get(r)];},hasErrors:function(){var A=this;
return !a(A.errors);},getElementsByName:function(L){var A=this;return A.get(AE).all('[name="'+L+'"]');},getFieldErrorContainer:function(AI){var A=this;var L=AI.get(r);var O=A.errorContainers;if(!O[L]){O[L]=A.get(p);}return O[L];},getFieldErrorMessage:function(AL,AK){var AM=this;var AN=AL.get(r);var O=AM.get(b)[AN]||{};var A=AM.get(T)[AN];var L=n.MESSAGES;var AJ={};if(AK in A){var AI=V.Array(A[AK]);V.each(AI,function(AQ,AP){AJ[AP]=[AQ].join(S);});}var AO=(O[AK]||L[AK]||L.DEFAULT);return V.substitute(AO,AJ);},highlight:function(AI){var L=this;var A=L.get(AF);var O=L.get(t);AI.removeClass(O).addClass(A);},unhighlight:function(AI){var L=this;var A=L.get(AF);var O=L.get(t);AI.removeClass(A).addClass(O);},printErrorStack:function(O,L,AI){var A=this;if(!A.get(AB)){AI=AI.slice(0,1);}L.empty();V.each(AI,function(AK,AJ){var AL=A.getFieldErrorMessage(O,AK);var AM=A.get(C).addClass(AK);L.append(AM.html(AL));});},resetAllFields:function(){var A=this;A.eachRule(function(O,AI){var L=A.getField(AI);A.resetField(L);});},resetField:function(AJ){var L=this;var A=L.get(AF);var AI=L.get(t);var O=L.getFieldErrorContainer(AJ);O.remove();L.clearFieldError(AJ);AJ.removeClass(AI).removeClass(A);},validatable:function(O){var A=this;var AJ=A.get(T)[O.get(r)];var AI=AJ.required;var L=n.RULES.required.apply(A,[O.val(),O]);return(AI||(!AI&&L));},validate:function(){var A=this;A.eachRule(function(L,O){A.validateField(O);});},validateField:function(AI){var A=this;var O=A.getField(AI);var L=A.validatable(O);A.resetField(O);if(L){A.fire(J,{validator:{field:O}});}},_bindValidation:function(){var A=this;var L=A.get(AE);L.on(k,V.bind(A._onFormReset,A));L.on(d,V.bind(A._onFormSubmit,A));},_createEvents:function(){var A=this;var L=function(O,AI){A.publish(O,{defaultFn:AI});};L(o,A._defErrorFieldFn);L(f,A._defValidFieldFn);L(J,A._defValidateFieldFn);},_defErrorFieldFn:function(AI){var A=this;var O=AI.validator;var AJ=O.field;A.highlight(AJ);if(A.get(c)){var L=A.getFieldErrorContainer(AJ);AJ.placeBefore(L);A.printErrorStack(AJ,L,O.errors);}},_defValidFieldFn:function(L){var A=this;var O=L.validator.field;A.unhighlight(O);},_defValidateFieldFn:function(O){var L=this;var AI=O.validator.field;var AJ=L.get(T)[AI.get(r)];V.each(AJ,function(AN,AL){var AM=n.RULES[AL];var AK=B(AI.val());if(X(AM)&&!AM.apply(L,[AK,AI,AN])){L.addFieldError(AI,AL);}});var A=L.getFieldError(AI);if(A){L.fire(o,{validator:{field:AI,errors:A}});}else{L.fire(f,{validator:{field:AI}});}},_onBlurField:function(L){var A=this;var O=L.currentTarget.get(r);A.validateField(O);},_onFieldInputChange:function(L){var A=this;A.validateField(L.currentTarget);},_onFormSubmit:function(L){var A=this;var O={validator:{formEvent:L}};A.validate();if(A.hasErrors()){O.validator.errors=A.errors;A.fire(h,O);L.halt();}else{A.fire(d,O);}},_onFormReset:function(L){var A=this;A.resetAllFields();},_bindValidateHelper:function(AJ,AI,O,L){var A=this;A._unbindHandlers(L);if(AJ){A.eachRule(function(AL,AM){var AK=A.getElementsByName(AM);A[L].push(AK.on(AI,V.bind(O,A)));});}},_uiSetExtractRules:function(AJ){var A=this;if(AJ){var L=A.get(AE);var AI=A.get(T);var O=A.get(AD);V.each(n.RULES,function(AM,AL){var AK=[i,O,AL].join(S);L.all(AK).each(function(AN){if(AN.get(Y)){var AO=AN.get(r);if(!AI[AO]){AI[AO]={};}if(!(AL in AI[AO])){AI[AO][AL]=true;}}});});}},_uiSetValidateOnInput:function(L){var A=this;A._bindValidateHelper(L,y,A._onFieldInputChange,E);},_uiSetValidateOnBlur:function(L){var A=this;A._bindValidateHelper(L,P,A._onBlurField,AC);},_unbindHandlers:function(L){var A=this;V.each(A[L],function(O){O.detach();});A[L]=[];}}});V.each(n.REGEX,function(L,A){n.RULES[A]=function(AI,O,AJ){return n.REGEX[A].test(AI);};});V.FormValidator=n;},"@VERSION@",{requires:["aui-base","aui-event-input","selector-css3","substitute"]});