import {
  getAuthenticatedUser,
  lemonSqueezySetup,
} from "@lemonsqueezy/lemonsqueezy.js";

export default async function SubscriptionsUsersPage() {
  const { data, error } = await getUsers();

  console.log(data);
  console.log(error);

  return <div>SubscriptionsUsersPage</div>;
}

const getUsers = async () => {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;

  lemonSqueezySetup({
    apiKey,
    onError: (error) => console.error("Error!", error),
  });

  const { data, error } = await getAuthenticatedUser();

  return { data, error };
};
