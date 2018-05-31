<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// 引入 数据库 bd
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
// 获取 SDK 连接数据库实例，这个是个 PDO 连接实例
DB::getInstance();


class Token extends CI_Controller {
    public function index() {		
	
		// 数组保存appid
		$app['scly'] 	= array('appid'=>'wxf27397bc89f88c4e', 'secret'=>'696d9c86f11a967ea0b8f76526580c74');
		$app['cdcyts']	= array('appid'=>'wx67a6dd77d010a4f0', 'secret'=>'64f6257a27b060a401443a9b925cdf91');

		if(!empty($_GET['appname'])){
			// echo '1\n ';
			$appid = $app[$_GET['appname']]['appid'];
			$secret = $app[$_GET['appname']]['secret'];
		}else{
			// echo '0\n ';
			$appid = $app[$_GET['scly']]['appid'];
			$secret = $app[$_GET['scly']]['secret'];
		}

		// 获取access_token
		// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
		$url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$appid."&secret=".$secret;
		// echo $url;

		
		
		// 先查询access_token 是否存在
		//$res = DB::row('cAccessToken', ['*'], ['appid' => 'wxf27397bc89f88c4e']);     // 查询一条
		//$res = DB::row('cAccessToken', ['*'], compact('appid'));     // compact() 函数，创建一个包含变量名和它们的值的数组：
		$res = DB::row('cAccessToken', ['*'], 'appid = "'.$appid.'"');	// 查询一条 条件为字符串
		print_r($res);
		echo $res->last_visit_time;
		echo('时间2：'.time());
		

		if( !empty($res) && time()<$res->last_visit_time+7000 ){
			echo '有效，不更新 ';
			

		}else{
			echo '更新 ';			
			$data = file_get_contents($url);
			$data = json_decode($data,true);
			// 输出： { "access_token":"", "expires_in":7200 }  有效期 2小时
			echo($data['access_token']);
			
			// 更新数据
			$res = DB::update('cAccessToken', ['access_token' => $data['access_token']], 'appid = "'.$appid.'"');


		}
		
		
        //echo $data;
        /*
		$this->json([
            'code' => 0,
            'data' => $data
        ]);
        */
		
    }
	
}
