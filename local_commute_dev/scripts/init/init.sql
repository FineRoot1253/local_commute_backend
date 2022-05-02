-- MariaDB dump 10.19  Distrib 10.7.3-MariaDB, for osx10.17 (arm64)
--
-- Host: localhost    Database: commute_manager
-- ------------------------------------------------------
-- Server version	10.7.3-MariaDB-1:10.7.3+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comp`
--

DROP TABLE IF EXISTS `comp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comp` (
  `comp_id` varchar(50) NOT NULL,
  `comp_name` varchar(50) NOT NULL DEFAULT 'UNTITLED',
  `comp_state` int(11) DEFAULT 0,
  `comp_admin_email_addr` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`comp_id`),
  UNIQUE KEY `comp_UN` (`comp_admin_email_addr`),
  CONSTRAINT `comp_FK` FOREIGN KEY (`comp_admin_email_addr`) REFERENCES `user` (`email_addr`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comp`
--

LOCK TABLES `comp` WRITE;
/*!40000 ALTER TABLE `comp` DISABLE KEYS */;
/*!40000 ALTER TABLE `comp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outofrangeuser`
--

DROP TABLE IF EXISTS `outofrangeuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `outofrangeuser` (
  `ooru_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_email_addr` varchar(100) NOT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`ooru_id`),
  KEY `outofrangeuser_FK` (`user_email_addr`),
  CONSTRAINT `outofrangeuser_FK` FOREIGN KEY (`user_email_addr`) REFERENCES `user` (`email_addr`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outofrangeuser`
--

LOCK TABLES `outofrangeuser` WRITE;
/*!40000 ALTER TABLE `outofrangeuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `outofrangeuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outsidework`
--

DROP TABLE IF EXISTS `outsidework`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `outsidework` (
  `osw_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_email_addr` varchar(100) NOT NULL,
  `dest` varchar(100) NOT NULL DEFAULT 'UNKNOWN',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`osw_id`),
  KEY `outsidework_FK` (`user_email_addr`),
  CONSTRAINT `outsidework_FK` FOREIGN KEY (`user_email_addr`) REFERENCES `user` (`email_addr`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outsidework`
--

LOCK TABLES `outsidework` WRITE;
/*!40000 ALTER TABLE `outsidework` DISABLE KEYS */;
/*!40000 ALTER TABLE `outsidework` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `email_addr` varchar(100) NOT NULL,
  `user_type` bigint(20) DEFAULT 0,
  `userId` varchar(100) DEFAULT NULL,
  `userName` varchar(40) NOT NULL,
  `userPwd` varchar(100) NOT NULL,
  `state` int(11) NOT NULL,
  `user_profile_photo` varchar(200) DEFAULT NULL,
  `user_telephone_number` varchar(11) DEFAULT NULL,
  `comp_id` varchar(50) DEFAULT NULL,
  `user_phone_number` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`email_addr`),
  KEY `user_FK` (`comp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `user_full_data`
--

DROP TABLE IF EXISTS `user_full_data`;
/*!50001 DROP VIEW IF EXISTS `user_full_data`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `user_full_data` (
  `email_addr` tinyint NOT NULL,
  `userId` tinyint NOT NULL,
  `user_type` tinyint NOT NULL,
  `userName` tinyint NOT NULL,
  `userPwd` tinyint NOT NULL,
  `state` tinyint NOT NULL,
  `comp_id` tinyint NOT NULL,
  `comp_name` tinyint NOT NULL,
  `user_profile_photo` tinyint NOT NULL,
  `user_phone_number` tinyint NOT NULL,
  `user_telephone_number` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `user_worktime_end`
--

DROP TABLE IF EXISTS `user_worktime_end`;
/*!50001 DROP VIEW IF EXISTS `user_worktime_end`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `user_worktime_end` (
  `user_log_idx` tinyint NOT NULL,
  `user_email_addr` tinyint NOT NULL,
  `user_log_time` tinyint NOT NULL,
  `log_state` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `user_worktime_list`
--

DROP TABLE IF EXISTS `user_worktime_list`;
/*!50001 DROP VIEW IF EXISTS `user_worktime_list`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `user_worktime_list` (
  `user_email_addr` tinyint NOT NULL,
  `work_start` tinyint NOT NULL,
  `work_end` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user_worktime_log`
--

DROP TABLE IF EXISTS `user_worktime_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_worktime_log` (
  `user_log_idx` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_email_addr` varchar(100) NOT NULL,
  `user_log_time` datetime NOT NULL DEFAULT current_timestamp(),
  `log_state` int(2) DEFAULT 0,
  PRIMARY KEY (`user_log_idx`),
  KEY `user_worktime_log_FK` (`user_email_addr`),
  CONSTRAINT `user_worktime_log_FK` FOREIGN KEY (`user_email_addr`) REFERENCES `user` (`email_addr`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_worktime_log`
--

LOCK TABLES `user_worktime_log` WRITE;
/*!40000 ALTER TABLE `user_worktime_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_worktime_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `user_worktime_start`
--

DROP TABLE IF EXISTS `user_worktime_start`;
/*!50001 DROP VIEW IF EXISTS `user_worktime_start`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `user_worktime_start` (
  `user_log_idx` tinyint NOT NULL,
  `user_email_addr` tinyint NOT NULL,
  `user_log_time` tinyint NOT NULL,
  `log_state` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'commute_manager'
--

--
-- Final view structure for view `user_full_data`
--

/*!50001 DROP TABLE IF EXISTS `user_full_data`*/;
/*!50001 DROP VIEW IF EXISTS `user_full_data`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `user_full_data` AS select `u`.`email_addr` AS `email_addr`,`u`.`userId` AS `userId`,`u`.`user_type` AS `user_type`,`u`.`userName` AS `userName`,`u`.`userPwd` AS `userPwd`,`u`.`state` AS `state`,`cp`.`comp_id` AS `comp_id`,`cp`.`comp_name` AS `comp_name`,`u`.`user_profile_photo` AS `user_profile_photo`,`u`.`user_phone_number` AS `user_phone_number`,`u`.`user_telephone_number` AS `user_telephone_number` from ((select `u`.`email_addr` AS `email_addr`,`u`.`userId` AS `userId`,`u`.`user_type` AS `user_type`,`u`.`userName` AS `userName`,`u`.`comp_id` AS `comp_id`,`u`.`userPwd` AS `userPwd`,`u`.`state` AS `state`,`u`.`user_profile_photo` AS `user_profile_photo`,`u`.`user_phone_number` AS `user_phone_number`,`u`.`user_telephone_number` AS `user_telephone_number` from `commute_manager`.`user` `u`) `u` left join (select `cp`.`comp_id` AS `comp_id`,`cp`.`comp_name` AS `comp_name` from `commute_manager`.`comp` `cp`) `cp` on(`u`.`comp_id` = `cp`.`comp_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_worktime_end`
--

/*!50001 DROP TABLE IF EXISTS `user_worktime_end`*/;
/*!50001 DROP VIEW IF EXISTS `user_worktime_end`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `user_worktime_end` AS select `lo`.`user_log_idx` AS `user_log_idx`,`lo`.`user_email_addr` AS `user_email_addr`,`lo`.`user_log_time` AS `user_log_time`,`lo`.`log_state` AS `log_state` from `user_worktime_log` `lo` where `lo`.`log_state` = 0 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_worktime_list`
--

/*!50001 DROP TABLE IF EXISTS `user_worktime_list`*/;
/*!50001 DROP VIEW IF EXISTS `user_worktime_list`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `user_worktime_list` AS select `work_start`.`user_email_addr` AS `user_email_addr`,`work_start`.`user_log_time` AS `work_start`,`work_end`.`user_log_time` AS `work_end` from ((select `st`.`user_email_addr` AS `user_email_addr`,`st`.`user_log_time` AS `user_log_time` from `commute_manager`.`user_worktime_start` `st` order by `st`.`user_log_idx`) `work_start` left join (select `en`.`user_email_addr` AS `user_email_addr`,`en`.`user_log_time` AS `user_log_time` from `commute_manager`.`user_worktime_end` `en` group by `en`.`user_log_idx` order by `en`.`user_log_idx`) `work_end` on(`work_start`.`user_email_addr` = `work_end`.`user_email_addr` and `work_start`.`user_log_time` < `work_end`.`user_log_time`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_worktime_start`
--

/*!50001 DROP TABLE IF EXISTS `user_worktime_start`*/;
/*!50001 DROP VIEW IF EXISTS `user_worktime_start`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `user_worktime_start` AS select `lo`.`user_log_idx` AS `user_log_idx`,`lo`.`user_email_addr` AS `user_email_addr`,`lo`.`user_log_time` AS `user_log_time`,`lo`.`log_state` AS `log_state` from `user_worktime_log` `lo` where `lo`.`log_state` = 1 or `lo`.`log_state` = 2 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-02 12:20:06
