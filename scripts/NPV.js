function generate_TableNPV(vPeriodValue2) 
	{
		var vPeriod2 = document.getElementById("vPeriod2");
		var vPeriodValue2 = vPeriod2.options[vPeriod2.selectedIndex].value;
		
		//document.getElementById("divPP").innerHTML = "Paragraph changed!"vPeriodValue;
		
		if(vPeriodValue2 == 0 || null)
		{
			var domString = '<table class="table table-bordered table-hover" id="tableNPV">';
			domString = domString + '<thead class="thead-dark"><tr><th scope="col"># Period</th><th scope="col">Inflows</th><th scope="col">Outflows</th><th scope="col">Cummulative Cashflow</th></tr></thead>';
			
			domString = domString + '<tbody>';
		}
		else
		{
			//document.getElementById("divPP").innerHTML = "Paragraph changed!"+vPeriodValue;
			//http://garystorey.com/2017/02/27/three-ways-to-create-dom-elements-without-jquery/
			var eTable = document.createElement('tableNPV');
			var domString = '<table class="table table-bordered table-hover" id="tableNPV">';
			domString = domString + '<thead class="thead-dark"><tr><th scope="col"># Period</th><th scope="col">Inflows</th><th scope="col">Outflows</th><th scope="col">Cummulative Cashflow</th></tr></thead>';
			
			domString = domString + '<tbody>'; 
			
			for(i=1; i <= vPeriodValue2; i++)
			{
				domString = domString + '<tr><th scope="row">'+ i +'</th>';
					domString = domString + '<td><input type="number" class="form-control" id="inflowNPV'+i+'"  name="inflowNPV'+i+'"  onfocus="this.select()" value="0"></td>';
					domString = domString + '<td><input type="number" class="form-control" id="outflowNPV'+i+'" name="outflowNPV'+i+'" onfocus="this.select()" value="0"></td>';
					domString = domString + '<td><input type="text"   class="form-control" id="cummuCfNPV'+i+'" name="cummCfNPV'+i+'"placeholder="Disabled input here..." disabled></td>';
				domString = domString + '</tr>';
			}
		}
			domString = domString + '<tr>';
			domString = domString + '<td colspan="3"> Net Present Value </td>';
			domString = domString + '<td><input type="number" class="form-control" id="netPV" name="netPV" placeholder="Disabled input here..." disabled></td>';
			domString = domString + '</tr>';
		
		domString = domString + '</tbody></table>';
		
		document.getElementById("divNPV").innerHTML = domString;
	}


	function validateData2() 
	{
		var vPeriod2 	= document.getElementById("vPeriod2").value;
		var vPrincipal2 	= document.getElementById("vPrincipal2").value;
		var vTasa2 		= document.getElementById("vTasa2").value;
		var vTasaTax 		= document.getElementById("vTasaTax").value;
		var vSValue 		= document.getElementById("vSValue").value;
		var vPeriodSV 		= document.getElementById("vPeriodSV").value;
		//var vPeriodValue = vPeriod.options[vPeriod.selectedIndex].value;
		// alert("vPeriod " + vPeriod);
		// alert("vPrincipal " + vPrincipal);
		// alert("vTasa " + vTasa);
		var domString = '<label for="colFormLabelLg" class="col-sm-10 col-form-label col-form-label-lg">';
		
		if(isNaN(vPeriod2) || vPeriod2=="" || vPeriod2==null || vPeriod2==0){
			domString = domString + "ERROR: El número de PERIODOS no está definido...<br>";
		}

		if(isNaN(vPrincipal2) || vPrincipal2=="" || vPrincipal2==null){
			domString = domString + "ERROR: El valor PRINCIPAL no está definido...<br>";
		}
		else if(vPrincipal2<=0){
			domString = domString + "ERROR: No hay inversión si el valor PRINCIPAL es 0 o negativo...<br>";
		}
		if(isNaN(vTasa2) || vTasa2=="" || vTasa2==null){
			domString = domString + "ERROR: La TASA DE INTERÉS no está definida...<br>";
		}
		else if(vTasa2 < 0 || vTasa2 > 100){
			domString = domString + "ERROR: La TASA DE INTERÉS no debe ser menor a 0 o mayor a 100...<br>";
		}

		if(isNaN(vTasaTax) || vTasaTax=="" || vTasaTax==null){
			domString = domString + "ERROR: La TASA DE IMPUESTOS no está definida...<br>";
		}
		else if(vTasaTax < 0 || vTasaTax > 100){
			domString = domString + "ERROR: La TASA DE IMPUESTOS no debe ser menor a 0 o mayor a 100...<br>";
		}

		if(isNaN(vSValue) || vSValue=="" || vSValue==null){
			domString = domString + "ERROR: 'Salvage Value' no está definido...<br>";
		}
		else if(vSValue <= 0){
			domString = domString + "ERROR: 'Salvage Value' no debe ser menor a 0...<br>";
		}

		if(isNaN(vPeriodSV) || vPeriodSV=="" || vPeriodSV==null || vPeriodSV==0){
			domString = domString + "ERROR: El periodo de aplicación para el 'salvage value' no está definido...<br>";
		}
		
		domString = domString + '</label>';
		document.getElementById("errorNPV").innerHTML = domString;
		
		if(!isNaN(vPeriod2) && vPeriod2!="" && vPeriod2!=null && !isNaN(vPrincipal2) && vPrincipal2!="" && vPrincipal2!=null && !isNaN(vTasa2) && vTasa2!="" && vTasa2!=null && vTasa2 <= 100 && vTasa2 >= 0 && !isNaN(vTasaTax) && vTasaTax!="" && vTasaTax!=null && vTasaTax <= 100 && vTasaTax >= 0 && !isNaN(vSValue) && vSValue!="" && vSValue!=null && !isNaN(vPeriodSV) && vPeriodSV!="" && vPeriodSV!=null){
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
				 // code for IE6, IE5
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
				 var ajaxDisplay = document.getElementById('divNPV');
				 ajaxDisplay.innerHTML = ajaxRequest.responseText;
			  }
			}

			// Now get the value from user and pass it to
			// server script.
			
			// http://www.kvcodes.com/2015/10/passing-javascript-array-to-php-through-jquery-ajax
			// Get values from Inflows & Outflows into JQuery Arrays encoded as JSON:
			var inflowsNPV  = [];
			var outflowsNPV = [];
			for(i=1; i <= vPeriod2; i++){
				var getValue = parseInt(document.getElementById("inflowNPV"+i+"").value);
				inflowsNPV.push(getValue);
				getValue = parseInt(document.getElementById("outflowNPV"+i+"").value);
				outflowsNPV.push(getValue);
			}
			//var myJSONText = JSON.stringify( arrayfromjs );
			var JSONinflowsNPV 	= JSON.stringify( inflowsNPV );
			var JSONoutflowsNPV 	= JSON.stringify( outflowsNPV );
			
			// var age = document.getElementById('age').value;
			// var wpm = document.getElementById('wpm').value;
			// var sex = document.getElementById('sex').value;
			
			var queryString = "?vPeriod2=" + vPeriod2 +"&vPrincipal2=" + vPrincipal2 +"&vTasa2=" + vTasa2 +"&vTasaTax=" + vTasaTax +"&vSValue=" + vSValue +"&vPeriodSV=" + vPeriodSV +"&inflowsNPV="+JSONinflowsNPV + "&outflowsNPV="+JSONoutflowsNPV;
			ajaxRequest.open("GET", "NPV.php" + queryString, true);
			ajaxRequest.send(null);
			   
			//document.getElementById("errorPP").innerHTML = "DAsd";
		}
	}