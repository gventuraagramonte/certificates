import { useRouter } from "next/router";

const Update = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedItem = {
      nombreItem,
    };

    await updatedItem(id, updatedItem);
    router.push("/");
  };

  return (
    <div>
      <h1>Update Certificate</h1>
      <form onSubmit={handleSubmit}></form>
    </div>
  );
};

export default Update;
