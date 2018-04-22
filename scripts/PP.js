	function generateTable(vPeriodValue) {
		//alert(vPeriodN);
		//alert(vPeriodValue);
		//var vPeriod = document.getElementById("vPeriod");
		//var vPeriodValue = vPeriod.options[vPeriod.selectedIndex].value;
		
		if(vPeriodValue == 0 || null){
			var domString = '<table class="table table-bordered table-hover" id="tablePP">';
			domString = domString + '<thead class="thead-dark"><tr><th scope="col"># Period</th><th scope="col">Infows</th><th scope="col">Outflows</th><th scope="col">Cummulative Cashflow</th></tr></thead>';
			
			domString = domString + '<tbody>';
		}else{
			//document.getElementById("divPP").innerHTML = "Paragraph changed!"+vPeriodValue;
			//http://garystorey.com/2017/02/27/three-ways-to-create-dom-elements-without-jquery/
			var eTable = document.createElement('tablePP');
			var domString = '<table class="table table-bordered table-hover" id="tablePP">';
			domString = domString + '<thead class="thead-dark"><tr><th scope="col"># Period</th><th scope="col">Infows</th><th scope="col">Outflows</th><th scope="col">Cummulative Cashflow</th></tr></thead>';
			
			domString = domString + '<tbody>';
			
			for(i=1; i <= vPeriodValue; i++)
			{
				domString = domString + '<tr><th scope="row">'+ i +'</th>';
					domString = domString + '<td><input type="number" class="form-control" id="inflowPP'+i+'"  name="inflowPP'+i+'"  onfocus="this.select()" value="0"></td>';
					domString = domString + '<td><input type="number" class="form-control" id="outflowPP'+i+'" name="outflowPP'+i+'" onfocus="this.select()" value="0"></td>';
					domString = domString + '<td><input type="text"   class="form-control" id="cummuCfPP'+i+'" name="cummCfPP'+i+'"placeholder="Disabled input here..." disabled></td>';
				domString = domString + '</tr>';
			}
		}
		
		domString = domString + '</tbody></table>';
		
		document.getElementById("divPP").innerHTML = domString;
	}
	
	function validateData() {
		var vPeriod 	= document.getElementById("vPeriod").value;
		var vPrincipal 	= document.getElementById("vPrincipal").value;
		var vTasa 		= document.getElementById("vTasa").value;
		//var vPeriodValue = vPeriod.options[vPeriod.selectedIndex].value;
		alert("vPeriod " + vPeriod);
		alert("vPrincipal " + vPrincipal);
		alert("vTasa " + vTasa);
		var domString = '<label for="colFormLabelLg" class="col-sm-10 col-form-label col-form-label-lg">';
		
		if(isNaN(vPeriod) || vPeriod=="" || vPeriod==null || vPeriod==0){
			domString = domString + "ERROR: El número de PERIODOS no está definido...<br>";
		}

		if(isNaN(vPrincipal) || vPrincipal=="" || vPrincipal==null){
			domString = domString + "ERROR: El valor PRINCIPAL no está definido...<br>";
		}
		else if(vPrincipal<=0){
			domString = domString + "ERROR: No hay inversión si el valor PRINCIPAL es 0 o negativo...<br>";
		}
		if(isNaN(vTasa) || vTasa=="" || vTasa==null){
			domString = domString + "ERROR: La TASA DE INTERÉS no está definida...<br>";
		}
		else if(vTasa < 0 || vTasa > 100){
			domString = domString + "ERROR: La TASA DE INTERÉS no debe ser menor a 0 o mayor a 100...<br>";
		}
		
		domString = domString + '</label>';
		document.getElementById("errorPP").innerHTML = domString;
		
		if(!isNaN(vPeriod) && vPeriod!="" && vPeriod!=null && !isNaN(vPrincipal) && vPrincipal!="" && vPrincipal!=null && !isNaN(vTasa) && vTasa!="" && vTasa!=null){
			// Call php: PHP and AJAX Example: https://www.tutorialspoint.com/php/php_and_ajax.htm
			var ajaxRequest;  // The variable that makes Ajax possible!
			   
			try {
			  // Opera 8.0+, Firefox, Safari
			  ajaxRequest = new XMLHttpRequest();
			}catch (e) {
			  // Internet Explorer Browsers
			  try {
				 ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
			  }catch (e) {
				 try{
					ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
				 }catch (e){
					// Something went wrong
					alert("Your browser broke!");
					return false;
				 }
			  }
			}
			// Create a function that will receive data 
			// sent from the server and will update
			// div section in the same page.
				
			ajaxRequest.onreadystatechange = function(){
			  if(ajaxRequest.readyState == 4){
				 var ajaxDisplay = document.getElementById('divPP');
				 ajaxDisplay.innerHTML = ajaxRequest.responseText;
			  }
			}

			// Now get the value from user and pass it to
			// server script.
				
			var age = document.getElementById('age').value;
			var wpm = document.getElementById('wpm').value;
			var sex = document.getElementById('sex').value;
			var queryString = "?age=" + age ;

			queryString +=  "&wpm=" + wpm + "&sex=" + sex;
			ajaxRequest.open("GET", "ajax-example.php" + queryString, true);
			ajaxRequest.send(null); 
			   
			document.getElementById("errorPP").innerHTML = "DAsd";
			
		}
	}
	
	
	
	
	
	
	
	
	
	
	function generate_TableNPV() {
		var vPeriod = document.getElementById("vPeriod2");
		var vPeriodValue = vPeriod2.options[vPeriod2.selectedIndex].value;
		
		//document.getElementById("divPP").innerHTML = "Paragraph changed!"vPeriodValue;
		
		var eTable = document.createElement('tableNPV');
		var domString = '<table class="table table-hover table-dark" id="tableNPV">';
		domString = domString + '<thead class="thead-dark"><tr><th scope="col"># Period</th><th scope="col">Inflows</th><th scope="col">Outflows</th><th scope="col">Cummulative Cashflow</th></tr></thead>';
		
		domString = domString + '<tbody>';
		
		for(i=0; i <= vPeriodValue; i++)
		{
			domString = domString + '<tr><th scope="row">'+ i +'</th>';
				domString = domString + '<td><form><input type="text"></form></td>';
				domString = domString + '<td><form><input type="text"></form></td>';
				domString = domString + '<td><form><input type="text"></form></td>';
			domString = domString + '</tr>';
		}
			domString = domString + '<tr>';
			domString = domString + '<td colspan="3"> Net Present Value </td>';
			domString = domString + '<td><form><input type="text"></form></td>';
			domString = domString + '</tr>';
		
		domString = domString + '</tbody></table>';
		
		document.getElementById("divNPV").innerHTML = domString;
	}