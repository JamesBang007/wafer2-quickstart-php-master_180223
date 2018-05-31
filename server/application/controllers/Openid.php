<?php
defined('BASEPATH') OR exit('No direct script access allowed');



/*
* 	开发者服务器使用临时登录凭证 code 获取 session_key 和 openid
*/
class Openid extends CI_Controller {
    public function index() {

		// 数组保存appid
		$app['scly'] 	= array('appid'=>'wxf27397bc89f88c4e', 'secret'=>'696d9c86f11a967ea0b8f76526580c74');
		$app['cdcyts']	= array('appid'=>'wx67a6dd77d010a4f0', 'secret'=>'64f6257a27b060a401443a9b925cdf91');

		if(!empty($_GET['appname'])){
			//echo '\n1';
			$appid = $app[$_GET['appname']]['appid'];
			$secret = $app[$_GET['appname']]['secret'];
		}else{
			//echo '\n0';
			$appid = $app['scly']['appid'];
			$secret = $app['scly']['secret'];	
		}
		//echo $appid;
		
		if(!empty($_GET['code'])){
			$jsCode = $_GET['code'];
		}else{
			echo 'code不存在';
			$jsCode = '0';
		}
		
		
		//接口地址：
		
		$url = 'https://api.weixin.qq.com/sns/jscode2session?appid='.$appid.'&secret='.$secret.'&js_code='.$jsCode.'&grant_type=authorization_code';
		//echo $url;
		$result = file_get_contents($url);
		$result = json_decode($result,true);
		
        
        if ( !empty($result['openid']) ) {
            $this->json([
                'code' => 0,
                'data' => $result
            ]);
        } else {
            $this->json([
                'code' => -1,
                'error' => $result
            ]);
        }
		/**/
    }
}
