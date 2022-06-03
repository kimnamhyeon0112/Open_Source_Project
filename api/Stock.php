<?php
header('Content-Type: application/json');

define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'oss');

$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
    die("Connection failed: ". $mysqli->error);
}

$query = sprintf("SELECT * FROM `stock` INNER JOIN `world` ON stock.world_id = world.id JOIN `commodity` ON stock.commodity = commodity.commodity;");

$result = $mysqli->query($query);

$data = array();
foreach ($result as $row){
    $data[]=$row;
}

print json_encode($data);

$result->close();

$mysqli->close(); 
?>
