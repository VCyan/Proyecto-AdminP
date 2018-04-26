	function xls(){
		try{
			var excelfile =("Project Screening Matrix.xlsx");
			window.open(excelfile);    // will download file
		}
		catch(e){
			alert("Error");
		}
	}

	{
		$(document).on("change",".autoCalculate", function() {
			//Touched element.
			var id = $(this).attr("id");
			var clave = $('#'+id).parents("table:first").attr("id");
			var idIndex = id.substr(id.length - 1);
			//for(i=0; i < considerations.length; i++)

			var rate = $('#'+clave+'R'+idIndex).val();
			var weig = $('#'+clave+'W'+idIndex).val() / 5 ;
			var valu = rate * weig;
			$('#'+clave+'Wvalue'+idIndex).val(valu.toFixed(2));
			
			var i = 0;
			var arrayW = [];
			var arrayWv = [];
			
			while($('#'+clave+'R'+i).length > 0){
				var getValue = parseFloat(document.getElementById(clave+'W'+i).value);
				arrayW.push(getValue);
				getValue = parseFloat(document.getElementById(clave+'Wvalue'+i).value);
				arrayWv.push(getValue);
				i++;
			}
			var totalW 	= 0;
			var totalWv = 0;
			for (i = 0; i < arrayW.length; i++) {
				totalW  += arrayW[i];
				totalWv += arrayWv[i];
			}
			$('#'+clave+'totalW').val(totalW.toFixed(2));
			if(totalW.toFixed(2) != 100){
				$('#'+clave+'totalW').attr('class', 'form-control font-weight-bold bg-danger text-white');
			}
			else{
				$('#'+clave+'totalW').attr('class', 'form-control font-weight-bold bg-success text-white');
			}
			$('#'+clave+'totalWv').val(totalWv.toFixed(2));
			
			var totalWT =  (totalWv / 100 * $('#'+clave+'Weighting').val()).toFixed(2);
			$('#'+clave+'WT').val(totalWT);
			// Update SubTotal Table...
			$('#'+clave+'Wf').val($('#'+clave+'Weighting').val());
			$('#'+clave+'WF').val(totalWT);
			
			// Update Grading...
			var Gtotal = (parseFloat($('#tableAWf').val()) + parseFloat($('#tableBWf').val()) + parseFloat($('#tableCWf').val())).toFixed(2);
			var GTotal = (parseFloat($('#tableAWF').val()) + parseFloat($('#tableBWF').val()) + parseFloat($('#tableCWF').val())).toFixed(2);
			$('#Gtotal').val(Gtotal);
			$('#GTotal').val(GTotal);
			// Decision range
			var d = $('#decision');
			if(Gtotal != 100){
				$('#Gtotal').attr('class', 'form-control form-control-lg font-weight-bold bg-danger text-white');
				d.attr('class', 'form-control form-control-lg bg-warning text-white text-danger font-weight-bold');
				$('#decision').val("Weighting total is not 100 %");
			}
			else{
				if($('#tableAtotalW').val() == 100 && $('#tableBtotalW').val() == 100 && $('#tableCtotalW').val() == 100){
					$('#Gtotal').attr('class', 'form-control form-control-lg font-weight-bold bg-success text-white');
					if(GTotal <= 50){
						d.attr('class', 'form-control form-control-lg bg-danger text-white font-weight-bold');
						$('#decision').val("No");
					}
					else if(GTotal <= 65){
						d.attr('class', 'form-control form-control-lg bg-warning text-white font-weight-bold');
						$('#decision').val("Can Consider");
					}
					else if(GTotal <= 100){
						d.attr('class', 'form-control form-control-lg bg-success text-white font-weight-bold');
						$('#decision').val("Yes");
					}
					else{
						d.attr('class', 'form-control form-control-lg bg-warning text-white text-danger font-weight-bold');
						$('#decision').val("Value over 100");
					}
				}
				else{
					d.attr('class', 'form-control form-control-lg bg-warning text-white text-danger font-weight-bold');
					$('#decision').val("The sum of a Weighting value is not 100");
				}			
			}
		});
	}

	function duplicateValue(){
		alert("nothing");
	}

	function automatedTable(addPart, Part, considerations, clave){
		var domString = '<table class="table table-bordered table-hover" id="'+clave+'">';
			domString += '<thead class="thead-dark">';
		// HEADER
			domString += '<tr>';
				domString += '<th scope="col" colspan="4" class="p-4 col-form-label-lg">'+Part+'</th>';
				domString += '<th scope="col" colspan="2"><label for="colFormLabelLg" class="col-form-label col-form-label-sm">Part '+Part.charAt(0)+' Weighting:  </label>';
				domString += '<input type="number" min="0" max="100" class="form-control autoCalculate" id="'+clave+'Weighting" placeholder="0 - 100" onfocus="this.select()" value="33.33"></th>';
			domString += '</tr></thead>';
		// BLUE ROW
			domString += '<thead class="bg-primary text-white">';
				domString += '<tr>';
					domString += '<th scope="col" colspan="3">Consideration</th>';
					domString += '<th scope="col">Rating</th>';
					domString += '<th scope="col">Weighting</th>';
					domString += '<th scope="col">Weighted Value</th>';
				domString += '</tr>';
			domString += '</thead>';
		// Table Body
			domString += '<tbody>';
			for(i=0; i < considerations.length; i++)
			{
				domString += '<tr>';
					domString += '<th title="Low: \nMedium: \nHigh: " scope="row" colspan="3" class="p-3 bg-secondary text-white">'+ considerations[i] +'</th>';
					domString += '<td><select class="form-control autoCalculate font-weight-bold font-italic" id="'+clave+'R'+i+'">';
							domString += '<option value="1">Low</option>';
							domString += '<option value="3">Medium</option>';
							domString += '<option value="5" selected>High</option>';
					domString += '</select>';
					domString += '<td><input type="number" class="form-control autoCalculate" id="'+clave+'W'+i+'" name="'+clave+'W'+i+'"  onfocus="this.select()" value="'+(100/considerations.length).toFixed(2)+'"></td>';
					domString += '<th><input type="number" class="form-control list-group-item-primary font-weight-bold" id="'+clave+'Wvalue'+i+'" name="'+clave+'Wvalue'+i+'" value="'+(100/considerations.length).toFixed(2)+'" disabled></th>';
				domString += '</tr>';
			}
		// Total Table
			domString += '<tr class="bg-dark text-white">';
				domString += '<th scope="row" colspan="4" class="p-3 col-form-label-lg">Total</th>';
				domString += '<td><input type="number" class="form-control font-weight-bold bg-success text-white" id="'+clave+'totalW" name="'+clave+'totalW" value="100" disabled></td>';
				domString += '<td><input type="number" class="form-control font-weight-bold" id="'+clave+'totalWv" name="'+clave+'totalWv" value="100" disabled></td>';
			domString += '</tr>';
		// Weighted Table
			domString += '<tr class="bg-dark text-white">';
				domString += '<th scope="row" colspan="3" class="p-3"></th>';
				domString += '<th scope="row" colspan="2" class="p-3 col-form-label-lg bg-info text-white">Weighted Total:</th>';
				domString += '<td class="bg-info text-white"><input type="number" class="form-control col-form-label-lg font-weight-bold" id="'+clave+'WT" name="'+clave+'WT" value="33.33" disabled></td>';
			domString += '</tr>';

		domString += '</tbody></table>';
		addPart = addPart + domString;

		return addPart;
	}

	function subtotalTable(addPart, partes, claves){
		var domString = '<table class="table table-bordered table-hover" id="subTotalPSM">';
			domString += '<thead class="bg-success text-white">';
			domString += '<tr>';
				domString += '<th scope="col" colspan="2" class="p-4 col-form-label-lg">Sub Totals</th>';
				domString += '<th scope="col" class="p-4 col-form-label-lg bg-primary">Weighting Total</th>';
				domString += '<th scope="col" class="p-4 col-form-label-lg bg-primary">Weighted Total</th>';
			domString += '</tr></thead>';

			domString += '<thead class="thead-dark">';
			for(i=0; i < partes.length; i++)
			{
				domString += '<tr>';
					domString += '<th scope="col" colspan="2">'+partes[i]+'</th>';
					domString += '<th scope="col"><input type="number" class="form-control" id="'+claves[i]+'Wf" value="33.33" disabled></th>';
					domString += '<th scope="col"><input type="number" class="form-control" id="'+claves[i]+'WF" value="33.33" disabled></th>';
				domString += '</tr>';
			}
			domString += '</thead>';

			domString += '<thead class="thead-dark">';
				domString += '<tr>';
					domString += '<th scope="col" colspan="2" class="col-form-label-lg">Grand Total:</th>';
					domString += '<td><input type="number" class="form-control form-control-lg font-weight-bold bg-success text-white" id="Gtotal" value="100" disabled></td>';
					domString += '<td><input type="number" class="form-control form-control-lg font-weight-bold bg-primary text-white" id="GTotal" value="100" disabled></td>';
				domString += '</tr>';
			domString += '</thead>';
			domString += '<thead class="thead-dark">';
				domString += '<tr>';
					domString += '<th scope="col" colspan="3" class="col-form-label-lg">Decision:</th>';
					domString += '<td><input type="text" class="form-control form-control-lg bg-success text-white font-weight-bold" id="decision" value="Yes" disabled></td>';
				domString += '</tr>';
			domString += '</thead>';
		addPart = addPart + domString;
		return addPart;
	}

	function createTablePSM(){
		// All conditions into arrays...
		var domString = "";
		var claves = ["tableA","tableB","tableC"];
		var partes = ["A.  Primary Considerations","B.  Secondary Considerations","C.  Other Considerations"];
		var considerA = ["Time constraints for project delivery","Status of environmental approvals","Availability of funding","Well defined scope"];
		var considerB = ["Overall project complexity","Complexity of performance requirements","Project size","Availability of qualified teams","Owner experience and resources ","Cost of project","Degree of team collaboration","Number of contracts","Allocation of risks","Interest in innovation"]
		var considerC = ["Data Security","Operational constraints","Utility relocations","QC/QA responsibilities","Performance guarantees/warranties","Design reviews/approvals","Legal frame or requirements","Ownership of intellectual property"];
		domString += "<form>";
		domString = automatedTable(domString, partes[0],considerA, claves[0]);
		domString = automatedTable(domString, partes[1],considerB, claves[1]);
		domString = automatedTable(domString, partes[2],considerC, claves[2]);
		domString = subtotalTable(domString, partes, claves);
		domString += "</form>";
		document.getElementById("divPSM").innerHTML = domString;
	}
