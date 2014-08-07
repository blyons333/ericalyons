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

   var numTags = 0;

   newPostDialog = $("#new_post_form").dialog({
      autoOpen: false,
      height: wHeight * 0.8,
      width: wWidth * 0.8,
      modal: true,
      close: function(){
         $("button").remove(".tag_button");
         $("input").remove(".tag_input_button");
         numTags = 0;
      },
      buttons: {
         "Add Tag": function() { 
            numTags++;
            createAndAddTagInput(numTags, $('#added_tags'));
         },
         "Add Photo": function() { 
            console.log("add photo clicked!");
         },
         "Create Post": function(){
            var tagArray = new Array();
            $('button.tag_button').each(function(){
               tagArray.push($(this).text());
            });
            var p = new Post($('#new_post_title').val(), 
                             $('#new_post_body').val(), 
                             tagArray, 
                             null);
            p.createNewPost();
            newPostDialog.dialog("close");
         }
      }

   });

   $('#new_post_button').on('click', function(event){
      event.preventDefault();
      wWidth = $(window).width();
      wHeight = $(window).height();
      $("#new_post_form").data("tags", new Array());
      newPostDialog.dialog("open");
      var formHeight = $('#new_post_form').height();
       
   });

   $('.tag').button({
         icons: {
            primary: "ui-icon-close"
         }
   });

   $('span.ui-icon-close').on('click', function(){
      var parentButton = $(this).parent();
      var parentId = parentButton.attr('id');
      var postIdRegex = /post(\d+)/
      var tagIdRegex = /tag(\d+)/
      var postId = postIdRegex.exec(parentId);
      var tagId = tagIdRegex.exec(parentId);
      console.log("post id: " + postId[1]);
      console.log("tag id: " + tagId[1]);

   });

   $('.action_button').button();
}

function createAndAddTagInput(numTags, elemToAppend){
   var tagId = "new_tag" + numTags;
   var inputHtml = "<input id='" + tagId + "' class='tag_input_button'></input>"
   elemToAppend.append(inputHtml);
   $('#'+tagId).blur(function(){
      convertInputToButton(tagId);
   });
   $('#'+tagId).focus();
}

function convertInputToButton(tagId) {
   var tagElement = $('#'+tagId);
   var newTagText = tagElement.val();
   if (newTagText != "") {
      var buttonHtml = "<button type='button' id='" + tagId + "' class='tag_button'>" + newTagText + "</button>";
      tagElement.replaceWith(buttonHtml);
      $('#'+tagId).button({
         icons: {
            primary: "ui-icon-close"
         }
      });
      var uiCloseIcon = $('#'+tagId).children('span.ui-icon-close');
      console.log(uiCloseIcon);
      uiCloseIcon.on("click", function(event) {
         removeTagButton(tagId);
      });
      tagElement.unbind();
   }
}

function removeTagButton(tagId) {
   var tagElement = $('#'+tagId);
   tagElement.remove();
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

Post.removeTag = function(postId, tagId) {

}

Post.resetNewPostForm = function() {
   $('#new_post_title').val("");
   $('#new_post_body').val("");
   $('#new_post_form').hide();
}

Post.addPostToPage = function(data) {
   $('#post_display_container').prepend(data);
}