$('.toggle-form').on('click', function(){

    $(this).next().slideToggle();
});

$('#updateButton').on('click', function(){
    $('.updateDataForm').slideToggle();
});