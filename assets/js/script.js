// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var firstHour = 9;
  var lastHour = 18;

  //Builds the agenda from the firstHour to the lastHour, dynamically using jQuery
  function BuildAgenda(firstHour, lastHour){
    for(var index = firstHour; index < lastHour; index++){
      var hourDiv = $('<div>').attr("id", "hour-" + index).addClass('row time-block');

      var colDiv = $('<div>').addClass("col-2 col-md-1 hour text-center py-3");
      if(index < 12){
        colDiv.text(index + "AM");
      }
      else if (index == 12)
      {
        colDiv.text("12PM");
      }
      else
      {
        colDiv.text((index - 12) + "PM");
      }

      hourDiv.append(colDiv);

      hourDiv.append($('<textarea>').addClass("col-8 col-md-10 description").attr("rows", 3));

      hourDiv.append($('<button>').addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").append($('<i>').addClass("fas fa-save").attr("aria-hidden", "true")));

      $("#agendaDiv").append(hourDiv);
    }

    //Listens for the on click of a button
    $("[class^='btn saveBtn col-2 col-md-1']").on("click", function (){
      let appointment = $(this).parent().children().eq(1).val().trim();
        if(appointment != ""){
          localStorage.setItem($(this).parent().attr('id'), appointment);
          $("#statusInformation").text("Updated " + $(this).parent().children().eq(0).text() + " appointment to local storage. ✔️");
          
          setTimeout(function() {
            $("#statusInformation").text("");
          }, 2000);
        }
    });
  }

  //Applies the past, present and future class by comparing hte id to the current hour.
  function ApplyPastPresentFutureClass(){
    var now = dayjs();
    var hour = now.hour();

    for(var i = firstHour; i < hour; i++ ){
      $("#hour-"+i).addClass("past");
    }

    if(hour >= firstHour && hour < lastHour){
      $("#hour-"+i).addClass("present");
    }

    for(var i = hour + 1; i < lastHour; i++){
      $("#hour-"+i).addClass("future");
    }
  }

  //Loads the agenda information from local storage to the agenda.
  function LoadAgendaFromLocalStorage(){
    var agenda = $("[class^='col-8 col-md-10 description']");
    for(var i = 0; i < agenda.length; i++){
      agenda.eq(i).text(localStorage.getItem(agenda[i].parentNode.id));
    }
  }

  //Helper function to get the ordinal from the current date, 1-31.
  function getOrdinal(currDate){
    var ordinal = currDate;
    if (currDate == 1 || currDate == 21 || currDate ==31){
      ordinal += "st";
    }
    else if (currDate == 2 || currDate == 22){
      ordinal += "nd";
    }
    else if (currDate == 3 || currDate == 23){
      ordinal += "rd";
    }
    else{
      ordinal += "th";
    }
    return ordinal;
  }

  //Helper function to get the day name from the current day.
  function getDayName(currDay){
    var dayNames = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

    return dayNames[currDay];
  }

  //Helper function to get the month name from the current month.
  function getMonthName(currMonth){
    var monthNames = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    return monthNames[currMonth];
  }

  //Function to display the current date in header.
  function DisplayCurrentDateInHeader(){
    
    //Future work, doesn't appear to work with this version of jQuery
    //var advancedFormat = require('dayjs/plugin/advancedFormat')
    //dayjs.extend(advancedFormat)
    //$("#currentDay").text(now.format("dddd, MMMM Do"));
    var now = dayjs();
    $("#currentDay").text(now.format("dddd, MMMM") + " " + getOrdinal(now.date()) + ", " + now.format("YYYY"));
    
    setInterval(function(){
      var now = dayjs();
      $("#currentDay").text(now.format("dddd, MMMM") + " " + getOrdinal(now.date()) + ", " + now.format("YYYY"));

    }, 1000);
    
  }

  //Displays the Current Date In Header
  DisplayCurrentDateInHeader();

  //Builds the agenda
  BuildAgenda(firstHour, lastHour);

  //Loads any previously saved information from local storage to the agenda
  LoadAgendaFromLocalStorage();

  //Applies the past, present, and future classes
  ApplyPastPresentFutureClass();
});