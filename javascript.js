function resetInquiryForm()
{
    document.getElementById("inquiry_form").reset();
}


function hideRow(row1, hideRow, showRow ) {
    document.getElementById(row1).style.display = "none";
    document.getElementById(hideRow).style.display = "none";
    document.getElementById(showRow).style.display = "";
}

function showRow(row1, hideRow, showRow) {
    document.getElementById(row1).style.display = "";
    document.getElementById(hideRow).style.display = "";
    document.getElementById(showRow).style.display = "none";
   
}

