//check off specific todos when clicked

// $('ul').on("click","li",function(){
// 	$(this).toggleClass("completed");
// });

//click on x to delete todo

$('ul').on("click","span",function(e){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	e.stopPropagation();//stop event from bubbling up
})

$('input[type="text"]').keypress(function(e){
	//corresponds to character code of the key
	if(e.which === 13){
		//grabbing new todo text from input if enter key is pressed
		var todoText = $(this).val();
		//create new li and add to ul
		$('ul').append("<li><span><i class='fas fa-trash-alt'></i></span> "+ todoText+ "</li>");
		$(this).val("");


	}
});
$('.fa-plus-square').click(function(){
	$('input[type="text"]').fadeToggle();
})