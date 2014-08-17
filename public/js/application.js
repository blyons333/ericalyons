var postIdRegex = /post(\d+)/;
var deletePostRegex = /delete_post(\d+)/;
var postContentIdRegex = /post_content(\d+)/;
var tagIdRegex = /tag(\d+)/;

function setPhotoSizes(wHeight, wWidth) {
   var postHeight = wHeight * .9;
   var postWidth = wWidth * .475;

   $("img.post_image").each(function(){
      shrinkPhoto($(this), postHeight, postWidth, 1, 1);
   });
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
   if (tagIdArray.length > 1) {
      tagId = tagIdArray[1];
   }
   return tagId;
}