import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import base64 from "base-64";
import ReactMarkdown from "react-markdown";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Collapse,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card
} from "@mui/material";

import { RepositoryItemDetails } from "../../interfaces/interfaces";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

interface DetailsVIewProps {
  repository: RepositoryItemDetails;
  readMe: string;
}

const DetailsView = ({ repository, readMe }: DetailsVIewProps) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const {
    avatar,
    owner,
    name,
    visibility,
    issues,
    watchers,
    forks,
    description,
    createdAt,
    updatedAt
  } = repository;

  const createdAtDateString = new Date(createdAt).toLocaleString("en-US");
  const updatedAtDateString = new Date(updatedAt).toLocaleString("en-US");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box mt={15}>
      <Card sx={{ maxWidth: 600, margin: "0 auto" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
              {owner.substring(0, 2)}
            </Avatar>
          }
          title={name}
          titleTypographyProps={{ variant: "h5", noWrap: true }}
          subheader={description}
        />
        <CardContent sx={{ paddingTop: 0 }}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="caption" color="text.secondary">
                {`Created at: ${createdAtDateString}`}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="caption" color="text.secondary">
                {`Updated at: ${updatedAtDateString}`}
              </Typography>
            </Grid>
            <Grid container mt={3}>
              <Grid
                item
                xs={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography variant="body2" color="text.secondary">
                  {`Forsk: ${forks}`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography variant="body2" color="text.secondary">
                  {`Watchers: ${watchers}`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography variant="body2" color="text.secondary">
                  {`Issues: ${issues}`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography variant="body2" color="text.secondary">
                  {`Visibility: ${visibility}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardMedia component="img" height="350" image={avatar} alt={owner} />
        <CardContent>
          {readMe && <Typography textAlign="right">ReadMe...</Typography>}
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Box>
              {readMe && <ReactMarkdown>{base64.decode(readMe)}</ReactMarkdown>}
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default DetailsView;
