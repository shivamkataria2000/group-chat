import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
const getInitials = (name) => {
  return name.charAt(0).toUpperCase();
};
const Message = ({ fromUser, messageBlock, classes }) => (
  <Card item className={classes.card}>
    <CardHeader
      subheader={fromUser ? fromUser.name : "User"}
      className={classes.cardHeader}
    />
    <CardContent className={classes.cardContent}>
      <Typography variant="body1" noWrap>
        {messageBlock.message}
      </Typography>
      {/*<Typography variant="subtitle" noWrap style={{ float: "right" }}>
        17 Jan 2021
</Typography>*/}
    </CardContent>
  </Card>
);
export default Message;
