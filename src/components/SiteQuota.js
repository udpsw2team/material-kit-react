import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Stack } from '@mui/material';

const SetSiteLicenses = ({ licenseQuota }) => (
  <>
    {
      licenseQuota.quota.map((item) => (
        <Card key={item.licenseCode} sx={{ minWidth: 275 }}>
          <Stack contentSX={{p:2.25}}>
            <CardContent>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button>{item.licenseCode}</Button>
                <Button>{item.licenseCodeName}</Button>
                <Button>{item.usingChannels}/{item.totalChannels}</Button>
              </ButtonGroup>
            </CardContent>
          </Stack>
        </Card>
      ))
    }
  </>
);

export default function SiteQuota(props) {
  console.log('SiteQuota-props');
  console.log(JSON.stringify(props));
  return (
    <div>
      <Box disablepadding
      sx={{
        width:'100%', height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <SetSiteLicenses
        disablepadding
        licenseQuota={props}
        sx={{
          width: '100px',
          height: '20px'
        }}/>
      </Box>
    </div>
  );
}