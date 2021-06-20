export async function authMiddleware(resolve, source, args, context, info) {
  if (context.req && context.req.user) {
    return resolve(source, args, context, info);
  }
  throw new Error("You must be authorized");
}
