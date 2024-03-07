import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography ,Button} from '@mui/material';

export const CompanyCard = (props) => {
  const { company } = props;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          {company.plan}
        </Typography>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {company.price}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {company.description}
        </Typography>
        <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20px"}}>
          <Button
          variant="contained"
          >
            Edit Subscription
          </Button>
        </Box>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
