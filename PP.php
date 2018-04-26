<?php
	/* $dbhost = "localhost";
	$dbuser = "dbusername";
	$dbpass = "dbpassword";
	$dbname = "dbname";

	//Connect to MySQL Server
	mysql_connect($dbhost, $dbuser, $dbpass);

	//Select Database
	mysql_select_db($dbname) or die(mysql_error()); */

	// Retrieve data from Query String
	$vPeriod    = $_GET['vPeriod'];
	$vPrincipal = $_GET['vPrincipal'];
	$vPrincipal = 0 - $vPrincipal; // Transforming positive PRINCIPAL as Negative value
	$vTasa      = $_GET['vTasa'];
	$inflowsPP  = json_decode($_GET['inflowsPP']);
	$outflowsPP = json_decode($_GET['outflowsPP']);

	$cummuCfPP = array();
	// for($i = 0; $i < $vPeriod; $i++) {
		// $net = $inflowsPP[$i] - $outflowsPP[$i];
		// array_push($netCash,$net);
	// }
	
	$interest = $vPrincipal; // * (1+$vTasa/100);
	//$interest = array($interest1);
	
	for($i = 0; $i < $vPeriod; $i++) {
		$net = abs($inflowsPP[$i]) - abs($outflowsPP[$i]);
		if($interest < 0){
			// if we still owe money, then there is still an interest...
			$interest = $interest * (1+$vTasa/100);
		}
		$netCash = $interest + $net; // $vPrincipal + $interest + $net;
		array_push($cummuCfPP,round($netCash,2));
		$interest = $netCash;
	}

	// Escape User Input to help prevent SQL Injection
	// $age = mysql_real_escape_string($age);
	// $sex = mysql_real_escape_string($sex);
	// $wpm = mysql_real_escape_string($wpm);

	//build query
	//$query = "SELECT * FROM ajax_example WHERE sex = '$sex'";

	// if(is_numeric($age))
	// $query .= " AND age <= $age";

	// if(is_numeric($wpm))
	// $query .= " AND wpm <= $wpm";

	//Execute query
	// $qry_result = mysql_query($query) or die(mysql_error());

	//Build Result String
	$display_string  = "<table class=\"table table-bordered table-hover\" id=\"tablePP\">";
	$display_string .= "<thead class=\"thead-dark\"><tr><th scope=\"col\"># Period</th><th scope=\"col\">Inflows</th><th scope=\"col\">Outflows</th><th scope=\"col\">Cummulative Cashflow</th></tr></thead>";
	$display_string .= "<tbody>";

	// Insert a new row in the table for each person returned
	// while($row = mysql_fetch_array($qry_result))
	$flag = 0;
	$period = 0;
	$lastNegative = 0;
	$lastNetCash = 0;
	// Note: We start i = 0, because arrays start at 0.
	for($i = 0; $i < $vPeriod; $i++){
		$display_string .= "<tr><th scope=\"row\">".($i+1)."</th>";
			$display_string .= "<td><input type=\"number\" class=\"form-control\" id=\"inflowPP".($i+1)."\" name=\"inflowPP".($i+1)."\"  onfocus=\"this.select()\" value=\"$inflowsPP[$i]\"></td>";
			$display_string .= "<td><input type=\"number\" class=\"form-control\" id=\"outflowPP".($i+1)."\" name=\"outflowPP$i\" onfocus=\"this.select()\" value=\"$outflowsPP[$i]\"></td>";
			
			if($cummuCfPP[$i] < 0){			
				$display_string .= "<td><input type=\"text\"   class=\"form-control text-danger\" id=\"cummuCfPP".($i+1)."\" name=\"cummCfPP$i\" value=\"$cummuCfPP[$i]\" disabled></td>";	
			}
			elseif($cummuCfPP[$i] >= 0 && $flag == 0){
				$display_string .= "<td><input type=\"text\"   class=\"form-control bg-success text-white\" id=\"cummuCfPP".($i+1)."\" name=\"cummCfPP$i\" value=\"$cummuCfPP[$i]\" disabled></td>";
				$flag = 1;
				$period = $i+1;
				$lastNetCash = $cummuCfPP[$i];
				$lastNegative = $cummuCfPP[$i-1];
				$exactyear = round($period - 1 + abs($lastNegative)/$lastNetCash, 2);
			}
			elseif($flag == 1){
				$display_string .= "<td><input type=\"text\"   class=\"form-control text-success\" id=\"cummuCfPP".($i+1)."\" name=\"cummCfPP$i\" value=\"$cummuCfPP[$i]\" disabled></td>";
				$flag = 1;
			}
		$display_string .= "</tr>";
	}
	//echo "Query: " . $query . "<br />";
	//$display_string .= "$period, $lastNetCash, $lastNegative</tbody></table>";
	$display_string .= "</tbody></table>";
	if($flag==1){
        $display_string.="<div class=\"alert alert-success font-weight-bold\" role=\"alert\">¡La inversion si es recuperada! <br> El Payback Period exacto es en: $exactyear años.</div>";
	}
	else{
		$display_string.="<div class=\"alert alert-danger\" role=\"alert\">La inversion no conviene, ¡No se recupera el dinero en el tiempo establecido!</div>";
	}
	echo $display_string;
?>