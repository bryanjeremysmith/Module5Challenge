// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  var saveButtons = document.querySelectorAll("[class^='btn saveBtn col-2 col-md-1']");
  for(var i = 0; i < saveButtons.length; i++){
    saveButtons[i].addEventListener("click", function(){
      localStorage.setItem(this.parentNode.id, this.parentNode.children[1].value);

      console.log(this.parentNode.children[1].value);      
      console.log(this.parentNode.id);
    });
  }
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function applyPast(hr){
    document.getElementById(hr).className += " past";
  }

  function applyPresent(hr){
    document.getElementById(hr).className += " present";
  }

  function applyFuture(hr){
    document.getElementById(hr).className += " future";
  }

  function applyPastPresentFutureClass(){
    var now = dayjs();
    var hour = now.hour();
    console.log(hour);

    for(var i = 9; i < hour; i++ ){
      applyPast("hour-" + i);
    }

    if(hour >= 9 && hour < 17){
      applyPresent("hour-" + hour);
    }

    for(var i = hour + 1; i < 17; i++){
      applyFuture("hour-" + i);
    }
  }

  applyPastPresentFutureClass();

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  function LoadAgendaFromLocalStorage(){
    var agenda = document.querySelectorAll("[class^='col-8 col-md-10 description']");
    for(var i = 0; i < agenda.length; i++){
      var hourAgenda = "";
      hourAgenda = localStorage.getItem(agenda[i].parentNode.id);
      agenda[i].value = hourAgenda;
    }
  }

  // TODO: Add code to display the current date in the header of the page.

  //Helper function to get the ordinal from the current date, 1-31.
  function getOrdinal(currDate){
    var ordinal = currDate;
    if (currDate == 1 || currDate == 21 || currDate ==31)
    {
      ordinal += "st";
    }
    else if (currDate == 2 || currDate == 22){
      ordinal += "nd";
    }
    else if (currDate == 3 || currDate == 23)
    {
      ordinal += "rd";
    }
    else
    {
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
    var now = dayjs();
    //document.getElementById('currentDay').textContent = getDayName(now.day()) + ", " + getMonthName(now.month()) + " " + getOrdinal(now.date());
    document.getElementById('currentDay').textContent = now.format("dddd, MMMM") + " " + getOrdinal(now.date());
  }

  DisplayCurrentDateInHeader();
  LoadAgendaFromLocalStorage();
});
