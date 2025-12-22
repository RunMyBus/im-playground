  $(document).ready(function() {
    var count = -1;
function AddRedClass(){
var boxes = $('.confetti-button');
var boxLength = boxes.length - 1;
count < boxLength ? count++ : count=0;
boxes.removeClass('animate').eq(count).addClass('animate');
}
setInterval(AddRedClass, 2000);
});
