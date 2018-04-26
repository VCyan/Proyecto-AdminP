var chosenone;
function Escogido() {
	 var input = document.getElementById('inputdata');
	 chosenone = document.getElementById("depMethod").value;

		//1. Straight-line Depreciation
		if(chosenone==1){
			document.getElementById("inputdata").style.display = "block";
			document.getElementById("inputdata2").style.display = "none";
		}
		//2. El otro
		if(chosenone==2){
			document.getElementById("inputdata").style.display = "none";
			document.getElementById("inputdata2").style.display = "block";
		}
}
function Limpiar() {
  if(chosenone==1){
     document.getElementById("divSL").innerHTML = "";
     document.getElementById("forma1").reset();
   }
   else{
     document.getElementById("divM").innerHTML = "";
     document.getElementById("forma2").reset();
   }
}

function valida(){
  document.getElementById("errorSL").style.display = "none";
  document.getElementById("errorM").style.display = "none";
  if(chosenone==1){
    valida1();
  }
  if(chosenone==2){
    valida2();
  }

}


function valida1() {
    var dTax        = document.getElementById("dTax").value;
    var dYear   	  = document.getElementById("dSYSL").value;
    var dPeriodo  	= document.getElementById("dPeriodSL").value;
    var dPrincipal  = document.getElementById("dPrincipalSL").value;
    var dRescue     = document.getElementById("dRV").value;

    var domString = '<label for="colFormLabelLg" class="col-sm-10 col-form-label col-form-label-lg">';

    if(dYear=="" || dPeriodo=="" || dPrincipal=="" || dRescue=="" ||dTax==""){
      domString = domString + "ERROR: Alguno de los campos se encuentra vacío<br>";
      document.getElementById("errorSL").style.display = "block";
    }
    else{
      if(dYear<2000){
        domString = domString + "ERROR: EL año inicial no debe ser menor a 2000<br>";
         document.getElementById("errorSL").style.display = "block";
      }else{
        if(dPrincipal<=0){
          domString = domString + "ERROR: El principal debe ser un valor mayor a 0<br>";
          document.getElementById("errorSL").style.display = "block";

        }
        else{
          if(dRV<=0){
            domString = domString + "ERROR: El rescue value debe ser un valor mayor a 0<br>";
            document.getElementById("errorSL").style.display = "block";
          }else{
            var xmlhttp;
            try {
              // Opera 8.0+, Firefox, Safari
              xmlhttp = new XMLHttpRequest();
            }catch (e) {
              // Internet Explorer Browsers
              try {
               xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
              }catch (e) {
               // code for IE6, IE5
               try{
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
               }catch (e){
                // Something went wrong
                alert("Your browser broke!");
                return false;
               }
              }
            }
            xmlhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                      document.getElementById("divSL").innerHTML = this.responseText;
                  }
              };
              var queryString = "?dYear=" + dYear +"&dPeriodo=" + dPeriodo + "&dPrincipal=" + dPrincipal + "&dRescue="+dRescue+"&dTax="+dTax+"&dType=1";
              xmlhttp.open("GET", "Depreciation.php" + queryString, true);
              xmlhttp.send();
          }

        }
      }

    }

    domString = domString + '</label>';
    document.getElementById("errorSL").innerHTML = domString;


}


function valida2() {
    var dMTax       = document.getElementById("dMTax").value;
    var dMYear   	  = document.getElementById("dSYM").value;
    var dMPeriodo  	= document.getElementById("dMPeriod").value;
    var dMPrincipal = document.getElementById("dMPrincipal").value;

    var domString = '<label for="colFormLabelLg" class="col-sm-10 col-form-label col-form-label-lg">';

    if(dMYear=="" || dMPeriodo=="" || dMPrincipal==""||dMTax==""){
      domString = domString + "ERROR: Alguno de los campos se encuentra vacío<br>";
      document.getElementById("errorM").style.display = "block";
    }
    else{
      if(dMYear<2000){
        domString = domString + "ERROR: EL año inicial no debe ser menor a 2000<br>";
        document.getElementById("errorM").style.display = "block";
      }else{
        if(dMPrincipal<=0){
          domString = domString + "ERROR: El principal debe ser un valor mayor a 0<br>";
          document.getElementById("errorM").style.display = "block";
        }
        else{
          var xmlhttp;
            try {
              // Opera 8.0+, Firefox, Safari
              xmlhttp = new XMLHttpRequest();
            }catch (e) {
              // Internet Explorer Browsers
              try {
               xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
              }catch (e) {
               // code for IE6, IE5
               try{
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
               }catch (e){
                // Something went wrong
                alert("Your browser broke!");
                return false;
               }
              }
            }
            xmlhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                      document.getElementById("divM").innerHTML = this.responseText;
                  }
              };
              var queryString = "?dYear=" + dMYear +"&dPeriodo=" + dMPeriodo + "&dPrincipal=" + dMPrincipal + "&dTax="+dMTax+"&dType=2";
              xmlhttp.open("GET", "Depreciation.php" + queryString, true);
              xmlhttp.send();
          }

        }
      }



    domString = domString + '</label>';
    document.getElementById("errorM").innerHTML = domString;

}
