<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
scly
AppID		wxf27397bc89f88c4e
AppSecret	696d9c86f11a967ea0b8f76526580c74
*/

class Token extends CI_Controller {
    public function index() {
		
        //数组保存appid
        $app['scly'] = array('appid'=>'wxf27397bc89f88c4e', 'secret'=>'696d9c86f11a967ea0b8f76526580c74');
        $app['cdcyts'] = array('appid'=>'wx67a6dd77d010a4f0', 'secret'=>'64f6257a27b060a401443a9b925cdf91');
        $app_data =  $app['scly'];        
        
		//获取access_token
		//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET        
        $data = file_get_contents("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$app_data['appid']."&secret=".$app_data['secret']);
        $data = json_decode($data,true);
        /*输出： { "access_token":"", "expires_in":7200 }  有效期 2小时 */
        
        //echo $data;
        $this->json([
            'code' => 1,
            'data' => $data
        ]);
        
    }
}