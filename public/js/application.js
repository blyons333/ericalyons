var postIdRegex = /post(\d+)/;
var deletePostRegex = /delete_post(\d+)/;
var postContentIdRegex = /post_content(\d+)/;
var tagIdRegex = /tag(\d+)/;

function setPhotoSizes(wHeight, wWidth) {
   var postHeight = wHeight * .9;
   var postWidth = wWidth * .475;

   // Make sure images are loaded before setting widths and heights
   var loaded = 0;
   var images = $(document).find("img").filter(function(index, img) {
        return !img.complete;
      });

   // Find any?
   if (images.length === 0) {
      //Nope, we're done loading images, set heights
      //and widths
      $("img.post_image").each(function(){
         shrinkPhoto($(this), postHeight, postWidth, 1, 1);
      });
   }else {
       // We're waiting for some images, do that
       loaded = 0;
       images.load(function() {
           // One of them loaded; was it the last one?
           if (++loaded === images.length) {
               // Yup, we're done
               $("img.post_image").each(function(){
                  shrinkPhoto($(this), postHeight, postWidth, 1, 1);
               });
           }
       }); 
   }
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

function removeElement(elementId) {
   var element = $(elementId);
   element.remove();
}

function getTagId(idText){
   var tagId = "";
   var tagIdArray = tagIdRegex.exec(idText);
   if (tagIdArray != null && tagIdArray.length > 1) {
      tagId = tagIdArray[1];
   }
   return tagId;
}

function getPostId(idText){
   var postId = "";

   var postIdArray = postIdRegex.exec(idText);

   if (postIdArray != null && postIdArray.length > 1) {
      postId = postIdArray[1];
   }

   return postId;
}

