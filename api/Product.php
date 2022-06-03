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

$query = sprintf("SELECT * FROM `product` INNER JOIN `world` ON product.world_id = world.id JOIN `commodity` ON product.commodity_key = commodity.commodity;");

$result = $mysqli->query($query);

$data = array();
foreach ($result as $row){
    $data[]=$row;
}

print json_encode($data);

$result->close();

$mysqli->close(); 
?>