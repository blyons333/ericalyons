var wWidth = 0;
var wHeight = 0;
var postIdRegex = /post(\d+)/;
var deletePostRegex = /delete_post(\d+)/;
var postContentIdRegex = /post_content(\d+)/;
var tagIdRegex = /tag(\d+)/;
var headerHeight = 0;

$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

  setInstanceVariables();
  addEventListeners();
  setPhotoSizes();
});

function setInstanceVariables(){
   wWidth = $(window).width();
   wHeight = $(window).height();
   var availableTagsYVal = $('#available_tags').position().top;
   var newPostFormHeight = $('#new_post_form').height();
   headerHeight = availableTagsYVal - newPostFormHeight;
   // console.log("y val: " + available_tags_y_val);
   // console.log("half height: " + available_tags_half_height);
   // console.log("header height: " + headerHeight);
}

function addEventListeners(){
   addNewPostDialogListeners();
   addTagButtonIconsAndListeners();
   addEventButtonIconsAndListeners();
   addScrollListeners();
   addEditAndDeleteListeners();
}

function addNewPostDialogListeners() {
   var numTags = 0;
   var numPhotos = 0;
   
   Post.resetNewPostForm();

   newPostDialog = $("#new_post_form").dialog({
      autoOpen: false,
      height: wHeight * 0.8,
      width: wWidth * 0.8,
      modal: true,
      beforeClose: function(event, ui) {
         $("body").css({ overflow: 'inherit' })
      },
      close: function(){
         Post.resetNewPostForm()
         numTags = 0;
         numPhotos = 0;
      },
      buttons: {
         "Add Tag": function() { 
            numTags++;
            createAndAddTagInput(numTags, $('#added_tags'));
         },
         "Add Photo": function() { 
            numPhotos++;
            createAndAddPhotoInput(numPhotos, $('#added_photos'));
         },
         "Create Post": function(){
            var tagArray = new Array();
            var photoArray = new Array();
            $('button.tag_button').each(function(){
               tagArray.push($(this).text());
            });

            $('div.new_photo_div').each(function(){
               var imgElement = $(this).children('img.new_photo');
               var captionElement = $(this).children('textarea.photo_caption_input');
               var imgURL = imgElement.attr("src");
               var captionText = captionElement.val();
               var newDict = {
                  'URL' : imgURL,
                  'caption' : captionText 
               };
               photoArray.push(newDict);
            });

            var p = new Post($('#new_post_title').val(), 
                             $('#new_post_body').val(), 
                             tagArray, 
                             photoArray);
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
      $("body").css({ overflow: 'hidden' });
      newPostDialog.dialog("open");
      var formHeight = $('#new_post_form').height();
       
   });
}

function addTagButtonIconsAndListeners() {
   $('.tag').button({
         icons: {
            primary: "ui-icon-close"
         }
   });

   $('span.ui-icon-close').on('click', function(){
      var parentButton = $(this).parent();
      var parentId = parentButton.attr('id');
      
      var postId = postIdRegex.exec(parentId);
      var tagId = tagIdRegex.exec(parentId);
      if (postId == null && tagId.length > 1) {
         Tag.removeTag(tagId[1]);
      }else if (postId.length > 1 && tagId.length > 1){
         Post.removeTag(postId[1], tagId[1]);
      }
      
   });

   $('.available_tag').draggable({
      revert: true,
      helper: "clone",
      cancel: false
   });

   $('.post').droppable({
      accept: ".available_tag",
      // activeClass: "ui-state-hover",
      hoverClass: "post_hover_active",
      drop: function(event, ui) {
         droppedTagId = ui.draggable.attr('id');
         tagId = tagIdRegex.exec(droppedTagId);
         postId = postIdRegex.exec(($(this)[0]).id);
         Post.addTag(postId[1], tagId[1]);
      }
   });
}

function addEventButtonIconsAndListeners() {
   //Create the "action buttons" (menu buttons) into
   //jquery buttons for the style
   $('.action_button').button();
}

function addScrollListeners(){   
   //Make the available tags "stick" to the top of the page
   //as you scroll
   $(window).scroll(updateAvailableTagsPos);
}

function addEditAndDeleteListeners(){
   // $('.post_edit_icons').css('visibility', 'hidden');
   
   $('.delete_post_icon').on('click', function() {
      var elemId = $(this).attr("id");
      postId = deletePostRegex.exec(elemId)[1];
      Post.deletePost(postId);

   });



   // $('.post').mouseover(function() {
   //    var elemId = $(this).attr("id");
   //    var postId = postIdRegex.exec(elemId)[1];
   //    var iconsDivId = "editPost" + postId;
   //    $('#'+iconsDivId).css('visibility', 'visible');
   // });

   // $('.post').mouseout(function() {
   //    var elemId = $(this).attr("id");
   //    var postId = postIdRegex.exec(elemId)[1];
   //    var iconsDivId = "editPost" + postId;
   //    $('#'+iconsDivId).css('visibility', 'hidden');
   // });

   // $('.post_edit_icons').mouseover(function(){
   //    $(this).css('visibility', 'visible');
   // });

   // $('.post_edit_icons').mouseout(function(){
   //    $(this).css('visibility', 'hidden');
   // });
}

function updateAvailableTagsPos() {
   
   if ($(window).scrollTop() < headerHeight){
      $('#available_tags').css("position", "static");
      $('#available_tags').css("top", "auto");
   }else{
      $('#available_tags').css("position", "fixed");
      $('#available_tags').css("top", "0"); 
   }
}

function setPhotoSizes() {
   var postHeight = wHeight;
   var postWidth = wWidth * .5;

   $("img.post_image").each(function(){
      shrinkPhoto($(this), postHeight, postWidth, 1, 1);
   });
}

function createAndAddPhotoInput(numPhotos, elemToAppend) {
   //New photo div
   var photoDivId = "new_photo_div" + numPhotos;
   var photoDiv = "<div id='" + photoDivId + "' class='new_photo_div'>Photo " + numPhotos + ": <br/></div>";
   
   //URL Input
   var photoUrlId = "new_photo_url" + numPhotos;   
   var urlInput = "<input id='" + photoUrlId + "' class='photo_url_input'></input>";
   var urlInputLabel = "<label for='" + photoUrlId + "' class='new_photo_url_label'>URL </label>";
   
   //Caption input
   // var photoCaptionId = "new_photo_caption" + numPhotos;
   // var captionInput = "<input id='" + photoCaptionId + "' class='photo_caption_input'></input>";
   // var captionInputLabel = "<label for='" + photoCaptionId + "' class='new_photo_label'> Caption </label>";
   
   //Append all the elements
   elemToAppend.append(photoDiv);
   var photoDivElem = $('#' + photoDivId);
   photoDivElem.append(urlInputLabel);
   photoDivElem.append(urlInput);
   // photoDivElem.append(captionInputLabel);
   // photoDivElem.append(captionInput);

   //Add event listeners for onblur and enter actions
   $('#'+photoUrlId).blur(function() {
      convertInputToImage(photoUrlId, photoDivId, numPhotos);
   });

   $('#'+photoUrlId).keypress(function(event) {
      if (event.which == 13) {
        convertInputToImage(photoUrlId, photoDivId, numPhotos);
      }
   });

   //Set the focus to the URL input box
   $('#'+photoUrlId).focus();
}

function shrinkPhoto(elemToShrink, maxHeight, maxWidth, heightReduce, widthReduce) {
   var imageHeight = elemToShrink.height();
   var imageWidth = elemToShrink.width();
         
   if (imageHeight >= maxHeight || imageWidth >= maxWidth) {
      percentHeightToReduce = (maxHeight/heightReduce)/imageHeight;
      percentWidthToReduce = (maxWidth/widthReduce)/imageWidth;

      var percentToReduce = 1;

      if (percentHeightToReduce < 1 && percentHeightToReduce <= percentWidthToReduce) {
         percentToReduce = percentHeightToReduce;
      }else if (percentWidthToReduce < 1 && percentWidthToReduce < percentHeightToReduce) {
         percentToReduce = percentWidthToReduce
      }

      elemToShrink.height(imageHeight * percentToReduce);
      elemToShrink.width(imageWidth * percentToReduce);
   }
}

function convertInputToImage(inputId, photoDivId, numPhotos) {
   var dialogHeight = wHeight * .8;
   var dialogWidth = wWidth * .8;
   //Get the image url
   var imageInputElement = $('#'+inputId);
   var imageURL = imageInputElement.val();
   if (imageURL != "") {
      //Replace the input box with an image, remove the label
      var imageHtml = "<img id='"+inputId+"' src='" + imageURL + "' class='new_photo' alt='Problem with image URL'>";
      imageInputElement.replaceWith(imageHtml);
      $('label[for='+inputId+']').remove();
      
      var imageElement = $('#'+inputId);
      imageElement.load(function(){

         //Resize the image to an appropriate size,
         //if necessary
         shrinkPhoto($(this), dialogHeight - 100, dialogWidth - 100, 4, 2);

         //Add caption input
         var photoCaptionId = "new_photo_caption" + numPhotos;
         var captionInput = "<textarea id='" + photoCaptionId + "' class='photo_caption_input'></textarea>";
         var captionInputLabel = "<label for='" + photoCaptionId + "' class='new_photo_caption_label'> Caption </label>";
         var photoDivElem = $('#' + photoDivId);
         photoDivElem.append(captionInput);
         var captionWidth = dialogWidth - $(this).width() - 55;
         var captionHeight = $(this).height() - 5;
         var captionElem = $('#' + photoCaptionId);
         captionElem.height(captionHeight);
         captionElem.width(captionWidth);
         captionElem.attr("placeholder", "Caption (optional)");
         captionElem.focus();

         //Scroll to the bottom of the form
         var myDiv = $('#new_post_form');
         myDiv.animate({ scrollTop: myDiv.prop("scrollHeight") - myDiv.height() }, 400);
   });

      
      imageInputElement.unbind();
   }
}

function createAndAddTagInput(numTags, elemToAppend){
   var tagId = "new_tag" + numTags;
   var inputHtml = "<input id='" + tagId + "' class='tag_input_button'></input>"
   elemToAppend.append(inputHtml);
   var tagInput = $('#'+tagId);
   var availableTagsArr = new Array();
   $('.available_tag').each(function(){
      availableTagsArr.push($(this).text());
   })

   tagInput.autocomplete({
      source: availableTagsArr
    });

   tagInput.blur(function(){
      convertInputToButton(tagId);
   });
   tagInput.keypress(function(event){
         if (event.which == 13){
            convertInputToButton(tagId);
         }
      })
   tagInput.focus();
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
      uiCloseIcon.on("click", function(event) {
         removeElement('#'+tagId);
      });
      tagElement.unbind();
   }
}

function createTagButton(buttonId, tagText){
   //Create the tag as a button
   return "<button type='button' id='" + buttonId + "' class='tag'>" + tagText + "</button>"
}


function removeElement(elementId) {
   var element = $(elementId);
   element.remove();
}

function refreshAvailableTags() {
   $.ajax({
      url: "/admin/get-available-tags",
      type: "POST",
      data: {},
      success: function(data){
         available_tags_div = $('#available_tags_cntnr');
         available_tags_div.replaceWith(data);
         addTagButtonIconsAndListeners();
      }
   });
}

function Post(title, body, tags, images) {
   this.title = title;
   this.body = body;
   this.tags = tags;
   this.images = images;
}

Post.prototype.createNewPost = function() {
   $.ajax({
       url: "/admin/add-post",
      type: "POST",
      data: {'title': this.title, 
             'post_text': this.body, 
             'tags': this.tags, 
             'images': this.images},
      success: function(data){
         Post.addPostToPage(data);
         Post.resetNewPostForm();
      }
   });
}

Post.removeTag = function(postId, tagId) {
   $.ajax({
       url: "/admin/remove-tag-from-post",
      type: "POST",
      data: {'post_id': postId, 'tag_id': tagId},
      success: function(data){
         tagButtonId = "post"+postId+"tag"+tagId;
         removeElement('#'+tagButtonId);
      }
   });
}

Post.addTag = function(postId, tagId) {
   $.ajax({
       url: "/admin/add-tag-to-post",
      type: "POST",
      data: {'post_id': postId, 'tag_id': tagId},
      success: function(data){
         if (data != ""){
            tagButtonId = "post"+postId+"tag"+tagId;
            tagButton = createTagButton(tagButtonId, data);
            Post.addTagButton(postId, tagButtonId, tagButton);
         }
      }
   });
}

Post.addTagButton = function(postId, tagButtonId, tagButton) {
   post_tag_div = $('#post_tag_container'+postId);
   post_tag_div.append(tagButton);

   addTagButtonIconsAndListeners();
}

Post.resetNewPostForm = function() {
   $('#new_post_title').val("");
   $('#new_post_body').val("");
   //Remove new tag inputs
   $("button").remove(".tag_button");
   $("input").remove(".tag_input_button");
   //Remove new photo inputs
   $("div").remove(".new_photo_div");
}

Post.addPostToPage = function(data) {
   $('#post_display_container').prepend(data);
   refreshAvailableTags();
   addTagButtonIconsAndListeners();
   setPhotoSizes();
}

Post.deletePost = function(postId) {
   $.ajax({
      url: "/admin/delete-post",
      type: "POST",
      data: {'post_id': postId},
      success: function(data){
         var elemToRemove = "#post_container"+postId;
         removeElement(elemToRemove);
         refreshAvailableTags();
      }
   });
}

function Tag(){

}

Tag.removeTag = function(tagId) {
   $.ajax({
       url: "/admin/remove-tag",
      type: "POST",
      data: {'tag_id': tagId},
      success: function(data){
         tagButtonId = "tag"+tagId;
         removeElement('*[id*='+tagButtonId+']');
      }
   });
}