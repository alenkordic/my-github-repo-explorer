import React from "react";
import { Link } from "react-router-dom";
import {
  TableRow,
  TableCell,
  Avatar,
  Grid,
  Box,
  Typography
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";

import { repositoryItemsType } from "./../../../types";
import useStyles from "./TableRowItem.styles";

const TableRowItem = ({
  id,
  name,
  description,
  owner,
  ownerType,
  avatar
}: repositoryItemsType) => {
  const classes = useStyles();

  return (
    <TableRow className={classes.root} hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <Grid container flexDirection="row">
          <Grid item display="flex" alignItems="center">
            <Avatar alt="Remy Sharp" src={avatar} />
          </Grid>

          <Grid item flexGrow={1}>
            <Box ml={2} className={classes.root}>
              <Grid item>
                <Typography
                  classes={{ h6: classes.nameText }}
                  variant="body1"
                  sx={{ fontWeight: 700, fontSize: 14 }}
                >
                  {name}
                </Typography>
              </Grid>

              <Grid item>
                <Typography
                  classes={{ h6: classes.nameText }}
                  variant="subtitle1"
                  sx={{ fontWeight: 200, fontSize: 11, color: "lightgray" }}
                >
                  by: {owner} ({ownerType})
                </Typography>
              </Grid>
              <Grid item>
                <div className={classes.descriptionText}>
                  <Box
                    component="div"
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden"
                    }}
                  >
                    <Typography variant="caption">{description}</Typography>
                  </Box>
                </div>
              </Grid>
            </Box>
          </Grid>

          <Grid item display="flex" alignItems="center">
            <Box ml={2}>
              <Link to={`/repositories/${owner}/${name}`}>
                <InfoIcon color="disabled" />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default TableRowItem;

// id: item.id,
// name: item.name,
// owner: item.owner.login,
// ownerType: item.owner.type,
// avatar: item.owner.avatar_url,
// description: item.description,
