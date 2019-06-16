var wishes = [ "wake early", "sleep early", "eat healthy" ]

function addToList(item) {
    $('#items').append("<li>" + item + "<span class='label actionlist'><select id='actions'><option value='pending'>Pending</option><option value='success'>Done</option><option value='delete'>Delete</option></select></span> <span class='label pending'>Pending</span></li>");
}

function updateTotal() {
    completed = $('.success').length;
    pending = $('.pending').length;
    deleted = $('.removed').length;

    if (completed > 0 || pending > 0 || deleted > 0) {
        $('.total').text(" Pending: " + pending + " Completed: " + completed + " Deleted: " + deleted);
    }
}

$(document).ready(function(){
    wishes.forEach(function(element) {
        addToList(element);
    });
    updateTotal();

    $(document).on('click','#add-to-list',function(){
        item = $("#item").val();

        $("#item").val(""); /* clear value */
        $("#item").focus();

        addToList(item);
        updateTotal();
    });


    $(function() {
        $(document).on('click', '#actions', function(event) {
            var action = this.options[this.selectedIndex].value;
            if( action == "delete" ) {
                $(this).parent().siblings('.removed').remove();
                $(this).parent().parent().append("<span class='label removed'>Removed</span>");
                $(this).parent().parent().attr("class", 'removed');
                $(this).parent().siblings('.pending').remove();
                $(this).parent().siblings('.success').remove();
                $(this).parent().siblings('.completed').remove();
                $(this).parent().parent().remove();
                updateTotal();
            }
            if( action == "success") {
                $(this).parent().siblings('.success').remove();
                $(this).parent().parent().append("<span class='label success'>Done!</span>");
                $(this).parent().parent().attr("class", 'completed');
                $(this).parent().siblings('.pending').remove();
                $(this).parent().siblings('.removed').remove();
                updateTotal();
            }
            if( action == "pending") {
                $(this).parent().siblings('.pending').remove();
                $(this).parent().parent().append("<span class='label pending'>Pending</span>");
                $(this).parent().siblings('.success').remove();
                $(this).parent().siblings('.removed').remove();
                $(this).parent().siblings('.completed').remove();
                updateTotal();
            }

        });
    });

});