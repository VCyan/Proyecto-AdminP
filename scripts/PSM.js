	function xls(){
		try{
			var excelfile =("Project Screening Matrix.xlsx");
			window.open(excelfile);    // will download file
		}
		catch(e){
			alert("Error");
		}
	}
	
	function automatedTable(addPart, Part, considerations, clave){
		// CreateTablePSM
		var domString = '<table class="table table-bordered table-hover" id="'+clave+'PSM">';
			domString = domString + '<thead class="thead-dark">';
			domString = domString + '<tr>';
				domString = domString + '<th scope="col" colspan="4" class="p-4 col-form-label-lg">'+Part+'</th>';
				domString = domString + '<th scope="col" colspan="2"><label for="colFormLabelLg" class="col-form-label col-form-label-sm">Part A Weighting:  </label>';
				domString = domString + '<input type="number" min="0" max="100" class="form-control" id="'+clave+'Weighting" placeholder="0 - 100%"></th>';
			domString = domString + '</tr></thead>';
			
			domString = domString + '<thead class="bg-primary text-white">';
				domString = domString + '<tr>';
					domString = domString + '<th scope="col" colspan="3">Consideration</th>';
					domString = domString + '<th scope="col">Rating</th>';
					domString = domString + '<th scope="col">Weighting</th>';
					domString = domString + '<th scope="col">Weighted Value</th>';
				domString = domString + '</tr>';
			domString = domString + '</thead>';

			domString = domString + '<tbody>';

			for(i=0; i < considerations.length; i++)
			{
				domString = domString + '<tr>';
					domString = domString + '<th title="Low: \nMedium: \nHigh: " scope="row" colspan="3" class="p-3 bg-secondary text-white">'+ considerations[i] +'</th>';
					domString = domString + '<td><select class="form-control" id="'+clave+'R'+i+'" onchange="alert(this.value)">';
							domString = domString + '<option value="1">Low</option>';
							domString = domString + '<option value="3">Medium</option>';
							domString = domString + '<option value="5">High</option>';
					domString = domString + '</select>';
					domString = domString + '<td><input type="number" class="form-control" id="'+clave+'W'+i+'" name="'+clave+'W'+i+'"  onfocus="this.select()" value="0"></td>';
					domString = domString + '<td><input type="number" class="form-control" id="'+clave+'Wvalue'+i+'" name="'+clave+'Wvalue'+i+'" value="0" disabled></td>';
				domString = domString + '</tr>';
			}
			
			domString = domString + '<tr class="bg-dark text-white">';
				domString = domString + '<th scope="row" colspan="4" class="p-3 col-form-label-lg">Total</th>';
				domString = domString + '<td><input type="number" class="form-control" id="'+clave+'totalW" name="'+clave+'totalW" value="0" disabled></td>';
				domString = domString + '<td><input type="number" class="form-control" id="'+clave+'totalWv" name="'+clave+'totalWv" value="0" disabled></td>';
			domString = domString + '</tr>';
			
			domString = domString + '<tr class="bg-dark text-white">';
				domString = domString + '<th scope="row" colspan="3" class="p-3 "></th>';
				domString = domString + '<th scope="row" colspan="2" class="p-3 col-form-label-lg bg-danger text-white">Weighted Total:</th>';
				domString = domString + '<td class="bg-danger text-white"><input type="number" class="form-control" id="'+clave+'WT" name="'+clave+'WT" value="0" disabled></td>';
			domString = domString + '</tr>';
			
		domString = domString + '</tbody></table>';
		addPart = addPart + domString;
		
		return addPart;
	}
	
	function createTablePSM(){
		// All conditions into arrays...
		var domString;
		var claveA = "tableA";
		var claveB = "tableB";
		var claveC = "tableC";
		var considerA = ["Time constraints for project delivery","Status of environmental approvals","Availability of funding","Well defined scope"];
		var considerB = ["Overall project complexity","Complexity of performance requirements","Project size","Availability of qualified teams","Owner experience and resources ","Cost of project","Degree of team collaboration","Number of contracts","Allocation of risks","Interest in innovation"]
		var considerC = ["Data Security","Operational constraints","Utility relocations","QC/QA responsibilities","Performance guarantees/warranties","Design reviews/approvals","Legal frame or requirements","Ownership of intellectual property"];
		
		domString = automatedTable(domString, "A.  Primary Considerations",considerA, claveA);
		domString = automatedTable(domString, "B.  Secondary Considerations",considerB, claveB);
		domString = automatedTable(domString, "C.  Other Considerations",considerC, claveC);
		

		document.getElementById("divPSM").innerHTML = domString;
	}
	