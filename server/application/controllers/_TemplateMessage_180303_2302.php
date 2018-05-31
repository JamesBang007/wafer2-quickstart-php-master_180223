<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// 引入 数据库 bd
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
// 获取 SDK 连接数据库实例，这个是个 PDO 连接实例
DB::getInstance();


// 数组保存appid
$app = array
(
	'scly' 	=> array('appid'=>'wxf27397bc89f88c4e', 'appsecret'=>'696d9c86f11a967ea0b8f76526580c74'),
	'cdcyts'=> array('appid'=>'wx67a6dd77d010a4f0', 'appsecret'=>'64f6257a27b060a401443a9b925cdf91')
);


// 获取appid,appsecret
if(!empty($_POST['appname'])){
	//echo '1\n ';
	$appid = $app[$_POST['appname']]['appid'];
	$appsecret = $app[$_POST['appname']]['appsecret'];
}else{
	//echo '0\n ';
	$appid = $app['scly']['appid'];
	$appsecret = $app['scly']['appsecret'];
}


$p1 = new TemplateMessage(); // 创建实例对象$p1
$p1->getApp($appid, $appsecret);


if( !empty($_POST['formData']) ){
    $p1->send_template_message( $_POST['formData'] );
}else{
	echo 'No FormData';
}



class TemplateMessage extends CI_Controller {


    // 获取appid,appsecret    
    function getApp($appid, $appsecret)
    {
        $this->appid = $appid;
        $this->appsecret = $appsecret;
    }
	
	/**
     * 获取微信基础接口凭证Access_token
     * @param $refresh 强制刷新， 默认false
     * @return String
     */
    function getAccess_token($refresh = false)
    {

		$data = DB::row('cAccessToken', ['*'], 'appid = "'.$this->appid.'"');	// 查询一条 条件为字符串

		
		if( $data->expire_time < time() || $refresh ){	
			//echo $msg = '过期，更新 ';
			
			// 获取access_token
			$url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$this->appid.'&secret='.$this->appsecret;
			$result = json_decode(file_get_contents($url));
			// 输出： { "access_token":"", "expires_in":7200 }  有效期 2小时
			$access_token = $result->access_token;
			
			if ($result->errcode && !$access_token) {
                $this->error('get access_token failed.');
            } else {
                $expire_time = time() + 7000;
                // 更新数据
				DB::update('cAccessToken', ['access_token' => $access_token, 'expire_time' => $expire_time], 'appid = "'.$this->appid.'"');
                //$res = DB::row('cAccessToken', ['*'], 'appid = "'.$this->appid.'"');	// 查询一条 条件为字符串
				//print_r($res);
                $this->access_token = $access_token;
            }

		}else{
			//echo $msg = '有效，不更新 ';
			//print_r($data);
			$this->access_token = $data->access_token;
		}
		return $this->access_token;
		
    }
	

	/**
	 * 发送模板消息
	 * $data
	 */
	function send_template_message($data)
    {
        $url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' . $this->getAccess_token();
        //echo "\n ".$url;
        //print_r( $data);
        echo var_dump($data);
        echo 'curl 666';
        echo urldecode($data);
        echo $data->touser;
        /*
        $result = $this->curlRequest($url, urldecode(json_encode($data)));
		return json_decode($result, true);
        */
        //$this->curl_request($url, $data);
    }


	public function index() {
		/*
		$this->json([
            'code' => 0,
            'data' => $this->tp_msg = $tp_msg
        ]);
		*/
	}
	
	function curl_request($url,$data){
        
        //初始化
        $curl = curl_init();
        //设置 访问地址
        curl_setopt($curl, CURLOPT_URL, $url);
        //设置 头文件的信息作为数据流输出
        curl_setopt($curl, CURLOPT_HEADER, 1);
        //设置 获取的信息以文件流的形式返回，而不是直接输出。
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        //设置 post方式提交
        curl_setopt($curl, CURLOPT_POST, 1);
        //设置 post数据
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        //执行 命令
        $cdata = curl_exec($curl);
        //关闭URL请求
        curl_close($curl);
        //显示获得的数据
        print_r($cdata);        
    }
	
    
}