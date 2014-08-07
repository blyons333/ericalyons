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

   var num_tags = 0;

   new_post_dialog = $("#new_post_form").dialog({
      autoOpen: false,
      height: wHeight * 0.8,
      width: wWidth * 0.8,
      modal: true,
      close: function(){
         $("button").remove(".tag_button");
         $("input").remove(".tag_input_button");
         num_tags = 0;
      },
      buttons: {
         "Add Tag": function() { 
            num_tags++;
            create_and_add_tag_input(num_tags);
            // add_tag_dialog.dialog("open"); 
            // console.log($("#new_post_form").data("tags"));
         },
         "Add Photo": function() { 
            console.log("add photo clicked!");
         },
         "Create Post": function(){
            var tag_array = new Array();
            $('button.tag_button').each(function(){
               tag_array.push($(this).text());
            });
            var p = new Post($('#new_post_title').val(), 
                             $('#new_post_body').val(), 
                             tag_array, 
                             null);
            p.createNewPost();
            new_post_dialog.dialog("close");
         }
      }

   });

   $('#new_post_button').on('click', function(event){
      event.preventDefault();
      wWidth = $(window).width();
      wHeight = $(window).height();
      $("#new_post_form").data("tags", new Array());
      new_post_dialog.dialog("open");
      var form_height = $('#new_post_form').height();
       
   });

   $('.tag').button({
         icons: {
            primary: "ui-icon-close"
         }
   });
}

function create_and_add_tag_input(num_tags){
   var tag_id = "new_tag" + num_tags;
   var input_html = "<input id='" + tag_id + "' class='tag_input_button'></input>"
   $('#added_tags').append(input_html);
   $('#'+tag_id).blur(function(){
      console.log(tag_id + " blurred");
      convert_input_to_button(tag_id);
   });
   $('#'+tag_id).focus();
}

function convert_input_to_button(tag_id) {
   var tag_element = $('#'+tag_id);
   var new_tag_text = tag_element.val();
   if (new_tag_text != "") {
      var button_html = "<button type='button' id='" + tag_id + "' class='tag_button'>" + new_tag_text + "</button>";
      tag_element.replaceWith(button_html);
      $('#'+tag_id).button({
         icons: {
            primary: "ui-icon-close"
         }
      });
      var ui_close_icon = $('#'+tag_id).children('span.ui-icon-close');
      console.log(ui_close_icon);
      ui_close_icon.on("click", function(event) {
         remove_tag_button(tag_id);
      });
      tag_element.unbind();
   }
}

function remove_tag_button(tag_id) {
   var tag_element = $('#'+tag_id);
   tag_element.remove();
}

function Post(title, body, tags, image) {
   this.title = title;
   this.body = body;
   this.tags = tags;
   this.image = image;
}

Post.prototype.createNewPost = function() {
   $.ajax({
       url: "/admin/add-post",
      type: "POST",
      data: {'title': this.title, 'post_text': this.body, 'tags': this.tags},
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