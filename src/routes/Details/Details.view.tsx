import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { DetailsViewProps } from "./../../types";
import { Box, fontSize } from "@mui/system";

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
    duration: theme.transitions.duration.shortest,
  }),
}));

const DetailsView = (data: DetailsViewProps | any) => {
  const [expanded, setExpanded] = React.useState(false);

  const { avatar, owner, name, ownerType,visibility,issues,watchers, forks, description,createdAt,updatedAt } = data;

  const createdAtDateString = new Date(createdAt).toLocaleString("en-US")
  const updatedAtDateString = new Date(updatedAt).toLocaleString("en-US")
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
        <CardContent sx={{paddingTop: 0}}>
        <Grid container >
            <Grid item xs={12} md={6} sx={{display:"flex", justifyContent:"center"}}>
              <Typography variant="caption" color="text.secondary">
                {`Created at: ${createdAtDateString}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{display:"flex", justifyContent:"center"}}>
              <Typography variant="caption" color="text.secondary">
                {`Updated at: ${updatedAtDateString}`}
              </Typography>
            </Grid>

            <Grid item xs={6} md={3} sx={{display:"flex", justifyContent:"center"}}>
              <Typography variant="caption" color="text.secondary">
              {`Forsk: ${forks}`}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} sx={{display:"flex", justifyContent:"center"}}>
              <Typography variant="caption" color="text.secondary">
              {`Watchers: ${watchers}`}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} sx={{display:"flex", justifyContent:"center"}}>
              <Typography variant="caption" color="text.secondary">
              {`Issues: ${issues}`}
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} sx={{display:"flex", justifyContent:"center"}}>
              <Typography variant="caption" color="text.secondary">
              {`Visibility: ${visibility}`}
              </Typography>
            </Grid>






          </Grid>
        </CardContent>
        <CardMedia component="img" height="350" image={avatar} alt={owner} />
        <CardContent>
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="body2" color="text.secondary">
                {`Forsk: ${forks}`}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="text.secondary">
                {`Forsk: ${forks}`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
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
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default DetailsView;
