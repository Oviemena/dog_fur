import { getAllBreeds, getDogImageUrl } from "@/lib/actions/dogs.action";
import { getSession } from "@auth0/nextjs-auth0";

function LoginBox() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <a
        href="/api/auth/login"
        className="text-gray-800 rounded-md bg-[#00E699] px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-[#00e5BF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E699]"
      >
        Log in
      </a>
    </main>
  );
}
export default async function Home() {
  const session = await getSession();
  if (!session) {
    return <LoginBox />;
  }

  const { user } = session;

  const breeds = await getAllBreeds();
  const images = await getDogImageUrl();
  let breedList = breeds.props.breeds;
  let imageList = images.props.images;
  console.log("breed is:", breedList);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello {user.name}</h1>
      <a href="/api/auth/logout" className="text-blue-600 hover:underline">
        Logout
      </a>
      <ul className="flex gap-2">
        {" "}
        <div>
          {breedList.map(({ breed }) => (
            <li key={breed}>{breed}</li>
          ))}
        </div>
        <div>
          {imageList.map(({ image }: { image: string }) => (
            <li key={image}>{image}</li>
          ))}
        </div>
      </ul>
    </main>
  );
}
