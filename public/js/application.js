function setPhotoSizes(wHeight, wWidth) {
   var postHeight = wHeight * .9;
   var postWidth = wWidth * .5;

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