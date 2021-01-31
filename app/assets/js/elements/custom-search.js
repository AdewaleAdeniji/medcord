// Search 1

$('#input-search').on('keyup', function() {
  var rex = new RegExp($(this).val(), 'i');
    $('.searchable-container .items').hide();
    var r = $('.searchable-container .items').filter(function() {
        return rex.test($(this).text());
    }).show();
    if(r.length==0){
        var res = value('input-search');
        
    }
});


// Search 2
document.getElementsByClassName('full-search')[0].addEventListener('click', function() {
    this.classList.add("input-focused");
    document.getElementsByClassName('demo-search-overlay')[0].classList.add("show");
})
document.getElementsByClassName('demo-search-overlay')[0].addEventListener('click', function() {
    this.classList.remove("show");
    document.getElementsByClassName('full-search')[0].classList.remove("input-focused");
})