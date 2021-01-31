function pref(){
	 if(window.location.origin=='http://localhost'){
          var prefy ='http://localhost/backend/medcord/'

      }
      else {
         //var prefix ='../backend/budgetapp/'
        var prefy = "https://medcord.000webhostapp.com/";
    }
    return prefy;
}
$(".logoutbtn").click(function(){
	load();
	localStorage.removeItem('usertoken');
  localStorage.removeItem('doctoken');
	window.location.href="login";

})
function pull(requrl,body){
   if(window.location.origin=='http://localhost'){
          var prefix ='http://localhost/backend/medcord/'

      }
      else {
         //var prefix ='../backend/budgetapp/'
        var prefix = "https://medcord.000webhostapp.com/";
    }
   // console.log(prefix+requrl);
  return  fetch(prefix+requrl,body)
  		


}
function toast(e){
	Swal.fire({
                timer:2000,
                text:e,
                icon:'success',
                showConfirmButton:false,
            })
}
function get(e){
	return document.getElementById(e);
}
function value(e){
	return get(e).value;
}
function setitem(name,value){
	return localStorage.setItem(name,value);
}
function getitem(name){
	if(localStorage.getItem(name)==undefined||localStorage.getItem(name)==null||localStorage.getItem(name)==""){
		return false;
	}
	else {
		return localStorage.getItem(name);
	}
}