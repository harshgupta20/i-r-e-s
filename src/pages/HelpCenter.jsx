import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const HelpCenter = () => {
  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  // DATA OBJECT
  const helpCenterData = [
    {
      sno: "1",
      mainTitle: "User data Incomplete",
      errorCode: "P-001",
      instructions: "This Error indicates that you have not completed user profile in order to use features of I-RE-S Platfrom. Kindly follow the instructions in the link.",
      link: "https://github.com/harshgupta20/i-r-e-s/blob/main/instructions/P-001.md"
    },
    {
      sno: "2",
      mainTitle: "Request for authorizer",
      errorCode: "Authorization Access",
      instructions: "If you wanted to apply as a authorizer, then kindly follow the instructions provided in the link.",
      link: "",
      listView: "true"
    }
  ]

  return (
    <>
      <div id="help-main">
        <div id="help-body">
          <Typography>Help Center</Typography>
        </div>
        <div id="help-err-main">
          {
            helpCenterData.map((data, key) => {
              return (

                <Accordion expanded={expanded === `panel${data.sno}`} onChange={handleChange(`panel${data.sno}`)}>
                  <AccordionSummary aria-controls={`panel${data.sno}d-content`} id={`panel${data.sno}d-header`}>
                    <Typography><b>Error Code : {data.errorCode}</b> ( {data.mainTitle} )</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {data.instructions}
                      <br />
                      {
                        data.link!=="" ? <a target='_blank' href={data.link}>Click Link for Instructions</a> : ""
                      }
                      

                      {
                        data.listView === "true" ? <>
                          <ol style={{ marginLeft: '30px' }} >
                            <li>Go to the "Contact" section</li>
                            <li>Enter title with : <i>"Request for Authorization Access"</i></li>
                            <li>Enter message according to your need which states why you want access & whats makes you eligile to become Authorizer and submit</li>
                          </ol>
                          <br />
                          After submitting the contact form, the request will be go to admin and will review your request according to the "Message" you sent. If everything is fine and if you eligible to become authorizer then soon your status will be updated to "Authorizer"

                        </>
                          : ""

                      }
                      <br />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )

            })
          }
        </div>
      </div>
    </>
  )
}

export default HelpCenter