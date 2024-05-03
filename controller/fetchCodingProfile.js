import request, { gql } from "graphql-request";
import Users from "../models/Users.js";

const githubStats = async (req, res) => {
  try {
    //get the username from req params
    const { username } = req.params;
    const resp = await fetch(`https://api.github.com/users/${username}`);
    const { public_repos, followers, following, id } = await resp.json();
    if (!id) {
      return res
        .status(200)
        .json({ message: "Github URL is invalid.", success: false });
    }
    const stats = { repos: public_repos, followers, following };
    return res
      .status(200)
      .json({ message: "Fetch Successfully", stats, success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
const leetcodeStats = async (req, res) => {
  try {
    //get the username from req params
    const { username } = req.params;
    const userProblemSolvedQuery = gql`
      query userProblemsSolved($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;
    const badgesQuery = gql`
      query userBadges($username: String!) {
        matchedUser(username: $username) {
          badges {
            id
            name
          }
        }
      }
    `;
    const userProfileQuery = gql`
      query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
          profile {
            ranking
          }
        }
      }
    `;
    const userProblems = await request(
      "https://leetcode.com/graphql/",
      userProblemSolvedQuery,
      { username }
    );
    const badges = await request("https://leetcode.com/graphql/", badgesQuery, {
      username,
    });
    const users = await request(
      "https://leetcode.com/graphql/",
      userProfileQuery,
      {
        username,
      }
    );
    const stats = {
      totalProblems: userProblems?.allQuestionsCount[0]?.count,
      problemSolvedCount:
        userProblems?.matchedUser?.submitStatsGlobal?.acSubmissionNum,
      badges: badges?.matchedUser?.badges?.length,
      ranking: users?.matchedUser?.profile?.ranking,
    };
    return res
      .status(200)
      .json({ message: "Fetch Successfully", stats, success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
const gfgStats = async (req, res) => {
  try {
    //get the username from req params
    const { username } = req.params;
    const resp = await fetch(
      `https://www.geeksforgeeks.org/gfg-assets/_next/data/9kr6GaSCBXushyIF_4IWQ/user/${username}.json`
    );
    const { pageProps } = await resp.json();
    if (!pageProps) {
      return res
        .status(200)
        .json({ message: "Gfg URL is invalid", success: false });
    }
    const { institute_name, score, total_problems_solved, institute_rank } =
      pageProps.userInfo;
    const { School, Easy, Basic, Hard, Medium } = pageProps.userSubmissionsInfo;
    const stats = {
      institute_name,
      score,
      total_problems_solved,
      institute_rank,
      School: Object.keys(School).length,
      Easy: Object.keys(Easy).length,
      Basic: Object.keys(Basic).length,
      Hard: Object.keys(Hard).length,
      Medium: Object.keys(Medium).length,
    };
    return res
      .status(200)
      .json({ message: "Fetch Successfully", stats, success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export { gfgStats, leetcodeStats, githubStats };
