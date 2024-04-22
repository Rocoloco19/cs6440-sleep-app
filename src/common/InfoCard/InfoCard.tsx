import React from 'react';
import {Card, CardActions, CardContent, Link, Typography} from "@mui/material";

export interface InfoCardProps {
  linkSource: string;
  title: string;
  description: string;
  hrefLink: string;
  linkLabel: string;
}

export const InfoCard: React.FC<InfoCardProps> = (props) => {
  const {
    linkSource,
    title,
    description,
    hrefLink,
    linkLabel,
  } = props;

  return (
    <Card sx={{ width: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {linkSource}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={hrefLink} target="_blank">{linkLabel}</Link>
      </CardActions>
    </Card>
  );
}