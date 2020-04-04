
CREATE DATABASE IF NOT EXISTS becovtig;

CREATE TABLE `vtiger_account` (
  `accountid` int(19) NOT NULL DEFAULT '0',
  `accountname` varchar(100) NOT NULL,
  `siccode` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`accountid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO vtiger_account
(accountid, accountname, siccode)
VALUES(1, 'ateb', 'RFCATEB');

INSERT INTO vtiger_account
(accountid, accountname, siccode)
VALUES(2, 'i2c', 'RFCI2C');
