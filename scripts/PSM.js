	function xls(){
		try{
			var excelfile =("Project Screening Matrix.xlsx");
			window.open(excelfile);    // will download file
		}
		catch(e){
			alert("Error");
		}
	}
	
	function duplicateValue(){
		alert("nothing");
	}
	
	function automatedTable(addPart, Part, considerations, clave){
		var domString = '<table class="table table-bordered table-hover" id="'+clave+'PSM">';
			domString += '<thead class="thead-dark">';
			domString += '<tr>';
				domString += '<th scope="col" colspan="4" class="p-4 col-form-label-lg">'+Part+'</th>';
				domString += '<th scope="col" colspan="2"><label for="colFormLabelLg" class="col-form-label col-form-label-sm">Part A Weighting:  </label>';
				domString += '<input type="number" min="0" max="100" class="form-control" id="'+clave+'Weighting" placeholder="0 - 100%"></th>';
			domString += '</tr></thead>';
			
			domString += '<thead class="bg-primary text-white">';
				domString += '<tr>';
					domString += '<th scope="col" colspan="3">Consideration</th>';
					domString += '<th scope="col">Rating</th>';
					domString += '<th scope="col">Weighting</th>';
					domString += '<th scope="col">Weighted Value</th>';
				domString += '</tr>';
			domString += '</thead>';

			domString += '<tbody>';

			for(i=0; i < considerations.length; i++)
			{
				domString += '<tr>';
					domString += '<th title="Low: \nMedium: \nHigh: " scope="row" colspan="3" class="p-3 bg-secondary text-white">'+ considerations[i] +'</th>';
					domString += '<td><select class="form-control" id="'+clave+'R'+i+'" onchange="alert(this.value)">';
							domString += '<option value="1">Low</option>';
							domString += '<option value="3">Medium</option>';
							domString += '<option value="5">High</option>';
					domString += '</select>';
					domString += '<td><input type="number" class="form-control" id="'+clave+'W'+i+'" name="'+clave+'W'+i+'"  onfocus="this.select()" value="0"></td>';
					domString += '<td><input type="number" class="form-control" id="'+clave+'Wvalue'+i+'" name="'+clave+'Wvalue'+i+'" value="0" disabled></td>';
				domString += '</tr>';
			}
			
			domString += '<tr class="bg-dark text-white">';
				domString += '<th scope="row" colspan="4" class="p-3 col-form-label-lg">Total</th>';
				domString += '<td><input type="number" class="form-control" id="'+clave+'totalW" name="'+clave+'totalW" value="0" disabled></td>';
				domString += '<td><input type="number" class="form-control" id="'+clave+'totalWv" name="'+clave+'totalWv" value="0" disabled></td>';
			domString += '</tr>';
			
			domString += '<tr class="bg-dark text-white">';
				domString += '<th scope="row" colspan="3" class="p-3 "></th>';
				domString += '<th scope="row" colspan="2" class="p-3 col-form-label-lg bg-danger text-white">Weighted Total:</th>';
				domString += '<td class="bg-danger text-white"><input type="number" class="form-control" id="'+clave+'WT" name="'+clave+'WT" value="0" disabled></td>';
			domString += '</tr>';
			
		domString += '</tbody></table>';
		addPart = addPart + domString;
		
		return addPart;
	}
	
	function subtotalTable(addPart, partes){
		var domString = '<table class="table table-bordered table-hover" id="subTotalPSM">';
			domString += '<thead class="bg-success text-white">';
			domString += '<tr>';
				domString += '<th scope="col" colspan="4" class="p-4 col-form-label-lg">Sub Totals</th>';
			domString += '</tr></thead>';
			
			domString += '<thead class="thead-dark">';
			for(i=0; i < partes.length; i++)
			{
				domString += '<tr>';
					domString += '<th scope="col" colspan="2">'+partes[i]+'</th>';
					domString += '<th scope="col">Rating</th>';
					domString += '<th scope="col">Weighting</th>';
				domString += '</tr>';
			}
			domString += '</thead>';
			
			domString += '<thead class="thead-dark">';
				domString += '<tr>';
					domString += '<th scope="col" colspan="2">Grand Total:</th>';
					domString += '<th scope="col">must 100</th>';
					domString += '<th scope="col">vary</th>';
				domString += '</tr>';
			domString += '</thead>';
		addPart = addPart + domString;
		return addPart;
	}
	
	function createTablePSM(){
		// All conditions into arrays...
		var domString = "";
		var claveA = "tableA";
		var claveB = "tableB";
		var claveC = "tableC";
		var partes = ["A.  Primary Considerations","B.  Secondary Considerations","C.  Other Considerations"];
		var considerA = ["Time constraints for project delivery","Status of environmental approvals","Availability of funding","Well defined scope"];
		var considerB = ["Overall project complexity","Complexity of performance requirements","Project size","Availability of qualified teams","Owner experience and resources ","Cost of project","Degree of team collaboration","Number of contracts","Allocation of risks","Interest in innovation"]
		var considerC = ["Data Security","Operational constraints","Utility relocations","QC/QA responsibilities","Performance guarantees/warranties","Design reviews/approvals","Legal frame or requirements","Ownership of intellectual property"];
		
		domString = automatedTable(domString, partes[0],considerA, claveA);
		domString = automatedTable(domString, partes[1],considerB, claveB);
		domString = automatedTable(domString, partes[2],considerC, claveC);
		
		domString = subtotalTable(domString, partes);

		document.getElementById("divPSM").innerHTML = domString;
	}
	