import { getSession } from "next-auth/react";

export const requireAuthentication = async (context: any, cb?: any) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Serialize the session object to a JSON string
  const serializedSession = JSON.stringify(session);

  // Call the callback with the serialized session as a string
  return cb(serializedSession);
};

export async function getServerSideProps(context: any) {
  return requireAuthentication(context, (serializedSession: string) => {
    // Deserialize the session string back into an object
    const currentSession = JSON.parse(serializedSession);

    return {
      props: { currentSession },
    };
  });
}
