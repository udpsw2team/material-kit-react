// @mui
import React from "react";
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Button,
  ButtonGroup
} from '@mui/material';

AppWidgetSummary.propTypes = {
  title: PropTypes.string.isRequired,
  licenses: PropTypes.array
};

const Checkouts = (props) => {
  const { items } = props;
  console.log(`props : ${JSON.stringify(props)}`);
  console.log(`items : ${JSON.stringify(items)}`);
  const arr = items;
  if (arr.length === 0) {
    return (
      <ButtonGroup orientation="vertical" aria-label="vertical contained button group" />
    )
  }
  const licenseCodes = arr.map((item) => 
    <Button key={item.licenseCode.toString()} value={item.licenseCode} style={{
      fontSize: '12px',
      color: 'RGB(24,155,255)',
      backgroundImage: `linear-gradient(to left, white, #eee ${item.channels}ch, RGB(230,247,255) ${item.channels}ch)`,
      width: '100%'
    }}>
      {`${item.licenseCodeName}(${item.channels}/${item.totalChannels})`}
    </Button>
  );
  return (
    <ButtonGroup orientation="vertical" aria-label="vertical contained button group">
      {licenseCodes}
    </ButtonGroup>
  );
};

Checkouts.propTypes = {
  items: PropTypes.array
};

export default function AppWidgetSummary({ title, licenses, quota }) {
  return (
    <Card
      sx={{
        height: 240,
        boxShadow: 0,
        textAlign: 'center',
        border: '1px solid RGB(230,235,241)',
        // color: (theme) => theme.palette[color].darker,
        bgcolor: 'white'
      }}
    >
      <CardHeader title={title}
        style={{
          left: 0,
          top: 0,
          textAlign: 'left',
          margin: 0,
          padding: 4,
          width: '100%'
        }}/>
      <CardContent style={{padding: '0px'}}>
        <Box>
          <Checkouts
            items={licenses}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
