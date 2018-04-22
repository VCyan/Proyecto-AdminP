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
	$vPeriod = $_GET['vPeriod'];
	$vPrincipal = $_GET['vPrincipal'];
	$vPrincipal = 0 - $vPrincipal; // Transforming positive PRINCIPAL as Negative value
	$vTasa = $_GET['vTasa'];
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
		$net = $inflowsPP[$i] - abs($outflowsPP[$i]);
		if($interest < 0){
			// if we still owe money, then there is still an interest...
			$interest = $interest * (1+$vTasa/100);
		}
		$netCash = $interest + $net; // $vPrincipal + $interest + $net;
		array_push($cummuCfPP,$netCash);
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
	$display_string = "<table class=\"table table-bordered table-hover\" id=\"tablePP\">";
	$display_string .= "<thead class=\"thead-dark\"><tr><th scope=\"col\"># Period</th><th scope=\"col\">Infows</th><th scope=\"col\">Outflows</th><th scope=\"col\">Cummulative Cashflow</th></tr></thead>";
	$display_string .= "<tbody>";

	// Insert a new row in the table for each person returned
	// while($row = mysql_fetch_array($qry_result))
	for($i = 0; $i < $vPeriod; $i++){
		$display_string .= "<tr><th scope=\"row\">".($i+1)."</th>";
			$display_string .= "<td>$inflowsPP[$i]</td>";
			$display_string .= "<td>$outflowsPP[$i]</td>";
			$display_string .= "<td>$cummuCfPP[$i]</td>";
		$display_string .= "</tr>";
	}

	//echo "Query: " . $query . "<br />";

	$display_string .= "</tbody></table>";

	echo $display_string;

?>
