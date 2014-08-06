var wWidth = 0;
var wHeight = 0;

$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  
  wWidth = $(window).width();
  wHeight = $(window).height();

  addEventListeners();
  


});

function addEventListeners(){
  Post.resetNewPostForm();

  new_post_dialog = $("#new_post_form").dialog({
    autoOpen: false,
    height: wHeight * 0.8,
    width: wWidth * 0.8,
    modal: true,
    buttons: {
      "Add Tag": function() { console.log("add tag clicked!"); },
      "Add Photo": function() { console.log("add photo clicked!")},
      "Create Post": function(){
        var p = new Post($('#new_post_title').val(), 
                         $('#new_post_body').val(), 
                          null, 
                          null);
        p.createNewPost();
        new_post_dialog.dialog("close");
      }
    }

  });

    $('#new_post_button').on('click', 
                            function(event){
                              event.preventDefault();
                              new_post_dialog.dialog("open");
                            }
                          );

  // $('#new_post_button').on('click', 
  //                           function(event){
  //                             event.preventDefault();
  //                             if ($('#new_post_form').is(":visible")){
  //                               $('#new_post_form').hide();
  //                             }else{
  //                               $('#new_post_form').show();
  //                             }
  //                           }
  //                         );

  // $('#create_new_post').on('click', 
  //                           function(event){
  //                             event.preventDefault();
  //                             var p = new Post($('#new_post_title').val(), 
  //                                              $('#new_post_body').val(), 
  //                                              null, 
  //                                              null);
  //                             p.createNewPost();
  //                           }
  //                         );
  // $('#add_tag').on('click',
  //                   function(event) {
  //                     event.preventDefault();
  //                     console.log("add tag clicked!");
  //                   }
  //                 );
  // $('#add_photo').on('click',
  //                     function(event) {
  //                       event.preventDefault();
  //                       console.log("add photo clicked!");
  //                     }
  //                   );
}

function Post(title, body, image, tags) {
  this.title = title;
  this.body = body;
  this.image = image;
  this.tags = tags;
}

Post.prototype.createNewPost = function() {
  $.ajax({
    url: "/admin/add-post",
    type: "POST",
    data: {'title': this.title, 'post_text': this.body},
    success: function(data){
      Post.addPostToPage(data);
      Post.resetNewPostForm();
    }
  });
}

Post.resetNewPostForm = function() {
  $('#new_post_title').val("");
  $('#new_post_body').val("");
  $('#new_post_form').hide();
}

Post.addPostToPage = function(data) {
  $('#post_display_container').prepend(data);
}