$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  $('#new_post_form').hide();
  $('#new_post_button').on('click', function(){$('#new_post_form').show()});

  $('#create_new_post').on('click', function(event){
    var p = new Post($('#new_post_title').val(), $('#new_post_body').val(), null, null);
  	p.createNewPost();
    
  });
});

function Post(title, body, image, tags) {
  this.title = title;
  this.body = body;
  this.image = image;
  this.tags = tags;
}

Post.prototype.createNewPost = function() {

	event.preventDefault();

  $.ajax({
    url: "/admin/add-post",
    type: "POST",
    data: {'title': this.title, 'body': this.body},
    success: function(data){
      Post.addPostToPage(data);
      $('#new_post_title').val("");
      $('#new_post_body').val("");
      $('#new_post_form').hide();
    }
  });

	console.log(this.title);
	console.log(this.body);
}

Post.addPostToPage = function(data) {
  console.log("This is the data:")
  console.log(data);
}