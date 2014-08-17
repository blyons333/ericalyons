var wWidth = 0;
var wHeight = 0;

$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

  setInstanceVariables();
  addTagButtonIconsAndListeners();
  setPhotoSizes(wHeight, wWidth);
});

function setInstanceVariables(){
   wWidth = $(window).width();
   wHeight = $(window).height();
}

function addTagButtonIconsAndListeners() {
   $('.tag').button({
   });

   $('.tag').click(function(event) {
   		addTagToFilters(tagId);
   		filterPostsByTag(tagId);
   });
}

function filterPostsByTag(tagId) {

}

function addTagToFilters(tagId) {
	
}

