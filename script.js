
$(document).ready(function()
                  {	
  console.log("running jquery");
  $('#aboutt').click(function()
  	{
  		
  		scroll('aboutt','about');
  	});
   $('#bar').on('click',function(){
        $('.list').toggle();
      });
  $('#ab').click(function()
  	{
  		scroll('ab','about');
  	});
  $('#resume').click(function()
  	{
  		scroll('resume','profile');
  	});
  $('#contact').click(function()
  	{
  		scroll('contact','ccontact');
  	});




  function scroll(from,to)
  {		var from_i=$('#'+from).position().top;
  		var to_i=$('#'+to).position().top;
  		var delta = (from_i-to_i)/100;
  		console.log(to_i);
  		var new_pos = from_i;
  		var number;
  		console.log(delta);
  		if(number!=null){clearInterval(number);}
		number = setInterval(function()
			{
				 
				 console.log(new_pos);
				 if(delta<0){	
				 if(new_pos>=to_i-2){clearInterval(number);}
				 else{
				 window.scrollTo(0,new_pos-delta);
				 new_pos=new_pos-delta;	
				 console.log("reached");}
				}
				else{
					if(new_pos<=to_i-2){clearInterval(number);}
				 else{
				 window.scrollTo(0,new_pos-delta);
				 new_pos=new_pos-delta;	
				 console.log("reached");}
				}
			},10);  		
  }
});



