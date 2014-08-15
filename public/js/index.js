var wWidth = 0;
var wHeight = 0;

$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

  wWidth = $(window).width();
  wHeight = $(window).height();
  var aboutSectionHeight = $('#aboutSection').height();
  var aboutSectionPadding = (wHeight - aboutSectionHeight)/2;
  $('#aboutSection').css("padding-top", aboutSectionPadding + wHeight + 20);
  $('#aboutSection').css("padding-bottom", aboutSectionPadding + 20);
  var contactContainerHeight = $('.vertCenter').height();
  var contactContainerPadding = (wHeight - contactContainerHeight)/2;
  $('.vertCenter').css("padding-top", contactContainerPadding);
  $('.vertCenter').css("padding-bottom", contactContainerPadding);
  $('.vertCenter').css("background-color", "#EDEDED");
});
