// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Box,
  Grid,
  Paper,
  Button,
  ButtonGroup,
  Typography
} from '@mui/material';
// utils
import DevicesIcon from '@mui/icons-material/Devices';
import InboxIcon from '@mui/icons-material/Inbox';
import { fShortenNumber } from '../../../utils/formatNumber';

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  licenses: PropTypes.object,
  sx: PropTypes.object,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundImage: `linear-gradient(to left, white, #eee 75%, red 75%)`
}));

const LicenseList = (props) => {
  console.log(`---------- : ${  JSON.stringify(props)}`);
  const { items } = props;
  const arr = items.licenses;
  console.log(`list : ${JSON.stringify(arr)}`);
  const licenseCodes = arr.map((item) => 
    <Button key={item.code.toString()} value={item.name} style={{
      fontSize: '12px',
      backgroundImage: `linear-gradient(to left, white, #eee ${100 - (item.channels / item.usingChannels)}%, RGB(223,121,112) ${100 - (item.channels / item.usingChannels)}%)`,
      width: '100%'
    }}>
      {`${item.name}(${item.usingChannels}/${item.channels})`}
    </Button>
  );
  return (
    <ButtonGroup orientation="vertical" aria-label="vertical contained button group">
      {licenseCodes}
    </ButtonGroup>
  );
};

LicenseList.propTypes = {
  items: PropTypes.object
};

export default function AppWidgetSummary({ title, licenses, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        height: 240,
        direction: 'rti',
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <CardHeader title={title}
        style={{
          left: 0,
          top: 0,
          textAlign: 'left',
          margin: 0,
          padding: 4
        }}/>
      <CardContent style={{padding: '0px'}}>
        <Box>
          <LicenseList items={licenses}/>
        </Box>
      </CardContent>
    </Card>
  );
}
