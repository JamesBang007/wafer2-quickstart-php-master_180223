<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use QCloud_WeApp_SDK\Conf as Conf;  //初始化 SDK 配置项

// 引入 数据库 bd
//use \QCloud_WeApp_SDK\Mysql\Mysqlbd as DB;
use QCloud_WeApp_SDK\Mysql\Mysql as DB;

class Mydata extends CI_Controller {
    public function index() {
        //echo 'data3';
        
		// 获取 SDK 连接数据库实例，这个是个 PDO 连接实例
		DB::getInstance();


		// 查询数据
		// 从数据库中查询单条数据
		// DB::row($tableName[, $columns = ['*'], $conditions = '', $operator = 'and', $suffix = ''])
		$res = DB::row('cSessionInfo', ['*'], ['open_id' => 'ow53s0M16fPqLmF2wISStdrnbwak']);     // 查询一条
		//print_r($res);
		

        $this->json([
            'code' => 1,
            'data' => $res
        ]);
    }
}



/*
	打印结果：
	stdClass Object
	(
		[open_id] => ow53s0M16fPqLmF2wISStdrnbwak
		[uuid] => 11468934b0cd6b63a66d0b723dac7d22
		[skey] => cc0455a2c758a3961f8464447d2ec74162396312
		[create_time] => 2017-12-01 22:47:33
		[last_visit_time] => 2018-02-23 11:55:02
		[session_key] => rHnGGsPlaio2lI17p+FlcA==
		[user_info] => {"openId":"ow53s0M16fPqLmF2wISStdrnbwak","nickName":"James\u90a6","gender":1,"language":"zh_CN","city":"Chengdu","province":"Sichuan","country":"China","avatarUrl":"https:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTJuYfROx4icXlzyUR9gDtBPyKo5Evb6QK0ibchPPibHtfZL3Yd7S7ab7Rsf3Yvy5qIYhObmK9XMaDzAA\/0","watermark":{"timestamp":1519358101,"appid":"wxf27397bc89f88c4e"}}
	)
*/