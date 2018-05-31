-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2018-05-31 01:47:40
-- 服务器版本： 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cAuth`
--

-- --------------------------------------------------------

--
-- 表的结构 `cAccessToken`
--

CREATE TABLE `cAccessToken` (
  `appid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secret` char(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_token` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expire_time` int(10) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `cAccessToken`
--

INSERT INTO `cAccessToken` (`appid`, `secret`, `access_token`, `create_time`, `last_visit_time`, `expire_time`) VALUES
('wxf27397bc89f88c4e', NULL, '7_JVoyV7ax2qeoOK_4pZNB5h2GLdKE6VGzuFcL18V6ZypKBXap6Fp6pUJGhP-WQ5Pm3Y6UoNErdyWOAN9OYEqpSpWfpAonOQA0KesjDuAIa-pO3lhlrPRMorJfCWwALFgAIARCW', '2018-02-22 01:40:30', '2018-02-28 22:51:41', 1520096058),
('wx67a6dd77d010a4f0', NULL, '10_RVMhCU7wVIVrVbLQvQ-KNzVx97jJFxBFPhjNgDtN5Hggri9hnqgLGVE_S7cEKBKmr95rjfVhXxXkngk0-3Pb-Y5B88suPYcYW9R1s8nGfQWoN8K7gKbZVwt8e95DUdz8t8YYD3rmA91cLHymOQQfACAJLL', '2018-02-23 23:21:32', '2018-05-23 21:13:39', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `cAppinfo`
--

CREATE TABLE `cAppinfo` (
  `appid` char(36) DEFAULT NULL,
  `secret` char(64) DEFAULT NULL,
  `ip` char(20) DEFAULT NULL,
  `login_duration` int(11) DEFAULT NULL,
  `qcloud_appid` char(64) DEFAULT NULL,
  `session_duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `cAppinfo`
--

INSERT INTO `cAppinfo` (`appid`, `secret`, `ip`, `login_duration`, `qcloud_appid`, `session_duration`) VALUES
('wxf27397bc89f88c4e', '', '119.29.130.231', 1000, '1253369580', 2000);

-- --------------------------------------------------------

--
-- 表的结构 `cSessionInfo`
--

CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

--
-- 转存表中的数据 `cSessionInfo`
--

INSERT INTO `cSessionInfo` (`open_id`, `uuid`, `skey`, `create_time`, `last_visit_time`, `session_key`, `user_info`) VALUES
('ow53s0M16fPqLmF2wISStdrnbwak', '0fe028f380726d22ba1fc6c6bb08a4da', 'af166d414d7e3b22f6307e286d20d6f55b80056e', '2017-11-30 06:47:33', '2018-05-31 01:31:59', 'GkSXBKuDYXHjr7Wj40b/Dg==', '{\"openId\":\"ow53s0M16fPqLmF2wISStdrnbwak\",\"nickName\":\"James\\u90a6\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"Chengdu\",\"province\":\"Sichuan\",\"country\":\"China\",\"avatarUrl\":\"https:\\/\\/wx.qlogo.cn\\/mmopen\\/vi_32\\/Q0j4TwGTfTJuYfROx4icXlzyUR9gDtBPyKo5Evb6QK0ibchPPibHtfZL3Yd7S7ab7Rsf3Yvy5qIYhObmK9XMaDzAA\\/132\",\"unionId\":\"ozz-YjnosWJfcTfnj0NmIxsFoags\",\"watermark\":{\"timestamp\":1527730315,\"appid\":\"wxf27397bc89f88c4e\"}}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cSessionInfo`
--
ALTER TABLE `cSessionInfo`
  ADD PRIMARY KEY (`open_id`),
  ADD KEY `openid` (`open_id`) USING BTREE,
  ADD KEY `skey` (`skey`) USING BTREE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
