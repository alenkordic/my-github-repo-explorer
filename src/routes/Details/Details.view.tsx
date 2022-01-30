import React from 'react';
import { Box } from '@mui/material';



type DetailsViewProps = {
  description: string;
  id: number;
  name: string;
}

const DetailsView = ({id, name, description}:DetailsViewProps) => {
  return <Box>DetailsView</Box>;
};

export default DetailsView;
