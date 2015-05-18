/* 
License: 
openexperiencesschedule bootstrap jQuery plugin
License GNU GENERAL PUBLIC LICENSE Version 2, June 1991
https://github.com/OpenEX/openexperiencesschedule
*/
 
(function ($) {

    jQuery.fn.openexperiencesschedule=function (options) {
    
        
        /*// This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            color: "#556b2f",
            backgroundColor: "white"
        }, options );*/        

        if (typeof(window.openexperiencesperformTaskOnce)=="undefined") {
            modalhtml="";                 
            modalhtml+='<div class="modal fade" id="openex-timeline" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            modalhtml+='  <div class="modal-dialog">'        
            modalhtml+='    <div class="modal-content">'
            modalhtml+='      <div class="modal-header" style="display: none;">'
            modalhtml+='        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
            modalhtml+='        <h4 class="modal-title" id="myModalLabel">Modal title</h4>'
            modalhtml+='      </div>'                              
            modalhtml+='      <div class="modal-body"><div class="openex-modal-contents">'
            modalhtml+='        '
            modalhtml+='      </div></div>'
            modalhtml+='      <div class="modal-footer openex-modal-footer">'
            modalhtml+='        <button type="button" class="btn btn-default opx-close-modal-button" data-dismiss="modal">Close</button>'
            modalhtml+='        <button type="button" class="btn btn-primary opx-save-changes-button">Save changes</button>'
            modalhtml+='      </div>'
            modalhtml+='    </div>'
            modalhtml+='  </div>'
            modalhtml+='</div>'
            $("body").append(modalhtml);

        }            

        modalWindowContents=$(".openex-modal-contents");
        jButtonElement=$(this);
        modalWindowContents.data("jButtonElement", jButtonElement)

        if (    typeof(options)!=="undefined"   
            && ((typeof(options)=="string" && options=="open" ) || (typeof(options['action'])!=="undefined" && options['action']=="open"))
        ) {
            $(jButtonElement.attr("data-openexexperiences-schedule")).trigger("beforeopen")
        }



        jCallenderSourceData=$(jButtonElement.attr("data-openexexperiences-schedule"));

        
        $("#openex-timeline .opx-save-changes-button").off("click.openexperiencesschedule").on("click.openexperiencesschedule", function () {

                modalWindowContents=$(".openex-modal-contents");
                jCallenderSourceData=modalWindowContents.data("jCallenderSourceData");
                jCallenderSourceDataTemporary=modalWindowContents.data("jCallenderSourceDataTemporary");
                jRelatedhiddenelement=$("#openexperiences-twopartdatetime", modalWindowContents)
                jDurationRelatedhiddenelement=$("[name='openexperiences-app-duration-field-hidden']", modalWindowContents);

                jCallenderSourceDataTemporary=jCallenderSourceData.clone(true, true);


                jCallenderSourceDataTemporary.attr('data-opx-date', jRelatedhiddenelement.val())
                jCallenderSourceDataTemporary.attr('data-opx-duration', jDurationRelatedhiddenelement.val())
                
                $(".opx-row", jCallenderSourceDataTemporary).each(function (index) {
                        
                        jRowOfjCSourceDataTemporary=$(this)
                        
                        
                        if (typeof(jRowOfjCSourceDataTemporary.attr("data-row-id"))!="undefined") {
                                    //if () data-active-checkbox="true"
                                    //data-active-radio="true"
                                    if (typeof($(jRowOfjCSourceDataTemporary).attr("data-radio")!="undefined")) {
                                        jradioorcheckboxbutton=$(".opx-row-activity-label input[name='"+$(jRowOfjCSourceDataTemporary).attr("data-radio")+"'][value='"+$(jRowOfjCSourceDataTemporary).attr("data-row-id")+"']", modalWindowContents)
                                        if (jradioorcheckboxbutton.length>0&&jradioorcheckboxbutton.get()[0].checked) jRowOfjCSourceDataTemporary.attr("data-active-radio","true"); else jRowOfjCSourceDataTemporary.removeAttr("data-active-radio"); 
                                    } else if (typeof($(jRowOfjCSourceDataTemporary).attr("data-checkbox"))!="undefined") {
                                        jradioorcheckboxbutton=$(".opx-row-activity-label input[name='"+$(jRowOfjCSourceDataTemporary).attr("data-checkbox")+"\["+$(jRowOfjCSourceDataTemporary).attr("data-row-id")+"\]'][value='"+$(jRowOfjCSourceDataTemporary).attr("data-row-id")+"']", modalWindowContents)
                                        if (jradioorcheckboxbutton.length>0&&jradioorcheckboxbutton.get()[0].checked) jRowOfjCSourceDataTemporary.attr("data-active-checkbox","true"); else jRowOfjCSourceDataTemporary.removeAttr("data-active-checkbox"); 
                                    }    
                                
                                    
                                    $(".opx-task", jRowOfjCSourceDataTemporary).each(function () {
                                            
                                            if (typeof($(this).attr("data-group-id"))!="undefined"&&typeof($(this).attr("data-id"))!="undefined") {
                                                jOpxInteractiveEventElement=$(".opx-interacting-event[data-group-id='"+$(this).attr("data-group-id")+"'][data-id='"+$(this).attr("data-id")+"']", modalWindowContents)                                                
                                            } else if (typeof($(this).attr("data-id"))!="undefined"&&typeof($(this).attr("data-group-id"))=="undefined") {
                                                jOpxInteractiveEventElement=$(".opx-interacting-event[data-id='"+$(this).attr("data-id")+"']", modalWindowContents)                                                
                                            } else {
                                                return true;
                                            }
                                            
                                            if (jOpxInteractiveEventElement.length>0) {
                                                $(this).attr("data-opx-date", jOpxInteractiveEventElement.attr("data-opx-ievent-start"))
                                                $(this).attr("data-opx-duration", jOpxInteractiveEventElement.attr("data-opx-ievent-duration"))
                                            }

                                            
                                            
                                            
                                            //data-opx-date="1429593480" data-opx-duration="3600" data-id="12" data-group-id="room"
                                    })
                                    
                                    
                                
                                
                        }
                })
                
                chosenElements=new Array();
                $(".field-desc label input[data-name]", modalWindowContents).each(function (index) {
                        if ($(this).get()[0].checked) chosenElements[$(this).attr('data-name')]=$(this).attr('value');
                })
                
                
                jCallenderSourceData.trigger("savechanges", [{
                    startingDateGMT:  parseInt(jRelatedhiddenelement.val()),
                    duration:   parseInt(jDurationRelatedhiddenelement.val()),
                    chosenElements: chosenElements
                }, jCallenderSourceDataTemporary])        
        })
        
        if (typeof(options)!=="undefined") {

            if ((typeof(options)=="string" && options=="startingdaychange" ) || (typeof(options['action'])!=="undefined" && options['action']=="startingdaychange")) {
                jRelatedhiddenelement=$("#openexperiences-twopartdatetime", modalWindowContents)
                jDurationRelatedhiddenelement=$("[name='openexperiences-app-duration-field-hidden']", modalWindowContents);
                jCallenderSourceData.trigger("beforestartingdaychange", [{
                        startingDateGMT:  parseInt(jRelatedhiddenelement.val()),
                        duration:   parseInt(jDurationRelatedhiddenelement.val())
                }])
            }
            
            modalWindowContents.html("");
        
        }

        
        

        if (typeof(window.openexperiencesperformTaskOnce)=="undefined") {
            window.openexperiencesperformTaskOnce=true;        

            window.openexperiences_callendar_setDateFromTimeStamp=function(jTimeHoldingElement, jDateelement, jRelatedhiddenelement) {

                dateArray=new Array();
                
                var date = new Date(parseInt(jRelatedhiddenelement.val())*1000);
                jTimeHoldingElement.val(date.getHours()+":"+date.getMinutes())
                
                jTimeHoldingElement.val(date.getHours()+":"+date.getMinutes())

                jDateelement.val(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate())
                
                
            }            
            
            
            window.openexperiences_callendar_setHiddenElementsValue=function(jTimeHoldingElement, jDateelement, jRelatedhiddenelement, utcoffset) {

                       if (typeof(utcoffset)=="undefined") {
                           utcoffsetmiliseconds=parseInt($("body").attr("data-utc-offset"))*1000*60*60
                       } else {
                           utcoffsetmiliseconds=parseInt(utcoffset)*1000*60*60
                       }
                
                       timeArray=jTimeHoldingElement.val().split(":");
                       miliseconds=(timeArray[0]*60*60*1000)+(timeArray[1]*60*1000)
        
                       dateArray=jDateelement.val().split("-");
                       var newDate=dateArray[1]+","+dateArray[2]+","+dateArray[0]+" GMT";
                       datemiliseconds=new Date(newDate).getTime();
            
                       overalmiliseconds=miliseconds+datemiliseconds
                       
                       
        
                       jRelatedhiddenelement.val(
                           overalmiliseconds/1000-utcoffsetmiliseconds/1000
                       );
                       


                    window.openexperiences_checkUpForEventCollisions()                                    
                       
               };
               

               
               
               window.openexperiences_updateTheTimesInControlls=function(jElement, setUpPosition) {

                   
                   leftPercents=parseInt($(jElement).css("left")) / ($(jElement).parent().width() / 100);
                   widthPercents=$(jElement).width() / ($(jElement).parent().width() / 100);
                   //alert(leftPercents+"#"+widthPercents)

                   a7daysInMilliseconds=3600000*24*7   
                       
                   if (setUpPosition===false) {
                   
                       eventDurationInMiliseconds=a7daysInMilliseconds*widthPercents/100;
                       eventDurationInSeconds=Math.round(eventDurationInMiliseconds/1000)
                       eventDurationFormattedString=(Math.floor(eventDurationInSeconds/3600))+":"+Math.floor(((eventDurationInSeconds%3600)/60))
                       // once again seconds and milisecond taken from string, becouse 18840 is 5:14 and 18856 also is 5:14, and from string is standard 18840 
                       eventDurationInSeconds=((Math.floor(eventDurationInSeconds/3600))*60*60)+(Math.floor(((eventDurationInSeconds%3600)/60))*60)
                       eventDurationInMiliseconds=eventDurationInSeconds*1000
                   
                   } else {    
                   
                       eventStartInMiliseconds=$(modalWindowContents).data("time-line-7day-start-timestamp")+(a7daysInMilliseconds*leftPercents/100); 
                       eventStartDate=new Date(eventStartInMiliseconds);
                       eventStartFormattedDateString=eventStartDate.getFullYear()+"-"+(eventStartDate.getMonth()+1)+"-"+eventStartDate.getDate()
                       eventStartFormattedHourMinutesString=eventStartDate.getHours()+":"+eventStartDate.getMinutes()
                       eventStartDate=new Date(eventStartDate.getFullYear(),eventStartDate.getMonth(),eventStartDate.getDate(),eventStartDate.getHours(),eventStartDate.getMinutes()) 
                       eventStartInMiliseconds=eventStartDate.getTime();            
                       eventStartInSeconds=eventStartInMiliseconds/1000;
                   
                   }
                   
                   modalWindowContents=$(".openex-modal-contents")   

                   //$(modalWindowContents).data("jCallenderSourceData")
                   //$(modalWindowContents).data("jCallenderSourceDataTemporary")
    
                   //$(modalWindowContents).data("time-line-7day-start-timestamp")
                   //$(modalWindowContents).data("time-line-7day-end-timestamp")
    
                   //$(modalWindowContents).data("time-line-start-timestamp-utc-local-time")
                   //$(modalWindowContents).data("time-line-end-timestamp-utc-local-time")

                   if (setUpPosition===false) {
                        jDurationTimeHoldingElement=$("input.openexperiences-app-duration-field", modalWindowContents);
                        jDurationRelatedhiddenelement=$("[name='openexperiences-app-duration-field-hidden']", modalWindowContents);
                        jDurationTimeHoldingElement.val(eventDurationFormattedString)
                        jDurationTimeHoldingElement.attr("value", eventDurationFormattedString)
                        jDurationRelatedhiddenelement.val(eventDurationInSeconds)
                        jDurationRelatedhiddenelement.attr("value", eventDurationInSeconds)
                        jDurationTimeHoldingElement.parent().data("DateTimePicker").destroy();
                        jDurationTimeHoldingElement.parent().datetimepicker({
                                pickDate: false,
                                //pick12HourFormat: false,
                                language: window.lang
                        })
                   } else {      
                        
                        jTimeHoldingElement=$("#openexperiences-twopartdatetime-time-picker", modalWindowContents)
                        jDateelement=$("#openexperiences-twopartdatetime-date-picker", modalWindowContents)
                        jRelatedhiddenelement=$("#openexperiences-twopartdatetime", modalWindowContents)
                        jTimeHoldingElement.val(eventStartFormattedHourMinutesString)
                        jTimeHoldingElement.attr("value",eventStartFormattedHourMinutesString)
                        jDateelement.val(eventStartFormattedDateString)
                        jDateelement.attr("value", eventStartFormattedDateString)
                        jRelatedhiddenelement.val(eventStartInSeconds)
                        jRelatedhiddenelement.attr("value", eventStartInSeconds)
                        //alert(typeof(jTimeHoldingElement.parent().data("DateTimePicker").destroy))
                        jTimeHoldingElement.parent().data("DateTimePicker").destroy();
                        jTimeHoldingElement.parent().datetimepicker({
                                pickDate: false,
                                //pick12HourFormat: false,
                                language: window.lang
                        })
                        jDateelement.parent().data("DateTimePicker").destroy();
                        jDateelement.parent().datetimepicker({
                                pickTime: false,
                                //pick12HourFormat: false,
                                language: window.lang
                        })

                   }
                    
                    

                   window.openexperiences_checkUpForEventCollisions()                                    
 
                    
                    
               };
            
            
               
               
               window.openexperiences_checkUpForEventCollisions= function() {
                    
                        modalWindowContents=$(".openex-modal-contents");   
                        jCallenderSourceData=modalWindowContents.data("jCallenderSourceData")
                        
                        if (typeof(jCallenderSourceData.attr("data-utc-offset"))=="undefined") {
                            utcoffsetmiliseconds=parseInt(jCallenderSourceData.attr("data-utc-offset"))*1000*60*60
                        } else {
                            utcoffsetmiliseconds=parseInt($("body").attr("data-utc-offset"))*1000*60*60
                        }
                        
                        opxSliders=$(".opx-slider", modalWindowContents).removeClass("collision-warning").removeClass("collision");
                        opxSliderMain=opxSliders.eq(0);      
                        opxRowSliders=opxSliders.not(opxSliderMain)
                        opxRowContainers=$(".opx-weekrow-container", modalWindowContents)
                        
                        jRelatedhiddenelement=modalWindowContents.data("jRelatedhiddenelement")
                        jDurationRelatedhiddenelement=modalWindowContents.data("jDurationRelatedhiddenelement")
                        
                        date=parseInt(jRelatedhiddenelement.val())*1000
                        dateUTCAdjusted=date+utcoffsetmiliseconds
 
                        duration=parseInt(jDurationRelatedhiddenelement.val())*1000

                        dateEndingPoint=date+duration                        
                        dateEndingPointUTCAdjusted=dateUTCAdjusted+duration
                        
                        opxRowContainers.each(function (lindex) {

                                
                                jCurrentRow=$(this)
                                
                                $(".opx-interacting-event", this).removeClass("collision-warning").removeClass("collision").each(function(index) {

                                        ieventDate=parseInt($(this).attr("data-opx-ievent-utcadjusted-start"))
                                        ieventDuration=parseInt($(this).attr("data-opx-ievent-duration"))
                                        ieventEndingPoint=ieventDate+ieventDuration
                                        
                                        //console.log(date+"#"+duration+"#"+dateEndingPoint+"@"+ieventDate+"#"+ieventDuration+"#"+ieventEndingPoint)
                                        //console.log(lindex+"&"+index+"@"+(ieventDate-date)+"#"+(ieventDate>date)+"@@"+(ieventEndingPoint-dateEndingPoint)+"#"+(ieventEndingPoint>dateEndingPoint))
                                        
                                        if (
                                                    (ieventDate<dateUTCAdjusted&&ieventEndingPoint>dateUTCAdjusted)
                                                ||  (ieventDate<dateEndingPointUTCAdjusted&&ieventEndingPoint>dateEndingPointUTCAdjusted)
                                                ||  (ieventDate<dateUTCAdjusted&&ieventEndingPoint>dateEndingPointUTCAdjusted)
                                                ||  (ieventDate>dateUTCAdjusted&&ieventEndingPoint<dateEndingPointUTCAdjusted)
                                        ) {
                                                

                                                opxSliders.addClass("collision-warning")
                                                $(this).addClass("collision-warning")
                                                radioOrCheckbox=$(".opx-row-activity-label input", jCurrentRow)
                                                if (radioOrCheckbox.get()[0].checked) {
                                                             opxSliders.addClass("collision")
                                                             $(this).addClass("collision")
                                                }
                                        }
                                        
                                });
                                
                                
                        })
                        
                        
                        // .opx-slider classess collision-warning collision             
                        // collision-warning - not checked
                        // collision - for checked
                                  
                          
                          
                          
                          
                          
                          
               }
               
            
               window.openexperiences_modalWindowContentsObject=modalWindowContents
               
               setTimeout(function() {
                       
                       setInterval(function () {
                               
                           modalWindowContents=window.openexperiences_modalWindowContentsObject

                           if (typeof(modalWindowContents.data('jCallenderSourceData'))=="undefined") return false;
                           jCallenderSourceData=modalWindowContents.data('jCallenderSourceData');
                           if (typeof(jCallenderSourceData.attr("data-refresh-events-every-x-seconds"))=="undefined") return false
                               
                           everyHowManySeconds=parseInt(jCallenderSourceData.attr("data-refresh-events-every-x-seconds"));    
                           if (everyHowManySeconds<1) return false;   
    
                           
                           if (typeof(window.openexperiences_windowssecondsCounter)=="undefined") {
                               window.openexperiences_windowssecondsCounter=0;
                           } else if (window.openexperiences_windowssecondsCounter>=everyHowManySeconds) {

                               window.openexperiences_windowssecondsCounter=0
                               jCallenderSourceData.trigger("refresh");
                           }       
                           
                           window.openexperiences_windowssecondsCounter++
                       
                       }, 1000)
                       
               }, 1000);
            
        }                   


        if (typeof(options)!=="undefined"
            && 
            (
                   (typeof(options)=="string" && (options=="open"||options=="startingdaychange")    ) 
                || (typeof(options['action'])!=="undefined" && (options['action']=="open"||options['action']=="startingdaychange"))
            )
        ) {

                if (options=="startingdaychange") {
                    jRelatedhiddenelementBeforeRemoval=jRelatedhiddenelement
                    jDurationRelatedhiddenelementBeforeRemoval=jDurationRelatedhiddenelement
                }
        
        
                modalWindowContents.html("");
                

                
                //$(this).addClass("openex-callendar")
                
                weekdaynames=new Array("Mo<span>nday</span>", "Tu<span>esday</span>", "We<span>dnesday</span>", "Th<span>ursday</span>", "Fr<span>iday</span>", "Sa<span>turday</span>", "Su<span>nday</span>");
                
                week='';              
                week+='    <div class="opx-day opx-rowdesc"></div>'
                week+='    <div class="opx-day"></div>'
                week+='    <div class="opx-day"></div>'
                week+='    <div class="opx-day"></div>'
                week+='    <div class="opx-day"></div>'
                week+='    <div class="opx-day"></div>'
                week+='    <div class="opx-day"></div>'
                week+='    <div class="opx-day"></div>'
        
                timeControls='<div class="opx-controls-indeed"><div class="container-fluid controls-main-time active"><div class="row"><div class="col-md-3"></div><div class="col-md-9">    <div class="row openexperiences-form-twocolumns-row"><div class="col-xs-4"> <div class="form-group openexperiences-field-twopartdatetime-date "> <div class="controls"> <div class="input-group input-group-sm openexperiences-date"> <input type="text" data-date-format="YYYY-MM-DD" data-related-hidden-element="openexperiences-twopartdatetime" data-coupled-with="openexperiences-twopartdatetime-time-picker" readonly="" class="form-control  input-group-sm  openexperiences-app-date-field" value="" name="openexperiences-twopartdatetime-date-picker" id="openexperiences-twopartdatetime-date-picker"><a class="input-group-addon" href="javascript:void(0);"> <i class="glyphicon glyphicon-calendar"></i></a> </div> <input type="hidden" readonly="" class="form-control" value="" name="openexperiences-twopartdatetime" id="openexperiences-twopartdatetime"> </div> </div> </div>           <div class="col-xs-4"> <div class="form-group  input-group-sm openexperiences-field-twopartdatetime-time "> <div class="controls"> <div class="input-group input-group-sm openexperiences-date"> <input type="text" data-related-hidden-element="openexperiences-twopartdatetime" data-coupled-with="openexperiences-twopartdatetime-date-picker" readonly="" data-date-format="HH:mm" class="form-control openexperiences-app-time-field" value="" name="openexperiences-twopartdatetime-time-picker" id="openexperiences-twopartdatetime-time-picker"><a class="input-group-addon" href="javascript:void(0);"><i class="glyphicon glyphicon-time"></i></a> </div> </div> </div> </div>               <div class="col-xs-4"> <div class="form-group  input-group-sm openexperiences-app-duration-field "> <div class="controls"> <div class="input-group input-group-sm date"> <input type="text" readonly="" data-date-format="HH:mm" class="form-control openexperiences-app-duration-field" value="" name="openexperiences-app-duration-field" id="openexperiences-app-duration-field"><input type="hidden" readonly="" data-date-format="HH:mm" class="form-control openexperiences-app-duration-field-hidden" value="" name="openexperiences-app-duration-field-hidden" id="openexperiences-app-duration-field-hidden"><a class="input-group-addon" href="javascript:void(0);"><i class="glyphicon glyphicon-time"></i></a> </div> </div> </div> </div>                </div></div></div></div>                                                           <div class="container-fluid controls-event-time"><div class="row"><div class="col-md-3"></div><div class="col-md-9">    <div class="row openexperiences-form-twocolumns-row"><div class="col-xs-4"> <div class="form-group openexperiences-event-field-twopartdatetime-date"> <div class="controls"> <div class="input-group input-group-sm openexperiences-event-date"> <input type="text" data-date-format="YYYY-MM-DD" data-related-hidden-element="openexperiences-event-twopartdatetime" data-coupled-with="openexperiences-event-twopartdatetime-time-picker" readonly="" class="form-control  input-group-sm  openexperiences-event-app-date-field" value="" name="openexperiences-event-twopartdatetime-date-picker" id="openexperiences-event-twopartdatetime-date-picker"><a class="input-group-addon" href="javascript:void(0);"> <i class="glyphicon glyphicon-calendar"></i></a> </div> <input type="hidden" readonly="" class="form-control" value="" name="openexperiences-event-twopartdatetime" id="openexperiences-event-twopartdatetime"> </div> </div> </div>           <div class="col-xs-4"> <div class="form-group  input-group-sm openexperiences-event-field-twopartdatetime-time "> <div class="controls"> <div class="input-group input-group-sm openexperiences-event-date"> <input type="text" data-related-hidden-element="openexperiences-event-twopartdatetime" data-coupled-with="openexperiences-event-twopartdatetime-date-picker" readonly="" data-date-format="HH:mm" class="form-control openexperiences-event-app-time-field" value="" name="openexperiences-event-twopartdatetime-time-picker" id="openexperiences-event-twopartdatetime-time-picker"><a class="input-group-addon" href="javascript:void(0);"><i class="glyphicon glyphicon-time"></i></a> </div> </div> </div> </div>               <div class="col-xs-4"> <div class="form-group  input-group-sm openexperiences-event-app-duration-field "> <div class="controls"> <div class="input-group input-group-sm date"> <input type="text" readonly="" data-date-format="HH:mm" class="form-control openexperiences-event-app-duration-field" value="" name="openexperiences-event-app-duration-field" id="openexperiences-event-app-duration-field"><input type="text" readonly="" data-date-format="HH:mm" class="form-control openexperiences-event-app-duration-field-hidden" value="" name="openexperiences-event-app-duration-field-hidden" id="openexperiences-event-app-duration-field-hidden"><a class="input-group-addon" href="javascript:void(0);"><i class="glyphicon glyphicon-time"></i></a> </div> </div> </div> </div>                </div></div></div></div>                                                                                       </div>                  '
                    



                eventSlider="<div class='opx-current-event-slider'><div class='opx-slider-area-container'><div class='field-desc'><div>Field desc</div></div><div class='field-events'><div class='opx-slider'></div></div></div></div>";
                
                weekdays='<div class="opx-weekdays-container"><div class="opx-current-event-controlls">'+timeControls+'</div>'+eventSlider+'<div class="opx-weekdays">';
                weekdaysend='</div></div>';                 
                weekrow='<div class="opx-weekrow-container">'+eventSlider+'<div class="opx-weekrow">'
                weekrowend='</div></div>'
                
                
                intermediateContainer=document.createElement("div");
                                                                                                   
                $(intermediateContainer).html(weekdays+week+weekdaysend);
                
                
                weekElements=$(">div > div > div:not(:first-child)", intermediateContainer);
                weekElements.each(function (index) {
                        $(this).data("index", index);
                        $(this).on("click", function () {
                                dayelement=this
                                
                                modalWindowContents=$(".openex-modal-contents")   

                                if ($(this).hasClass("active")) {
                                    $(this).removeClass("active")    
                                    $(this).closest(".openex-modal-contents").find(".opx-weekrow").each(function () {
                                            $(".opx-day:eq("+(parseInt($(dayelement).data("index")+1))+")", this).removeClass("active")
                                    })
                                    //(parseInt($(dayelement).data("index")+1))
                                    modalWindowContents.attr("data-day-active","false")
                                    
                                } else {
                                    $(this).addClass("active")    
                                    $(this).closest(".openex-modal-contents").find(".opx-weekrow").each(function () {
                                            $(".opx-day:eq("+(parseInt($(dayelement).data("index")+1))+")", this).addClass("active")
                                    })
                                    
                                    modalWindowContents.attr("data-day-active", parseInt($(dayelement).data("index"))     );
                                
                                }
                        })
                })                                                                          
                
                
                
                $(modalWindowContents).append($("> *", intermediateContainer));    
            

                
                jTimeHoldingElement=$("#openexperiences-twopartdatetime-time-picker", modalWindowContents)
                jDateelement=$("#openexperiences-twopartdatetime-date-picker", modalWindowContents)
                jRelatedhiddenelement=$("#openexperiences-twopartdatetime", modalWindowContents)

                if (options=="startingdaychange") {
                    jRelatedhiddenelement.val(jRelatedhiddenelementBeforeRemoval.val());
                } else {
                    jRelatedhiddenelement.val(jCallenderSourceData.attr("data-opx-date"))
                }
                
                
                
                window.openexperiences_callendar_setDateFromTimeStamp(jTimeHoldingElement, jDateelement, jRelatedhiddenelement)

                jDurationTimeHoldingElement=$("input.openexperiences-app-duration-field", modalWindowContents);
                jDurationRelatedhiddenelement=$("[name='openexperiences-app-duration-field-hidden']", modalWindowContents);

                if (options=="startingdaychange") {
                    jDurationRelatedhiddenelement.val(jDurationRelatedhiddenelementBeforeRemoval.val());
                } else {
                    jDurationRelatedhiddenelement.val(jCallenderSourceData.attr("data-opx-duration"));
                }


                modalWindowContents.data("jRelatedhiddenelement", jRelatedhiddenelement)
                modalWindowContents.data("jDurationRelatedhiddenelement", jDurationRelatedhiddenelement)
                
                duration=parseInt(jDurationRelatedhiddenelement.val())
                durationHours=Math.floor(duration/3600)
                durationMinutes=duration%3600/60               
                jDurationTimeHoldingElement.val(durationHours+":"+durationMinutes)
                
                jMainDate = new Date((parseInt(jRelatedhiddenelement.val())*1000));

                jDayStartOfMainDate=new Date(   jMainDate.getFullYear(),jMainDate.getMonth(),jMainDate.getDate()   );

                Timeline7dayStartTimestamp=jDayStartOfMainDate.getTime()+(parseInt(jCallenderSourceData.attr("data-opx-calendar-starting-date-offset"))*3600000*24)
                Timeline7dayEndTimestamp=Timeline7dayStartTimestamp+(3600000*24*7);
                
                
                if (typeof(jCallenderSourceData.attr("data-utc-offset"))=="undefined") {
                    utcoffsetmiliseconds=parseInt(jCallenderSourceData.attr("data-utc-offset"))*1000*60*60
                } else {
                    utcoffsetmiliseconds=parseInt($("body").attr("data-utc-offset"))*1000*60*60
                }
                
                jMainDateUTCAdjustedTimestamp=(parseInt(jRelatedhiddenelement.val())*1000)+utcoffsetmiliseconds;                
                
                Timeline7dayStartTimestampUTCLocalTime=Timeline7dayStartTimestamp+utcoffsetmiliseconds
                Timeline7dayEndTimestampUTCLocalTime=Timeline7dayEndTimestamp+utcoffsetmiliseconds


                
                $(modalWindowContents).data("jCallenderSourceData", jCallenderSourceData)

                $(modalWindowContents).data("time-line-7day-start-timestamp", Timeline7dayStartTimestamp)
                $(modalWindowContents).data("time-line-7day-end-timestamp", Timeline7dayEndTimestamp)

                $(modalWindowContents).data("time-line-start-timestamp-utc-local-time", Timeline7dayStartTimestampUTCLocalTime)
                $(modalWindowContents).data("time-line-end-timestamp-utc-local-time", Timeline7dayEndTimestampUTCLocalTime)

                
                
                // utc adjusted because in Poland it is some GMT time hour + 2 hours and visually is adjusted but the hidden real time is always GMT zone
                timelineDayOfTheWeek=new Date(jMainDateUTCAdjustedTimestamp).getDay();
                
                // in javascript 0 is sunday, 1 is monday but weekdaynames are 0 - monday, 1 - tuesday
                weekElements.each(function (index) {
                        expectedDayIndex=(-1+index+parseInt(jCallenderSourceData.attr("data-opx-calendar-starting-date-offset"))+timelineDayOfTheWeek)%7
                        if (expectedDayIndex<0) expectedDayIndex=7+expectedDayIndex;
                        $(this).html(weekdaynames[expectedDayIndex]+" <em class='resize-container-full'><em class='glyphicon glyphicon-resize-full'></em></em><em class='resize-container-small'><em class='glyphicon glyphicon-resize-small'></em></em>")
                })

                

                
                $(".opx-row", jCallenderSourceData).each(function (index) {
                    
                     $(intermediateContainer).html(weekrow+week+weekrowend)

                     if (typeof($(this).attr("data-row-id"))!="undefined") {
                        rowIndex=$(this).attr("data-row-id") 
                     }  else {
                        rowIndex=index
                     }
                    
                     
                     if (typeof($(this).attr("data-radio"))!=="undefined") radiobuttonHTMLPart='<label class="opx-row-activity-label"><input class="opx-row-activity-btn" type="radio" name="'+$(this).attr("data-radio")+'" '+((typeof($(this).attr("data-active-radio"))!=="undefined"&&$(this).attr("data-active-radio")=="true")?"checked":"")+' value="'+rowIndex+'" data-name="'+$(this).attr("data-radio")+'" /></label>'; 
                     if (typeof($(this).attr("data-checkbox"))!=="undefined") radiobuttonHTMLPart='<label class="opx-row-activity-label"><input class="opx-row-activity-btn" type="checkbox" name="'+$(this).attr("data-checkbox")+'['+rowIndex+']" '+((typeof($(this).attr("data-active-checkbox"))!=="undefined"&&$(this).attr("data-active-checkbox")=="true")?"checked":"")+' value="'+rowIndex+'" data-name="'+$(this).attr("data-checkbox")+'"  /></label>'; 
                    
                     
                     
                    $(".field-desc > div", intermediateContainer).html(radiobuttonHTMLPart+$("h3", this).html()).each(function () {
                    })
                    
                    $("> div > div > div:not(:first-child)", intermediateContainer).each(function (index) {
                            
                            progressBarPart="";
                            progressBarPart+="<div class='opx-timeline'>";
                            
                            progressBarPart+="<div class='opx-hours-container'>"
                            
                                /*for(i=0;i<24;i++) {
                                    progressBarPart+='<div class="opx-one-hour  '+((i%2==1)?" one-hour-1":" one-hour-2")+'">';
                                    progressBarPart+='</div>';
                                } */                       
            
                            progressBarPart+="</div>";
                            progressBarPart+="</div>";
                                
                            $(this).html(progressBarPart);
                    }) 

                    
                    fieldEvents=$(".field-events", intermediateContainer);

                    $(".opx-task", this).each(function (index) {

                            modalWindowContents=$(".openex-modal-contents");
                            
                            //data-opx-date="1429593480" data-opx-duration="3600"
                            jCallenderSourceData=$(modalWindowContents).data("jCallenderSourceData")
                            jCallenderSourceDataTemporary=$(modalWindowContents).data("jCallenderSourceDataTemporary")
            
                            Timeline7dayStartTimestamp=$(modalWindowContents).data("time-line-7day-start-timestamp")
                            Timeline7dayEndTimestamp=$(modalWindowContents).data("time-line-7day-end-timestamp")
            
                            Timeline7dayStartTimestampUTCLocalTime=$(modalWindowContents).data("time-line-start-timestamp-utc-local-time")
                            Timeline7dayEndTimestampUTCLocalTime=$(modalWindowContents).data("time-line-end-timestamp-utc-local-time")

                            
                            if (typeof(jCallenderSourceData.attr("data-utc-offset"))=="undefined") {
                                utcoffsetmiliseconds=parseInt(jCallenderSourceData.attr("data-utc-offset"))*1000*60*60
                            } else {
                                utcoffsetmiliseconds=parseInt($("body").attr("data-utc-offset"))*1000*60*60
                            }

                            dateSeconds=parseInt($(this).attr("data-opx-date"))
                            dateMilliseconds=dateSeconds*1000;
                            dateMillisecondsUTCLocalTime=dateMilliseconds+utcoffsetmiliseconds
                            durationSeconds=parseInt($(this).attr("data-opx-duration"))
                            durationMilliseconds=durationSeconds*1000



                            timelineDurationTimestamp=7*24*3600000
                            //sliderWidth
                            timelineRelativeMainDateTimeStamp=dateMillisecondsUTCLocalTime-Timeline7dayStartTimestampUTCLocalTime;
                            timelineRelativeMainDateInPercents=(timelineRelativeMainDateTimeStamp/timelineDurationTimestamp)*100
                            
                            taskUsedAttributes="";
                            if (typeof($(this).attr("data-id"))!="undefined") taskUsedAttributes+=" data-id="+$(this).attr("data-id")+"'";
                            if (typeof($(this).attr("data-group-id"))!="undefined") taskUsedAttributes+=" data-group-id="+$(this).attr("data-group-id")+"'";
                            if (typeof($(this).attr("data-in-progress"))!="undefined") taskUsedAttributes+=" data-in-progress='"+$(this).attr("data-in-progress")+"'";
                            
                            fieldEvents.append("<div class='opx-interacting-event' style='left:"+timelineRelativeMainDateInPercents+"%;width:"+(durationMilliseconds/timelineDurationTimestamp*100)+"%;' data-opx-ievent-utcadjusted-start='"+dateMillisecondsUTCLocalTime+"'  data-opx-ievent-duration='"+durationMilliseconds+"'  data-opx-ievent-start='"+dateMilliseconds+"'"+taskUsedAttributes+"></div>");

                            
                    })
                    
                    
                    
                    
                    if ($(this).prev().length>0&&$(this).prev().get()[0].nodeName=="H2") {
                        modalWindowContents.append($(this).prev().clone(true, true));    
                    }    
                    

                    modalWindowContents.append($("> *", intermediateContainer).clone());    
                
                    $(".opx-row-activity-label input", modalWindowContents).on("change", function () {
                        window.openexperiences_checkUpForEventCollisions()                                    
                    });
                    
                    
                    
                    
                    
                })
                
        
        
        

                
                
                                                   
                //modalWindowContents.append($(this).clone(true, true))
        

                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                        
               $('input.openexperiences-app-time-field[readonly], input.openexperiences-event-app-time-field[readonly]', modalWindowContents).parent().datetimepicker({
                            pickDate: false,
                            //pick12HourFormat: false,
                            language: window.lang
               }).on("dp.change", function () {

                   suffix="";                   
                   if ($(this).hasClass("openexperiences-event-app-time-field")) suffix="-event";
                   
                   timeHoldingElement=$("[name='openexperiences"+suffix+"-twopartdatetime-time-picker']");
                   coupleddateelement=$("[name='openexperiences"+suffix+"-twopartdatetime-date-picker']");
                   relatedhiddenelement=$("[name='openexperiences"+suffix+"-twopartdatetime']");
        
                   if (relatedhiddenelement.length&&coupleddateelement.length) {
                       
                        window.openexperiences_callendar_setHiddenElementsValue(timeHoldingElement, coupleddateelement, relatedhiddenelement) 
                       
                   }

                   $( "#openex-timeline .opx-slider").trigger("timechange")

                   modalWindowContents=$(".openex-modal-contents")   


                   
               });
        
               $('input.openexperiences-app-date-field[readonly], input.openexperiences-event-app-date-field[readonly]', modalWindowContents).parent().datetimepicker({
                            pickTime: false,
                            //pick12HourFormat: false,
                            language: window.lang
               }).on("dp.change", function () {

                   suffix="";                   
                   if ($(this).hasClass("openexperiences-event-app-date-field")) suffix="-event";
                   dateelement=$("[name='openexperiences"+suffix+"-twopartdatetime-date-picker']");
                   coupledtimeHoldingElement=$("[name='openexperiences"+suffix+"-twopartdatetime-time-picker']")
                   relatedhiddenelement=$("[name='openexperiences"+suffix+"-twopartdatetime']");
        
                   
                   if (relatedhiddenelement.length&&coupledtimeHoldingElement.length) {
        
                       window.openexperiences_callendar_setHiddenElementsValue(coupledtimeHoldingElement, dateelement, relatedhiddenelement) 
                       
                   }
                   $( "#openex-timeline .opx-slider").trigger("timechange")
                   
                   modalWindowContents.data("jButtonElement").openexperiencesschedule("startingdaychange");

               });;
        
        
        
               $('input.openexperiences-app-duration-field[readonly], input.openexperiences-event-app-duration-field[readonly]', modalWindowContents).parent().datetimepicker({
                            pickDate: false,
                            //pick12HourFormat: false,
                            language: window.lang
               }).on("dp.change", function () {

                   
                       suffix="";                   
                       if ($(this).hasClass("openexperiences-event-app-duration-field"))  suffix="-event";

                       jTimeHoldingElement=$("input.openexperiences"+suffix+"-app-duration-field", this);
                       jRelatedhiddenelement=$("[name='openexperiences"+suffix+"-app-duration-field-hidden']");
                       timeArray=jTimeHoldingElement.val().split(":");
                       miliseconds=(timeArray[0]*60*60*1000)+(timeArray[1]*60*1000)
                       seconds=miliseconds/1000
                       jRelatedhiddenelement.val(seconds);

                       $( "#openex-timeline .opx-slider").trigger("timechange")

                       window.openexperiences_checkUpForEventCollisions()                                    
                   
               });
        
        
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                $( "#openex-timeline .opx-slider").each(function (index) {
                        
                        if (index===0) $(this).addClass("movable-slider")
                        
                        $(this).on("timechange", function () {
                         
                                sliderContainer=$(this).parent();
                                sliderWidth=sliderContainer.width();
                                modalWindowContents=$(".openex-modal-contents")   
                                
                                jCallenderSourceData=$(modalWindowContents).data("jCallenderSourceData")
                                jCallenderSourceDataTemporary=$(modalWindowContents).data("jCallenderSourceDataTemporary")
                
                                Timeline7dayStartTimestamp=$(modalWindowContents).data("time-line-7day-start-timestamp")
                                Timeline7dayEndTimestamp=$(modalWindowContents).data("time-line-7day-end-timestamp")
                
                                Timeline7dayStartTimestampUTCLocalTime=$(modalWindowContents).data("time-line-start-timestamp-utc-local-time")
                                Timeline7dayEndTimestampUTCLocalTime=$(modalWindowContents).data("time-line-end-timestamp-utc-local-time")
                                
                                jRelatedhiddenelement=modalWindowContents.data("jRelatedhiddenelement")
                                jDurationRelatedhiddenelement=modalWindowContents.data("jDurationRelatedhiddenelement")
                                                                    
                                duration=parseInt(jDurationRelatedhiddenelement.val())*1000
                
                                jMainDate = new Date((parseInt(jRelatedhiddenelement.val())*1000));
                                jMainDateTimestamp=jMainDate.getTime();
                                
                                jDayStartOfMainDate=new Date(   jMainDate.getFullYear(),jMainDate.getMonth(),jMainDate.getDate()   );

                                if (typeof(jCallenderSourceData.attr("data-utc-offset"))=="undefined") {
                                    utcoffsetmiliseconds=parseInt(jCallenderSourceData.attr("data-utc-offset"))*1000*60*60
                                } else {
                                    utcoffsetmiliseconds=parseInt($("body").attr("data-utc-offset"))*1000*60*60
                                }

                                jMainDateUTCAdjustedTimestamp=(parseInt(jRelatedhiddenelement.val())*1000)+utcoffsetmiliseconds;                
                                
                                //MainDateTimestamp
                                //Timeline7dayStartTimestampUTCLocalTime
                                //Timeline7dayEndTimestampUTCLocalTime
                                timelineDurationTimestamp=7*24*3600000
                                //sliderWidth
                                timelineRelativeMainDateTimeStamp=jMainDateUTCAdjustedTimestamp-Timeline7dayStartTimestampUTCLocalTime;
                                timelineRelativeMainDateInPercents=(timelineRelativeMainDateTimeStamp/timelineDurationTimestamp)*100
                                                                
                                
                                $(this).css({
                                    left: timelineRelativeMainDateInPercents+"%",
                                    width: (duration/timelineDurationTimestamp*100)+"%"
                                })
                                
                                
                                                                
                                
                                
                                
                                
                                
                                
                                if ($(this).hasClass("movable-slider")) {
                                    
                                    /*alert("1:"+jCallenderSourceData.length)
                                    alert("2:"+jCallenderSourceDataTemporary.length)
                                    alert("3:"+Timeline7dayStartTimestamp+"#"+Timeline7dayStartTimestampUTCLocalTime)
                                    alert("4:"+Timeline7dayEndTimestamp+"#"+Timeline7dayEndTimestampUTCLocalTime)
                                    */
                                }
                        
                        
                        })
                
                }).trigger("timechange").eq(0).draggable({ 
                        containment: "parent",  
                        axis: "x", 
                        scroll: false, 
                        drag: function( event, ui ) {
                            //$("#openex-timeline  .opx-weekrow-container .opx-slider").css({left:$(this).css("left")+"px"})
                            $( "#openex-timeline .opx-slider").css("left",parseInt($(this).css("left")) / ($(this).parent().width() / 100)+"%");
                            window.openexperiences_updateTheTimesInControlls($(this), true);
                        },
                        stop: function( event, ui ) {
                            //$("#openex-timeline  .opx-weekrow-container .opx-slider").css({left:ui.position.left+"px"})
                            $( "#openex-timeline .opx-slider").css("left",parseInt($(this).css("left")) / ($(this).parent().width() / 100)+"%");
                            window.openexperiences_updateTheTimesInControlls($(this), true);
                        }                        
                }).each(function () {
                        
                        $(this).resizable({
                              maxHeight: parseInt($(this).height()),
                              //maxWidth: 350,
                              minHeight: parseInt($(this).height()),
                              resize: function( event, ui ) {
                                  
                                  $("#openex-timeline  .opx-weekrow-container .opx-slider").width($(this).width())
                                   $( "#openex-timeline .opx-slider").css("width", $(this).width() / ($(this).parent().width() / 100)+"%");
                                   window.openexperiences_updateTheTimesInControlls($(this), false);
                              },
                              stop: function( event, ui ) {
                                   $( "#openex-timeline .opx-slider").css("width", $(this).width() / ($(this).parent().width() / 100)+"%");
                                   window.openexperiences_updateTheTimesInControlls($(this), false);
                              }                        
                        });
        
                
                })
                
                
                modalWindowContents.wrapInner("<div class='openex-callendar'></div>")




                 window.openexperiences_checkUpForEventCollisions()                                    

                
                $("#openex-timeline").modal("show")


        }

                
        // chain of objects
        return this;
                
                
    }
    
    
    $(document).ready(function() {
            $("[data-openexexperiences-schedule]").openexperiencesschedule().on("click", function () {
                    $(this).openexperiencesschedule("open")
            })
    });



})(jQuery)



