	function generateTable(vPeriodValue) {
		//alert(vPeriodN);
		//alert(vPeriodValue);
		//var vPeriod = document.getElementById("vPeriod");
		//var vPeriodValue = vPeriod.options[vPeriod.selectedIndex].value;

		if(vPeriodValue == 0 || null){
			var domString = '<table class="table table-bordered table-hover" id="tablePP">';
			domString = domString + '<thead class="thead-dark"><tr><th scope="col"># Period</th><th scope="col">Inflows</th><th scope="col">Outflows</th><th scope="col">Cummulative Cashflow</th></tr></thead>';

			domString = domString + '<tbody>';
		}else{
			//document.getElementById("divPP").innerHTML = "Paragraph changed!"+vPeriodValue;
			//http://garystorey.com/2017/02/27/three-ways-to-create-dom-elements-without-jquery/
			var eTable = document.createElement('tablePP');
			var domString = '<table class="table table-bordered table-hover" id="tablePP">';
			domString = domString + '<thead class="thead-dark"><tr><th scope="col"># Period</th><th scope="col">Inflows</th><th scope="col">Outflows</th><th scope="col">Cummulative Cashflow</th></tr></thead>';

			domString = domString + '<tbody>';

			for(i=1; i <= vPeriodValue; i++)
			{
				domString = domString + '<tr><th scope="row">'+ i +'</th>';
				// Insert here a input group if you want to add the $ symbol inside the 
					domString = domString + '<td><input type="number" class="form-control" id="inflowPP'+i+'"  name="inflowPP'+i+'"  onfocus="this.select()" value="0"></td>';
					domString = domString + '<td><input type="number" class="form-control" id="outflowPP'+i+'" name="outflowPP'+i+'" onfocus="this.select()" value="0"></td>';
					domString = domString + '<td><input type="text"   class="form-control" id="cummuCfPP'+i+'" name="cummCfPP'+i+'"  placeholder="Disabled input here..." disabled></td>';
				domString = domString + '</tr>';
			}
		}

		domString = domString + '</tbody></table>';

		document.getElementById("divPP").innerHTML = domString;
		deleteChartPP();
	}
	
	function deleteChartPP(){
		// Delete Chart from HTML and recreate a new canvas for a new Chart.
		$('#chartPP').remove(); // this is my <canvas> element
		$('#canvasPP').append('<canvas id="chartPP"><canvas>');
	}

	function validateData() {
		deleteChartPP();
		
		var vPeriod 	= document.getElementById("vPeriod").value;
		var vPrincipal 	= document.getElementById("vPrincipal").value;
		var vTasa 		= document.getElementById("vTasa").value;
		//var vPeriodValue = vPeriod.options[vPeriod.selectedIndex].value;
		// alert("vPeriod " + vPeriod);
		// alert("vPrincipal " + vPrincipal);
		// alert("vTasa " + vTasa);
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

		if(!isNaN(vPeriod) && vPeriod!="" && vPeriod!=null && !isNaN(vPrincipal) && vPrincipal!="" && vPrincipal!=null && !isNaN(vTasa) && vTasa!="" && vTasa!=null && vTasa <= 100 && vTasa >= 0){
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
				 var ajaxDisplay = document.getElementById('divPP');
				 ajaxDisplay.innerHTML = ajaxRequest.responseText;
			  }
			}

			// Now get the value from user and pass it to
			// server script.

			// http://www.kvcodes.com/2015/10/passing-javascript-array-to-php-through-jquery-ajax
			// Get values from Inflows & Outflows into JQuery Arrays encoded as JSON:
			var inflowsPP  = [];
			var outflowsPP = [];
			for(i=1; i <= vPeriod; i++){
				var getValue = parseInt(document.getElementById("inflowPP"+i+"").value);
				inflowsPP.push(getValue);
				getValue = parseInt(document.getElementById("outflowPP"+i+"").value);
				outflowsPP.push(getValue);
			}
			//var myJSONText = JSON.stringify( arrayfromjs );
			var JSONinflowsPP 	= JSON.stringify( inflowsPP );
			var JSONoutflowsPP 	= JSON.stringify( outflowsPP );

			// var age = document.getElementById('age').value;
			// var wpm = document.getElementById('wpm').value;
			// var sex = document.getElementById('sex').value;

			var queryString = "?vPeriod=" + vPeriod +"&vPrincipal=" + vPrincipal + "&vTasa=" + vTasa + "&inflowsPP="+JSONinflowsPP + "&outflowsPP="+JSONoutflowsPP;
			ajaxRequest.open("GET", "PP.php" + queryString, true);
			ajaxRequest.send(null);

			//document.getElementById("errorPP").innerHTML = "Dasd";
			createChartPP(vPeriod, vPrincipal, inflowsPP, outflowsPP);
		}
	}
	
	// Function to create table for Payback Period:
	function createChartPP(vPeriod, vPrincipal, inflowsPP, outflowsPP) {
		// Transforming data to be presented in table
		var nPeriod = [];
		for (var i = 0; i <= vPeriod; i++) {nPeriod.push('Periodo: '+i);}
		inflowsPP.unshift(0); // Insert 0 inflow at the beginning of Array.
		outflowsPP.unshift(vPrincipal); // Insert PRINCIPAL at the beginning of Array.
		outflowsPP.forEach( function(item, index, array) {outflowsPP[index] = item * -1 });
		// Create Table using Chart.js
		var ctx = document.getElementById('chartPP').getContext('2d');
		var myChart = new Chart(ctx, {
				responsive: true,
				scaleGridLineColor: 'black',
				type: 'bar',
				data: {
						labels: nPeriod,
						datasets: [
							{
								label: 'Inflow',
								backgroundColor: '#00E200',//"rgba(75, 192, 192, 0.2)",//"rgba(54, 162, 235, 0.2)",//window.chartColors.red,
								borderWidth: 5,
								data: inflowsPP,
								fill:true
							},
							{
								label: 'Outflow',
								backgroundColor: '#FF3333',//"rgba(255, 99, 132, 0.2)",//window.chartColors.blue,
								//borderColor: '#1a0000',
								borderWidth: 5,
								data: outflowsPP,
								fill:false
							}
						]
					},
				options: {
					title: {
						display: true,
						text: 'Inflows and Outflows'
					},
					tooltips: {
						mode: 'index',
						intersect: true
					},
					scales: {
						xAxes: [{
							stacked: true,
							gridLines: {
								offsetGridLines: false
							}
						}],
						yAxes: [{
							stacked: true
						}]
					}
				}
			}
		);
	}
