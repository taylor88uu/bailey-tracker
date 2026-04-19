export default function Bailey() { return null; }

export async function getServerSideProps({ res }) {
  // Redirect to the standalone HTML app
  res.setHeader('Location', '/bailey-app.html');
  res.statusCode = 302;
  res.end();
  return { props: {} };
}