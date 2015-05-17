# openexperiencesschedule
a jquery plugin (bootstrap, events) schedule callendar-like tool for visual presenting events/tasks with detecting collisions for a current and possible collisions for other rooms at a chosen point in time 

Requirements (as far as i remember)
Jquery (^)
Bootstrap
jquery UI
jQuery UI Touch Punch 0.2.3
https://eonasdan.github.io/bootstrap-datetimepicker/

much of descriptions/usage was written quickly and can contain some mistakes. It will be improved


License: 
openexperiencesschedule bootstrap jQuery plugin
License GNU GENERAL PUBLIC LICENSE Version 2, June 1991
https://github.com/OpenEX/openexperiencesschedule

Example data and automatic bootstrap button:

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn-lg" data-openexexperiences-schedule=".data-rooms-schedule">
      Launch room schedule
    </button>

    // NOTICE - we use seconds not miliseconds for the source data.    
    // all source dates are in GMT but on a timetable are GMT or GMT + data-utc-offset param in hours (1.5 is also possible (understood by plugin as +=1:30))
    // data-opx-calendar-starting-date-offset when the date is for wednesday if it is set to -1 it will be tuesday for the start of the seven-day timeline
    // data-row-id="1" is when you use data-radio param - it means that when you switch a radio button it takes value of data-row-id; when it is a checbox it has the data-row-id in its name and value name[id] value="id". if it this stuff is not defined it default behaviour will be applied (some default values according to the consecutive row numbers).  
    // in case of row element - notice where there is to be radio button it gets  data-radio="radiobutton-name" and if it is checked data-active-radio="true", similar is data-checkbox="checkboxbutton-name" and if it is checked data-active-checkbox="true", where the consecutive checkboxes get the number of the name this way checkboxbutton-name[id] where the id is taken from data-row-id attribute; as you think you see the names are unique 
    // (important for cacheing and little-invasive updates) for .opx-task optional - data-id="x" - element unique id, data-group-id="x" when you have this you can connect exactly a task with something in the database. In a simple aplication the id would be enough when the id means a table row of a given id in the database. But if there is more tables used the data-group-id id can help you to group some ids for example for you to use with a specific database table or as you prefer if you use a MVC framework a controller. It could be a controller name, couldn't it?
    // data-in-progress="true" or different values ("true" because true can be better handled by plugin natively) tells that a task is being now under way - you cannot just remove such a task, can you?
    <div class="data-rooms-schedule" data-refresh-events-every-x-seconds="10" data-opx-date="1429600680" data-opx-duration="18900" data-opx-calendar-starting-date-offset="-1" data-utc-offset="2">
    
        <div class="opx-row" data-row-id="1" data-radio="schedule-room-number">
            <h3>101:101a</h3>
            <div class="opx-task" data-opx-date="1429593480" data-opx-duration="3600" data-id="8" data-group-id="room"></div>
            <div class="opx-task" data-in-progress="true" data-opx-date="1429621680" data-opx-duration="8200" data-id="20" data-group-id="room" ></div>
        </div>
    
        <div class="opx-row active" data-row-id="2" data-radio="schedule-room-number" data-active-radio="true">
            <h3>101</h3>
            <div class="opx-task" data-opx-date="1429626680" data-opx-duration="6200" data-id="12" data-group-id="room"></div>
        </div>

        <div class="opx-row" data-row-id="3" data-radio="schedule-room-number">
            <h3>105</h3>
            <div class="opx-task" data-opx-date="1429626680" data-opx-duration="6200" data-id="3" data-group-id="room"></div>
        </div>
    
        <h2>Staff engaged</h2>
        
        <div class="opx-row" data-row-id="1" data-checkbox="schedule-staff">
            <h3><</h3>
            <div class="opx-task" data-opx-date="1429593480" data-opx-duration="3600"  data-id="8" data-group-id="staff"></div>
            <div class="opx-task" data-in-progress="true" data-opx-date="1429621680" data-opx-duration="8200" data-id="12" data-group-id="staff"></div>
        </div>
    
        <div class="opx-row" data-row-id="2" data-checkbox="schedule-room-number" data-active-checkbox="true">
            <h3>101</h3>
            <div class="opx-task" data-opx-date="1429626680" data-opx-duration="6200" data-id="19" data-group-id="staff"></div>
        </div>

        <div class="opx-row" data-row-id="3" data-checkbox="schedule-room-number">
            <h3>105</h3>
            <div class="opx-task" data-opx-date="1429626680" data-opx-duration="6200" data-id="2" data-group-id="staff"></div>
        </div>
        
    </div>

    events for main element containing callendar data
    beforeopen (before the modal window is opened)
    beforestartingdaychange (when there is timeline look change because the starting point date (input element) changes - works for date schedule element not times with hours:minutes). Params
            : standard event, 
            : an object with integer properties: "startingDateGMT", "duration" (f.e object['startingDateGMT']), which are in seconds - GMT (roughly means the time as it is seen in England).
    savechanges where function handling gets three params - 
            : standard event, 
            : then an object with three integer properties: "startingDateGMT", "duration" (f.e object['startingDateGMT']), which are in seconds - GMT (roughly means the time as it is seen in England). The thirs chosenElements is array of names and values of checbox/radio buttons which are checked like this: chosenElements['element-name']="thirdvaluechecked"
            : then initially updated/changed copy of the source element containing raw data for the plugin, so it possibly could be replaced    
            Info - what you can do is to replace the original source data element with the copy or change only some chosen params as you wish. Each time the data is loaded to the schedule using jQuery css way so the object is not rememembered
 




An example of using it in sombody's own code

Remember to use synchronuous ajax request so that the schedule plugin gets fresh data at the right time.



$(".data-rooms-schedule-container .data-rooms-schedule").on("beforeopen", function () {


}).on("beforestartingdaychange", function (event, dateAndDurationObject) \{
        

}).on("savechanges", function (event, startingdateanddurationandcheckedelementsvalues, preupdatedSourceDataElementCopy) {

    
}).on("refresh", function (event) {
        

       
})



