<?php
/**
 * Created by PhpStorm.
 * User: jenkins
 * Date: 4/25/18
 * Time: 5:07 PM
 */

require('./fpdf/fpdf.php');
$response = $_POST['q'];
$questions = array(
    "(Strategy/alignment) What specific organization strategy does this project align with?",
    "(Driver) What business problem does the project solve?",
    "(Success metrics) How will the project measure success?",
    "(Sponsorship) Who is the project sponsor?",
    "(Risk) What is the impact of not doing this project?",
    "(Risk) What is the project risk to our organization?",
    "(Risk) Where does the proposed project fit in our risk profile?",
    "(Benefits, value) What is the value of the project organization?",
    "(Benefits, value) When will the project shows result?",
    "(Objectives) What are the project objectives?",
    "(Organization) Culture Is our organization culture right for this type of project?",
    "(Resources) Will internal resources be available for this project?",
    "(Approach) Will we build or buy?",
    "(Schedule) How long will this project take?",
    "(Schedule) Is the timeline realistic?",
    "(Training/resources) Will staff training be required?",
    "(Finance/portfolio) What is the estimated cost of the project?",
    "(Portfolio) Is this a new initiative or path of an existing initiative?",
    "(Portfolio) How does this project interact with current projects?",
    "(Technology) Is the technology available or new?"
);
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial','B',16);
$pdf->Image("./images/itesm.jpg",null,null,25);
$pageWidth = $pdf->GetPageWidth()-1;
$pdf->Cell($pageWidth,10,'Titulo Proyecto',0,1,"C");
$pdf->Cell($pageWidth,10,'Autor Proyecto',0,1,"C");
$pdf->Cell(40,10,'',0,1,"C");
$pdf->Cell($pageWidth,10,'Checklist',0,1,"C");
for($i=0;$i<20;$i++){
    $pdf->SetFont('Arial',"B",12);
    $pdf->Cell($pdf->GetStringWidth($questions[$i]),10,$questions[$i],0,1);
    $pdf->SetFont('Arial',"",12);
    if($response[$i]==''){$response[$i]= "No answer provided";}
    $pdf->Cell($pdf->GetStringWidth($response[$i]),10,$response[$i],0,1);
}
$pdf->Output();