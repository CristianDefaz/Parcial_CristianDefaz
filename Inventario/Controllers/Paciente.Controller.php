<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}
require_once('../Models/Paciente.model.php');
$pacientes = new Clase_Paciente;
switch ($_GET["op"]) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $pacientes->todos(); //llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;
   
        case "uno":
            $ID_paciente = $_POST["ID_paciente"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
            $datos = array(); //defino un arreglo
            $datos = $pacientes->uno($ID_paciente); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
            $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
            echo json_encode($uno); //devuelvo el arreglo en formato json
            break;
    case 'insertar':
        $Nombre = $_POST["Nombre"];
        $Edad = $_POST["Edad"];
        $Enfermedad = $_POST["Enfermedad"];
        $datos = array(); //defino un arreglo
        $datos = $pacientes->insertar($Nombre, $Edad, $Enfermedad); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'actualizar':
        $ID_paciente = $_POST["ID_paciente"];
        $Nombre = $_POST["Nombre"];
        $Edad = $_POST["Edad"];
        $Enfermedad = $_POST["Enfermedad"];
        $datos = array(); //defino un arreglo
        $datos = $pacientes->actualizar($ID_paciente, $Nombre, $Edad,$Enfermedad); //llamo al modelo de usuarios e invoco al procedimiento actual
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;

    case 'eliminar':
        $ID_paciente = $_POST["ID_paciente"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $pacientes->eliminar($ID_paciente); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
}
