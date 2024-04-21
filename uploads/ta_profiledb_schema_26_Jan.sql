-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2022 at 04:53 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ta_profiledb`
--

-- --------------------------------------------------------

--
-- Table structure for table `ta_candidates`
--

CREATE TABLE `ta_candidates` (
  `id` int(11) NOT NULL,
  `candidate_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `grade` varchar(20) DEFAULT NULL,
  `skills` varchar(500) DEFAULT NULL,
  `time_stamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_categories`
--

CREATE TABLE `ta_categories` (
  `id` int(11) NOT NULL,
  `category_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ta_categories`
--

INSERT INTO `ta_categories` (`id`, `category_meta`) VALUES
(10, '{\"title\":\"Academic\",\"description\":\"Academic\"}'),
(7, '{\"title\":\"Programming\",\"description\":\"Programming Languages\"}'),
(8, '{\"title\":\"Aptitude\",\"description\":\"Aptitude\"}'),
(9, '{\"title\":\"General Knowledge\",\"description\":\"General Knowledge\"}');

-- --------------------------------------------------------

--
-- Table structure for table `ta_config`
--

CREATE TABLE `ta_config` (
  `id` int(11) NOT NULL,
  `meta_key` varchar(50) NOT NULL,
  `meta_value` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ta_config`
--

INSERT INTO `ta_config` (`id`, `meta_key`, `meta_value`) VALUES
(1, 'site_url', 'http://tests.sharingcloudbestpractices.com'),
(2, 'faq_link', '/candidateFaq/'),
(3, 'admin_api', '/api/admin/'),
(4, 'candidate_api', '/api/candidate/'),
(5, 'site_title', 'Tech Assessment'),
(6, 'min_bulk_count', '1'),
(7, 'max_bulk_count', '30'),
(8, 'user_roles', 'admin,orgadmin,staff,candidate');

-- --------------------------------------------------------

--
-- Table structure for table `ta_grade`
--

CREATE TABLE `ta_grade` (
  `id` int(11) NOT NULL,
  `grade_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `grade_name` varchar(200) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_invitations`
--

CREATE TABLE `ta_invitations` (
  `id` int(11) NOT NULL,
  `invitation_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isLive` tinyint(1) NOT NULL DEFAULT 1,
  `time_stamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_mcq`
--

CREATE TABLE `ta_mcq` (
  `id` int(11) NOT NULL,
  `mcq_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `skill` varchar(200) DEFAULT NULL,
  `category` varchar(200) DEFAULT NULL,
  `grade` varchar(100) DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `time_stamp` datetime NOT NULL DEFAULT current_timestamp(),
  `addedBy` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_mcqresponses`
--

CREATE TABLE `ta_mcqresponses` (
  `id` int(11) NOT NULL,
  `invitationId` int(11) NOT NULL,
  `response_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `evaluation_status` varchar(100) NOT NULL DEFAULT 'PENDING',
  `candidate_score` int(11) DEFAULT NULL,
  `total_score` int(11) DEFAULT NULL,
  `result` varchar(20) DEFAULT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_org`
--

CREATE TABLE `ta_org` (
  `id` int(11) NOT NULL,
  `org_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `time_stamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_portal_candidates`
--

CREATE TABLE `ta_portal_candidates` (
  `id` int(11) NOT NULL,
  `candidate_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_skills`
--

CREATE TABLE `ta_skills` (
  `id` int(11) NOT NULL,
  `skill_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `time_stamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_tests`
--

CREATE TABLE `ta_tests` (
  `id` int(11) NOT NULL,
  `test_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `category` varchar(100) NOT NULL,
  `grade` varchar(100) DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `time_stamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_test_registrations`
--

CREATE TABLE `ta_test_registrations` (
  `id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `response_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `evaluation_meta` longtext DEFAULT NULL,
  `scheduled_start` varchar(50) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ta_users`
--

CREATE TABLE `ta_users` (
  `id` int(11) NOT NULL,
  `user_meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `emailId` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `verificationStatus` varchar(20) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ta_candidates`
--
ALTER TABLE `ta_candidates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `ta_categories`
--
ALTER TABLE `ta_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ta_config`
--
ALTER TABLE `ta_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ta_grade`
--
ALTER TABLE `ta_grade`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ta_invitations`
--
ALTER TABLE `ta_invitations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ta_mcq`
--
ALTER TABLE `ta_mcq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ta_mcqresponses`
--
ALTER TABLE `ta_mcqresponses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ta_org`
--
ALTER TABLE `ta_org`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ta_portal_candidates`
--
ALTER TABLE `ta_portal_candidates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ta_skills`
--
ALTER TABLE `ta_skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ta_tests`
--
ALTER TABLE `ta_tests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ta_test_registrations`
--
ALTER TABLE `ta_test_registrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ta_users`
--
ALTER TABLE `ta_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emailId` (`emailId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ta_candidates`
--
ALTER TABLE `ta_candidates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ta_categories`
--
ALTER TABLE `ta_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ta_config`
--
ALTER TABLE `ta_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ta_grade`
--
ALTER TABLE `ta_grade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ta_invitations`
--
ALTER TABLE `ta_invitations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ta_mcq`
--
ALTER TABLE `ta_mcq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ta_mcqresponses`
--
ALTER TABLE `ta_mcqresponses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ta_org`
--
ALTER TABLE `ta_org`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ta_portal_candidates`
--
ALTER TABLE `ta_portal_candidates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ta_skills`
--
ALTER TABLE `ta_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ta_tests`
--
ALTER TABLE `ta_tests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ta_test_registrations`
--
ALTER TABLE `ta_test_registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ta_users`
--
ALTER TABLE `ta_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
