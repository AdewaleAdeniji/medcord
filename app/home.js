startup();
function startup(){
	var token = getitem('usertoken');
	if(token){
		//fetch profile
		
		load();
		profile(token);
		
	}
	else {
		if(getitem('doctoken')){
			window.location.href="doctors/"
		}
		else {
		window.location.href="login";
	}
	}
}
function login(){
	localStorage.removeItem('usertoken');
	window.location.href="login";
}

function fetchnote(token){
	load();
	var data = JSON.stringify({"token":token});
	pull('notifications',{
		method:'POST',
		body:data,
	})
	.then(response=>response.json())
	.then((data)=>{
		closeload();
		if(data.code==200){
			var notes = data.text;
			notes.forEach((note)=>{
				var htmls = `<div class="item-timeline timeline-new">
                                            <div class="t-dot">
                                                <div class="t-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                            </div>
                                            <div class="t-content">
                                                <div class="t-uppercontent">
                                                   <h5></h5>
                                                    <span class="">${note.timest}</span>
                                                </div>
                                                <p>${note.notification}</p>
                                                <div class="tags">
                                                    <div class="badge badge-primary">MedCord</div>
                                                    
                                                </div>
                                            </div>
                                        </div>`;
                                        $(".notes").append(htmls);
			})
		}
		else if(data.code==204){
			login();
		}
		else {
			toast(data.text);
		}
	})
	.catch((err)=>{
		console.log(err);
	})
}
function profile(token){
	//console.log(token);
	fetchnote(token);
	var data = JSON.stringify({"token":token});
	pull('profile',{
		method:'POST',
		body:data,
	})
	.then(response=>response.json())
	.then((data)=>{
		closeload();
		//console.log(data);
		if(data.code==200){
			var user = data.text;
			//sample 
			//{"code":200,"text":{"patientfirstname":"Adeniji","patientemail":"devferanmo@gmail.com","patientnumber":"08063330833","patientaddress":"","patientbloodgroup":"","patientgenotype":"","patientdesc":"","patientpicture":"","patientnextofkin":"","patientnextcontact":"","patientlastname":"Oluwaferanmi","employment":""},"date":"11:49-26\/10\/2020"}

			if(user.patientaddress==""){
				//step one
				window.location.href="details";
			}
			else if(user.patientgenotype==""){
				window.location.href="medicals";

			}
			else {
				var name = user.patientfirstname+"  "+user.patientlastname;
				get('username').innerHTML=name;
				medcordemo();
				var p = pref();
				get('userpicture').src=p+"images/"+user.patientpicture;
				var work = user.employment;
				if(work==""){
					var work = 'Unemployed';
				}
				get('workplace').innerHTML=work;
				get('address').innerHTML=user.patientaddress;
				get('emailaddress').innerHTML=user.patientemail;
				get('phonenum').innerHTML=user.patientnumber;
				get('desc').innerHTML=user.patientdesc;
				get('genotype').innerHTML=user.patientgenotype;
				get('bloodgroup').innerHTML=user.patientbloodgroup;

			}
		}
		else if(data.code==204){
			login();
		}
		else {
			profile(token);
		}
	})
	.catch((err)=>{
		console.log(err);
		 if(window.location.origin!='http://localhost'){
          //profile(token);

      }
	})
}
function medcordemo(){
            if(!getitem('demo')){
                Swal.fire({
                    icon:'success',
                    title:"Welcome to MedCord",
                    text:"Now that you've completed your signup,We'd like to take you through a quick demo of how MedCord works",
                    confirmButtonText:"Take me through",
                    cancelButtonText:"Skip",
                    allowOutsideClick:true,
                    showCancelButton:true,
                    background:'#060818'
                })
                .then((response)=>{
                	if(response.value){
                		Swal.fire({
                			text:'You can update your profile by clicking on the pen icon at the top of each section',
                			confirmButtonText:'Continue',
                		})
                		.then((result)=>{
                			if(result){
                				Swal.fire({
                					text:'You can view your medical records uploaded by a medical professional by visiting the medical record section in the left menu',
                					confirmButtonText:"Continue"
                				})
                				.then((cont)=>{
                					if(cont){
                						Swal.fire({
                							text:"Activities on your MedCord profile are logged into your notifications panel so you know how your information is shared and managed",
                							confirmButtonText:"Done.",
                							footer:"We hope you enjoyed this little introduction,Enjoy your moments on MedCord and we wish you a hitch free journey here",
                						})
                						.then((res)=>{
                							localStorage.setItem('demo','demo');
                						})
                					}
                				})
                			}
                		})
                	}
                })
            }
        }
function load(){

	$("body").append('<div class="load"><div class="lds-heart"><div></div></div></div>');
}
function closeload(){
	$(".load").remove();
}