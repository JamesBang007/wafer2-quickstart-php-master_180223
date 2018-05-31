<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Http2Https extends CI_Controller {
    public function index() {
    
        if(!empty($_GET['url'])){
			$url = $_GET['url'];
            $result = file_get_contents($url);
            //$result = json_decode($result,true);
            echo $result;
		}else{
			echo 'url不存在';
			$url = '0';
		}
    
    }
}
