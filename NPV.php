<?php
/**
 * Created by PhpStorm.
 * User: jenkins
 * Date: 4/23/18
 * Time: 7:45 PM
 */

// Retrieve data from Query String
$vPeriod    = $_GET['vPeriod2'];
$vPrincipal = $_GET['vPrincipal2'];
$vPrincipal = 0 - $vPrincipal; // Transforming positive PRINCIPAL as Negative value
$vTasa      = $_GET['vTasa2']/100;
$vTasaTax   = $_GET['vTasaTax']/100;
$vSValue    = $_GET['vSValue'];
$vPeriodSV  = $_GET['vPeriodSV'];
$inflowsNPV  = json_decode($_GET['inflowsNPV']);
$outflowsNPV = json_decode($_GET['outflowsNPV']);
//var_dump($_GET);
$cummuCfNPV = array();
$periodNPV = array();
$npvValue = $vPrincipal * (1+$vTasaTax);

for($i = 0; $i < $vPeriod; $i++) {

    $net = abs($inflowsNPV[$i]) - abs($outflowsNPV[$i]);
    if($i == ($vPeriodSV-1)){
        $net = $net + abs($vSValue);
    }
    $npvPeriod = (($net)*(1-$vTasaTax))/(pow(1+$vTasa,($i+1)));
    $npvValue = $npvValue + $npvPeriod;
    array_push($cummuCfNPV,$net);
    array_push($periodNPV,$npvPeriod);
}

//Build Result String
$display_string  = "<table class=\"table table-bordered table-hover\" id=\"tablePP\">";
$display_string .= "<thead class=\"thead-dark\"><tr><th scope=\"col\"># Period</th><th scope=\"col\">Inflows</th><th scope=\"col\">Outflows</th><th scope=\"col\">Cashflow per period</th><th scope=\"col\">NPV per period</th></tr></thead>";
$display_string .= "<tbody>";

// Insert a new row in the table for each person returned
// while($row = mysql_fetch_array($qry_result))
for($i = 0; $i < $vPeriod; $i++){
    $display_string .= "<tr><th scope=\"row\">".($i+1)."</th>";
    $display_string .= "<td><input type=\"number\" class=\"form-control\" id=\"inflowNPV".($i+1)."\" name=\"inflowNPV".($i+1)."\"  onfocus=\"this.select()\" value=\"$inflowsNPV[$i]\"></td>";
    $display_string .= "<td><input type=\"number\" class=\"form-control\" id=\"outflowNPV".($i+1)."\" name=\"outflowNPV$i\" onfocus=\"this.select()\" value=\"$outflowsNPV[$i]\"></td>";
    $display_string .= "<td><input type=\"text\"   class=\"form-control\" id=\"cummuCfNPV".($i+1)."\" name=\"cummCfNPV$i\" placeholder=\"$cummuCfNPV[$i]\" disabled></td>";
    $display_string .= "<td><input type=\"text\"   class=\"form-control\" id=\"NPVPeriod".($i+1)."\" name=\"NPVPeriod$i\" placeholder=\"$periodNPV[$i]\" disabled></td>";
    $display_string .= "</tr>";
}

//echo "Query: " . $query . "<br />";
$display_string .= "<tr><td colspan='4'>Net Present Value</td><td><input type=\"number\" class=\"form-control\" id=\"netPV\" name=\"netPV\" placeholder=\"Disabled input here...\" value='$npvValue' disabled></td></tr>";
$display_string .= "</tbody></table>";

echo $display_string;