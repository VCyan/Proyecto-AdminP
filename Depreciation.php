<?php
$dType      = $_GET['dType'];
if($dType==1){
      $dYear      = $_GET['dYear'];
      $dPeriodo   = $_GET['dPeriodo'];
      $dPrincipal = $_GET['dPrincipal'];
      $dTax       = $_GET['dTax'];
      $dTax       = $dTax/100;
      $dRescue    = $_GET['dRescue'];
	  
      $domString  ="<table class=\"table table-bordered table-hover\" id=\"tableSL\"><thead class=\"thead-dark\"><tr><th scope=\"col\"># Period</th><th scope=\"col\">Year</th><th scope=\"col\">Depreciation</th> <th scope=\"col\">Cummulative Depreciation</th><th scope=\"col\">Value in Ledgers</th><th>Tax per year</th></tr>";
        $depreciation = ($dPrincipal-$dRescue)/$dPeriodo;
        $domString .="<tr><th>0</th><th>$dYear</th><th>-</th><th>-</th>
        <th>$ $dPrincipal</th><th>-</th></tr>";

      for($i=1; $i<=$dPeriodo; $i++ ){
        $cumDep     = $depreciation*$i;
        $actualyear = $dYear+$i;
        $now        = $dPrincipal-$cumDep;
        $dtax       = $now*$dTax;
        $domString .="<tr><th>$i</th><th>$actualyear</th><th>$ $depreciation</th>
        <th>$ $cumDep</th><th>$ $now</th><th>$ $dtax</th></tr>";
      }
        $domString .="</table>";
        echo $domString;
  }
if($dType==2){
        $dYear      = $_GET['dYear'];
        $dPeriodo   = $_GET['dPeriodo'];
        $dPrincipal = $_GET['dPrincipal'];
        $dTax       = $_GET['dTax'];
        $dTax       = $dTax/100;
        $domString ="<table class=\"table table-bordered table-hover\" id=\"tableSL\">
          <thead class=\"thead-dark\"><tr><th scope=\"col\"># Period</th><th scope=\"col\">Year</th>
            <th scope=\"col\">Depreciation rate %</th><th scope=\"col\">Depreciation</th> <th scope=\"col\">Cummulative Depreciation</th>
            <th scope=\"col\">Value in Ledgers</th><th>Tax per year</th>
          </tr>";
          $domString .="<tr><th>0</th><th>$dYear</th><th>-</th><th>-</th><th>-</th>
          <th>$ $dPrincipal</th><th>-</th></tr>";


          switch ($dPeriodo) {
          case 3:
              $Mdepreciation[1] = 0.3333;
              $Mdepreciation[2] = 0.4445;
              $Mdepreciation[3] = 0.1481;
              $Mdepreciation[4]= 0.0714;
          break;
          case 5:
              $Mdepreciation[1] = 0.20;
              $Mdepreciation[2] = 0.32;
              $Mdepreciation[3] = 0.192;
              $Mdepreciation[4] = 0.1152;
              $Mdepreciation[5] = 0.1152;
              $Mdepreciation[6]= 0.0576;
          break;
          case 7:
              $Mdepreciation[1] = 0.1429;
              $Mdepreciation[2] = 0.2449;
              $Mdepreciation[3] = 0.1749;
              $Mdepreciation[4] = 0.1249;
              $Mdepreciation[5] = 0.0893;
              $Mdepreciation[6] = 0.0892;
              $Mdepreciation[7] = 0.0893;
              $Mdepreciation[8]= 0.0446;
          break;
          case 10:
              $Mdepreciation[1] = 0.1;
              $Mdepreciation[2] = 0.18;
              $Mdepreciation[3] = 0.144;
              $Mdepreciation[4] = 0.1152;
              $Mdepreciation[5] = 0.0922;
              $Mdepreciation[6] = 0.0737;
              $Mdepreciation[7] = 0.0655;
              $Mdepreciation[8] = 0.0655;
              $Mdepreciation[9] = 0.0656;
              $Mdepreciation[10]= 0.0655;
              $Mdepreciation[11]= 0.0328;
          break;
        }
        $cumDep =0;

        for($i=1; $i<=$dPeriodo+1; $i++){
            $depreciation = $Mdepreciation[$i]*$dPrincipal;
            $rate = $Mdepreciation[$i]*100;
            $now = $dYear+$i;
            $cumDep += $depreciation;
            $valueinL = $dPrincipal-$cumDep;
            $tpy = $valueinL*$dTax;
            if($i==($dPeriodo+1)){
                $cumDep=$dPrincipal;
                $valueinL=0;
            }
            if($tpy<.01){
                $tpy=0;
            }
            $domString .="<tr><th>$i</th><th>$now</th><th>$rate</th>
                          <th>$ $depreciation</th><th>$ $cumDep</th><th>$ $valueinL</th><th>$ $tpy</th></tr>";


        }




          $domString .="</table>";
          echo $domString;
        }

?>
