async function getData(id) {
  const response = await fetch(
    `http://51.20.95.11:8000/api/v1/product/${id}`,
    { next: { revalidate: 3000 } }
  );

  return response.json();
}


export default async function PostItem({ params }) {
  const post = await getData(params.id);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
}
