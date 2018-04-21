	function generateTable() {
		var vPeriod = document.getElementById("vPeriod");
		var vPeriodValue = vPeriod.options[vPeriod.selectedIndex].value;
		
		if(vPeriodValue == 0){
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
					domString = domString + '<td><input type="number" class="form-control" id="inflowPP'+i+'"></td>';
					domString = domString + '<td><input type="number" class="form-control" id="outflowPP'+i+'"></td>';
					domString = domString + '<td><input class="form-control" id="cummCfPP'+i+'" type="text" placeholder="Disabled input here..." disabled></td>';
				domString = domString + '</tr>';
			}
		}
		
		domString = domString + '</tbody></table>';
		
		document.getElementById("divPP").innerHTML = domString;
	}
	
	function setSelectValue() {
		var element = document.getElementById('vPeriod');
		element.value = 3;
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