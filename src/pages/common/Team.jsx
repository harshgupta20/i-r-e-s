import "../../styles/Team.css";
import PersonImage from "../../img/download.jpeg";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Typography } from "@mui/material";

export default function Team() {

  const TeamData = [
    {
      name: "Harsh Gupta",
      role: "Design and Development",
      intro: "This is little intro about me",
      userImg: ""
    },
    {
      name: "Sumeet Jain",
      role: "Blockchain",
      intro: "This is little intro about me",
      userImg: ""
    },
    {
      name: "Ayush Dobhal",
      role: "Research and Analysis",
      intro: "This is little intro about me",
      userImg: ""
    },
  ]

  return (
    <div id='model3'>
      <Typography id="team-title" fontWeight="large" fontSize="large" color="primary">Meet Our Team</Typography>
      <div id="teamMember">

        <div className="members">
          {TeamData.map((data) => {
            return <div className="member">
              <img width={200} height={200} src={PersonImage} />
              <div className="description">
                <h1>{data.name}</h1>
                <h2>{data.role}</h2>
                <p>{data.intro}</p>
                <div className="social-media">
                  <InstagramIcon />
                  <LinkedInIcon />
                  <PinterestIcon />
                </div>
              </div>
            </div>

          })}
        </div>
      </div>
    </div>
  );
}