import { createFrames, Button } from 'frames.js/next';
 
const frames = createFrames();
const handleRequest = frames(async (ctx) => {
  return {
    image: (<div>
      {ctx.message?.state?.count ?? 0}
    </div>),
    buttons: [
      <Button action="post">Increment counter</Button>
    ],
    state: { count: (ctx.message?.state?.count ?? 0) + 1 }
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;
