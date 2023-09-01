export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="text-center">Profile Page</h1>
      <hr />
      <h1>Profile</h1>
      <p className="text-3xl">
        profile page{" "}
        <span className="font-bold text-orange-300 uppercase">{params.id}</span>{" "}
      </p>
      <hr />
    </div>
  );
}
