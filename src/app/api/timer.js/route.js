// This route handles requests to timer.js and returns a 404
// This prevents the browser from trying to load the deleted timer.js file
export async function GET() {
  return new Response('Timer.js file has been removed', { 
    status: 404,
    headers: {
      'Content-Type': 'text/plain',
    }
  });
}


