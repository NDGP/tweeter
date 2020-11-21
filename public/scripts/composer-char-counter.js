$(document).ready(function() {
 $(".text-box").on("keyup", function() {
  let count = ($(this).val().length ) 
  const $tweetForm = $(this).closest("form").html()
  const $counter= $(this).next().children(".counter")
  
  $counter.html(140 - count)
  if ($counter.html() < 0){
    $counter.css("color", "red")
  }else{
    $counter.css("color", "#545149")
  }

 })
});

