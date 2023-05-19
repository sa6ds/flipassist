import type { Session } from "next-auth";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export const requireAuthentication = async (
  context: GetServerSidePropsContext,
  cb?: (
    serializedSession: string
  ) => { props: { currentSession: Session } } | undefined
): Promise<Session | null> => {
  const session = await getSession(context);

  if (!session) {
    return null;
  }

  // Serialize the session object to a JSON string
  const serializedSession = JSON.stringify(session);

  // Call the callback with the serialized session as a string, if it exists
  if (cb) {
    const result = cb(serializedSession);
    if (result?.props?.currentSession) {
      return result.props.currentSession;
    }
    return null;
  }

  // Otherwise, just return the session object
  return session;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await requireAuthentication(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentSession: session,
    },
  };
};
