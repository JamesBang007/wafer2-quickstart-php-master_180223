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
}


class TemplateMessage extends CI_Controller {
	
	
	public function index() {
		echo "\n index \n";

		$this->json([
            'code' => 0,
            'data' => '2333'
        ]);
	}
	

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
      //$url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' . $this->getAccess_token();
        $url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' . $this->getAccess_token();
        //echo "\n ".$url;
        $result = $this->curlRequest($url, urldecode(json_encode($data)));
        return json_decode($result, true);
    }
	
    /*
     * 4.组合消息数据
     * 
     */
    $data = array(
            'touser' => $openid, // openid是发送消息的基础
            'template_id' => 'JkZGZlvL5ou_UFide5ncZOzLbtUaPPz8cuYdXUKEkzs', // 模板id
            'url' => $this->siteUrl . U('Store/Twitter/team'), // 点击跳转地址
            'topcolor' => '#FF0000', // 顶部颜色
            'data' => array(
                'first' => array('value' => '邀请成功'),
                'keyword1' => array('value' => $data_arr['realname']),
                'keyword2' => array('value' => date('Y年m月d日 H:i', time())),
                'remark' => array('value' => '您的好友' . $data_arr['realname'] . '已经成为分销商'),
            )
        );
	
	
	
	
}