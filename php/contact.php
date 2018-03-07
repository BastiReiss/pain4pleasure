<?php
require_once('PHPMailer/PHPMailerAutoload.php');

if( isset($_POST['email']) && !empty($_POST['email']) ){

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$email2 = str_replace(array('.','@'),array('_','at'),$_POST['email']);
$stelle = $_POST['stelle'];
$nachricht = $_POST['nachricht'];

$path = "../uploads/";
//$user = $first_name . "_" . $last_name; email 2 is name for dir on server where images are saved
$user = $email2;
$uploads_dir = $path . $user;
$imageDir = 'http://www.pain4pleasure.de/uploads/';

$fileNames = $_FILES['files']['name'];

foreach( $fileNames as $key => $value ) {
    if( empty($value) ) {
        unset( $fileNames[$key] );
    }
}

//echo $imageDir . $user . "/" . $fileNames[0];

print_r($_FILES['files']['name']);


//save files to server

//phpmailer


$mail = new PHPMailer();
$mail->IsMail();

$mail->AddAddress('kontakt@pain4pleasure.de');
$mail->setFrom($email);
$mail->Subject = "Tattoo Anfrage";
$mail->isHTML(true);
$mail->Body = '<h1> Tattoo Anfrage </h1>' ;
$mail->Body .= '<h2> Anfrage von: ' . $first_name . " " . $last_name . '</h2></br>' ;
$mail->Body .= '<h2> email: ' . $email . '</h2></br>' ;
$mail->Body .= '<h2> Stelle: '. $stelle .' </h2></br>' ;
$mail->Body .= '<h2> Nachricht:  </h2></br>' ;
$mail->Body .= '<p>' . $nachricht . '</p></br>' ;
$mail->Body .= '<h2> Link zu den Bildern:  </h2></br>' ;
foreach( $fileNames as $key=>$value ) {
    $name = basename(str_replace(' ', '_' , $value));
    //print_r($name);
    $mail->Body .= '<p><a href=' . $imageDir . $user . "/" . $name . '>' . $value . ' </a></p></br>' ;
}
//for($i = 0; i < count($fileNames); i++)
foreach( $fileNames as $key=>$value ) {
        $name =  str_replace(' ', '_' , $value);
        $imgpath = $imageDir . $user . "/" . $name ;
        $mail->Body .= '<img src=' . $imgpath .'>' ;
    //print_r($imgpath);
    
}


if( !is_dir($path . $user )){
    mkdir($path . $user);
}

if( isset($_FILES) ){
    $files = $_FILES['files'];
    foreach ($_FILES['files']['error'] as $key => $error) {
        if ($error == UPLOAD_ERR_OK) {
            $tmp_name = $_FILES['files']['tmp_name'][$key];
            // basename() may prevent filesystem traversal attacks;
            // further validation/sanitation of the filename may be appropriate

            $name = basename(str_replace(' ', '_' , $_FILES['files']['name'][$key]));
            move_uploaded_file($tmp_name, $uploads_dir . "/" . $name );
        }
    }
}

    if( !$mail->Send() ) {
       echo "Error sending: " . $mail->ErrorInfo;;
    }else{
       echo "Letter sent";
    }
// line 4 if clause
}else{
    echo "email nicht abgeschickt";
}

?>

<html>
<head>
    <meta charset="utf-8">
    <title>pain4pleasure</title>
</head>
<body>
    <div id="answer">
            <?php
            if(isset($_POST['email']) && !empty($_POST['email']) ){
                        echo '<h1>Danke für deine Anfrage '. $first_name . ' , sie wird so schnell wie möglich beantwortet </h1>';
                }else{
                        echo '<h1>Bei deiner Anfrage hat leider etwas nicht funktioniert, bitte achte auf Format und Größe der Bilder </h1>';
                }
            ?>
            <div id="review">
                <h2>Hier nochmal eine Übersicht von deiner Anfrage: </h2>
                <p> Name : <?php echo $first_name. " " .$last_name ?> </p>
                <p> Email : <?php echo $email ?> </p>
                <p> Stelle : <?php echo $stelle ?> </p>
                <p> Nachricht : <?php echo $nachricht ?> </p>
                <div id="images"> 
                    <?php
                        foreach( $fileNames as $key=>$value ) {
                            $name =  str_replace(' ', '_' , $value);
                            $imgpath = $imageDir . $user . "/" . $name ;
                            echo '<img class="preview_image" src=' . $imgpath .'>' ;
                        //print_r($imgpath);
                    }
                    ?>
                </div>
        </div>
    </div>
    <style type="text/css">
        *{
          font-family: "Avenir";  
        }
        
        h2,p{
            color: black;
            margin-left: 5%;
            margin-right: 5%;
            margin-top: 3%;
        }
        #answer{
            position:absolute;
            left:0;
            top:0;
            width:100%;
            height:100%;
            background-image: url('http://pain4pleasure.de/web/assets/images/background/needle2.jpg');
            background-size:cover;
    }
        h1{
            position: absolute;
            left: 30%;
            top: 20%;
            font-size:20px;
            color: #ffffff;
        }
        #review{
            position: absolute;
            width: 60%;
            height: 60%;
            left: 20%;
            top: 30%;
            background-color: #fff;
            opacity: 1;
            overflow-y: scroll;

        }
        .preview_image{
            width: 70px;
            height: 70px;
            float: left;
            margin: 2%;    
        }
    </style>
</body>
</html>
