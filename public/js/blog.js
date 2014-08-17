var wWidth = 0;
var wHeight = 0;
var tagFilters = new Array();

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
   		var tagId = getTagId($(this).attr("id"));
   		addTagToFilters(tagId);
   });

   $('.filter_tag').button({
         icons: {
            primary: "ui-icon-close"
         }
   });

   $('span.ui-icon-close').on('click', function(){
      var parentButton = $(this).parent();
      var parentId = parentButton.attr('id');
      
      var tagId = getTagId(parentId);

      removeTagFromFilters(tagId);
      
   });
}

function filterPostsByTag() {
		//Send request to server to get filtered posts
		$.ajax({
      		url: "/filter-posts-by-tags",
      		type: "POST",
      		data: {'tags': tagFilters},
      		success: function(data){
         		var elemToReplace = $("#blogSection");
         		elemToReplace.html(data);
         		setPhotoSizes(wHeight, wWidth);
         		addTagButtonIconsAndListeners();
         		$('#blogSection').css("min-height", wHeight + "px");
         		$('html, body').animate({
	        		scrollTop: $("#blogSection").offset().top - 55
	    		}, 600);
      		}
   		});
}

function addTagToFilters(tagId) {
	var existsAlready = (tagFilters.indexOf(tagId) != -1);

	if(!existsAlready) {
		tagFilters.push(tagId);
		console.log("Adding " + tagId + " to filters");
		filterPostsByTag();
	}

	return existsAlready
}

function removeTagFromFilters(tagId){
	var tagIndex = tagFilters.indexOf(tagId);
      if (tagIndex > -1){
      	tagFilters.splice(tagIndex, 1);
      	filterPostsByTag();
      }
}

