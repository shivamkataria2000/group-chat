import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";

const Message = ({ fromUser, messageBlock, classes, currentUser }) => (
  <Card
    className={classes.card}
    style={{
      alignSelf:
        currentUser === (fromUser ? fromUser._id : "")
          ? "flex-end"
          : "flex-start",
    }}
  >
    <CardHeader
      subheader={fromUser ? fromUser.name : "User"}
      className={classes.cardHeader}
    />
    <CardContent className={classes.cardContent}>
      <Typography variant="body1">{messageBlock.message}</Typography>
    </CardContent>
  </Card>
);
export default Message;
