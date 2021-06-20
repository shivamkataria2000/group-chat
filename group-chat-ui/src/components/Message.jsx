import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";

const Message = ({ fromUser, messageBlock, classes, currentUser }) => {
  const byMe = currentUser === (fromUser ? fromUser._id : "");
  return (
    <Card
      className={classes.card}
      style={{
        alignSelf: byMe ? "flex-end" : "flex-start",
        backgroundColor: byMe ? "#a2cf6e" : "",
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
};
export default Message;
