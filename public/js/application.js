$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  $('#new_post_form').hide();
  $('#new_post_button').on('click', function(){$('#new_post_form').show()});

  $('#create_new_post').on('click', function(event){
  	console.log($("#new_post_title").val());
  	console.log($("#new_post_body").val());
  	event.preventDefault();
  });
});

// var sendNewPostToServer = function(event) {

// 	event.preventDefault();

// 	var title = $('#new_post_title').val();
// 	var body = $('#new_post_body').val();

// 	console.log($('#new_post_title'));
// 	console.log($('#new_post_body'));
// }